// import Mongoose from "mongoose";
import { TeamRole } from "@/lib/constants/team-role";
import { ObjectId } from "mongodb";
import { Plan } from "../types/types";

export interface TeamSchema {
  _id: ObjectId;
  name: string;
  description?: string;
  createdBy: ObjectId;
  plan: Plan;
  teamUsers: ObjectId;
  meta: MetaSchema;
  createdAt: Date;
  billingCycleStart: number;
  inviteCode: string;
  membersLimit: number;
  workspaceLimit: number;
}

export interface MetaSchema {
  title: string;
  description: string;
  slug: string;
}

export interface TeamMemberSchema {
  _id?: string;
  role: TeamRole;
  user: ObjectId;
  teamId: ObjectId;
  createdAt: Date;
  updatedAt: Date;
}
