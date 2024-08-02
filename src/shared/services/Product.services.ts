import { CommonFilters, IProduct, TPagination } from "../entities";
import { Service } from "./Service.generic";

export class ProductServices extends Service {
  static baseUrl = "https://ca4olvuww1.execute-api.us-east-1.amazonaws.com/dev";
  static async getProducts(
    filters: CommonFilters
  ): Promise<TPagination<IProduct>> {
    return this.get(
      `${this.baseUrl}/products?${new URLSearchParams({
        ...filters.pagination,
      } as any)}`
    );
  }

  static async getProductById(id: string): Promise<IProduct> {
    return this.get(`${this.baseUrl}/products/${id}`);
  }

  static async createProduct(data: Partial<IProduct>): Promise<IProduct> {
    return this.post(`${this.baseUrl}/products`, data);
  }

  static async updateProduct(
    id: string,
    data: Partial<IProduct>
  ): Promise<IProduct> {
    return this.put(`${this.baseUrl}/products/${id}`, data);
  }

  static async deleteProduct(id: string): Promise<IProduct> {
    return this.delete(`${this.baseUrl}/products/${id}`);
  }
}
