import type { PermissionInterface } from "@/interfaces/permission.interface";

export interface UserInterface {
    id?: number | null
    email: string | null
    provider?: string | null
    skip_password_validation?: boolean | null
    password?: string | null
    password_confirmation?: string | null
    uid?: string | null
    allow_password_change?: string | null
    name?: string | null
    nickname?: string | null
    image?: string | null
    first_name: string | null
    last_name: string | null
    second_last_name: string | null
    dni: string | null
    picture?: any
    picturePreview?: any
    x?: any
    birthday: Date | null
    deleted_at?: Date | null
    role: String,
    permissions: PermissionInterface[]
}
