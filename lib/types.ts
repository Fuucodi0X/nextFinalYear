export type status = "not_issued" | "issued" | "returned"
export type UserType = {
  name: string,
  avatar: string,
  email: string,
  id: string,
  phoneNumber: number,
  role: string,
  complaines: {
    description: string
    severity: string,
    type: string
  }[][]
  assignedDormitories: [
    {
      dormId: string,
      status: status,
      dormitoryRoom: {
        roomNumber: number
        buildingNumber: number
        floorNumber: number
      }
    }
  ]
}
export type ComplainType = {
  description: string
  severity: string,
  type: string
}
