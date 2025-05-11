import type { Metadata } from "next"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Separator } from "@/components/ui/separator"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
// import { TimePicker } from "@/components/ui/time-picker"

export const metadata: Metadata = {
  title: "Settings | Cafe Dashboard",
  description: "Manage cafe system settings",
}

export default function SettingsPage() {
  return (
    <div className="flex-1 space-y-4 p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">Settings</h2>
        <div className="flex items-center space-x-2">
          <Button variant="outline">Cancel</Button>
          <Button>Save Changes</Button>
        </div>
      </div>
      <Tabs defaultValue="general" className="space-y-4">
        <TabsList>
          <TabsTrigger value="general">General</TabsTrigger>
          <TabsTrigger value="meal-plans">Meal Plans</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
          <TabsTrigger value="security">Security</TabsTrigger>
        </TabsList>
        <TabsContent value="general" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>General Information</CardTitle>
              <CardDescription>Configure general settings for the cafe system</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="cafeName">Cafe Name</Label>
                  <Input id="cafeName" defaultValue="Campus Dining Hall" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="location">Location</Label>
                  <Input id="location" defaultValue="Main Campus, Building C" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="managerEmail">Manager Email</Label>
                  <Input id="managerEmail" defaultValue="cafe.manager@example.edu" type="email" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="contactPhone">Contact Phone</Label>
                  <Input id="contactPhone" defaultValue="(555) 123-4567" />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  defaultValue="The Campus Dining Hall provides nutritious meals to students and staff. We offer a variety of meal plans to accommodate different dietary needs and preferences."
                />
              </div>
            </CardContent>
            <CardFooter className="border-t px-6 py-4">
              <Button>Save General Settings</Button>
            </CardFooter>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Operating Hours</CardTitle>
              <CardDescription>Set the operating hours for different meal periods</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
                <div className="space-y-4">
                  <div className="font-medium">Breakfast</div>
                  <div className="grid grid-cols-2 gap-2">
                    <div className="space-y-2">
                      <Label htmlFor="breakfastStart">Start Time</Label>
                      {/* <TimePicker defaultValue="07:00" id="breakfastStart" /> */}
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="breakfastEnd">End Time</Label>
                      {/* <TimePicker defaultValue="10:00" id="breakfastEnd" /> */}
                    </div>
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="font-medium">Lunch</div>
                  <div className="grid grid-cols-2 gap-2">
                    <div className="space-y-2">
                      <Label htmlFor="lunchStart">Start Time</Label>
                      {/* <TimePicker defaultValue="11:30" id="lunchStart" /> */}
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="lunchEnd">End Time</Label>
                      {/* <TimePicker defaultValue="14:00" id="lunchEnd" /> */}
                    </div>
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="font-medium">Dinner</div>
                  <div className="grid grid-cols-2 gap-2">
                    <div className="space-y-2">
                      <Label htmlFor="dinnerStart">Start Time</Label>
                      {/* <TimePicker defaultValue="17:30" id="dinnerStart" /> */}
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="dinnerEnd">End Time</Label>
                      {/* <TimePicker defaultValue="20:00" id="dinnerEnd" /> */}
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter className="border-t px-6 py-4">
              <Button>Save Operating Hours</Button>
            </CardFooter>
          </Card>
        </TabsContent>
        <TabsContent value="meal-plans" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Meal Plan Configuration</CardTitle>
              <CardDescription>Configure available meal plans and pricing</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-4">
                <div className="rounded-md border p-4">
                  <div className="font-medium">Standard Plan</div>
                  <div className="mt-1 text-sm text-muted-foreground">
                    Regular meal plan with no dietary restrictions
                  </div>
                  <div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-3">
                    <div className="space-y-2">
                      <Label htmlFor="standardPrice">Price (per semester)</Label>
                      <Input id="standardPrice" defaultValue="1200.00" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="standardMealsPerWeek">Meals per week</Label>
                      <Input id="standardMealsPerWeek" defaultValue="21" type="number" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="standardStatus">Status</Label>
                      <Select defaultValue="active">
                        <SelectTrigger id="standardStatus">
                          <SelectValue placeholder="Select status" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="active">Active</SelectItem>
                          <SelectItem value="inactive">Inactive</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>
                <div className="rounded-md border p-4">
                  <div className="font-medium">Vegetarian Plan</div>
                  <div className="mt-1 text-sm text-muted-foreground">Meal plan with vegetarian options only</div>
                  <div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-3">
                    <div className="space-y-2">
                      <Label htmlFor="vegetarianPrice">Price (per semester)</Label>
                      <Input id="vegetarianPrice" defaultValue="1250.00" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="vegetarianMealsPerWeek">Meals per week</Label>
                      <Input id="vegetarianMealsPerWeek" defaultValue="21" type="number" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="vegetarianStatus">Status</Label>
                      <Select defaultValue="active">
                        <SelectTrigger id="vegetarianStatus">
                          <SelectValue placeholder="Select status" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="active">Active</SelectItem>
                          <SelectItem value="inactive">Inactive</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>
                <div className="rounded-md border p-4">
                  <div className="font-medium">Special Dietary Plans</div>
                  <div className="mt-1 text-sm text-muted-foreground">
                    Meal plans for special dietary requirements (gluten-free, vegan, etc.)
                  </div>
                  <div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-3">
                    <div className="space-y-2">
                      <Label htmlFor="specialPrice">Price (per semester)</Label>
                      <Input id="specialPrice" defaultValue="1300.00" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="specialMealsPerWeek">Meals per week</Label>
                      <Input id="specialMealsPerWeek" defaultValue="21" type="number" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="specialStatus">Status</Label>
                      <Select defaultValue="active">
                        <SelectTrigger id="specialStatus">
                          <SelectValue placeholder="Select status" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="active">Active</SelectItem>
                          <SelectItem value="inactive">Inactive</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter className="border-t px-6 py-4">
              <Button>Save Meal Plan Settings</Button>
            </CardFooter>
          </Card>
        </TabsContent>
        <TabsContent value="notifications" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Notification Settings</CardTitle>
              <CardDescription>Configure how and when notifications are sent</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <h3 className="text-lg font-medium">Email Notifications</h3>
                <Separator />
                <div className="flex items-center justify-between space-y-0">
                  <div className="space-y-0.5">
                    <Label className="text-base">Low Balance Alerts</Label>
                    <div className="text-sm text-muted-foreground">
                      Send email when user balance falls below threshold
                    </div>
                  </div>
                  <Switch defaultChecked />
                </div>
                <div className="flex items-center justify-between space-y-0">
                  <div className="space-y-0.5">
                    <Label className="text-base">Meal Plan Expiry</Label>
                    <div className="text-sm text-muted-foreground">Send email when meal plan is about to expire</div>
                  </div>
                  <Switch defaultChecked />
                </div>
                <div className="flex items-center justify-between space-y-0">
                  <div className="space-y-0.5">
                    <Label className="text-base">Special Menu Alerts</Label>
                    <div className="text-sm text-muted-foreground">Send email about special menu items</div>
                  </div>
                  <Switch />
                </div>
              </div>
              <div className="space-y-4">
                <h3 className="text-lg font-medium">System Notifications</h3>
                <Separator />
                <div className="flex items-center justify-between space-y-0">
                  <div className="space-y-0.5">
                    <Label className="text-base">Daily Reports</Label>
                    <div className="text-sm text-muted-foreground">Generate daily meal service reports</div>
                  </div>
                  <Switch defaultChecked />
                </div>
                <div className="flex items-center justify-between space-y-0">
                  <div className="space-y-0.5">
                    <Label className="text-base">Inventory Alerts</Label>
                    <div className="text-sm text-muted-foreground">Alert when inventory items are running low</div>
                  </div>
                  <Switch defaultChecked />
                </div>
                <div className="flex items-center justify-between space-y-0">
                  <div className="space-y-0.5">
                    <Label className="text-base">User Registration</Label>
                    <div className="text-sm text-muted-foreground">Notify when new users register</div>
                  </div>
                  <Switch />
                </div>
              </div>
            </CardContent>
            <CardFooter className="border-t px-6 py-4">
              <Button>Save Notification Settings</Button>
            </CardFooter>
          </Card>
        </TabsContent>
        <TabsContent value="security" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Security Settings</CardTitle>
              <CardDescription>Configure security and access control settings</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <h3 className="text-lg font-medium">Access Control</h3>
                <Separator />
                <div className="flex items-center justify-between space-y-0">
                  <div className="space-y-0.5">
                    <Label className="text-base">Require Card for Entry</Label>
                    <div className="text-sm text-muted-foreground">
                      Users must scan their card to enter the dining hall
                    </div>
                  </div>
                  <Switch defaultChecked />
                </div>
                <div className="flex items-center justify-between space-y-0">
                  <div className="space-y-0.5">
                    <Label className="text-base">Verify Student ID</Label>
                    <div className="text-sm text-muted-foreground">
                      Require additional ID verification for meal redemption
                    </div>
                  </div>
                  <Switch />
                </div>
                <div className="flex items-center justify-between space-y-0">
                  <div className="space-y-0.5">
                    <Label className="text-base">Guest Access</Label>
                    <div className="text-sm text-muted-foreground">
                      Allow students to bring guests using meal credits
                    </div>
                  </div>
                  <Switch defaultChecked />
                </div>
              </div>
              <div className="space-y-4">
                <h3 className="text-lg font-medium">System Security</h3>
                <Separator />
                <div className="flex items-center justify-between space-y-0">
                  <div className="space-y-0.5">
                    <Label className="text-base">Two-Factor Authentication</Label>
                    <div className="text-sm text-muted-foreground">Require 2FA for staff login</div>
                  </div>
                  <Switch defaultChecked />
                </div>
                <div className="flex items-center justify-between space-y-0">
                  <div className="space-y-0.5">
                    <Label className="text-base">Session Timeout</Label>
                    <div className="text-sm text-muted-foreground">
                      Automatically log out after period of inactivity
                    </div>
                  </div>
                  <Switch defaultChecked />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="timeout">Timeout Period (minutes)</Label>
                  <Input id="timeout" defaultValue="30" type="number" />
                </div>
              </div>
            </CardContent>
            <CardFooter className="border-t px-6 py-4">
              <Button>Save Security Settings</Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
