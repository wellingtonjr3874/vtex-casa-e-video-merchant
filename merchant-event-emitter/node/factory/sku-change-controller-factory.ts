import { EventContext } from "@vtex/api";
import { Clients } from "../clients";
import { SkuChangeUseCase } from "../@data/use-cases/sku-change-use-case";
// import { SkuChangeUseCase } from "../@data/use-cases/sku-change-use-case-with-product";
import { SkuChangeController } from "../@data/controllers/sku-change-controller";
import { PostGoogleProductContentApi } from "../@data/services";
// import { GetAppSettings } from "../@data/services/get-app-settings";

export function skuChangeUseCaseFactory() {

}
export function skuChangeControllerFactory(ctx: EventContext<Clients>) {
  const { clients: {
    CatalogSkuRest,
    
    // CatalogSkuGraphql,
    // GetProductRest
  } } = ctx;

  // const getAppSettingsClient = ctx.clients.apps.getAppSettings;
  // const getAppSettingsAdapter = new GetAppSettings(getAppSettingsClient)
  const postProductMerchant = new PostGoogleProductContentApi();
  // const skuChangeUseCase = new SkuChangeUseCase({ catalogService: CatalogSkuGraphql, productPriceService: Pro });
  const skuChangeUseCase = new SkuChangeUseCase({ catalogService: CatalogSkuRest, postProductInMerchant: postProductMerchant });
  const skuChangeController = new SkuChangeController(skuChangeUseCase);
  return skuChangeController
}