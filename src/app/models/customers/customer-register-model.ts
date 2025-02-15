import { AddressCreateModel } from "../addresses/address-create-model";
import { EmailCreateModel } from "../emails/email-create-model";
import { PhoneNumberCreateModel } from "../phoneNumbers/phoneNumber-create-model";

export interface CustomerRegisterModel {
    addresses: AddressCreateModel[],
    phoneNumbers: PhoneNumberCreateModel[],
    emails :  EmailCreateModel[]
}