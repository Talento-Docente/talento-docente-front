import type { EmploymentInterface } from "@/interfaces/employment.interface";
import type { EstablishmentInterface } from "@/interfaces/establishment.interface";

export interface PostulationInterface {
    id?: number | null | string
    applicant_id: number
    employment_id: number
    stage_id: number,
    created_at?: string,
    employment?: EmploymentInterface
    establishment?: EstablishmentInterface
}
