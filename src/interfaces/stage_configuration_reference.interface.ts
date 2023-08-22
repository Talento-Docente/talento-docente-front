export interface StageConfigurationReferenceInterface {
    id?: number | string | null
    _destroy?: boolean
    name: string
    description: string
    localStatus?: string
    reference_type: string
    resource_type?: string | null
    resource_id?: number | null
    stage_configuration_id?: number | null
}
