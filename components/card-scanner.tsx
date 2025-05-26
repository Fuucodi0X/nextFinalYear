"use client"

import { useEffect, useState } from "react"
import { ContactIcon as ContactlessIcon } from "lucide-react"
import { io } from "socket.io-client"
import { gql, useQuery } from "@apollo/client"
import { useToast } from "./ui/use-toast"
import { UserType } from "@/lib/types"

interface CardScannerProps {
  scannedCardId: (cardId: string) => void
  isLoading?: boolean
  setUserData: (user: UserType) => void
}
const getUserQuery = gql`query GetUserQuery($nfcId: Text!) {
      nfcCardsByNfcId(nfcId: $nfcId) {
        assignedCards {
          user {
            email
            avatar
            id
            name
            phoneNumber
            role
            complaines {
              description
              severity
              type:complaintType
            }
            assignedDormitories {
              dormId
              status
              dormitoryRoom {
                roomNumber
                buildingNumber
                floorNumber
              }
          }
         }
       }
    }
  }`

export function CardScanner({ scannedCardId, setUserData, isLoading = false }: CardScannerProps) {
  const [isScanning, setIsScanning] = useState(false)
  const [cardError, setCardError] = useState<string | null>()
  const { data, loading, error, refetch } = useQuery(getUserQuery, { variables: { nfcId: scannedCardId }, skip: !scannedCardId })
  const { toast } = useToast()

  useEffect(() => {
    // Connecting to the websocket
    const wsUrl = process.env.NEXT_PUBLIC_WEBSOCKET_URL || "http://localhost:3001";
    console.log("Attempting to connect to WebSocket URL:", wsUrl); // <-- Add this log

    if (!wsUrl) {
      console.error("WebSocket URL is not defined!");
      return;
    }
    const socket = io(wsUrl, {
      transports: ["websocket"],
    });

    socket.on("connect", () => {
      toast({
        title: "Web socket connected",
        description: `Connected`,
      })
      console.log("Connected to websocket");
    });

    socket.on("disconnect", () => {
      toast({
        title: "Web socket disconnected",
        description: `Disconnected`,
      })
      console.log("Disconnected from websocket");
    });

    socket.on("admin_card_registration", async (nfcId: string) => {
      scannedCardId(nfcId)
      setCardError(null)
      setIsScanning(true)
      console.log(nfcId)

      const { data } = await refetch({ nfcId })
      if (!data.nfcCardsByNfcId) {
        return (
          toast({
            title: "Nfc id not registored ",
            description: `This nfc Id:${nfcId} is not registered`,
          })
        )
      }
      if (!data.nfcCardsByNfcId.assignedCards[0]) {
        return (
          toast({
            title: "NfcId not assigned to user",
            description: `This nfc Id:${nfcId} is not assigned to user`,
          })
        )
      }
      const userData = data.nfcCardsByNfcId.assignedCards[0].user
      setUserData(userData as UserType)

      console.log(userData)
      toast({
        title: "Id scanned",
        description: `registed id:${nfcId} user:${userData.name}`,
      })
      setIsScanning(false)
      console.log(`Nfc card ID: ${nfcId}`)
    });

    return () => {
      socket.disconnect()
    }
  }, [])

  return (
    <div className="flex flex-col items-center justify-center">
      <div className="relative w-32 h-32 flex items-center justify-center cursor-pointer">
        <div
          className={`absolute inset-0 bg-primary/10 rounded-full ${isScanning || isLoading ? "animate-ping" : ""}`}
        ></div>
        <div
          className={`absolute inset-2 bg-primary/20 rounded-full ${isScanning || isLoading ? "animate-pulse" : ""}`}
        ></div>
        <ContactlessIcon className="w-16 h-16 text-primary relative z-10" />
      </div>
    </div>
  )
}
