// Ensure this file is located at: app/api/scan/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { io } from "socket.io-client";
// import { Server } from 'socket.io';

// Define types for request body and personnel data
type ScanRequest = {
  nfc_data: string;
  device_name: string;
};

// Mock User Data (replace with actual data fetching/verification)
type UserData = {
    id: string;
    name: string;
    email: string;
    phone: string;
    department: string;
    position: string;
    accessLevel: string;
    location: string;
    lastScan: string; // Consider making this dynamic
    photo: string;
    gate: string;
};


// Named export for the POST HTTP method
export async function POST(req: NextRequest) {
  try {
    // Parse the request body using await req.formData() in App Router
    const formData = await req.formData();

    // Access individual fields
    const nfc_data = formData.get('nfc_data');
    const device_name = formData.get('device_data'); // This will be a File object or null

    // Basic validation
    if (!nfc_data || !device_name) {
      return NextResponse.json(
        { message: 'Missing nfc_data or device_name in request body' },
        { status: 400 } // Bad Request
      );
    }

    console.log(`Received scan from ${device_name}. NFC Data: ${nfc_data}`); // Log received data

    // --- Personnel Verification Logic ---
    // Replace this section with your actual verification logic
    // const verificationResponse = await fetch(
    //   "https://your-auth-service.com/api/verify-personnel", // Your actual endpoint
    //   {
    //     method: "POST",
    //     headers: { "Content-Type": "application/json" /* Add Auth headers if needed */ },
    //     body: JSON.stringify({ nfc_data }), // Send necessary data for verification
    //   }
    // );

    // if (!verificationResponse.ok) {
    //   // Handle verification failure (e.g., unauthorized NFC tag)
    //   console.error(`Verification failed for NFC: ${nfc_data}. Status: ${verificationResponse.status}`);
    //   return NextResponse.json(
    //     { message: `Verification failed (status: ${verificationResponse.status})` },
    //     { status: verificationResponse.status }
    //   );
    // }
    // const personnelData: PersonnelData = await verificationResponse.json();
    // --- End Personnel Verification Logic ---


    // --- Mocked Personnel Data (Using UserData type) ---
    // Use the fetched 'personnelData' instead of this mock in production
    const user: UserData = {
        id: "EMP-1001", // Should come from verification
        name: "Alex Johnson", // Should come from verification
        email: "alex.johnson@company.com", // Should come from verification
        phone: "(555) 123-4567", // Should come from verification
        department: "Engineering", // Should come from verification
        position: "Senior Developer", // Should come from verification
        accessLevel: "Medium", // Should come from verification
        location: "Building A", // Should come from verification
        lastScan: new Date().toLocaleTimeString(), // Update dynamically
        photo: "/placeholder.svg?height=128&width=128", // Use actual photo URL from verification
        gate: "Gate 1", // Or determine based on device_name/location
    };
    // --- End Mocked Data ---

    // --- Notify the Dedicated WebSocket Server ---
    const websocketServerInternalUrl = process.env.WEBSOCKET_SERVER_INTERNAL_URL; // e.g., http://localhost:3001/api/internal/broadcast-scan

    if (!websocketServerInternalUrl) {
      console.error("[API Route] WEBSOCKET_SERVER_INTERNAL_URL env var not set. Cannot broadcast.");
      // Decide how to handle this - maybe still return success?
    } else {
      try {
        // Construct the payload EXACTLY as the frontend expects it
        const broadcastPayload = {
          timestamp: new Date().toISOString(),
          device_name: device_name, // Use the actual device name
          personnelData: user, // Use the key 'personnelData'
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
