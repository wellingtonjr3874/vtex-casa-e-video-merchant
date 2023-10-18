import { ProductDTO } from "../dto"

export namespace ICatalogService {
  export type Props = {
    skuId: string
  }
}

export interface ICatalogService {
  execute: (props: ICatalogService.Props) => Promise<ProductDTO[]>
}