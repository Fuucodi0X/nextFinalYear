"use client"

import { useState } from "react"
import { Home, MessageSquare, Settings, Users } from "lucide-react"

import { DashboardLayout } from "@/components/dashboard-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Switch } from "@/components/ui/switch"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"

const navItems = [
  { href: "/dashboard/complaints", label: "Dashboard", icon: Home },
  { href: "/dashboard/complaints/users", label: "Users", icon: Users },
  { href: "/dashboard/complaints/history", label: "History", icon: MessageSquare },
  { href: "/dashboard/complaints/settings", label: "Settings", icon: Settings },
]

export default function ComplaintsSettingsPage() {
  const [autoNotify, setAutoNotify] = useState(true)
  const [emailNotifications, setEmailNotifications] = useState(true)
  const [warningThreshold, setWarningThreshold] = useState("3")
  const [suspensionThreshold, setSuspensionThreshold] = useState("5")
  const [defaultWarningTemplate, setDefaultWarningTemplate] = useState(
    "This is an official warning regarding your recent behavior. Please be advised that continued violations may result in further disciplinary action.",
  )

  return (
    <DashboardLayout navItems={navItems} title="Complaints Settings" icon={Settings} showBackButton={true}>
      <Tabs defaultValue="general" className="space-y-4">
        <TabsList>
          <TabsTrigger value="general">General</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
          <TabsTrigger value="templates">Templates</TabsTrigger>
          <TabsTrigger value="thresholds">Thresholds</TabsTrigger>
        </TabsList>

        <TabsContent value="general" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>General Settings</CardTitle>
              <CardDescription>Configure general complaint management settings</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="department-name">Department Name</Label>
                <Input id="department-name" defaultValue="Student Conduct Office" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="officer-email">Officer Email</Label>
                <Input id="officer-email" type="email" defaultValue="conduct@university.edu" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="appeal-email">Appeals Email</Label>
                <Input id="appeal-email" type="email" defaultValue="appeals@university.edu" />
              </div>
              <div className="flex items-center justify-between space-x-2">
                <Label htmlFor="auto-notify" className="flex flex-col space-y-1">
                  <span>Automatic Notifications</span>
                  <span className="font-normal text-sm text-muted-foreground">
                    Automatically notify students when complaints are filed
                  </span>
                </Label>
                <Switch id="auto-notify" checked={autoNotify} onCheckedChange={setAutoNotify} />
              </div>
              <div className="flex items-center justify-between space-x-2">
                <Label htmlFor="email-notifications" className="flex flex-col space-y-1">
                  <span>Email Notifications</span>
                  <span className="font-normal text-sm text-muted-foreground">
                    Send email notifications for warnings and suspensions
                  </span>
                </Label>
                <Switch id="email-notifications" checked={emailNotifications} onCheckedChange={setEmailNotifications} />
              </div>
              <Button>Save Changes</Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="notifications" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Notification Settings</CardTitle>
              <CardDescription>Configure how notifications are sent</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="notification-method">Primary Notification Method</Label>
                <Select defaultValue="email">
                  <SelectTrigger id="notification-method">
                    <SelectValue placeholder="Select method" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="email">Email</SelectItem>
                    <SelectItem value="sms">SMS</SelectItem>
                    <SelectItem value="both">Both Email and SMS</SelectItem>
                    <SelectItem value="system">System Notification Only</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="cc-department">CC Department Heads</Label>
                <Select defaultValue="warnings-suspensions">
                  <SelectTrigger id="cc-department">
                    <SelectValue placeholder="Select when to CC" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Complaints</SelectItem>
                    <SelectItem value="warnings-suspensions">Warnings & Suspensions Only</SelectItem>
                    <SelectItem value="suspensions">Suspensions Only</SelectItem>
                    <SelectItem value="never">Never</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex items-center justify-between space-x-2">
                <Label htmlFor="notify-parents" className="flex flex-col space-y-1">
                  <span>Notify Parents/Guardians</span>
                  <span className="font-normal text-sm text-muted-foreground">
                    For students under 21, notify parents for serious violations
                  </span>
                </Label>
                <Switch id="notify-parents" defaultChecked />
              </div>
              <div className="flex items-center justify-between space-x-2">
                <Label htmlFor="notify-faculty" className="flex flex-col space-y-1">
                  <span>Notify Faculty</span>
                  <span className="font-normal text-sm text-muted-foreground">
                    Notify relevant faculty for academic-related violations
                  </span>
                </Label>
                <Switch id="notify-faculty" defaultChecked />
              </div>
              <Button>Save Notification Settings</Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="templates" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Message Templates</CardTitle>
              <CardDescription>Configure templates for warnings and suspensions</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="warning-template">Default Warning Template</Label>
                <Textarea
                  id="warning-template"
                  value={defaultWarningTemplate}
                  onChange={(e) => setDefaultWarningTemplate(e.target.value)}
                  className="min-h-[100px]"
                />
                <p className="text-xs text-muted-foreground">
                  Available variables: {"{student_name}"}, {"{violation_type}"}, {"{date}"}, {"{department}"}
                </p>
              </div>
              <div className="space-y-2">
                <Label htmlFor="suspension-template">Default Suspension Template</Label>
                <Textarea
                  id="suspension-template"
                  defaultValue="This notice is to inform you that due to repeated violations of university policy, your access privileges have been suspended for {duration} days, effective immediately."
                  className="min-h-[100px]"
                />
                <p className="text-xs text-muted-foreground">
                  Available variables: {"{student_name}"}, {"{violation_type}"}, {"{date}"}, {"{duration}"},{" "}
                  {"{appeal_process}"}
                </p>
              </div>
              <div className="space-y-2">
                <Label htmlFor="dismissal-template">Complaint Dismissal Template</Label>
                <Textarea
                  id="dismissal-template"
                  defaultValue="After careful review, the complaint filed against you on {date} regarding {violation_type} has been dismissed. No further action is required."
                  className="min-h-[100px]"
                />
              </div>
              <Button>Save Templates</Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="thresholds" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Disciplinary Thresholds</CardTitle>
              <CardDescription>Configure thresholds for automatic disciplinary actions</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="warning-threshold">Warning Threshold</Label>
                <Select value={warningThreshold} onValueChange={setWarningThreshold}>
                  <SelectTrigger id="warning-threshold">
                    <SelectValue placeholder="Select threshold" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1">1 complaint</SelectItem>
                    <SelectItem value="2">2 complaints</SelectItem>
                    <SelectItem value="3">3 complaints</SelectItem>
                    <SelectItem value="5">5 complaints</SelectItem>
                    <SelectItem value="manual">Manual only</SelectItem>
                  </SelectContent>
                </Select>
                <p className="text-xs text-muted-foreground">Number of complaints before automatic warning is issued</p>
              </div>
              <div className="space-y-2">
                <Label htmlFor="suspension-threshold">Suspension Threshold</Label>
                <Select value={suspensionThreshold} onValueChange={setSuspensionThreshold}>
                  <SelectTrigger id="suspension-threshold">
                    <SelectValue placeholder="Select threshold" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="3">3 complaints</SelectItem>
                    <SelectItem value="5">5 complaints</SelectItem>
                    <SelectItem value="7">7 complaints</SelectItem>
                    <SelectItem value="10">10 complaints</SelectItem>
                    <SelectItem value="manual">Manual only</SelectItem>
                  </SelectContent>
                </Select>
                <p className="text-xs text-muted-foreground">
                  Number of complaints before automatic suspension is recommended
                </p>
              </div>
              <div className="space-y-2">
                <Label htmlFor="time-period">Time Period</Label>
                <Select defaultValue="semester">
                  <SelectTrigger id="time-period">
                    <SelectValue placeholder="Select time period" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="month">1 Month</SelectItem>
                    <SelectItem value="semester">1 Semester</SelectItem>
                    <SelectItem value="academic-year">Academic Year</SelectItem>
                    <SelectItem value="all-time">All Time</SelectItem>
                  </SelectContent>
                </Select>
                <p className="text-xs text-muted-foreground">Time period to consider for threshold calculations</p>
              </div>
              <div className="flex items-center justify-between space-x-2">
                <Label htmlFor="auto-escalate" className="flex flex-col space-y-1">
                  <span>Automatic Escalation</span>
                  <span className="font-normal text-sm text-muted-foreground">
                    Automatically escalate after thresholds are reached
                  </span>
                </Label>
                <Switch id="auto-escalate" defaultChecked />
              </div>
              <Button>Save Threshold Settings</Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </DashboardLayout>
  )
}
