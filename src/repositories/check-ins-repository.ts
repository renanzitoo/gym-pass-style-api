import { CheckIn, Prisma, User } from "@prisma/client";

export interface CheckInsRepository{
  create(data: Prisma.CheckInUncheckedCreateInput): Promise<CheckIn>
  findByUserIdOnDate(duserId: string, date: Date): Promise<CheckIn | null>
}