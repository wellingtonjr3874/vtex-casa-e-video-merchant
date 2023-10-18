import { DEFAULT_CURRENCY, Product } from "../entity/Product";
import { IPostGoogleProduct } from "../services/ipost-google-product";

///mock channel could it be local or online
const MOCK_CHANNEL = "online";

//mock target country
const MOCK_TARGET_COUNTRY = "BR";
const MOCK_CONTENT_LANGUAGE = "pt"

type Price = {
  currency: string,
  value: string
}

type PriceProps = {
  price: Price,
  salePrice?: Price
}
export function productGoogleAdapter(params: Product, price: PriceProps): IPostGoogleProduct.Params {
  return {
    id: params.id,
    title: params.title,
    ...price,
    brand: params.brand,
    imageLink: params.image_link,
    availability: params.availability,
    condition: params.condition,
    gtin: params.gtin,
    mpn: params.mpn,
    customLabel0: params.custom_label_0,
    customLabel1: params.custom_label_1,
    customLabel2: params.custom_label_2,
    installment: {
      amount: {
        currency: DEFAULT_CURRENCY,
        value: `${params.installments.amount}`
      },
      months: `${params.installments.months}`
    },
    productTypes: [params.product_type],
    offerId: params.offerId,
    description: params.description,
    link: params.link,
    channel: MOCK_CHANNEL,
    targetCountry: MOCK_TARGET_COUNTRY,
    contentLanguage: MOCK_CONTENT_LANGUAGE,
  }
}