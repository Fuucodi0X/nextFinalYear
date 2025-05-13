"use client"

import { useState } from "react"
import { Bell, Home, Save, Settings, Shield, Users } from "lucide-react"

import { DashboardLayout } from "@/components/dashboard-layout"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/hooks/use-toast"

const navItems = [
  { href: "/dashboard/security", label: "Dashboard", icon: Home },
  { href: "/dashboard/security/users", label: "Personnel", icon: Users },
  { href: "/dashboard/security/settings", label: "Settings", icon: Settings },
]

export default function SecuritySettingsPage() {
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
    <DashboardLayout navItems={navItems} title="Security Settings" icon={Settings} showBackButton={true}>
      <Tabs defaultValue="general">
        <div className="flex items-center justify-between">
          <TabsList>
            <TabsTrigger value="general">General</TabsTrigger>
            <TabsTrigger value="notifications">Notifications</TabsTrigger>
            <TabsTrigger value="security">Security</TabsTrigger>
            <TabsTrigger value="gates">Gate Configuration</TabsTrigger>
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
              <CardDescription>Manage your general security gate settings</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="gate-name">Security Gate Name</Label>
                <Input id="gate-name" defaultValue="Main Security Gate" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="location">Location</Label>
                <Input id="location" defaultValue="Building A, Main Entrance" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="operating-hours">Operating Hours</Label>
                <Select defaultValue="24-7">
                  <SelectTrigger id="operating-hours">
                    <SelectValue placeholder="Select operating hours" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="24-7">24/7 Operation</SelectItem>
                    <SelectItem value="business">Business Hours (8AM-6PM)</SelectItem>
                    <SelectItem value="extended">Extended Hours (6AM-10PM)</SelectItem>
                    <SelectItem value="custom">Custom Hours</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  defaultValue="Main security gate for Building A. Handles all personnel entry and exit."
                />
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
                  <Label htmlFor="auto-scan">Automatic Scanning</Label>
                  <p className="text-sm text-muted-foreground">Automatically scan cards when detected</p>
                </div>
                <Switch id="auto-scan" defaultChecked />
              </div>
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="sound-alerts">Sound Alerts</Label>
                  <p className="text-sm text-muted-foreground">Play sound alerts for scan events</p>
                </div>
                <Switch id="sound-alerts" defaultChecked />
              </div>
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="auto-log">Automatic Logging</Label>
                  <p className="text-sm text-muted-foreground">Automatically log all scan events</p>
                </div>
                <Switch id="auto-log" defaultChecked />
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
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Unauthorized Access Attempts</Label>
                    <p className="text-sm text-muted-foreground">Notify when unauthorized access is attempted</p>
                  </div>
                  <Switch defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Denied Entries</Label>
                    <p className="text-sm text-muted-foreground">Notify when entry is denied</p>
                  </div>
                  <Switch defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>System Alerts</Label>
                    <p className="text-sm text-muted-foreground">Notify for system-level alerts</p>
                  </div>
                  <Switch defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Daily Reports</Label>
                    <p className="text-sm text-muted-foreground">Receive daily activity reports</p>
                  </div>
                  <Switch />
                </div>
              </div>

              <div className="space-y-2 pt-4">
                <Label>Notification Method</Label>
                <RadioGroup defaultValue="both">
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="app" id="app" />
                    <Label htmlFor="app">In-App Only</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="email" id="email" />
                    <Label htmlFor="email">Email Only</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="both" id="both" />
                    <Label htmlFor="both">Both In-App and Email</Label>
                  </div>
                </RadioGroup>
              </div>

              <div className="space-y-2 pt-4">
                <Label htmlFor="email-notifications">Email for Notifications</Label>
                <Input id="email-notifications" type="email" defaultValue="security@example.com" />
              </div>
            </CardContent>
            <CardFooter>
              <Button variant="outline" className="w-full">
                <Bell className="mr-2 h-4 w-4" />
                Test Notification
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="security" className="space-y-4 mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Security Settings</CardTitle>
              <CardDescription>Configure security options for the gate system</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="security-level">Security Level</Label>
                <Select defaultValue="medium">
                  <SelectTrigger id="security-level">
                    <SelectValue placeholder="Select security level" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="low">Low - Basic ID Verification</SelectItem>
                    <SelectItem value="medium">Medium - ID + Visual Verification</SelectItem>
                    <SelectItem value="high">High - ID + Biometric Verification</SelectItem>
                    <SelectItem value="maximum">Maximum - Multi-factor Authentication</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="lockdown-mode">Lockdown Mode</Label>
                <Select defaultValue="disabled">
                  <SelectTrigger id="lockdown-mode">
                    <SelectValue placeholder="Select lockdown mode" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="disabled">Disabled</SelectItem>
                    <SelectItem value="manual">Manual Activation Only</SelectItem>
                    <SelectItem value="auto">Automatic on Security Breach</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Require Photo Verification</Label>
                  <p className="text-sm text-muted-foreground">Match person with ID photo before entry</p>
                </div>
                <Switch defaultChecked />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Log Failed Access Attempts</Label>
                  <p className="text-sm text-muted-foreground">Record all failed access attempts</p>
                </div>
                <Switch defaultChecked />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Automatic Lockout</Label>
                  <p className="text-sm text-muted-foreground">Temporarily lock cards after multiple failed attempts</p>
                </div>
                <Switch defaultChecked />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="gates" className="space-y-4 mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Gate Configuration</CardTitle>
              <CardDescription>Configure security gates and access points</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label>Gate 1 (Main Entrance)</Label>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="gate1-mode">Operation Mode</Label>
                    <Select defaultValue="both">
                      <SelectTrigger id="gate1-mode">
                        <SelectValue placeholder="Select mode" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="entry">Entry Only</SelectItem>
                        <SelectItem value="exit">Exit Only</SelectItem>
                        <SelectItem value="both">Entry and Exit</SelectItem>
                        <SelectItem value="disabled">Disabled</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="gate1-access">Access Level</Label>
                    <Select defaultValue="all">
                      <SelectTrigger id="gate1-access">
                        <SelectValue placeholder="Select access level" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Personnel</SelectItem>
                        <SelectItem value="staff">Staff Only</SelectItem>
                        <SelectItem value="restricted">Restricted Access</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="flex items-center justify-between mt-2">
                  <div className="space-y-0.5">
                    <Label>Gate Active</Label>
                  </div>
                  <Switch defaultChecked />
                </div>
              </div>

              <div className="space-y-2 pt-4">
                <Label>Gate 2 (Side Entrance)</Label>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="gate2-mode">Operation Mode</Label>
                    <Select defaultValue="entry">
                      <SelectTrigger id="gate2-mode">
                        <SelectValue placeholder="Select mode" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="entry">Entry Only</SelectItem>
                        <SelectItem value="exit">Exit Only</SelectItem>
                        <SelectItem value="both">Entry and Exit</SelectItem>
                        <SelectItem value="disabled">Disabled</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="gate2-access">Access Level</Label>
                    <Select defaultValue="staff">
                      <SelectTrigger id="gate2-access">
                        <SelectValue placeholder="Select access level" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Personnel</SelectItem>
                        <SelectItem value="staff">Staff Only</SelectItem>
                        <SelectItem value="restricted">Restricted Access</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="flex items-center justify-between mt-2">
                  <div className="space-y-0.5">
                    <Label>Gate Active</Label>
                  </div>
                  <Switch defaultChecked />
                </div>
              </div>

              <div className="space-y-2 pt-4">
                <Label>Gate 3 (Loading Dock)</Label>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="gate3-mode">Operation Mode</Label>
                    <Select defaultValue="both">
                      <SelectTrigger id="gate3-mode">
                        <SelectValue placeholder="Select mode" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="entry">Entry Only</SelectItem>
                        <SelectItem value="exit">Exit Only</SelectItem>
                        <SelectItem value="both">Entry and Exit</SelectItem>
                        <SelectItem value="disabled">Disabled</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="gate3-access">Access Level</Label>
                    <Select defaultValue="restricted">
                      <SelectTrigger id="gate3-access">
                        <SelectValue placeholder="Select access level" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Personnel</SelectItem>
                        <SelectItem value="staff">Staff Only</SelectItem>
                        <SelectItem value="restricted">Restricted Access</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="flex items-center justify-between mt-2">
                  <div className="space-y-0.5">
                    <Label>Gate Active</Label>
                  </div>
                  <Switch />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </DashboardLayout>
  )
}
