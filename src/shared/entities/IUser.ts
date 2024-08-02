export interface IUser {
  _id: string;
  first_name: string;
  last_name: string;
  email: string;
  username: string;
  date_of_birth: Date;
  created_at: Date;
  updated_at: Date;
}

export type IUserFilters = {
  username?: string;
  email?: string;
};
