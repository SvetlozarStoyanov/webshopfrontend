export interface AddressDetailsModel {
    id: number,
    addressLineOne: string,
    addressLineTwo?: string,
    city: string,
    postCode: string,
    isMain: boolean,
    countryId: number
}