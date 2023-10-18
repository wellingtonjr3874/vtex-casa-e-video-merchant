import { JanusClient, InstanceOptions, IOContext } from '@vtex/api'
import { IGetProductService } from './iget-product-service'

export default class GetProductService extends JanusClient implements IGetProductService {
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
  public async execute(productId: string) {

    const data = await this.http.get<any>(`/api/catalog_system/pub/products/variations/${productId}`)
    return data
  }
}