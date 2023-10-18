import { ICatalogService } from "./icatalog-service";
import { AppGraphQLClient, IOContext, InstanceOptions } from "@vtex/api";

import { ProductDTO } from "../dto";
//@ts-ignore
const GET_PRODUCT_QUERY = `
    product( identifier: {field: sku, value: "2147322702"} ){ 
            items{
              name
              sellers{
                sellerName
                sellerId
                sellerDefault
                commertialOffer{
                  ListPrice
                  Price
                  spotPrice
                  PriceWithoutDiscount
                  AvailableQuantity
                }
              }
            }
        }
`


export class CatalogServiceWithGraphql extends AppGraphQLClient implements ICatalogService {
  constructor(ctx: IOContext, opts?: InstanceOptions) {
    super("vtex.search-resolver@0.x", ctx, opts)
  }

  async execute(props: ICatalogService.Props) {
    const { data } = await this.graphql.query<ProductDTO, ICatalogService.Props>(
      {
        query: `query GET_PRODUCT($field: String, $skuId: String) { product( identifier: {field: sku, value: "2147322702"} ){ 
                items{
                  name
                  sellers{
                    sellerName
                    sellerId
                    sellerDefault
                    commertialOffer{
                      ListPrice
                      Price
                      spotPrice
                      PriceWithoutDiscount
                      AvailableQuantity
                    }
                  }
                }
            }
          }`, variables: {
          skuId: props.skuId,
        }
      },
    )
    //@ts-ignore
    return data.response.data
  }
}

