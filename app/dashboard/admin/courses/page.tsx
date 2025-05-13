"use client"

import { useState } from "react"
import { BookOpen, Calendar, Check, CreditCard, Filter, Home, Plus, Search, Settings, Users, X } from "lucide-react"

import { DashboardLayout } from "@/components/dashboard-layout"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Checkbox } from "@/components/ui/checkbox"
import { useToast } from "@/hooks/use-toast"
import { CardScanner } from "@/components/card-scanner"

// Navigation items for the admin dashboard
const navItems = [
  { href: "/dashboard/admin", label: "Dashboard", icon: Home },
  // { href: "/dashboard/admin/users", label: "Users", icon: Users },
  { href: "/dashboard/admin/cards", label: "Cards", icon: CreditCard },
  { href: "/dashboard/admin/courses", label: "Courses", icon: BookOpen },
  { href: "/dashboard/admin/settings", label: "Settings", icon: Settings },
]

// Sample course data
const initialCourses = [
  {
    id: "CS101",
    name: "Introduction to Computer Science",
    department: "Computer Science",
    credits: 3,
    semester: "Fall 2023",
    capacity: 30,
    enrolled: 25,
    instructor: "Dr. Smith",
    schedule: "Mon/Wed 10:00-11:30",
    location: "Science Building 101",
  },
  {
    id: "MATH201",
    name: "Calculus II",
    department: "Mathematics",
    credits: 4,
    semester: "Fall 2023",
    capacity: 25,
    enrolled: 20,
    instructor: "Dr. Johnson",
    schedule: "Tue/Thu 13:00-14:30",
    location: "Math Building 203",
  },
  {
    id: "ENG105",
    name: "Academic Writing",
    department: "English",
    credits: 3,
    semester: "Fall 2023",
    capacity: 20,
    enrolled: 18,
    instructor: "Prof. Williams",
    schedule: "Fri 09:00-12:00",
    location: "Humanities 305",
  },
  {
    id: "PHYS202",
    name: "Electricity and Magnetism",
    department: "Physics",
    credits: 4,
    semester: "Spring 2024",
    capacity: 24,
    enrolled: 15,
    instructor: "Dr. Brown",
    schedule: "Mon/Wed 14:00-15:30",
    location: "Science Building 205",
  },
  {
    id: "BIO101",
    name: "Introduction to Biology",
    department: "Biology",
    credits: 4,
    semester: "Spring 2024",
    capacity: 30,
    enrolled: 28,
    instructor: "Dr. Garcia",
    schedule: "Tue/Thu 10:00-11:30",
    location: "Science Building 302",
  },
]

// Sample student data with card IDs
const initialStudents = [
  {
    id: "STU-1001",
    name: "John Doe",
    email: "john.doe@university.edu",
    department: "Computer Science",
    year: 2,
    courses: ["CS101"],
    cardId: "CARD-1001",
    clearanceStatus: "Completed",
    clearanceDetails: {
      library: "Cleared",
      financial: "Cleared",
      dormitory: "Cleared",
      cafeteria: "Cleared",
    },
  },
  {
    id: "STU-1002",
    name: "Jane Smith",
    email: "jane.smith@university.edu",
    department: "Mathematics",
    year: 3,
    courses: ["MATH201"],
    cardId: "CARD-1002",
    clearanceStatus: "Pending",
    clearanceDetails: {
      library: "Cleared",
      financial: "Pending",
      dormitory: "Cleared",
      cafeteria: "Cleared",
    },
  },
  {
    id: "STU-1003",
    name: "Michael Johnson",
    email: "michael.j@university.edu",
    department: "Physics",
    year: 1,
    courses: [],
    cardId: "CARD-1003",
    clearanceStatus: "Not Started",
    clearanceDetails: {
      library: "Not Started",
      financial: "Not Started",
      dormitory: "Not Started",
      cafeteria: "Not Started",
    },
  },
  {
    id: "STU-1004",
    name: "Emily Williams",
    email: "emily.w@university.edu",
    department: "English",
    year: 4,
    courses: ["ENG105"],
    cardId: "CARD-1004",
    clearanceStatus: "Completed",
    clearanceDetails: {
      library: "Cleared",
      financial: "Cleared",
      dormitory: "Cleared",
      cafeteria: "Cleared",
    },
  },
  {
    id: "STU-1005",
    name: "David Wilson",
    email: "david.w@university.edu",
    department: "Biology",
    year: 2,
    courses: ["BIO101"],
    cardId: "CARD-1005",
    clearanceStatus: "Completed",
    clearanceDetails: {
      library: "Cleared",
      financial: "Cleared",
      dormitory: "Cleared",
      cafeteria: "Cleared",
    },
  },
]

// Available semesters
const semesters = ["Fall 2023", "Spring 2024", "Summer 2024", "Fall 2024"]

// Available departments
const departments = [
  "Computer Science",
  "Mathematics",
  "Physics",
  "Biology",
  "Chemistry",
  "English",
  "History",
  "Psychology",
]

export default function CoursesPage() {
  const { toast } = useToast()
  const [courses, setCourses] = useState(initialCourses)
  const [students, setStudents] = useState(initialStudents)
  const [searchTerm, setSearchTerm] = useState("")
  const [semesterFilter, setSemesterFilter] = useState("All")
  const [departmentFilter, setDepartmentFilter] = useState("All")
  const [selectedStudent, setSelectedStudent] = useState<any>(null)
  const [selectedCourses, setSelectedCourses] = useState<string[]>([])
  const [isScanning, setIsScanning] = useState(false)
  const [scanError, setScanError] = useState<string | null>(null)

  // Filter courses based on search term and filters
  const filteredCourses = courses.filter((course) => {
    const matchesSearch =
      course.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      course.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      course.instructor.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesSemester = semesterFilter === "All" || course.semester === semesterFilter
    const matchesDepartment = departmentFilter === "All" || course.department === departmentFilter

    return matchesSearch && matchesSemester && matchesDepartment
  })

  // Handle adding a new course
  const handleAddCourse = (courseData: any) => {
    setCourses([...courses, { ...courseData, enrolled: 0 }])
    toast({
      title: "Course Added",
      description: `${courseData.id}: ${courseData.name} has been added successfully`,
    })
  }

  // Handle card scanning
  const handleCardScanned = (cardId: string) => {
    setIsScanning(true)
    setScanError(null)

    // Find student by card ID
    const student = students.find((s) => s.cardId === cardId)

    if (student) {
      setSelectedStudent(student)
      // Initialize with student's current courses
      setSelectedCourses(student.courses)
      toast({
        title: "Card Scanned",
        description: `Found student: ${student.name} (${student.id})`,
      })
    } else {
      setScanError(`No student found with card ID: ${cardId}`)
      toast({
        title: "Scan Error",
        description: `No student found with card ID: ${cardId}`,
        variant: "destructive",
      })
    }

    setIsScanning(false)
  }

  // Handle student course registration
  const handleRegisterCourses = () => {
    if (!selectedStudent) return

    // Update student courses
    setStudents(
      students.map((student) => {
        if (student.id === selectedStudent.id) {
          return {
            ...student,
            courses: selectedCourses,
          }
        }
        return student
      }),
    )

    // Update course enrollment
    setCourses(
      courses.map((course) => {
        if (selectedCourses.includes(course.id)) {
          return {
            ...course,
            enrolled: course.enrolled + 1,
          }
        }
        return course
      }),
    )

    toast({
      title: "Courses Registered",
      description: `${selectedStudent.name} has been registered for ${selectedCourses.length} courses`,
    })

    // Reset selection
    setSelectedStudent(null)
    setSelectedCourses([])
  }

  // Reset the current student selection
  const handleReset = () => {
    setSelectedStudent(null)
    setSelectedCourses([])
    setScanError(null)
  }

  // Check if a course is available for registration
  const isCourseAvailable = (courseId: string) => {
    const course = courses.find((c) => c.id === courseId)
    return course && course.enrolled < course.capacity
  }

  // Toggle course selection
  const toggleCourseSelection = (courseId: string) => {
    if (selectedCourses.includes(courseId)) {
      setSelectedCourses(selectedCourses.filter((id) => id !== courseId))
    } else {
      setSelectedCourses([...selectedCourses, courseId])
    }
  }

  return (
    <DashboardLayout navItems={navItems} title="Course Management" icon={BookOpen} showBackButton>
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-bold">Course Management</h1>
        <Dialog>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Add Course
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add New Course</DialogTitle>
              <DialogDescription>Enter the details for the new course.</DialogDescription>
            </DialogHeader>
            <form
              onSubmit={(e) => {
                e.preventDefault()
                const formData = new FormData(e.currentTarget)
                const courseData = {
                  id: formData.get("courseId") as string,
                  name: formData.get("courseName") as string,
                  department: formData.get("department") as string,
                  credits: Number.parseInt(formData.get("credits") as string),
                  semester: formData.get("semester") as string,
                  capacity: Number.parseInt(formData.get("capacity") as string),
                  instructor: formData.get("instructor") as string,
                  schedule: formData.get("schedule") as string,
                  location: formData.get("location") as string,
                }
                handleAddCourse(courseData)
                // Close the dialog
                const closeButton = document.querySelector("[data-dialog-close]") as HTMLButtonElement
                if (closeButton) closeButton.click()
              }}
              className="space-y-4"
            >
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="courseId">Course ID</Label>
                  <Input id="courseId" name="courseId" placeholder="e.g., CS101" required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="credits">Credits</Label>
                  <Input id="credits" name="credits" type="number" min="1" max="6" defaultValue="3" required />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="courseName">Course Name</Label>
                <Input id="courseName" name="courseName" placeholder="Introduction to Computer Science" required />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="department">Department</Label>
                  <Select name="department" defaultValue={departments[0]}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select department" />
                    </SelectTrigger>
                    <SelectContent>
                      {departments.map((dept) => (
                        <SelectItem key={dept} value={dept}>
                          {dept}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="semester">Semester</Label>
                  <Select name="semester" defaultValue={semesters[0]}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select semester" />
                    </SelectTrigger>
                    <SelectContent>
                      {semesters.map((sem) => (
                        <SelectItem key={sem} value={sem}>
                          {sem}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="instructor">Instructor</Label>
                  <Input id="instructor" name="instructor" placeholder="Dr. Smith" required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="capacity">Capacity</Label>
                  <Input id="capacity" name="capacity" type="number" min="1" defaultValue="30" required />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="schedule">Schedule</Label>
                  <Input id="schedule" name="schedule" placeholder="Mon/Wed 10:00-11:30" required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="location">Location</Label>
                  <Input id="location" name="location" placeholder="Science Building 101" required />
                </div>
              </div>
              <DialogFooter>
                <Button type="submit">Add Course</Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <Tabs defaultValue="catalog">
        <TabsList>
          <TabsTrigger value="catalog">Course Catalog</TabsTrigger>
          <TabsTrigger value="registration">Course Registration</TabsTrigger>
        </TabsList>

        <TabsContent value="catalog" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Course Catalog</CardTitle>
              <CardDescription>Browse and manage available courses</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="mb-4 flex flex-col gap-4 md:flex-row">
                <div className="flex-1">
                  <div className="relative">
                    <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder="Search courses..."
                      className="pl-8"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                  </div>
                </div>
                <div className="flex gap-2">
                  <Select value={semesterFilter} onValueChange={setSemesterFilter}>
                    <SelectTrigger className="w-[180px]">
                      <Calendar className="mr-2 h-4 w-4" />
                      <SelectValue placeholder="Semester" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="All">All Semesters</SelectItem>
                      {semesters.map((semester) => (
                        <SelectItem key={semester} value={semester}>
                          {semester}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <Select value={departmentFilter} onValueChange={setDepartmentFilter}>
                    <SelectTrigger className="w-[180px]">
                      <Filter className="mr-2 h-4 w-4" />
                      <SelectValue placeholder="Department" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="All">All Departments</SelectItem>
                      {departments.map((department) => (
                        <SelectItem key={department} value={department}>
                          {department}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {filteredCourses.map((course) => (
                  <Card key={course.id} className="overflow-hidden">
                    <CardHeader className="pb-2">
                      <div className="flex items-start justify-between">
                        <div>
                          <CardTitle className="text-lg">{course.name}</CardTitle>
                          <CardDescription>{course.id}</CardDescription>
                        </div>
                        <Badge variant={course.enrolled >= course.capacity ? "destructive" : "outline"}>
                          {course.enrolled >= course.capacity ? "Full" : "Available"}
                        </Badge>
                      </div>
                    </CardHeader>
                    <CardContent className="pb-2 text-sm">
                      <div className="mb-2 grid grid-cols-2 gap-2">
                        <div>
                          <span className="font-medium">Department:</span> {course.department}
                        </div>
                        <div>
                          <span className="font-medium">Credits:</span> {course.credits}
                        </div>
                        <div>
                          <span className="font-medium">Semester:</span> {course.semester}
                        </div>
                        <div>
                          <span className="font-medium">Instructor:</span> {course.instructor}
                        </div>
                      </div>
                      <div className="mb-2">
                        <span className="font-medium">Schedule:</span> {course.schedule}
                      </div>
                      <div className="mb-2">
                        <span className="font-medium">Location:</span> {course.location}
                      </div>
                      <div className="mt-2">
                        <div className="flex items-center justify-between">
                          <span className="text-xs text-muted-foreground">
                            Enrollment: {course.enrolled}/{course.capacity}
                          </span>
                          <span
                            className={`text-xs ${
                              course.enrolled / course.capacity > 0.8
                                ? "text-destructive"
                                : course.enrolled / course.capacity > 0.5
                                  ? "text-amber-500"
                                  : "text-green-500"
                            }`}
                          >
                            {Math.round((course.enrolled / course.capacity) * 100)}% Full
                          </span>
                        </div>
                        <div className="mt-1 h-1.5 w-full overflow-hidden rounded-full bg-muted">
                          <div
                            className={`h-full ${
                              course.enrolled / course.capacity > 0.8
                                ? "bg-destructive"
                                : course.enrolled / course.capacity > 0.5
                                  ? "bg-amber-500"
                                  : "bg-green-500"
                            }`}
                            style={{ width: `${(course.enrolled / course.capacity) * 100}%` }}
                          ></div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="registration" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-3">
            {/* Card Scanner Section */}
            <Card className="md:col-span-1">
              <CardHeader>
                <CardTitle>Scan Student ID</CardTitle>
                <CardDescription>Scan a student ID card to begin the registration process</CardDescription>
              </CardHeader>
              <CardContent className="flex flex-col items-center justify-center">
                <CardScanner onCardScanned={handleCardScanned} isLoading={isScanning} />

                {scanError && (
                  <div className="mt-4 rounded-md border border-destructive bg-destructive/10 p-3 text-center text-destructive text-sm">
                    {scanError}
                  </div>
                )}

                {selectedStudent && (
                  <div className="mt-6 w-full rounded-md border p-4">
                    <h3 className="mb-2 font-semibold">{selectedStudent.name}</h3>
                    <div className="space-y-1 text-sm">
                      <p>
                        <span className="font-medium">ID:</span> {selectedStudent.id}
                      </p>
                      <p>
                        <span className="font-medium">Department:</span> {selectedStudent.department}
                      </p>
                      <p>
                        <span className="font-medium">Year:</span> {selectedStudent.year}
                      </p>
                      <p>
                        <span className="font-medium">Clearance:</span>{" "}
                        <Badge
                          variant={
                            selectedStudent.clearanceStatus === "Completed"
                              ? "default"
                              : selectedStudent.clearanceStatus === "Pending"
                                ? "outline"
                                : "destructive"
                          }
                          className={
                            selectedStudent.clearanceStatus === "Completed" ? "bg-green-500 hover:bg-green-600" : ""
                          }
                        >
                          {selectedStudent.clearanceStatus}
                        </Badge>
                      </p>
                    </div>

                    <Button variant="outline" size="sm" className="mt-4 w-full" onClick={handleReset}>
                      Reset
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Course Registration Section */}
            <Card className="md:col-span-2">
              <CardHeader>
                <CardTitle>Course Registration</CardTitle>
                <CardDescription>
                  {selectedStudent
                    ? `Register ${selectedStudent.name} for courses`
                    : "Scan a student ID to begin registration"}
                </CardDescription>
              </CardHeader>
              <CardContent>
                {!selectedStudent ? (
                  <div className="flex h-[300px] flex-col items-center justify-center rounded-md border border-dashed p-8 text-center">
                    <p className="mb-2 text-lg font-medium">No Student Selected</p>
                    <p className="text-sm text-muted-foreground">
                      Please scan a student ID card to view and register for courses
                    </p>
                  </div>
                ) : selectedStudent.clearanceStatus !== "Completed" ? (
                  <div className="rounded-md border border-destructive bg-destructive/10 p-6 text-center">
                    <h3 className="mb-2 text-lg font-medium text-destructive">Clearance Required</h3>
                    <p className="mb-4 text-sm text-destructive">
                      This student has not completed clearance for the previous semester. Course registration is not
                      allowed until all clearance items are resolved.
                    </p>

                    <div className="mt-6 rounded-md border p-4">
                      <h4 className="mb-2 font-medium">Clearance Details:</h4>
                      <div className="space-y-2 text-sm">
                        <div className="flex items-center">
                          {selectedStudent.clearanceDetails.library === "Cleared" ? (
                            <Check className="mr-1 h-4 w-4 text-green-500" />
                          ) : (
                            <X className="mr-1 h-4 w-4 text-destructive" />
                          )}
                          <span>Library: {selectedStudent.clearanceDetails.library}</span>
                        </div>
                        <div className="flex items-center">
                          {selectedStudent.clearanceDetails.financial === "Cleared" ? (
                            <Check className="mr-1 h-4 w-4 text-green-500" />
                          ) : (
                            <X className="mr-1 h-4 w-4 text-destructive" />
                          )}
                          <span>Financial: {selectedStudent.clearanceDetails.financial}</span>
                        </div>
                        <div className="flex items-center">
                          {selectedStudent.clearanceDetails.dormitory === "Cleared" ? (
                            <Check className="mr-1 h-4 w-4 text-green-500" />
                          ) : (
                            <X className="mr-1 h-4 w-4 text-destructive" />
                          )}
                          <span>Dormitory: {selectedStudent.clearanceDetails.dormitory}</span>
                        </div>
                        <div className="flex items-center">
                          {selectedStudent.clearanceDetails.cafeteria === "Cleared" ? (
                            <Check className="mr-1 h-4 w-4 text-green-500" />
                          ) : (
                            <X className="mr-1 h-4 w-4 text-destructive" />
                          )}
                          <span>Cafeteria: {selectedStudent.clearanceDetails.cafeteria}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                ) : (
                  <>
                    <div className="mb-4">
                      <div className="flex items-center justify-between">
                        <h3 className="font-medium">Current Courses:</h3>
                        <Select defaultValue={semesters[0]}>
                          <SelectTrigger className="w-[180px]">
                            <SelectValue placeholder="Select semester" />
                          </SelectTrigger>
                          <SelectContent>
                            {semesters.map((semester) => (
                              <SelectItem key={semester} value={semester}>
                                {semester}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="mt-2">
                        {selectedStudent.courses.length > 0 ? (
                          <div className="flex flex-wrap gap-2">
                            {selectedStudent.courses.map((courseId: string) => {
                              const course = courses.find((c) => c.id === courseId)
                              return (
                                <Badge key={courseId} variant="secondary">
                                  {courseId}: {course ? course.name : "Unknown Course"}
                                </Badge>
                              )
                            })}
                          </div>
                        ) : (
                          <p className="text-sm text-muted-foreground">
                            Student is not registered for any courses yet.
                          </p>
                        )}
                      </div>
                    </div>

                    <div className="mb-4">
                      <div className="relative">
                        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                        <Input
                          placeholder="Search available courses..."
                          className="pl-8"
                          value={searchTerm}
                          onChange={(e) => setSearchTerm(e.target.value)}
                        />
                      </div>
                    </div>

                    <div className="max-h-[400px] overflow-y-auto rounded-md border">
                      <div className="space-y-1 p-1">
                        {courses
                          .filter(
                            (course) =>
                              !selectedStudent.courses.includes(course.id) &&
                              (course.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                                course.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
                                course.department.toLowerCase().includes(searchTerm.toLowerCase())),
                          )
                          .map((course) => {
                            const isAvailable = isCourseAvailable(course.id)
                            const isSelected = selectedCourses.includes(course.id)
                            return (
                              <div
                                key={course.id}
                                className={`flex items-center justify-between rounded-md border p-3 ${
                                  !isAvailable && !isSelected ? "opacity-60" : ""
                                }`}
                              >
                                <div className="flex items-center space-x-2">
                                  <Checkbox
                                    id={`course-${course.id}`}
                                    checked={isSelected}
                                    onCheckedChange={() => toggleCourseSelection(course.id)}
                                    disabled={!isAvailable && !isSelected}
                                  />
                                  <div>
                                    <Label
                                      htmlFor={`course-${course.id}`}
                                      className={`text-sm font-medium ${
                                        !isAvailable && !isSelected ? "text-muted-foreground" : ""
                                      }`}
                                    >
                                      {course.id}: {course.name}
                                    </Label>
                                    <p className="text-xs text-muted-foreground">
                                      {course.department} • {course.credits} credits • {course.semester}
                                    </p>
                                  </div>
                                </div>
                                <div className="flex items-center space-x-2">
                                  <span className="text-xs text-muted-foreground">
                                    {course.enrolled}/{course.capacity}
                                  </span>
                                  <Badge variant={isSelected ? "default" : isAvailable ? "outline" : "destructive"}>
                                    {isSelected ? "Selected" : isAvailable ? "Available" : "Full"}
                                  </Badge>
                                </div>
                              </div>
                            )
                          })}
                      </div>
                    </div>

                    <Button
                      onClick={handleRegisterCourses}
                      disabled={selectedCourses.length === 0}
                      className="mt-4 w-full"
                    >
                      Register for {selectedCourses.length} Course{selectedCourses.length !== 1 ? "s" : ""}
                    </Button>
                  </>
                )}
              </CardContent>
              <CardFooter className="border-t bg-muted/50 px-6 py-3">
                <p className="text-xs text-muted-foreground">
                  Note: Students must have completed clearance for the previous semester before registering for courses.
                </p>
              </CardFooter>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </DashboardLayout>
  )
}
