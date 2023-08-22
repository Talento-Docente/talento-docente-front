import type { StageInterface } from "@/interfaces/stage.interface";

export interface FlowInterface {
    id?: number | null
    establishment_id: number | null
    name: string
    description: string,
    stages?: Array<StageInterface>
    stages_attributes?: Array<StageInterface>
}
