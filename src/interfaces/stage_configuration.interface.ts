import type { StageConfigurationReferenceInterface } from "@/interfaces/stage_configuration_reference.interface";

export interface StageConfigurationInterface {
    id?: number | string | null
    _destroy?: boolean
    localStatus?: string
    employment_id?: number | null
    stage_id?: number | string | null
    stage_configuration_references: Array<StageConfigurationReferenceInterface>
    stage_configuration_references_attributes: Array<StageConfigurationReferenceInterface>
}
