"use client"

import { useState } from "react"
import { BookOpen, CreditCard, Home, Settings, User, Users } from "lucide-react"

import { DashboardLayout } from "@/components/dashboard-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Switch } from "@/components/ui/switch"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

const navItems = [
  { href: "/dashboard/admin", label: "Dashboard", icon: Home },
  // { href: "/dashboard/admin/users", label: "Users", icon: Users },
  { href: "/dashboard/admin/cards", label: "Cards", icon: CreditCard },
  { href: "/dashboard/admin/courses", label: "Courses", icon: BookOpen },
  { href: "/dashboard/admin/settings", label: "Settings", icon: Settings },
]

export default function AdminSettingsPage() {
  const [emailNotifications, setEmailNotifications] = useState(true)
  const [smsNotifications, setSmsNotifications] = useState(false)
  const [pushNotifications, setPushNotifications] = useState(true)
  const [twoFactorAuth, setTwoFactorAuth] = useState(false)
  const [sessionTimeout, setSessionTimeout] = useState("30")
  const [defaultRole, setDefaultRole] = useState("student")

  return (
    <DashboardLayout navItems={navItems} title="Admin Settings" icon={Settings} showBackButton={true}>
      <Tabs defaultValue="general" className="space-y-4">
        <TabsList>
          <TabsTrigger value="general">General</TabsTrigger>
          <TabsTrigger value="security">Security</TabsTrigger>
          <TabsTrigger value="roles">Roles</TabsTrigger>
          <TabsTrigger value="integrations">Integrations</TabsTrigger>
        </TabsList>

        <TabsContent value="general" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>General Settings</CardTitle>
              <CardDescription>Manage your general system settings</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="system-name">System Name</Label>
                <Input id="system-name" defaultValue="SecureGate NFC System" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="admin-email">Admin Email</Label>
                <Input id="admin-email" type="email" defaultValue="admin@securitysystem.com" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="timezone">Timezone</Label>
                <Select defaultValue="utc">
                  <SelectTrigger id="timezone">
                    <SelectValue placeholder="Select timezone" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="utc">UTC</SelectItem>
                    <SelectItem value="est">Eastern Standard Time (EST)</SelectItem>
                    <SelectItem value="cst">Central Standard Time (CST)</SelectItem>
                    <SelectItem value="mst">Mountain Standard Time (MST)</SelectItem>
                    <SelectItem value="pst">Pacific Standard Time (PST)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex items-center justify-between space-x-2">
                <Label htmlFor="email-notifications" className="flex flex-col space-y-1">
                  <span>Email Notifications</span>
                  <span className="font-normal text-sm text-muted-foreground">
                    Receive email notifications for important events
                  </span>
                </Label>
                <Switch id="email-notifications" checked={emailNotifications} onCheckedChange={setEmailNotifications} />
              </div>
              <div className="flex items-center justify-between space-x-2">
                <Label htmlFor="sms-notifications" className="flex flex-col space-y-1">
                  <span>SMS Notifications</span>
                  <span className="font-normal text-sm text-muted-foreground">
                    Receive SMS notifications for critical alerts
                  </span>
                </Label>
                <Switch id="sms-notifications" checked={smsNotifications} onCheckedChange={setSmsNotifications} />
              </div>
              <div className="flex items-center justify-between space-x-2">
                <Label htmlFor="push-notifications" className="flex flex-col space-y-1">
                  <span>Push Notifications</span>
                  <span className="font-normal text-sm text-muted-foreground">
                    Receive push notifications on your devices
                  </span>
                </Label>
                <Switch id="push-notifications" checked={pushNotifications} onCheckedChange={setPushNotifications} />
              </div>
              <Button>Save Changes</Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="security" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Security Settings</CardTitle>
              <CardDescription>Configure security settings for the system</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between space-x-2">
                <Label htmlFor="two-factor" className="flex flex-col space-y-1">
                  <span>Two-Factor Authentication</span>
                  <span className="font-normal text-sm text-muted-foreground">
                    Require two-factor authentication for all admin users
                  </span>
                </Label>
                <Switch id="two-factor" checked={twoFactorAuth} onCheckedChange={setTwoFactorAuth} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="session-timeout">Session Timeout (minutes)</Label>
                <Select value={sessionTimeout} onValueChange={setSessionTimeout}>
                  <SelectTrigger id="session-timeout">
                    <SelectValue placeholder="Select timeout" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="15">15 minutes</SelectItem>
                    <SelectItem value="30">30 minutes</SelectItem>
                    <SelectItem value="60">1 hour</SelectItem>
                    <SelectItem value="120">2 hours</SelectItem>
                    <SelectItem value="240">4 hours</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="password-policy">Password Policy</Label>
                <Select defaultValue="strong">
                  <SelectTrigger id="password-policy">
                    <SelectValue placeholder="Select policy" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="basic">Basic (8+ characters)</SelectItem>
                    <SelectItem value="medium">Medium (8+ chars, 1 number, 1 uppercase)</SelectItem>
                    <SelectItem value="strong">Strong (8+ chars, number, uppercase, special)</SelectItem>
                    <SelectItem value="very-strong">Very Strong (12+ chars, 2+ numbers, uppercase, special)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="login-attempts">Max Failed Login Attempts</Label>
                <Select defaultValue="5">
                  <SelectTrigger id="login-attempts">
                    <SelectValue placeholder="Select max attempts" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="3">3 attempts</SelectItem>
                    <SelectItem value="5">5 attempts</SelectItem>
                    <SelectItem value="10">10 attempts</SelectItem>
                    <SelectItem value="unlimited">Unlimited</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <Button>Save Security Settings</Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="roles" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Role Management</CardTitle>
              <CardDescription>Configure user roles and permissions</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="default-role">Default Role for New Users</Label>
                <Select value={defaultRole} onValueChange={setDefaultRole}>
                  <SelectTrigger id="default-role">
                    <SelectValue placeholder="Select default role" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="student">Student</SelectItem>
                    <SelectItem value="faculty">Faculty</SelectItem>
                    <SelectItem value="staff">Staff</SelectItem>
                    <SelectItem value="guest">Guest</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>Role Permissions</Label>
                <div className="space-y-4">
                  <Card>
                    <CardHeader className="py-4">
                      <CardTitle className="text-base">Admin</CardTitle>
                    </CardHeader>
                    <CardContent className="py-2">
                      <div className="flex items-center justify-between">
                        <span className="text-sm">Full system access</span>
                        <Switch defaultChecked disabled />
                      </div>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardHeader className="py-4">
                      <CardTitle className="text-base">Security Officer</CardTitle>
                    </CardHeader>
                    <CardContent className="py-2 space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-sm">View security dashboard</span>
                        <Switch defaultChecked />
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm">Manage access points</span>
                        <Switch defaultChecked />
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm">View user details</span>
                        <Switch defaultChecked />
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm">Modify user access</span>
                        <Switch defaultChecked />
                      </div>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardHeader className="py-4">
                      <CardTitle className="text-base">Complaint Officer</CardTitle>
                    </CardHeader>
                    <CardContent className="py-2 space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-sm">View complaints dashboard</span>
                        <Switch defaultChecked />
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm">Process complaints</span>
                        <Switch defaultChecked />
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm">Issue warnings</span>
                        <Switch defaultChecked />
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm">Issue suspensions</span>
                        <Switch defaultChecked />
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
              <Button>Save Role Settings</Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="integrations" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>System Integrations</CardTitle>
              <CardDescription>Configure integrations with other systems</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-4">
                <Card>
                  <CardHeader className="py-4">
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-base">Student Information System</CardTitle>
                      <Switch defaultChecked />
                    </div>
                    <CardDescription>Connect to the university student database</CardDescription>
                  </CardHeader>
                  <CardContent className="py-2 space-y-2">
                    <div className="space-y-2">
                      <Label htmlFor="sis-api-url">API URL</Label>
                      <Input id="sis-api-url" defaultValue="https://api.university.edu/sis/v1" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="sis-api-key">API Key</Label>
                      <Input id="sis-api-key" type="password" defaultValue="••••••••••••••••" />
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Sync user data automatically</span>
                      <Switch defaultChecked />
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="py-4">
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-base">Email Notification Service</CardTitle>
                      <Switch defaultChecked />
                    </div>
                    <CardDescription>Configure email notification settings</CardDescription>
                  </CardHeader>
                  <CardContent className="py-2 space-y-2">
                    <div className="space-y-2">
                      <Label htmlFor="smtp-server">SMTP Server</Label>
                      <Input id="smtp-server" defaultValue="smtp.university.edu" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="smtp-port">SMTP Port</Label>
                      <Input id="smtp-port" defaultValue="587" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="smtp-username">Username</Label>
                      <Input id="smtp-username" defaultValue="notifications@university.edu" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="smtp-password">Password</Label>
                      <Input id="smtp-password" type="password" defaultValue="••••••••••••••••" />
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="py-4">
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-base">SMS Gateway</CardTitle>
                      <Switch />
                    </div>
                    <CardDescription>Configure SMS notification settings</CardDescription>
                  </CardHeader>
                  <CardContent className="py-2 space-y-2">
                    <div className="space-y-2">
                      <Label htmlFor="sms-api-url">API URL</Label>
                      <Input id="sms-api-url" defaultValue="" placeholder="https://api.smsgateway.com/v1" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="sms-api-key">API Key</Label>
                      <Input id="sms-api-key" type="password" defaultValue="" placeholder="Enter API key" />
                    </div>
                  </CardContent>
                </Card>
              </div>
              <Button>Save Integration Settings</Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </DashboardLayout>
  )
}
