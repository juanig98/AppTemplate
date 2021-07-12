export class User {
  id: number;
  username: string;
  email: string;
  first_name: string;
  last_name: string;
  definedAt: Date;

  constructor(
    id?: number,
    username?: string,
    email?: string,
    first_name?: string,
    last_name?: string,
    defineAt?: Date,
  ) {
    this.id = id ? id : 0;
    this.username = username ? username : "";
    this.email = email ? email : "";
    this.first_name = first_name ? first_name : "";
    this.last_name = last_name ? last_name : "";
    this.definedAt = defineAt ? defineAt : new Date();
  }
}
