
import "dotenv/config"
import { google } from "googleapis"
import { GoogleAuth } from 'google-auth-library';
import { content_v2_1 } from "googleapis/build/src/apis/content";
// import { IGetAppSettings } from "./iget-app-settings";

import type { Product as ProductType} from "./types/Product";
import { Product, DEFAULT_CURRENCY } from "./product";
const VENDOR_ACCOUNT = "casaevideo"

async function getSkUproduct(skuids: string){
    const tratedSkuId = skuids.split(",").join("&fq=skuId:")
    const finalUrl = process.env.GET_SKU_URL + tratedSkuId
    const res = await fetch(finalUrl, {
     headers: {
            'X-VTEX-API-AppKey': `${process.env.VTEX_APP_KEY}`,
            'X-VTEX-API-AppToken': `${process.env.VTEX_APP_TOKEN}`
     }
});
    const body = res.json();
    return body
}


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
export function productGoogleAdapter(params: Product, price: PriceProps): content_v2_1.Schema$Product {
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

async function postProductInMerchant(params: Product){
     const credentials = {
        "type": "service_account",
        "project_id": "merchant-center-1691409606367",
        "private_key_id": "81440d13a84ef16bfb90f9834c52cb00f07cde40",
        "private_key": "-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQCuBbCb8XqUp0hj\nwv8MVHbdIkKXXPKt/eIhZIqr5u18lV8YfrUD8jwkitFG6WpLNeFbET2ByXtYf0C7\nM3iaAtOeDnDjYR8iNZblRWxJesETekoqMzjItiEWBAd/viPie0rAvcN8CeHAEHe5\nOaKNRMfAkRYwSXei5b91bc4J4X8dyY4dnhsp0XvO+JDoK4DXXuj/F8WL+FE/f+/I\nAf18WnwYWzHBTdehmQJhlWslYFv6vdUlcvCPuRbJsqoDqIEhzwN50SHPxBuS9wIh\nAlCi7QqnV9VZGGSNUblH5WvHMUYqwV4/SGKuYJdRmXrqVW5C7dX405MTiXB99NvT\nX4zYSB5pAgMBAAECggEAEvUsubhTTclxgei2xz2WW13Fml62U00SqueckcCNA6L0\nIqN/DciAU8zJoqt/+GSMwdJ9fFuaM9hdEWe4jjKboh7ZnnOwpBXpc92dv91/FiOe\n270LxRXOQes7c+efWidrS9cAak1bSgShPkzwj+o7xpcnryf5wAW+V0kYhowJwJFM\nALoKHAzfSqerLNdL1vszmLZCG11hVbX5CK4l/ywGeBRGWloyL9zbrqr0R7A6iOUx\nCk7qNHL15TO6Y04kMA2GnqO5W3wu67NR5j0pocnnme7bphPud2oehfSVRErU88t+\nh7YYAMbh/OiJCvPZdZe/5my1e2dvhmdeFJdsW/xBGQKBgQDc2ZncQqjwpzpUGUnF\n//19BmwOMGkxJ0tPHrC33E7t6xJezyzPgkoJ0IYxYsEArBAPfcvdAiyZmPgaLMwm\nHq7MapUnY9SNFfv+H4127raE0BpFXK/oVlWpGMq/DzmPJNgfLitpS42Tl1qDChp2\nwHU9FA5VljWkfGskzYEUdyqhRQKBgQDJuB6bOyvwDjJP7/qJS44mgHdDoBBmbKxc\n3lfdAFaCUoyGMI3WgyHhHYYXzHcCfEfVV58rYnqQ8Q98UGWCG23bXhtnAbDBtsFW\nGQxL5FBKN3a7tzgvN7wLBJeS9b7WUlLw0eALshJvkxJPcFMw+OqtEyW7/Q1pla80\nLsgUUvcw1QKBgQCI9f3AJirlC6BVtVUWELpghdIPPqCN1iOTDqJjc6ITVDwRRgQx\nMEjAK2x9RhQRWaOgJ9B84DNOkhoTCYMVhOO8a8DSK8wOLvsWzvSJNGNGnFQefeut\nd5UqB/D8afG1PxE0zQopA6zqQevk5ighSxup5D07gKsFtg8wRK3vRjPOzQKBgGWu\n1l7RuRhNT7dT9Sr4VzO5VmVUbm/zH//AZPIWlYUkL4oFN7qGZ7GevFWK0AMEuwEk\nJiwsfDRMD85OiJzJTtth2NZX184OXe8UuUoYURDYXJXLihrjMXssWWvPTN+kqAKV\nCSdcIEb2ECjTKlxpXYLZQBA/Q1+SALuBSYJVQB3xAoGAa3g9egQWyra6Ndc7RTuw\nos2L0RbDEFX75NeymHv4oTRD44/KMrPEpXnSJEv3Au5I2rPZPoNYQg6v8m4ad1tz\nfOa+x6KRC5K7GPKFiU3eURxCaZOZuGoA75/vMBlapzBDmeuVXXciHGSN0CMBt+cC\nt4LBxpnABHDlGoeN3fR13Kw=\n-----END PRIVATE KEY-----\n",
        "client_email": "merchant-center-1691409606367@merchant-center-1691409606367.iam.gserviceaccount.com",
        "client_id": "102210462404759319373",
        "auth_uri": "https://accounts.google.com/o/oauth2/auth",
        "token_uri": "https://oauth2.googleapis.com/token",
        "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
        "client_x509_cert_url": "https://www.googleapis.com/robot/v1/metadata/x509/merchant-center-1691409606367%40merchant-center-1691409606367.iam.gserviceaccount.com",
        "universe_domain": "googleapis.com"
      }
      
  
  
      const authClient = await new GoogleAuth({
        credentials,
        scopes: 'https://www.googleapis.com/auth/content',
      })
  
      google.options({
        auth: authClient
      });
  
      const content = google.content({
        version: 'v2.1',
      });

      const tratedProduct = productGoogleAdapter(params, params.getPrice())
  
     const res =  await content.products.insert({ requestBody: tratedProduct, merchantId: process.env.MERCHANT_ID })

      console.log('posted products', params.offerId, res.status)
}
async function startService(){

    let initialSkuid =  "1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20";
    const promisses = [getSkUproduct(
        initialSkuid
    )]
 
    for await(const data of promisses){
        if(data.length !== 0){
            let incrementedSkuIds = initialSkuid.split(",").map(id => Number(id) + 20).join(',');
            const products = data.map((item: ProductType) => {
                const selectedSkuId = item.items.find(itemSku => initialSkuid.split(",").includes(itemSku.itemId));
                try{
                  const product = new Product({product: item, selectedSku:  selectedSkuId!.itemId, vendorAccount: VENDOR_ACCOUNT})
                     return product
                }catch(err){
                    // console.error(err)
                }
            })

            const composePromises = products.map((product: Product) => postProductInMerchant(product))

            try{
                await Promise.allSettled(composePromises)
            }catch(err){
                console.error(err)
            }finally{
                initialSkuid = incrementedSkuIds
                promisses.push(getSkUproduct(incrementedSkuIds))
            }
        }else{
            return
        }
    }
}

startService();
