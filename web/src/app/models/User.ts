export class User {
  id: number;
  username: string;
  email: string;
  first_name: string;
  last_name: string;
  is_active: boolean;
  is_staff: boolean;
  is_superuser: boolean;
  last_login: Date;
  groups: number[];
  user_permissions: number[];
  date_joined: Date;

  constructor(
    id?: number,
    username?: string,
    email?: string,
    first_name?: string,
    last_name?: string,
    is_active?: boolean,
    is_staff?: boolean,
    is_superuser?: boolean,
    last_login?: Date,
    groups?: number[],
    user_permissions?: number[],
    date_joined?: Date,
  ) {
    this.id = id ? id : 0;
    this.username = username ? username : "";
    this.email = email ? email : "";
    this.first_name = first_name ? first_name : "";
    this.last_name = last_name ? last_name : "";
    this.is_active = is_active ? is_active : false;
    this.is_staff = is_staff ? is_staff : false;
    this.is_superuser = is_superuser ? is_superuser : false;
    this.last_login = last_login ? last_login : new Date();
    this.groups = groups ? groups : [];
    this.user_permissions = user_permissions ? user_permissions : [];
    this.date_joined = date_joined ? date_joined : new Date();
  }
}
