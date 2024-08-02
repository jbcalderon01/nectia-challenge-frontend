import { CommonFilters, IUser, IUserFilters, TPagination } from "../entities";
import { Service } from "./Service.generic";

export class UserServices extends Service {
  static baseUrl =
    "https://ca4olvuww1.execute-api.us-east-1.amazonaws.com/dev/";

  static async getUsers(filters: CommonFilters): Promise<TPagination<IUser>> {
    return this.get(
      `${this.baseUrl}/users?${new URLSearchParams({
        ...filters.pagination,
      } as any)}`
    );
  }

  static async getUserById(id: string): Promise<IUser> {
    return this.get(`${this.baseUrl}/users/${id}`);
  }

  static async createUser(data: Partial<IUser>): Promise<IUser> {
    return this.post(`${this.baseUrl}/users`, data);
  }

  static async updateUser(id: string, data: Partial<IUser>): Promise<IUser> {
    return this.put(`${this.baseUrl}/users/${id}`, data);
  }

  static async deleteUser(id: string): Promise<IUser> {
    return this.delete(`${this.baseUrl}/users/${id}`);
  }
}
