import { JanusClient, InstanceOptions, IOContext } from '@vtex/api'
import { IProductPriceService } from './iproduct-price-service'

const MOCK_AFFILIATE_ID = 'LLM'

export default class ProductPriceService extends JanusClient implements IProductPriceService {
  public constructor(ctx: IOContext, options?: InstanceOptions) {
    super(ctx, {
      ...options,
      headers: {
        ...(options && options.headers),
        Accept: 'application/vnd.vtex.ds.v10+json',
        ...(ctx.adminUserAuthToken
          ? { VtexIdclientAutCookie: ctx.adminUserAuthToken }
          : null),
        ...(ctx.storeUserAuthToken
          ? { VtexIdclientAutCookie: ctx.storeUserAuthToken }
          : null),
        VtexIdclientAutCookie: ctx.authToken,
        'X-Vtex-Use-Https': 'true',
      },
    })
  }
  public async execute(items: IProductPriceService.Props) {
    const data = await this.http.post<any>(`/api/fulfillment/pvt/orderForms/simulation?&affiliateId=${MOCK_AFFILIATE_ID}`, JSON.stringify({
      items
    }))
    return data
  }
}