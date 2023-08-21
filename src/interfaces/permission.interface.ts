import type { EstablishmentInterface } from "@/interfaces/establishment.interface";
import type { UserInterface } from "@/interfaces/user.interface";

export interface PermissionInterface {
    id?: number | null
    permission: string
    user_id: number
    user?: UserInterface
    establishment_id: number
    establishment: EstablishmentInterface
}
