import { AddressDetailsModel } from "../addresses/address-details-model";
import { EmailDetailsModel } from "../emails/email-details-model";
import { PhoneNumberDetailsModel } from "../phoneNumbers/phoneNumber-details-model";
import { UserDetailsModel } from "../users/user-profile-model";

export interface CustomerDetailsModel {
    user: UserDetailsModel,
    addresses: AddressDetailsModel[],
    phoneNumbers: PhoneNumberDetailsModel[],
    emails: EmailDetailsModel[],
}