export class SkuIsUnavailable extends Error {
  constructor(skuId: string) {
    super()
    this.message = `sku with id ${skuId} is unavailable`
  }
}