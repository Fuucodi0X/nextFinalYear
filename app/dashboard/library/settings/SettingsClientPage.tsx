"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Separator } from "@/components/ui/separator"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useToast } from "@/hooks/use-toast"

export default function SettingsClientPage() {
  const { toast } = useToast()
  const [isLoading, setIsLoading] = useState(false)

  const handleSaveSettings = () => {
    setIsLoading(true)

    // Simulate API call
    setTimeout(() => {
      setIsLoading(false)
      toast({
        title: "Settings Saved",
        description: "Your settings have been saved successfully.",
      })
    }, 1000)
  }

  return (
    <div className="flex-1 space-y-4 p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">Library Settings</h2>
        <div className="flex items-center space-x-2">
          <Button variant="outline">Cancel</Button>
          <Button onClick={handleSaveSettings} disabled={isLoading}>
            {isLoading ? "Saving..." : "Save Changes"}
          </Button>
        </div>
      </div>
      <Tabs defaultValue="general" className="space-y-4">
        <TabsList>
          <TabsTrigger value="general">General</TabsTrigger>
          <TabsTrigger value="borrowing">Borrowing Rules</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
          <TabsTrigger value="categories">Categories</TabsTrigger>
        </TabsList>
        <TabsContent value="general" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Library Information</CardTitle>
              <CardDescription>Configure general library settings</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="libraryName">Library Name</Label>
                  <Input id="libraryName" defaultValue="University Central Library" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="location">Location</Label>
                  <Input id="location" defaultValue="Main Campus, Building D" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="librarianEmail">Librarian Email</Label>
                  <Input id="librarianEmail" defaultValue="library@university.edu" type="email" />
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
                  defaultValue="The University Central Library provides access to a wide range of academic resources, books, journals, and digital media to support learning and research across all disciplines."
                />
              </div>
            </CardContent>
            <CardFooter className="border-t px-6 py-4">
              <Button onClick={handleSaveSettings} disabled={isLoading}>
                {isLoading ? "Saving..." : "Save General Settings"}
              </Button>
            </CardFooter>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Operating Hours</CardTitle>
              <CardDescription>Set the operating hours for the library</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                <div className="space-y-4">
                  <div className="font-medium">Weekdays</div>
                  <div className="grid grid-cols-2 gap-2">
                    <div className="space-y-2">
                      <Label htmlFor="weekdayOpen">Opening Time</Label>
                      <Select defaultValue="08:00">
                        <SelectTrigger id="weekdayOpen">
                          <SelectValue placeholder="Select time" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="07:00">7:00 AM</SelectItem>
                          <SelectItem value="08:00">8:00 AM</SelectItem>
                          <SelectItem value="09:00">9:00 AM</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="weekdayClose">Closing Time</Label>
                      <Select defaultValue="22:00">
                        <SelectTrigger id="weekdayClose">
                          <SelectValue placeholder="Select time" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="20:00">8:00 PM</SelectItem>
                          <SelectItem value="21:00">9:00 PM</SelectItem>
                          <SelectItem value="22:00">10:00 PM</SelectItem>
                          <SelectItem value="23:00">11:00 PM</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="font-medium">Weekends</div>
                  <div className="grid grid-cols-2 gap-2">
                    <div className="space-y-2">
                      <Label htmlFor="weekendOpen">Opening Time</Label>
                      <Select defaultValue="10:00">
                        <SelectTrigger id="weekendOpen">
                          <SelectValue placeholder="Select time" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="09:00">9:00 AM</SelectItem>
                          <SelectItem value="10:00">10:00 AM</SelectItem>
                          <SelectItem value="11:00">11:00 AM</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="weekendClose">Closing Time</Label>
                      <Select defaultValue="18:00">
                        <SelectTrigger id="weekendClose">
                          <SelectValue placeholder="Select time" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="16:00">4:00 PM</SelectItem>
                          <SelectItem value="17:00">5:00 PM</SelectItem>
                          <SelectItem value="18:00">6:00 PM</SelectItem>
                          <SelectItem value="19:00">7:00 PM</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter className="border-t px-6 py-4">
              <Button onClick={handleSaveSettings} disabled={isLoading}>
                {isLoading ? "Saving..." : "Save Operating Hours"}
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
        <TabsContent value="borrowing" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Borrowing Rules</CardTitle>
              <CardDescription>Configure book borrowing policies</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <h3 className="text-lg font-medium">Loan Periods</h3>
                <Separator />
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="studentLoanDays">Student Loan Period (days)</Label>
                    <Input id="studentLoanDays" defaultValue="14" type="number" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="facultyLoanDays">Faculty Loan Period (days)</Label>
                    <Input id="facultyLoanDays" defaultValue="30" type="number" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="maxRenewals">Maximum Renewals</Label>
                    <Input id="maxRenewals" defaultValue="2" type="number" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="reservePeriod">Reserve Period (days)</Label>
                    <Input id="reservePeriod" defaultValue="3" type="number" />
                  </div>
                </div>
              </div>
              <div className="space-y-4">
                <h3 className="text-lg font-medium">Borrowing Limits</h3>
                <Separator />
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="studentMaxBooks">Maximum Books (Students)</Label>
                    <Input id="studentMaxBooks" defaultValue="5" type="number" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="facultyMaxBooks">Maximum Books (Faculty)</Label>
                    <Input id="facultyMaxBooks" defaultValue="10" type="number" />
                  </div>
                </div>
              </div>
              <div className="space-y-4">
                <h3 className="text-lg font-medium">Fines & Penalties</h3>
                <Separator />
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="finePerDay">Fine Per Day ($)</Label>
                    <Input id="finePerDay" defaultValue="0.50" type="number" step="0.01" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="maxFine">Maximum Fine ($)</Label>
                    <Input id="maxFine" defaultValue="25.00" type="number" step="0.01" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="gracePeriod">Grace Period (days)</Label>
                    <Input id="gracePeriod" defaultValue="2" type="number" />
                  </div>
                </div>
                <div className="flex items-center justify-between space-y-0">
                  <div className="space-y-0.5">
                    <Label className="text-base">Block Borrowing When Overdue</Label>
                    <div className="text-sm text-muted-foreground">
                      Prevent users with overdue books from borrowing more
                    </div>
                  </div>
                  <Switch defaultChecked />
                </div>
              </div>
            </CardContent>
            <CardFooter className="border-t px-6 py-4">
              <Button onClick={handleSaveSettings} disabled={isLoading}>
                {isLoading ? "Saving..." : "Save Borrowing Rules"}
              </Button>
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
                    <Label className="text-base">Due Date Reminders</Label>
                    <div className="text-sm text-muted-foreground">Send email reminders before books are due</div>
                  </div>
                  <Switch defaultChecked />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="reminderDays">Days Before Due Date</Label>
                  <Input id="reminderDays" defaultValue="3" type="number" />
                </div>
                <div className="flex items-center justify-between space-y-0">
                  <div className="space-y-0.5">
                    <Label className="text-base">Overdue Notifications</Label>
                    <div className="text-sm text-muted-foreground">Send email when books are overdue</div>
                  </div>
                  <Switch defaultChecked />
                </div>
                <div className="flex items-center justify-between space-y-0">
                  <div className="space-y-0.5">
                    <Label className="text-base">Reservation Notifications</Label>
                    <div className="text-sm text-muted-foreground">Send email when reserved books become available</div>
                  </div>
                  <Switch defaultChecked />
                </div>
              </div>
              <div className="space-y-4">
                <h3 className="text-lg font-medium">System Notifications</h3>
                <Separator />
                <div className="flex items-center justify-between space-y-0">
                  <div className="space-y-0.5">
                    <Label className="text-base">New Book Alerts</Label>
                    <div className="text-sm text-muted-foreground">
                      Notify users about new books in their areas of interest
                    </div>
                  </div>
                  <Switch />
                </div>
                <div className="flex items-center justify-between space-y-0">
                  <div className="space-y-0.5">
                    <Label className="text-base">System Reports</Label>
                    <div className="text-sm text-muted-foreground">Generate daily borrowing reports</div>
                  </div>
                  <Switch defaultChecked />
                </div>
                <div className="flex items-center justify-between space-y-0">
                  <div className="space-y-0.5">
                    <Label className="text-base">Staff Notifications</Label>
                    <div className="text-sm text-muted-foreground">
                      Send notifications to staff for important events
                    </div>
                  </div>
                  <Switch defaultChecked />
                </div>
              </div>
            </CardContent>
            <CardFooter className="border-t px-6 py-4">
              <Button onClick={handleSaveSettings} disabled={isLoading}>
                {isLoading ? "Saving..." : "Save Notification Settings"}
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
        <TabsContent value="categories" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Book Categories</CardTitle>
              <CardDescription>Manage book categories and classifications</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-4">
                <div className="flex justify-between">
                  <h3 className="text-lg font-medium">Active Categories</h3>
                  <Button variant="outline" size="sm">
                    Add Category
                  </Button>
                </div>
                <Separator />
                <div className="space-y-2">
                  {[
                    "Computer Science",
                    "Mathematics",
                    "Physics",
                    "Chemistry",
                    "Biology",
                    "Literature",
                    "History",
                    "Philosophy",
                    "Psychology",
                    "Economics",
                  ].map((category, index) => (
                    <div key={index} className="flex items-center justify-between rounded-md border p-3">
                      <div className="font-medium">{category}</div>
                      <div className="flex items-center gap-2">
                        <Button variant="ghost" size="sm">
                          Edit
                        </Button>
                        <Button variant="ghost" size="sm" className="text-red-500">
                          Delete
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="space-y-4 mt-6">
                <div className="flex justify-between">
                  <h3 className="text-lg font-medium">Classification System</h3>
                </div>
                <Separator />
                <div className="space-y-2">
                  <div className="flex items-center justify-between space-y-0">
                    <div className="space-y-0.5">
                      <Label className="text-base">Classification Type</Label>
                    </div>
                    <Select defaultValue="dewey">
                      <SelectTrigger className="w-[200px]">
                        <SelectValue placeholder="Select classification" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="dewey">Dewey Decimal</SelectItem>
                        <SelectItem value="lc">Library of Congress</SelectItem>
                        <SelectItem value="custom">Custom</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="flex items-center justify-between space-y-0 mt-4">
                    <div className="space-y-0.5">
                      <Label className="text-base">Auto-Assign Classification</Label>
                      <div className="text-sm text-muted-foreground">
                        Automatically assign classification numbers to new books
                      </div>
                    </div>
                    <Switch defaultChecked />
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter className="border-t px-6 py-4">
              <Button onClick={handleSaveSettings} disabled={isLoading}>
                {isLoading ? "Saving..." : "Save Category Settings"}
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
