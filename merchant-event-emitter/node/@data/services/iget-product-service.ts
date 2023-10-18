import { Product } from "@vtex/api/lib/clients/apps/catalogGraphQL/product";


export interface IGetProductService {
  execute(productId: string): Promise<Product>
}