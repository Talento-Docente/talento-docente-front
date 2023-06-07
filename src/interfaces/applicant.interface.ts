import type { UserInterface } from "@/interfaces/user.interface";

export interface ApplicantInterface {
    id?: number | null
    description: string | null
    profesional_experience: string | null
    phone: string | null
    youtube: string | null
    linkedin: string | null
    briefcase: string | null
    twitter: string | null
    english_level: string | null
    curriculum?: any
    curriculumPreview?: any
    user: UserInterface
    user_attributes?: UserInterface
}
