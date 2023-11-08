

import type { Item, Seller, Product as ProductType } from './types/Product'
import { SkuIsUnavailable } from "./errors";

export namespace Product {
  export type Props = {
    product: ProductType,
    selectedSku: string,
    sellerId?: string,
    vendorAccount: string
  }
}

const DEFAULT_SELLER = "1";
const PIX_PROMOTION_NAME = "pix";
const MOCKED_CONDITION = "new"
const MOCKED_AVAILABILITY = {
  inStock: "in stock",
  outOfStock: "out of stock"
}

export const DEFAULT_CURRENCY = "BRL";


type Price = {
  currency: string,
  value: string
}

type PriceProps = {
  price: Price,
  salePrice?: Price
}

export class Product {
  readonly id: string
  readonly offerId: string
  readonly title: string
  readonly description: string
  readonly product_type: string
  readonly brand: string
  readonly mpn: string
  readonly gtin: string
  readonly link: string
  readonly image_link: string
  readonly price: number
  readonly sale_price: number
  readonly availability: string
  readonly condition: string
  readonly installments: {
    months: number
    amount: number
  }
  readonly custom_label_0: "1P" | "3P"
  readonly custom_label_1: string
  readonly custom_label_2: string

  constructor({ product, selectedSku, vendorAccount }: Product.Props) {

    const selecteDefaultSku = this.selectedItem(selectedSku, product);
    const selectedDefaultSkuSeller = this.selecteDefaultSkuSeller(selecteDefaultSku);


    
    if (!selectedDefaultSkuSeller.commertialOffer.IsAvailable) {
      throw new SkuIsUnavailable(selecteDefaultSku.itemId)
    }
    this.id = selecteDefaultSku.itemId;
    this.offerId = this.getOfferId(product.productId, selecteDefaultSku.itemId);
    this.title = selecteDefaultSku.name
    this.description = product.description.replace(/\s+/g, ' ').trim()
    this.product_type = this.getProductCategory(product.categories);
    this.image_link = this.getImageLink(selecteDefaultSku);
    this.brand = product.brand;
    this.mpn = selecteDefaultSku.itemId;
    this.gtin = selecteDefaultSku.ean;
    this.link = this.productLink(product.link, vendorAccount, selecteDefaultSku.itemId);
    this.price = selectedDefaultSkuSeller.commertialOffer.Price;
    this.sale_price = this.getSalePrice(selectedDefaultSkuSeller)
    this.availability = this.getAvailableProduct(selectedDefaultSkuSeller);
    this.condition = MOCKED_CONDITION
    this.installments = this.getInstallments(selectedDefaultSkuSeller)

    this.custom_label_2 = selectedDefaultSkuSeller.sellerName
    this.custom_label_1 = selectedDefaultSkuSeller.sellerId
    this.custom_label_0 = this.getCustomLabel0(selectedDefaultSkuSeller)
  }

  private getOfferId(productId: string, skuId: string) {
    return `${productId}_${skuId}`
  }

  private getInstallments(selecteDefaultSkuSeller: Seller) {
    const [firsInstallmentProvider] = selecteDefaultSkuSeller.commertialOffer.PaymentOptions.installmentOptions;

    const lastInstallmentProvider = firsInstallmentProvider.installments.pop()!
    const { count, value } = lastInstallmentProvider;
    const formatedInstallmentValue = value / 100;


    return {
      months: count,
      amount: formatedInstallmentValue
    }
  }

  getPrice(): PriceProps {

    const price = {
      currency: DEFAULT_CURRENCY,
      value: `${this.price}`
    }
    if (this.sale_price === this.price) {
      return {
        price
      }
    } else {
      return {
        price,
        salePrice: {
          currency: DEFAULT_CURRENCY,
          value: `${this.sale_price}`
        }
      }
    }
  }

  private productLink(link: string, vendorAccount: string, skuId: string) {
    const separator = "/"
    const splitedLink = link.split(separator);
    const splitedLinkLenght = splitedLink.length;
    const res = splitedLink.splice(splitedLinkLenght - 2, splitedLinkLenght)
    const linkWithVendorLink = `https://www.${vendorAccount}.com.br/${res.join("/")}?idsku=${skuId}`
    return linkWithVendorLink
  }

  private getAvailableProduct(selectedSeller: Seller) {
    return selectedSeller.commertialOffer.AvailableQuantity > 0 ? MOCKED_AVAILABILITY.inStock : MOCKED_AVAILABILITY.outOfStock
  }
  private getSalePrice(selectedSkuSeller: Seller) {

    const pixMethod = selectedSkuSeller.commertialOffer.Installments.find(item => item.PaymentSystemName.toLocaleLowerCase() === PIX_PROMOTION_NAME);
    if (pixMethod) {
      return pixMethod.Value
    }
    return selectedSkuSeller.commertialOffer.Price
  }

  private getImageLink = (selectedSku: Item) => {
    const [firstImage] = selectedSku.images;
    return firstImage.imageUrl
  }
  private getProductCategory(categories: string[]) {
    const [firstCategorie] = categories
    const splitedCategories = firstCategorie.split('/')
    splitedCategories.pop(); splitedCategories.shift();
    const data = splitedCategories.join(" > ");
    return data;
  }

  private selectedItem(skuId: string, product: ProductType) {
    const data = product.items.find(item => item.itemId === skuId);
    return data!
  }

  private selecteDefaultSkuSeller(selectedDefaultSku: Item) {
    const defaultSeller = selectedDefaultSku.sellers.find(item => item.sellerDefault)
    return defaultSeller!
  }

  private getCustomLabel0(selectedSeller: Seller) {
    if (DEFAULT_SELLER != selectedSeller.sellerId) {
      return "3P"
    }
    return "1P"
  }

}