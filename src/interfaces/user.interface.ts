import type { PermissionInterface } from "@/interfaces/permission.interface";
import type { ApplicantInterface } from "@/interfaces/applicant.interface";

export interface UserInterface {
    id?: number | null
    email: string
    first_name: string
    last_name: string
    dni: string
    birthday: Date | string
    role: String,
    provider?: string | null
    skip_password_validation?: boolean | null
    password?: string | null
    password_confirmation?: string | null
    uid?: string | null
    allow_password_change?: string | null
    name?: string | null
    nickname?: string | null
    image?: string | null
    second_last_name?: string | null
    picture?: any
    picturePreview?: any
    permissions: PermissionInterface[],
    applicant: ApplicantInterface
}

export interface ProfileInterface {
    first_name: string,
    last_name: string,
    email: string,
    phone: string,
    birthday: Date | string,
    dni: string,
    description: string,
    youtube: string,
    briefcase: string,
    linkedin: string,
}
