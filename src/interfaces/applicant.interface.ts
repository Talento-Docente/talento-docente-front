import type { UserInterface } from "@/interfaces/user.interface";

export interface ApplicantInterface {
    id?: number | null
    description: string
    profesional_experience: string | null
    phone: string
    youtube: string
    linkedin: string
    briefcase: string
    twitter: string | null
    english_level: string | null
    curriculum?: any
    curriculumPreview?: any
    user: UserInterface
    user_attributes?: UserInterface
}
