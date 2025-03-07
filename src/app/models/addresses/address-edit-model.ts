export interface AddressEditModel {
    id: number,
    addressLineOne: string,
    addressLineTwo?: string,
    city: string,
    postCode: string,
    isMain: boolean,
    countryId: number
}