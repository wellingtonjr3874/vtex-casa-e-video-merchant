
import { IGetProductService } from "../services/iget-product-service";
import { ISkuChangeUseCase } from "./isku-change-use-case";



namespace SkuChangeUseCase {
  export type Props = {
    productDataService: IGetProductService
  }
}

// const MOCK_SELLER = 1
export class SkuChangeUseCase implements ISkuChangeUseCase {
  productDataService: IGetProductService
  constructor({ productDataService }: SkuChangeUseCase.Props) {
    this.productDataService = productDataService
  }

  async execute(item: ISkuChangeUseCase.Props) {
    try {
      await this.productDataService.execute(item.IdSku)
      return
    } catch (err) {
      console.log(err)
      return err as Error
    }
  }
}