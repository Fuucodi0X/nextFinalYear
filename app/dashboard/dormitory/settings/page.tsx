"use client"

import { useState } from "react"
import { Bed, Building, Home, Save, Settings, Users } from "lucide-react"

import { DashboardLayout } from "@/components/dashboard-layout"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/hooks/use-toast"

const navItems = [
  { href: "/dashboard/dormitory", label: "Dashboard", icon: Home },
  { href: "/dashboard/dormitory/residents", label: "Residents", icon: Users },
  { href: "/dashboard/dormitory/buildings", label: "Buildings", icon: Building },
  { href: "/dashboard/dormitory/settings", label: "Settings", icon: Settings },
]

export default function DormitorySettingsPage() {
  const { toast } = useToast()
  const [isLoading, setIsLoading] = useState(false)

  const handleSaveSettings = () => {
    setIsLoading(true)

    // Simulate saving settings
    setTimeout(() => {
      setIsLoading(false)
      toast({
        title: "Settings saved",
        description: "Your settings have been saved successfully",
      })
    }, 1000)
  }

  return (
    <DashboardLayout navItems={navItems} title="Dormitory Settings" icon={Bed}>
      <Tabs defaultValue="general">
        <div className="flex items-center justify-between">
          <TabsList>
            <TabsTrigger value="general">General</TabsTrigger>
            <TabsTrigger value="keys">Key Management</TabsTrigger>
            <TabsTrigger value="complaints">Complaints</TabsTrigger>
            <TabsTrigger value="notifications">Notifications</TabsTrigger>
          </TabsList>
          <Button onClick={handleSaveSettings} disabled={isLoading}>
            {isLoading ? (
              "Saving..."
            ) : (
              <>
                <Save className="mr-2 h-4 w-4" /> Save Settings
              </>
            )}
          </Button>
        </div>

        <TabsContent value="general" className="space-y-4 mt-4">
          <Card>
            <CardHeader>
              <CardTitle>General Settings</CardTitle>
              <CardDescription>Manage your dormitory management settings</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="department-name">Department Name</Label>
                <Input id="department-name" defaultValue="Dormitory Management Office" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="office-location">Office Location</Label>
                <Input id="office-location" defaultValue="Building A, Ground Floor" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="operating-hours">Office Hours</Label>
                <Select defaultValue="business">
                  <SelectTrigger id="operating-hours">
                    <SelectValue placeholder="Select operating hours" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="24-7">24/7 Operation</SelectItem>
                    <SelectItem value="business">Business Hours (8AM-6PM)</SelectItem>
                    <SelectItem value="extended">Extended Hours (7AM-9PM)</SelectItem>
                    <SelectItem value="custom">Custom Hours</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="contact-email">Contact Email</Label>
                <Input id="contact-email" type="email" defaultValue="dormitory@university.edu" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="contact-phone">Contact Phone</Label>
                <Input id="contact-phone" defaultValue="(555) 123-4567" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>System Preferences</CardTitle>
              <CardDescription>Configure system behavior</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="auto-assign">Automatic Room Assignment</Label>
                  <p className="text-sm text-muted-foreground">Automatically assign rooms to new residents</p>
                </div>
                <Switch id="auto-assign" />
              </div>
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="maintenance-alerts">Maintenance Alerts</Label>
                  <p className="text-sm text-muted-foreground">Receive alerts for maintenance requests</p>
                </div>
                <Switch id="maintenance-alerts" defaultChecked />
              </div>
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="auto-log">Automatic Logging</Label>
                  <p className="text-sm text-muted-foreground">Automatically log all key transactions</p>
                </div>
                <Switch id="auto-log" defaultChecked />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="keys" className="space-y-4 mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Key Management Settings</CardTitle>
              <CardDescription>Configure key issuance and return policies</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="key-policy">Key Issuance Policy</Label>
                <Select defaultValue="id-verification">
                  <SelectTrigger id="key-policy">
                    <SelectValue placeholder="Select policy" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="id-verification">ID Verification Required</SelectItem>
                    <SelectItem value="deposit">Deposit Required</SelectItem>
                    <SelectItem value="both">Both ID and Deposit Required</SelectItem>
                    <SelectItem value="none">No Verification Required</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="key-deposit">Key Deposit Amount</Label>
                <Input id="key-deposit" type="number" defaultValue="50" />
                <p className="text-sm text-muted-foreground">Amount in dollars required as deposit for keys</p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="key-replacement-fee">Key Replacement Fee</Label>
                <Input id="key-replacement-fee" type="number" defaultValue="75" />
                <p className="text-sm text-muted-foreground">Fee charged for lost or damaged keys</p>
              </div>

              <div className="space-y-2">
                <Label>Key Return Policy</Label>
                <RadioGroup defaultValue="end-of-term">
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="end-of-term" id="end-of-term" />
                    <Label htmlFor="end-of-term">End of Term Only</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="anytime" id="anytime" />
                    <Label htmlFor="anytime">Anytime During Office Hours</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="scheduled" id="scheduled" />
                    <Label htmlFor="scheduled">By Scheduled Appointment Only</Label>
                  </div>
                </RadioGroup>
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Require Key Return Inspection</Label>
                  <p className="text-sm text-muted-foreground">Inspect rooms before accepting key returns</p>
                </div>
                <Switch defaultChecked />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="complaints" className="space-y-4 mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Complaint Management Settings</CardTitle>
              <CardDescription>Configure how complaints are handled and processed</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="complaint-categories">Default Complaint Categories</Label>
                <Textarea
                  id="complaint-categories"
                  defaultValue="Noise Disturbance, Cleanliness Issue, Property Damage, Behavioral Issue, Unauthorized Guest, Other"
                />
                <p className="text-sm text-muted-foreground">Comma-separated list of complaint categories</p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="complaint-response">Default Response Time</Label>
                <Select defaultValue="24">
                  <SelectTrigger id="complaint-response">
                    <SelectValue placeholder="Select response time" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="4">4 Hours</SelectItem>
                    <SelectItem value="8">8 Hours</SelectItem>
                    <SelectItem value="24">24 Hours</SelectItem>
                    <SelectItem value="48">48 Hours</SelectItem>
                    <SelectItem value="72">72 Hours</SelectItem>
                  </SelectContent>
                </Select>
                <p className="text-sm text-muted-foreground">Target time to respond to new complaints</p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="complaint-escalation">Automatic Escalation</Label>
                <Select defaultValue="48">
                  <SelectTrigger id="complaint-escalation">
                    <SelectValue placeholder="Select escalation time" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="never">Never</SelectItem>
                    <SelectItem value="24">After 24 Hours</SelectItem>
                    <SelectItem value="48">After 48 Hours</SelectItem>
                    <SelectItem value="72">After 72 Hours</SelectItem>
                  </SelectContent>
                </Select>
                <p className="text-sm text-muted-foreground">
                  When to automatically escalate unresolved complaints to management
                </p>
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Require Documentation</Label>
                  <p className="text-sm text-muted-foreground">
                    Require photo or document evidence for certain complaints
                  </p>
                </div>
                <Switch defaultChecked />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Anonymous Complaints</Label>
                  <p className="text-sm text-muted-foreground">Allow residents to file anonymous complaints</p>
                </div>
                <Switch />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="notifications" className="space-y-4 mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Notification Settings</CardTitle>
              <CardDescription>Configure how you receive notifications</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>New Complaints</Label>
                  <p className="text-sm text-muted-foreground">Notify when new complaints are filed</p>
                </div>
                <Switch defaultChecked />
              </div>
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Key Transactions</Label>
                  <p className="text-sm text-muted-foreground">Notify for key issuance and returns</p>
                </div>
                <Switch defaultChecked />
              </div>
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Maintenance Requests</Label>
                  <p className="text-sm text-muted-foreground">Notify for new maintenance requests</p>
                </div>
                <Switch defaultChecked />
              </div>
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Room Changes</Label>
                  <p className="text-sm text-muted-foreground">Notify when room assignments change</p>
                </div>
                <Switch />
              </div>

              <div className="space-y-2 pt-4">
                <Label>Notification Method</Label>
                <RadioGroup defaultValue="both">
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="app" id="app-only" />
                    <Label htmlFor="app-only">In-App Only</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="email" id="email-only" />
                    <Label htmlFor="email-only">Email Only</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="both" id="both-methods" />
                    <Label htmlFor="both-methods">Both In-App and Email</Label>
                  </div>
                </RadioGroup>
              </div>

              <div className="space-y-2 pt-4">
                <Label htmlFor="notification-email">Email for Notifications</Label>
                <Input id="notification-email" type="email" defaultValue="dormitory@university.edu" />
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </DashboardLayout>
  )
}
