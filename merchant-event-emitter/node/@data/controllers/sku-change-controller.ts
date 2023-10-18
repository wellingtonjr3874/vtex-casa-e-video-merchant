import { ISkuChangeUseCase } from "../use-cases/isku-change-use-case";
import { ISkuChangeController } from "./isku-change-controller"

export class SkuChangeController implements ISkuChangeController {
  private skuChangeUseCase: ISkuChangeUseCase
  constructor(skuChangeUseCase: ISkuChangeUseCase) {
    this.skuChangeUseCase = skuChangeUseCase
  }

  //@ts-ignore
  async execute(props) {
    try {
      const res = await this.skuChangeUseCase.execute(props);
      return res
    } catch (err) {
      console.error(err)
      return
    }
  }
}
