"use client"

import { useState } from "react"
import { Calendar, Check, Clock, Coffee, Utensils } from "lucide-react"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/hooks/use-toast"

interface MealRecordingProps {
  user: {
    id: string
    name: string
    mealPlan: string
    photo: string
  }
  onRecordMeal: (mealData: any) => void
  mealHistory: any[]
}

export function MealRecording({ user, onRecordMeal, mealHistory }: MealRecordingProps) {
  const { toast } = useToast()
  const [mealType, setMealType] = useState("breakfast")
  const [mealPlan, setMealPlan] = useState(user.mealPlan)
  const [notes, setNotes] = useState("")
  const [isProcessing, setIsProcessing] = useState(false)

  const handleRecordMeal = () => {
    setIsProcessing(true)

    // Check if the user already had this meal type today
    const today = new Date().toDateString()
    const alreadyHadMeal = mealHistory.some((meal) => {
      const mealDate = new Date(meal.timestamp).toDateString()
      return mealDate === today && meal.mealType.toLowerCase() === mealType.toLowerCase()
    })

    if (alreadyHadMeal) {
      toast({
        title: "Meal Already Recorded",
        description: `${user.name} has already had ${mealType} today`,
        variant: "destructive",
      })
      setIsProcessing(false)
      return
    }

    // Simulate processing delay
    setTimeout(() => {
      onRecordMeal({
        mealType,
        mealPlan,
        notes,
      })

      setNotes("")
      setIsProcessing(false)
    }, 1000)
  }

  return (
    <div className="grid gap-4 md:grid-cols-2">
      <Card>
        <CardHeader>
          <CardTitle>Record Meal</CardTitle>
          <CardDescription>Record a meal for {user.name}</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-4 mb-4">
            <Avatar className="h-12 w-12">
              <AvatarImage src={user.photo || "/placeholder.svg"} alt={user.name} />
              <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
            </Avatar>
            <div>
              <h3 className="font-medium">{user.name}</h3>
              <p className="text-sm text-muted-foreground">Meal Plan: {user.mealPlan}</p>
            </div>
            <Badge variant="outline" className="ml-auto">
              {user.id}
            </Badge>
          </div>

          <Separator className="mb-4" />

          <div className="space-y-4">
            <div className="space-y-2">
              <Label>Meal Type</Label>
              <RadioGroup defaultValue="breakfast" value={mealType} onValueChange={setMealType}>
                <div className="flex flex-col space-y-2">
                  <div className="flex items-center space-x-2 rounded-md border p-3">
                    <RadioGroupItem value="breakfast" id="breakfast" />
                    <Label htmlFor="breakfast" className="flex flex-1 items-center gap-2 font-normal">
                      <Coffee className="h-4 w-4" />
                      <span>Breakfast</span>
                      <span className="ml-auto text-xs text-muted-foreground">6:30 AM - 9:30 AM</span>
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2 rounded-md border p-3">
                    <RadioGroupItem value="lunch" id="lunch" />
                    <Label htmlFor="lunch" className="flex flex-1 items-center gap-2 font-normal">
                      <Utensils className="h-4 w-4" />
                      <span>Lunch</span>
                      <span className="ml-auto text-xs text-muted-foreground">11:30 AM - 2:30 PM</span>
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2 rounded-md border p-3">
                    <RadioGroupItem value="dinner" id="dinner" />
                    <Label htmlFor="dinner" className="flex flex-1 items-center gap-2 font-normal">
                      <Utensils className="h-4 w-4" />
                      <span>Dinner</span>
                      <span className="ml-auto text-xs text-muted-foreground">5:30 PM - 8:30 PM</span>
                    </Label>
                  </div>
                </div>
              </RadioGroup>
            </div>

            <div className="space-y-2">
              <Label htmlFor="meal-plan">Meal Plan</Label>
              <Select value={mealPlan} onValueChange={setMealPlan}>
                <SelectTrigger id="meal-plan">
                  <SelectValue placeholder="Select meal plan" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Full Board">Full Board</SelectItem>
                  <SelectItem value="Lunch Only">Lunch Only</SelectItem>
                  <SelectItem value="Breakfast & Dinner">Breakfast & Dinner</SelectItem>
                  <SelectItem value="Faculty Plan">Faculty Plan</SelectItem>
                  <SelectItem value="Special Diet">Special Diet</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="notes">Notes (Optional)</Label>
              <Textarea
                id="notes"
                placeholder="Add any notes about the meal..."
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
              />
            </div>
          </div>
        </CardContent>
        <CardFooter>
          <Button onClick={handleRecordMeal} disabled={isProcessing} className="w-full">
            {isProcessing ? "Processing..." : "Record Meal"}
          </Button>
        </CardFooter>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Today's Meals</CardTitle>
          <CardDescription>Meals recorded for {user.name} today</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="rounded-lg border p-4 mb-4">
            <div className="flex items-center gap-2 mb-2">
              <Calendar className="h-5 w-5 text-primary" />
              <h3 className="font-medium">Today's Date</h3>
              <span className="ml-auto text-sm">
                {new Date().toLocaleDateString("en-US", {
                  weekday: "long",
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="h-5 w-5 text-primary" />
              <h3 className="font-medium">Current Time</h3>
              <span className="ml-auto text-sm">
                {new Date().toLocaleTimeString("en-US", {
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </span>
            </div>
          </div>

          <div className="space-y-4">
            {/* Filter meals for today only */}
            {(() => {
              const today = new Date().toDateString()
              const todaysMeals = mealHistory.filter((meal) => new Date(meal.timestamp).toDateString() === today)

              if (todaysMeals.length === 0) {
                return (
                  <div className="flex flex-col items-center justify-center h-[200px] text-center border rounded-lg p-6">
                    <Utensils className="h-12 w-12 text-muted-foreground mb-4" />
                    <h3 className="font-medium mb-1">No Meals Recorded Today</h3>
                    <p className="text-sm text-muted-foreground">This student has not had any meals recorded today</p>
                  </div>
                )
              }

              return (
                <>
                  {["breakfast", "lunch", "dinner"].map((type) => {
                    const meal = todaysMeals.find((m) => m.mealType.toLowerCase() === type)

                    return (
                      <div key={type} className="flex items-center gap-4 rounded-lg border p-3">
                        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                          {type === "breakfast" ? (
                            <Coffee className="h-5 w-5 text-primary" />
                          ) : (
                            <Utensils className="h-5 w-5 text-primary" />
                          )}
                        </div>
                        <div>
                          <p className="font-medium">{type.charAt(0).toUpperCase() + type.slice(1)}</p>
                          {meal ? (
                            <p className="text-sm text-muted-foreground">
                              {new Date(meal.timestamp).toLocaleTimeString()}
                            </p>
                          ) : (
                            <p className="text-sm text-muted-foreground">Not recorded</p>
                          )}
                        </div>
                        {meal ? (
                          <div className="ml-auto flex items-center">
                            <Badge variant="outline" className="mr-2">
                              {meal.mealPlan}
                            </Badge>
                            <Check className="h-5 w-5 text-green-500" />
                          </div>
                        ) : (
                          <Badge variant="outline" className="ml-auto">
                            Not taken
                          </Badge>
                        )}
                      </div>
                    )
                  })}
                </>
              )
            })()}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
