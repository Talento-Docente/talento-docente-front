import type { UserInterface } from "@/interfaces/user.interface";
import type { WorkExperienceInterface } from "@/interfaces/work_experience.interface";
import type { AcademicTrainingInterface } from "@/interfaces/academic_training.interface";
import type { SkillInterface } from "./skill.interface";

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
    work_experiences: Array<WorkExperienceInterface>
    academic_trainings: Array<AcademicTrainingInterface>
    skills: Array<SkillInterface>
}
