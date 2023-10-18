import { ProductInputDTO } from "../dto"

export namespace ISkuChangeController {
  export type Res = {
    data?: any
    statusCode: number
    message: string
  }
}
export interface ISkuChangeController {
  execute: (props: ProductInputDTO) => Promise<ISkuChangeController.Res | Error>
}