import { IPostGoogleProduct } from "./ipost-google-product";

import { google } from "googleapis"
import { GoogleAuth } from 'google-auth-library';
// import { IGetAppSettings } from "./iget-app-settings";

const MERCHANT_ID = "8941422";
// const APP_SETTINGS = process.env.VTEX_ACCOUNT! + process.env.VTEX_APP_ID!

export class PostGoogleProductContentApi implements IPostGoogleProduct {
  // private getAppSettings: IGetAppSettings
  // constructor(getAppSettings: IGetAppSettings) {
  //   // this.getAppSettings = getAppSettings
  // }
  async execute(params: IPostGoogleProduct.Params): Promise<string> {
    const credentials = {
      "type": "service_account",
      "project_id": "merchant-center-1697654551048",
      "private_key_id": "15cbd1c1727b666a60002ffe365a038b14c1c3b8",
      "private_key": "-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQCj9q9beV+TEm/a\nk2zxWM3chwqprGoE0pm8aqCp5JVBT3Kc7Q/RgoofbfO8Mu4gYi7t8wfq1B0ANnoE\nzrkvzgNLR45YMAS+Ot1pKypK+9SvHeN3wQFHJkm8I6CSZIUMT+4M5YmBD/Zn5Lzn\nUfPBwgyiLZjsXgmZ3dvqan0oGQ5KbPjo/YQyHTf7olUhu2gJyjUBdNJa25arPxf7\ne7p4WbGM5iv6kn3eHn6REGeiA3ok25dRp2bK0InAGt2yqaH2+AgeLTP9e33a4Tpc\nu/DC2kWouczZegWUXgDufqRA8Zplfs9t0uqjAq+R/BJ133KcstQ9cU36DCKy3i2f\nXP0iEZ//AgMBAAECggEABk0fe2gfykCHETnhWwTWdjvUXdyHWtFg4QCiDDDdEZNE\n/tgy54BG4H57w5BSXguFpAxpWyAQdGbaa8PgpMl3asyS2BbteypfQmU47RaniS8O\nOvItR+VdA1wOTMsel94KO6Y4o9IP3mdIPKoqZzzyQ32aZv8V5qjWKSZX0kot71jz\nc4dhRE4nPc4AtYrUQX8KMDK3EibJ36Atl8aOSI/fC+iSIhMwxHHALEZ0TftVgpXY\ngDbHbMbjmlDRtSRLjnpKEeeipuSRXYuUYzgvLh8khjlAnYns0rAFPXy1XK7WD8LF\n5q2IQk8Hb6HF10YLils7LfS0HD4Gk8uB64MFXFSNCQKBgQDO8tm0WKbjV2Rmk/hH\n7eEPp480hI4mJ0449JHWte70frYlz/BWq4zJn58rUSQ7mbnSCtaQ1Guk5Up5Eoua\nPuHWFCNB/RMTJkXTh0YebjexEtpnxpeJdnL4jAjvv9T8uvXw/lrYYqO0iABEDqHE\nhNvhXHIuzjSbcyyzU6Nc6P4jiQKBgQDK05sjfx4qepoZFhxyG7xH/oI/pnjwlBx7\ngndY/dcMgPkcg1HKxPm2A9dTsVwcxS1KfKo0eCi6Elj5z5dTuDfxazAR4MZdq1dn\nGeE7LBzIaikDuM+sXvD8dJYZxctdUR74cGIhWqyeFeQL68lXMSKrHXiQEJSsZxXg\n0lWOxwVdRwKBgD2WqJOzjnc6GvcsMke107UE+Ol4SZWxPOZWYtCzdFnvG+ZE7BHf\nHBclGgmaLF5QcazA7PpNPXvlgTRnAIT3Ed7UP2n0FykryrwZFhUYWBqqsbUQtSiD\nx9OQWViAjrJoMal3CTI8qNuhXfLjJ+GEaKu5B4JGfAGHVVZJHeUYsgmBAoGAEsBr\niGWZOV4qXwVfTeFoj9Nk4VOXvM5Er9qJBC47sok9/rfZWQDLAVvrjW5JUNOd81QB\nPGabhVBq73WUzQWsDmLVh+GbFU/g/cQzwY+7fX/rGM/+SzZf20dAFVPnEFKOpXNm\nbyT97oOhmMSM0cXWKbHI0rDlveat7CImDNQzl8MCgYEAvro3HCRLz707VbyZVEfk\nFxISlu+bzXBb5KqccJdoOv1oAWqzuzIpI2x13Ppl8kELBUCxJop+Hw7iQyM+EQYo\nNuL/Y5VJWyHGUceXmuRftUQCZYnwgf5Hs99XgUAsVR/dKlKEKZcn3EmDSGu/bh6L\nZ/AEjOuCJIGBnbHhKMA8LNk=\n-----END PRIVATE KEY-----\n",
      "client_email": "merchant-center-1697654551048@merchant-center-1697654551048.iam.gserviceaccount.com",
      "client_id": "104357722040250638311",
      "auth_uri": "https://accounts.google.com/o/oauth2/auth",
      "token_uri": "https://oauth2.googleapis.com/token",
      "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
      "client_x509_cert_url": "https://www.googleapis.com/robot/v1/metadata/x509/merchant-center-1697654551048%40merchant-center-1697654551048.iam.gserviceaccount.com",
      "universe_domain": "googleapis.com"
    }

    const authClient = await new GoogleAuth({
      credentials,
      scopes: 'https://www.googleapis.com/auth/content',
    }).getClient()

    google.options({
      auth: authClient as any,
    });

    const content = google.content({
      version: 'v2.1',
    });

    const res = await content.products.insert({ requestBody: params, merchantId: MERCHANT_ID })
    return res.statusText
  }
}





