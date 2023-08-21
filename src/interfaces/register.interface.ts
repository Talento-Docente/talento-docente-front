import type { EstablishmentInterface } from "@/interfaces/establishment.interface";

export interface RegisterInterface {
    id?: number | null
    name: string
    last_name: string
    first_name: string
    email: string
    dni: string
    birthday: string
    password: string
    password_confirmation: string
}

export interface SendRegisterInterface {
    register_type: string
    user: RegisterInterface,
    establishment: EstablishmentInterface
}
