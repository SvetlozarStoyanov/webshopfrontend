import { CustomerRegisterModel } from "../customers/customer-register-model";

export interface UserRegisterModel {
    userName: string,
    firstName: string,
    middleName?: string,
    lastName: string,
    password: string,
    customer: CustomerRegisterModel
}