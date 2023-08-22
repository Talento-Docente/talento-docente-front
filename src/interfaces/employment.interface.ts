import type { StageConfigurationInterface } from "@/interfaces/stage_configuration.interface";
import type { FlowInterface } from "@/interfaces/flow.interface";

export interface EmploymentInterface {
    id?: number | null
    title: string | null
    description: string | null
    employment_type: string | null
    end_date: string | null
    hours: number | null
    qualification: string | null
    salary: number | null
    schedule_type: string | null
    start_date: string | null
    status?: string | null
    establishment_id?: number | null
    flow_id?: number | null
    flow?: FlowInterface
    stage_configurations: Array<StageConfigurationInterface>
    stage_configurations_attributes: Array<StageConfigurationInterface>
    postulations_resume: any
}

export interface EmploymentResumeInterface {
    created: number,
    closed: number,
    in_progress: number,
}
