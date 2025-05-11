// "use client"

// import { useState } from "react"
// import { ArrowUpDown, Download, Home, MoreHorizontal, Search, Settings, Shield, User, Users } from "lucide-react"

// import { DashboardLayout } from "@/components/dashboard-layout"
// import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
// import { Badge } from "@/components/ui/badge"
// import { Button } from "@/components/ui/button"
// import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
// import {
//   Dialog,
//   DialogContent,
//   DialogDescription,
//   DialogFooter,
//   DialogHeader,
//   DialogTitle,
// } from "@/components/ui/dialog"
// import {
//   DropdownMenu,
//   DropdownMenuContent,
//   DropdownMenuItem,
//   DropdownMenuLabel,
//   DropdownMenuSeparator,
//   DropdownMenuTrigger,
// } from "@/components/ui/dropdown-menu"
// import { Input } from "@/components/ui/input"
// import { Label } from "@/components/ui/label"
// import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
// import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
// import { useToast } from "@/hooks/use-toast"

// const navItems = [
//   { href: "/dashboard/admin", label: "Dashboard", icon: Home },
//   { href: "/dashboard/admin/users", label: "Users", icon: Users },
//   { href: "/dashboard/admin/cards", label: "Cards", icon: User },
//   { href: "/dashboard/admin/settings", label: "Settings", icon: Settings },
// ]

// // Mock users data
// const USERS = [
//   {
//     id: "ADM-1001",
//     name: "Admin User",
//     email: "admin@university.edu",
//     role: "admin",
//     department: "IT",
//     cardAssigned: true,
//     cardId: "CARD-1001",
//     createdAt: "2023-01-15T08:30:00Z",
//     status: "active",
//   },
//   {
//     id: "SEC-1001",
//     name: "Security Officer",
//     email: "security@university.edu",
//     role: "security",
//     department: "Security",
//     cardAssigned: true,
//     cardId: "CARD-1002",
//     createdAt: "2023-01-20T09:15:00Z",
//     status: "active",
//   },
//   {
//     id: "DOR-1001",
//     name: "Dormitory Manager",
//     email: "dorm@university.edu",
//     role: "dormitory",
//     department: "Housing",
//     cardAssigned: true,
//     cardId: "CARD-1003",
//     createdAt: "2023-02-05T10:45:00Z",
//     status: "active",
//   },
//   {
//     id: "CAF-1001",
//     name: "Cafe Manager",
//     email: "cafe@university.edu",
//     role: "cafe",
//     department: "Food Services",
//     cardAssigned: true,
//     cardId: "CARD-1004",
//     createdAt: "2023-02-10T11:30:00Z",
//     status: "active",
//   },
//   {
//     id: "LIB-1001",
//     name: "Librarian",
//     email: "library@university.edu",
//     role: "library",
//     department: "Library",
//     cardAssigned: true,
//     cardId: "CARD-1005",
//     createdAt: "2023-02-15T14:20:00Z",
//     status: "active",
//   },
//   {
//     id: "FAC-1001",
//     name: "Professor Smith",
//     email: "smith@university.edu",
//     role: "faculty",
//     department: "Physics",
//     cardAssigned: true,
//     cardId: "CARD-1006",
//     createdAt: "2023-03-01T09:00:00Z",
//     status: "active",
//   },
//   {
//     id: "STU-1001",
//     name: "Alex Johnson",
//     email: "alex.johnson@university.edu",
//     role: "student",
//     department: "Computer Science",
//     cardAssigned: true,
//     cardId: "CARD-1007",
//     createdAt: "2023-03-10T10:30:00Z",
//     status: "active",
//   },
//   {
//     id: "STU-1002",
//     name: "Sarah Williams",
//     email: "sarah.williams@university.edu",
//     role: "student",
//     department: "Business",
//     cardAssigned: true,
//     cardId: "CARD-1008",
//     createdAt: "2023-03-15T11:45:00Z",
//     status: "inactive",
//   },
// ]

// export default function AdminUsersPage() {
//   const { toast } = useToast()
//   const [searchQuery, setSearchQuery] = useState("")
//   const [roleFilter, setRoleFilter] = useState("all")
//   const [statusFilter, setStatusFilter] = useState("all")
//   const [users, setUsers] = useState(USERS)
//   const [selectedUser, setSelectedUser] = useState<any | null>(null)
//   const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
//   const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)

//   // Filter users based on search query, role, and status
//   const filteredUsers = users.filter((user) => {
//     // Apply search filter
//     const matchesSearch =
//       !searchQuery ||
//       user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
//       user.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
//       user.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
//       user.department.toLowerCase().includes(searchQuery.toLowerCase())

//     // Apply role filter
//     const matchesRole = roleFilter === "all" || user.role === roleFilter

//     // Apply status filter
//     const matchesStatus = statusFilter === "all" || user.status === statusFilter

//     return matchesSearch && matchesRole && matchesStatus
//   })

//   const handleEditUser = (user: any) => {
//     setSelectedUser({ ...user })
//     setIsEditDialogOpen(true)
//   }

//   const handleUpdateUser = () => {
//     if (!selectedUser) return

//     // Update user in the list
//     setUsers(users.map((user) => (user.id === selectedUser.id ? selectedUser : user)))

//     // Close dialog and reset selected user
//     setIsEditDialogOpen(false)
//     setSelectedUser(null)

//     toast({
//       title: "User Updated",
//       description: "User information has been updated successfully",
//     })
//   }

//   const handleDeletePrompt = (user: any) => {
//     setSelectedUser(user)
//     setIsDeleteDialogOpen(true)
//   }

//   const handleDeleteUser = () => {
//     if (!selectedUser) return

//     // Remove user from the list
//     setUsers(users.filter((user) => user.id !== selectedUser.id))

//     // Close dialog and reset selected user
//     setIsDeleteDialogOpen(false)
//     setSelectedUser(null)

//     toast({
//       title: "User Deleted",
//       description: "User has been deleted successfully",
//     })
//   }

//   return (
//     <DashboardLayout navItems={navItems} title="User Management" icon={Shield}>
//       <Card>
//         <CardHeader>
//           <CardTitle>System Users</CardTitle>
//           <CardDescription>Manage all users in the system</CardDescription>
//         </CardHeader>
//         <CardContent>
//           <div className="flex flex-col md:flex-row gap-4 mb-6">
//             <div className="relative flex-1">
//               <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
//               <Input
//                 type="search"
//                 placeholder="Search by name, ID, or email..."
//                 className="pl-8"
//                 value={searchQuery}
//                 onChange={(e) => setSearchQuery(e.target.value)}
//               />
//             </div>
//             <Select value={roleFilter} onValueChange={setRoleFilter}>
//               <SelectTrigger className="w-full md:w-[180px]">
//                 <SelectValue placeholder="Filter by role" />
//               </SelectTrigger>
//               <SelectContent>
//                 <SelectItem value="all">All Roles</SelectItem>
//                 <SelectItem value="admin">Admin</SelectItem>
//                 <SelectItem value="security">Security</SelectItem>
//                 <SelectItem value="dormitory">Dormitory</SelectItem>
//                 <SelectItem value="cafe">Cafe</SelectItem>
//                 <SelectItem value="library">Library</SelectItem>
//                 <SelectItem value="faculty">Faculty</SelectItem>
//                 <SelectItem value="student">Student</SelectItem>
//               </SelectContent>
//             </Select>
//             <Select value={statusFilter} onValueChange={setStatusFilter}>
//               <SelectTrigger className="w-full md:w-[180px]">
//                 <SelectValue placeholder="Filter by status" />
//               </SelectTrigger>
//               <SelectContent>
//                 <SelectItem value="all">All Status</SelectItem>
//                 <SelectItem value="active">Active</SelectItem>
//                 <SelectItem value="inactive">Inactive</SelectItem>
//               </SelectContent>
//             </Select>
//             <Button variant="outline" className="w-full md:w-auto">
//               <Download className="mr-2 h-4 w-4" />
//               Export
//             </Button>
//           </div>

//           <div className="rounded-md border">
//             <Table>
//               <TableHeader>
//                 <TableRow>
//                   <TableHead>User</TableHead>
//                   <TableHead>
//                     <div className="flex items-center gap-1 cursor-pointer">
//                       Role
//                       <ArrowUpDown className="h-3 w-3" />
//                     </div>
//                   </TableHead>
//                   <TableHead>Department</TableHead>
//                   <TableHead>Card Status</TableHead>
//                   <TableHead>Status</TableHead>
//                   <TableHead className="text-right">Actions</TableHead>
//                 </TableRow>
//               </TableHeader>
//               <TableBody>
//                 {filteredUsers.map((user) => (
//                   <TableRow key={user.id}>
//                     <TableCell>
//                       <div className="flex items-center gap-3">
//                         <Avatar className="h-8 w-8">
//                           <AvatarImage src="/placeholder.svg?height=32&width=32" alt={user.name} />
//                           <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
//                         </Avatar>
//                         <div>
//                           <p className="font-medium">{user.name}</p>
//                           <p className="text-xs text-muted-foreground">{user.email}</p>
//                         </div>
//                       </div>
//                     </TableCell>
//                     <TableCell>
//                       <Badge variant="outline" className="capitalize">
//                         {user.role}
//                       </Badge>
//                     </TableCell>
//                     <TableCell>{user.department}</TableCell>
//                     <TableCell>
//                       {user.cardAssigned ? (
//                         <Badge className="bg-green-500 hover:bg-green-600">Assigned</Badge>
//                       ) : (
//                         <Badge variant="outline">Unassigned</Badge>
//                       )}
//                     </TableCell>
//                     <TableCell>
//                       <Badge variant={user.status === "active" ? "default" : "secondary"} className="capitalize">
//                         {user.status}
//                       </Badge>
//                     </TableCell>
//                     <TableCell className="text-right">
//                       <DropdownMenu>
//                         <DropdownMenuTrigger asChild>
//                           <Button variant="ghost" size="icon">
//                             <MoreHorizontal className="h-4 w-4" />
//                             <span className="sr-only">Open menu</span>
//                           </Button>
//                         </DropdownMenuTrigger>
//                         <DropdownMenuContent align="end">
//                           <DropdownMenuLabel>Actions</DropdownMenuLabel>
//                           <DropdownMenuItem onClick={() => handleEditUser(user)}>Edit User</DropdownMenuItem>
//                           <DropdownMenuItem>View Activity</DropdownMenuItem>
//                           <DropdownMenuSeparator />
//                           <DropdownMenuItem
//                             onClick={() => handleDeletePrompt(user)}
//                             className="text-red-600 focus:text-red-600"
//                           >
//                             Delete User
//                           </DropdownMenuItem>
//                         </DropdownMenuContent>
//                       </DropdownMenu>
//                     </TableCell>
//                   </TableRow>
//                 ))}
//               </TableBody>
//             </Table>
//           </div>
//         </CardContent>
//       </Card>

//       {/* Edit User Dialog */}
//       <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
//         <DialogContent>
//           <DialogHeader>
//             <DialogTitle>Edit User</DialogTitle>
//             <DialogDescription>Update user information</DialogDescription>
//           </DialogHeader>
//           {selectedUser && (
//             <div className="space-y-4 py-2">
//               <div className="space-y-2">
//                 <Label htmlFor="edit-name">Name</Label>
//                 <Input
//                   id="edit-name"
//                   value={selectedUser.name}
//                   onChange={(e) => setSelectedUser({ ...selectedUser, name: e.target.value })}
//                 />
//               </div>
//               <div className="space-y-2">
//                 <Label htmlFor="edit-email">Email</Label>
//                 <Input
//                   id="edit-email"
//                   type="email"
//                   value={selectedUser.email}
//                   onChange={(e) => setSelectedUser({ ...selectedUser, email: e.target.value })}
//                 />
//               </div>
//               <div className="space-y-2">
//                 <Label htmlFor="edit-role">Role</Label>
//                 <Select
//                   value={selectedUser.role}
//                   onValueChange={(value) => setSelectedUser({ ...selectedUser, role: value })}
//                 >
//                   <SelectTrigger id="edit-role">
//                     <SelectValue placeholder="Select role" />
//                   </SelectTrigger>
//                   <SelectContent>
//                     <SelectItem value="admin">Administrator</SelectItem>
//                     <SelectItem value="security">Security Officer</SelectItem>
//                     <SelectItem value="dormitory">Dormitory Manager</SelectItem>
//                     <SelectItem value="cafe">Cafe Manager</SelectItem>
//                     <SelectItem value="library">Librarian</SelectItem>
//                     <SelectItem value="faculty">Faculty</SelectItem>
//                     <SelectItem value="student">Student</SelectItem>
//                   </SelectContent>
//                 </Select>
//               </div>
//               <div className="space-y-2">
//                 <Label htmlFor="edit-department">Department</Label>
//                 <Input
//                   id="edit-department"
//                   value={selectedUser.department}
//                   onChange={(e) => setSelectedUser({ ...selectedUser, department: e.target.value })}
//                 />
//               </div>
//               <div className="space-y-2">
//                 <Label htmlFor="edit-status">Status</Label>
//                 <Select
//                   value={selectedUser.status}
//                   onValueChange={(value) => setSelectedUser({ ...selectedUser, status: value })}
//                 >
//                   <SelectTrigger id="edit-status">
//                     <SelectValue placeholder="Select status" />
//                   </SelectTrigger>
//                   <SelectContent>
//                     <SelectItem value="active">Active</SelectItem>
//                     <SelectItem value="inactive">Inactive</SelectItem>
//                   </SelectContent>
//                 </Select>
//               </div>
//             </div>
//           )}
//           <DialogFooter>
//             <Button variant="outline" onClick={() => setIsEditDialogOpen(false)}>
//               Cancel
//             </Button>
//             <Button onClick={handleUpdateUser}>Save Changes</Button>
//           </DialogFooter>
//         </DialogContent>
//       </Dialog>

//       {/* Delete User Dialog */}
//       <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
//         <DialogContent>
//           <DialogHeader>
//             <DialogTitle>Delete User</DialogTitle>
//             <DialogDescription>
//               Are you sure you want to delete this user? This action cannot be undone.
//             </DialogDescription>
//           </DialogHeader>
//           {selectedUser && (
//             <div className="py-4" />\
