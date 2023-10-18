import { ProductInputDTO } from "../dto"

export namespace ISkuChangeUseCase {
  export type Props = ProductInputDTO

  export type Res = {
    error: boolean,
    message: string
  }
}

export interface ISkuChangeUseCase {
  execute: (props: ISkuChangeUseCase.Props) => Promise<void | Error>
}