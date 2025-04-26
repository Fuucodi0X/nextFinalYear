"use client"

import { useState } from "react"
import { Camera, Check, Fingerprint, FileText, ShieldCheck } from "lucide-react"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Progress } from "@/components/ui/progress"
import { Separator } from "@/components/ui/separator"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useToast } from "@/hooks/use-toast"

interface IdentityVerificationProps {
  user: {
    id: string
    name: string
    photo: string
    department: string
    position: string
    accessLevel: string
  }
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function IdentityVerification({ user, open, onOpenChange }: IdentityVerificationProps) {
  const { toast } = useToast()
  const [verificationStep, setVerificationStep] = useState(0)
  const [verificationStatus, setVerificationStatus] = useState<"idle" | "processing" | "success" | "failed">("idle")
  const [verificationMethod, setVerificationMethod] = useState<"photo" | "id" | "biometric">("photo")

  const handleStartVerification = () => {
    setVerificationStatus("processing")

    // Simulate verification process
    const timer = setTimeout(() => {
      setVerificationStep(1)

      const timer2 = setTimeout(() => {
        setVerificationStep(2)

        const timer3 = setTimeout(() => {
          setVerificationStatus("success")
          setVerificationStep(3)

          toast({
            title: "Identity Verified",
            description: `${user.name} has been successfully verified`,
          })
        }, 1000)

        return () => clearTimeout(timer3)
      }, 1000)

      return () => clearTimeout(timer2)
    }, 1500)

    return () => clearTimeout(timer)
  }

  const handleResetVerification = () => {
    setVerificationStatus("idle")
    setVerificationStep(0)
  }

  const handleCloseDialog = () => {
    onOpenChange(false)
    // Reset state when dialog closes
    setTimeout(() => {
      handleResetVerification()
    }, 300)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Identity Verification</DialogTitle>
          <DialogDescription>Verify the identity of the personnel before granting access</DialogDescription>
        </DialogHeader>

        <div className="flex items-center gap-4 mb-4">
          <Avatar className="h-16 w-16">
            <AvatarImage src={user.photo || "/placeholder.svg"} alt={user.name} />
            <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
          </Avatar>
          <div>
            <h3 className="font-semibold">{user.name}</h3>
            <p className="text-sm text-muted-foreground">{user.position}</p>
            <div className="mt-1 flex items-center">
              <Badge variant="outline" className="flex items-center gap-1">
                <ShieldCheck className="h-3 w-3" />
                {user.accessLevel} Access
              </Badge>
              {user.accessLevel === "High" && <Badge className="ml-2 bg-amber-500 hover:bg-amber-600">VIP</Badge>}
            </div>
          </div>
          <Badge variant="outline" className="ml-auto">
            {user.id}
          </Badge>
        </div>

        <Separator />

        {verificationStatus === "idle" ? (
          <div className="py-4">
            <h3 className="font-medium mb-4">Select Verification Method</h3>
            <Tabs value={verificationMethod} onValueChange={(v) => setVerificationMethod(v as any)}>
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="photo">Photo</TabsTrigger>
                <TabsTrigger value="id">ID Document</TabsTrigger>
                <TabsTrigger value="biometric">Biometric</TabsTrigger>
              </TabsList>
              <TabsContent value="photo" className="mt-4">
                <div className="flex items-center gap-6 p-4 border rounded-lg">
                  <div className="flex-1 space-y-2">
                    <h4 className="font-medium">Photo Verification</h4>
                    <p className="text-sm text-muted-foreground">
                      Compare the person's face with their profile photo to confirm identity
                    </p>
                  </div>
                  <Camera className="h-10 w-10 text-primary" />
                </div>
              </TabsContent>
              <TabsContent value="id" className="mt-4">
                <div className="flex items-center gap-6 p-4 border rounded-lg">
                  <div className="flex-1 space-y-2">
                    <h4 className="font-medium">ID Document Verification</h4>
                    <p className="text-sm text-muted-foreground">
                      Scan or manually check their official identification document
                    </p>
                  </div>
                  <FileText className="h-10 w-10 text-primary" />
                </div>
              </TabsContent>
              <TabsContent value="biometric" className="mt-4">
                <div className="flex items-center gap-6 p-4 border rounded-lg">
                  <div className="flex-1 space-y-2">
                    <h4 className="font-medium">Biometric Verification</h4>
                    <p className="text-sm text-muted-foreground">
                      Use fingerprint or other biometric data to verify identity
                    </p>
                  </div>
                  <Fingerprint className="h-10 w-10 text-primary" />
                </div>
              </TabsContent>
            </Tabs>
          </div>
        ) : (
          <div className="py-6">
            <div className="flex justify-between mb-2">
              <h3 className="font-medium">Verification Progress</h3>
              <Badge variant={verificationStatus === "success" ? "default" : "outline"}>
                {verificationStatus === "processing"
                  ? "In Progress"
                  : verificationStatus === "success"
                    ? "Verified"
                    : "Failed"}
              </Badge>
            </div>

            <Progress value={verificationStep * 33.3} className="h-2 mb-6" />

            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div
                  className={`rounded-full p-1 ${verificationStep >= 1 ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"}`}
                >
                  <Check className="h-4 w-4" />
                </div>
                <div className="flex-1">
                  <p className="font-medium">Retrieving Personnel Data</p>
                  <p className="text-sm text-muted-foreground">Accessing secure personnel records</p>
                </div>
                {verificationStep >= 1 && <Check className="h-5 w-5 text-green-500" />}
              </div>

              <div className="flex items-center gap-3">
                <div
                  className={`rounded-full p-1 ${verificationStep >= 2 ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"}`}
                >
                  <Check className="h-4 w-4" />
                </div>
                <div className="flex-1">
                  <p className="font-medium">Analyzing Verification Data</p>
                  <p className="text-sm text-muted-foreground">
                    {verificationMethod === "photo"
                      ? "Comparing facial features with stored profile"
                      : verificationMethod === "id"
                        ? "Validating ID document authenticity"
                        : "Processing biometric data"}
                  </p>
                </div>
                {verificationStep >= 2 && <Check className="h-5 w-5 text-green-500" />}
              </div>

              <div className="flex items-center gap-3">
                <div
                  className={`rounded-full p-1 ${verificationStep >= 3 ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"}`}
                >
                  <Check className="h-4 w-4" />
                </div>
                <div className="flex-1">
                  <p className="font-medium">Completing Verification</p>
                  <p className="text-sm text-muted-foreground">Finalizing identity confirmation</p>
                </div>
                {verificationStep >= 3 && <Check className="h-5 w-5 text-green-500" />}
              </div>
            </div>

            {verificationStatus === "success" && (
              <div className="mt-6 p-4 bg-green-50 border border-green-200 rounded-lg flex items-center gap-3 dark:bg-green-950 dark:border-green-900">
                <div className="rounded-full bg-green-100 p-2 dark:bg-green-900">
                  <ShieldCheck className="h-6 w-6 text-green-600 dark:text-green-400" />
                </div>
                <div>
                  <p className="font-medium text-green-800 dark:text-green-300">Identity Successfully Verified</p>
                  <p className="text-sm text-green-700 dark:text-green-400">
                    {user.name}'s identity has been confirmed
                  </p>
                </div>
              </div>
            )}
          </div>
        )}

        <DialogFooter>
          {verificationStatus === "idle" ? (
            <>
              <Button variant="outline" onClick={handleCloseDialog}>
                Cancel
              </Button>
              <Button onClick={handleStartVerification}>Start Verification</Button>
            </>
          ) : verificationStatus === "processing" ? (
            <Button variant="outline" onClick={handleResetVerification}>
              Cancel Verification
            </Button>
          ) : (
            <>
              <Button variant="outline" onClick={handleResetVerification}>
                Verify Again
              </Button>
              <Button onClick={handleCloseDialog}>Complete</Button>
            </>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
