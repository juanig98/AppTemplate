export class Client {
  id: number;
  name: string;
  first_name: string;
  last_name: string;
  phone: string;
  telephone: string;
  address_name: string;
  address_number: number;
  address_aclaration: string;
  document: string;
  business_name: string;

  constructor(
    id?: number,
    name?: string,
    first_name?: string,
    last_name?: string,
    phone?: string,
    telephone?: string,
    address_name?: string,
    address_number?: number,
    address_aclaration?: string,
    document?: string,
    business_name?: string,
  ) {
    this.id = id ? id : 0;
    this.name = name ? name : "";
    this.first_name = first_name ? first_name : "";
    this.last_name = last_name ? last_name : "";
    this.phone = phone ? phone : "";
    this.telephone = telephone ? telephone : "";
    this.address_name = address_name ? address_name : "";
    this.address_number = address_number ? address_number : 0;
    this.address_aclaration = address_aclaration ? address_aclaration : "";
    this.document = document ? document : "";
    this.business_name = business_name ? business_name : "";
  }

}
