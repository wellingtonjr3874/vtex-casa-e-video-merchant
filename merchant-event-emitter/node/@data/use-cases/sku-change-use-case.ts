import { productGoogleAdapter } from "../adapters";
import { Product } from "../entity/Product";
import { SkuNotExist } from "../errors/sku-not-exist";
import { ICatalogService } from "../services";
import { IPostGoogleProduct } from "../services/ipost-google-product";
import { ISkuChangeUseCase } from "./isku-change-use-case";
namespace SkuChangeUseCase {
  export type Props = {
    // productDataService: IGetProductService
    catalogService: ICatalogService
    postProductInMerchant: IPostGoogleProduct
  }
}

// const MOCK_SELLER = 1
export class SkuChangeUseCase implements ISkuChangeUseCase {
  private catalogService: ICatalogService
  private postProductMerchant: IPostGoogleProduct
  constructor({ catalogService, postProductInMerchant }: SkuChangeUseCase.Props) {
    this.catalogService = catalogService
    this.postProductMerchant = postProductInMerchant
  }

  //@ts-ignore
  async execute(item
    : ISkuChangeUseCase.Props) {
    const [res] = await this.catalogService.execute({ skuId: item.IdSku });
    if (!res) {
      throw new SkuNotExist(item.IdSku)
    }

    const productEntity = new Product({ product: res, selectedSku: item.IdSku, sellerId: item.SellerChain, vendorAccount: item.An });
    const productGoogleWithAdapter = productGoogleAdapter(productEntity, productEntity.getPrice());
    await this.postProductMerchant.execute(productGoogleWithAdapter);
    return
  }
}