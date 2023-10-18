export class SkuNotExist extends Error {
  constructor(skuId: string) {
    super();
    this.message = ` sku with ID ${skuId} not exist or returned empty array`
  }
}