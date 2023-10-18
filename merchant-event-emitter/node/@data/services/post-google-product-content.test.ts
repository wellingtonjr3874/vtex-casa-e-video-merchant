import { ProductGoogleAdapter } from "../adapters"
import { ProductDTO } from "../dto"
import { Product } from "../entity/Product"
import { MOCK_PRODUCT_RESPONSE } from "../entity/mock-product-response"
import { PostGoogleProductContentApi } from "./post-google-product-content-api"

describe("PostGoogleProductContent", () => {
  it("SHOULD create product with sucess", async () => {
    const postGoogleProductContent = new PostGoogleProductContentApi()
    const productEntity = new Product({ product: MOCK_PRODUCT_RESPONSE as unknown as ProductDTO, selectedSku: "1533494", sellerId: "CV235", vendorAccount: "casaevideo" });
    const productRes = ProductGoogleAdapter(productEntity);
    const res = await postGoogleProductContent.execute(productRes);
    expect(res).toEqual("OK");
  })
})