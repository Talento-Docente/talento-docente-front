import type { StageInterface } from "@/interfaces/stage.interface";

export interface FlowInterface {
    id?: number | null
    establishment_id: number | null
    name: string | null
    description: string | null,
    stages?: Array<StageInterface>
}
