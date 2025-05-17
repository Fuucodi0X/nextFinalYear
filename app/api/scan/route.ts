// Ensure this file is located at: app/api/scan/route.ts
import { NextRequest, NextResponse } from 'next/server';

// Named export for the POST HTTP method
export async function POST(req: NextRequest) {
  try {
    // Parse the request body using await req.formData() in App Router
    const formData = await req.formData();

    // Access individual fields
    const nfc_id = formData.get('nfc_id');
    const device_id = formData.get('device_id'); // This will be a File object or null

    // Basic validation
    if (!nfc_id || !device_id) {
      return NextResponse.json(
        { message: 'Missing nfc_id or device_id in request body' },
        { status: 400 } // Bad Request
      );
    }

    console.log(`Received scan from ${device_id}. NFC Data: ${nfc_id}`); // Log received data
    // --- Notify the Dedicated WebSocket Server ---
    const websocketServerInternalUrl = process.env.WEBSOCKET_SERVER_INTERNAL_URL || "http://localhost:3001/api/internal/broadcast-scan"; // e.g., http://localhost:3001/api/internal/broadcast-scan

    if (!websocketServerInternalUrl) {
      console.error("[API Route] WEBSOCKET_SERVER_INTERNAL_URL env var not set. Cannot broadcast.");
      // Decide how to handle this - maybe still return success?
    } else {
      try {
        // Construct the payload EXACTLY as the frontend expects it
        const broadcastPayload = {
          timestamp: new Date().toISOString(),
          device_id: device_id, // Use the actual device name
          nfc_id: nfc_id, // Use the key 'personnelData'
        };

        console.log(`[API Route] Notifying WS Server at ${websocketServerInternalUrl}`);
        const response = await fetch(websocketServerInternalUrl, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(broadcastPayload),
        });

        if (!response.ok) {
          console.error(`[API Route] Failed to notify WS Server. Status: ${response.status}`);
        } else {
          console.log("[API Route] Successfully notified WS Server.");
        }
      } catch (fetchError) {
        console.error("[API Route] Error sending notification to WS server:", fetchError);
      }
    }

    // Return a success response to the device that sent the scan
    return NextResponse.json(
      {
        success: true,
        message: "Scan processed and broadcasted successfully",
        // Optionally send back some data to the scanning device if needed
        // acknowledgedUser: user.name
      },
      { status: 200 } // OK
    );

  } catch (error: unknown) {
    console.error("Error processing scan:", error);

    // Handle potential JSON parsing errors specifically
    if (error instanceof SyntaxError) {
        return NextResponse.json(
            { message: "Invalid JSON in request body" },
            { status: 400 } // Bad Request
        );
    }

    // General internal server error
    return NextResponse.json(
      // Avoid leaking detailed error info in production responses
      { message: "Internal server error processing scan request" },
      { status: 500 }
    );
  }
}

// Optional: Add a GET handler for testing or health checks
export async function GET(req: NextRequest) {
  // You could add logic here to check Socket.IO status or return API info
  // const ioStatus = io ? 'running' : 'not initialized';
  return NextResponse.json({
      message: 'Scan API Endpoint. Use POST to submit scans.',
      socketIoStatus: undefined,
      timestamp: new Date().toISOString()
  });
}
