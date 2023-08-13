import type { QuestionInterface } from '@/interfaces/question.interface'
import type { EstablishmentInterface } from '@/interfaces/establishment.interface'

export interface TestInterface {
    id?: number | null
    description?: string | null
    name?: string | null
    time_type?: string | null
    time_value?: string | null
    establishment_id?: number | null
    questions?: Array<QuestionInterface>
    establishment?: EstablishmentInterface
}
