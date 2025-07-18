import type { User } from "./columns"

export const users: User[] = [
  {
    id: "U001",
    name: "John Doe",
    email: "john.doe@university.edu",
    mealPlan: "Standard",
    balance: 120.5,
    status: "Active",
    lastMeal: "2023-05-09 08:15 AM (Breakfast)",
    dietaryRestrictions: [],
  },
  {
    id: "U002",
    name: "Jane Smith",
    email: "jane.smith@university.edu",
    mealPlan: "Vegetarian",
    balance: 85.75,
    status: "Active",
    lastMeal: "2023-05-09 12:30 PM (Lunch)",
    dietaryRestrictions: ["Vegetarian"],
  },
  {
    id: "U003",
    name: "Michael Johnson",
    email: "michael.johnson@university.edu",
    mealPlan: "Standard",
    balance: 200.0,
    status: "Active",
    lastMeal: "2023-05-08 06:45 PM (Dinner)",
    dietaryRestrictions: ["Lactose Intolerant"],
  },
  {
    id: "U004",
    name: "Emily Williams",
    email: "emily.williams@university.edu",
    mealPlan: "Gluten-Free",
    balance: 150.25,
    status: "Active",
    lastMeal: "2023-05-09 07:50 AM (Breakfast)",
    dietaryRestrictions: ["Gluten-Free", "Nut Allergy"],
  },
  {
    id: "U005",
    name: "David Brown",
    email: "david.brown@university.edu",
    mealPlan: "Standard",
    balance: 45.0,
    status: "Active",
    lastMeal: "2023-05-09 01:15 PM (Lunch)",
    dietaryRestrictions: [],
  },
  {
    id: "U006",
    name: "Sarah Miller",
    email: "sarah.miller@university.edu",
    mealPlan: "Vegetarian",
    balance: 75.5,
    status: "Inactive",
    lastMeal: "2023-05-05 07:30 PM (Dinner)",
    dietaryRestrictions: ["Vegetarian", "Soy Allergy"],
  },
  {
    id: "U007",
    name: "James Wilson",
    email: "james.wilson@university.edu",
    mealPlan: "Standard",
    balance: 180.75,
    status: "Active",
    lastMeal: "2023-05-09 08:00 AM (Breakfast)",
    dietaryRestrictions: [],
  },
  {
    id: "U008",
    name: "Jessica Taylor",
    email: "jessica.taylor@university.edu",
    mealPlan: "Vegan",
    balance: 95.25,
    status: "Active",
    lastMeal: "2023-05-08 12:00 PM (Lunch)",
    dietaryRestrictions: ["Vegan"],
  },
  {
    id: "U009",
    name: "Robert Martinez",
    email: "robert.martinez@university.edu",
    mealPlan: "Standard",
    balance: 25.0,
    status: "Suspended",
    lastMeal: "2023-05-01 06:30 PM (Dinner)",
    dietaryRestrictions: [],
  },
  {
    id: "U010",
    name: "Jennifer Garcia",
    email: "jennifer.garcia@university.edu",
    mealPlan: "Halal",
    balance: 110.5,
    status: "Active",
    lastMeal: "2023-05-09 08:30 AM (Breakfast)",
    dietaryRestrictions: ["Halal"],
  },
  {
    id: "U011",
    name: "Christopher Lee",
    email: "christopher.lee@university.edu",
    mealPlan: "Standard",
    balance: 165.25,
    status: "Active",
    lastMeal: "2023-05-09 01:00 PM (Lunch)",
    dietaryRestrictions: ["Shellfish Allergy"],
  },
  {
    id: "U012",
    name: "Amanda Rodriguez",
    email: "amanda.rodriguez@university.edu",
    mealPlan: "Kosher",
    balance: 130.75,
    status: "Active",
    lastMeal: "2023-05-08 07:00 PM (Dinner)",
    dietaryRestrictions: ["Kosher"],
  },
]
