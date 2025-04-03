export enum UserStatus {
  ACTIVE = "ACTIVE",
  INACTIVE = "INACTIVE",
}
export enum AccountType {
  DOCTOR = "DOCTOR",
  ASSISTANT = "ASSISTANT",
  PATIENT = "PATIENT",
}

export enum RoleType {
  ADMIN = "ADMIN",
  USER = "USER",
}

export interface User {
  id: string;
  name: string;
  username: string;
  role: RoleType;
  accountType: AccountType;
  email: string;
  password?: string;
  avatar?: string;
  googleId?: string;
  appleId?: string;
  invitedBy?: string;
  invitationCode?: string;
  lastLoginAt?: Date;
  status: UserStatus;
  isTwoFactorEnabled: boolean;
  createdAt: Date;
  updatedAt: Date;
  /* doctorBranches: DoctorBranch[]; */
  /* doctorTreatments: DoctorTreatment[]; */
  /* schedules: Schedule[]; */
  /* notifications: Notification[]; */
  /* doctorBranchAvailability: DoctorBranchAvailability[]; */
  /* uploadedPhotos: TreatmentPhoto[]; */
  /* comments: Comment[]; */
  /* treatments: PatientTreatment[]; */
  /* patientTreatments: PatientTreatment[]; */
  /* payments: Payment[]; */
  /* refreshTokens: RefreshToken[]; */
}
