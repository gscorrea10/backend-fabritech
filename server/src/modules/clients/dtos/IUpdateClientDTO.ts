interface IUpdateClientDTO {
  id?: string;
  name?: string;
  cpf: string;
  adress: string;
  kinship?: string;
  updated_at?: Date;
}

export { IUpdateClientDTO };
