import { JanusClient, InstanceOptions, IOContext } from '@vtex/api'
import { ICatalogService } from '.'

export default class CatalogService extends JanusClient implements ICatalogService {
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

  public async execute({ skuId }: ICatalogService.Props) {
    const data = await this.http.get(`/api/catalog_system/pub/products/search?fq=skuId:${skuId}`)
    return data

  }
} 