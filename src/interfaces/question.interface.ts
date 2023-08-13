import type { AlternativeInterface } from '@/interfaces/alternative.interface'

export interface QuestionInterface {
    id?: number | string | null
    localStatus?: string | null
    _destroy?: boolean | null
    group: string | null
    hint: string | null
    order_number: number | null
    question: string | null
    question_type: string | null
    value: number | null
    test_id?: number | null
    alternatives?: Array<AlternativeInterface>
    alternatives_attributes?: Array<AlternativeInterface>
}
