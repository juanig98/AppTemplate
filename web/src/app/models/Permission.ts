export class Permission {
  id: number;
  name: string;
  content_type_id: string;
  codename: string;

  constructor(
    id?: number,
    name?: string,
    content_type_id?: string,
    codename?: string,
  ) {
    this.id = id ? id : 0;
    this.name = name ? name : "";
    this.content_type_id = content_type_id ? content_type_id : "";
    this.codename = codename ? codename : "";
  }
}
