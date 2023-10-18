import { ProductDTO } from "../dto"

export namespace IProductPriceService {
  export type Props = {
    id: string
    quantity: number
  }[]
}

export interface IProductPriceService {
  execute(props: IProductPriceService.Props): Promise<ProductDTO[] | Error>
}