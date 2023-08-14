export interface StageInterface {
    id?: number | null | string
    _destroy?: boolean
    localStatus?: string | null
    flow_id?: number | null
    name: string | null
    order_number: number | null
    description: string | null
    stage_type: string | null,
    error?: boolean | null
}
