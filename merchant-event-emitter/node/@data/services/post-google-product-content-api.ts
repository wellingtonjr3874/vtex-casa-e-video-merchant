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
      "private_key_id": "aef0b3fb23cbf27fda615e324fee784b23ba155b",
      "private_key": "-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQCzXAF03yrsy54G\nIuoi36zARmqy68tNBeC6nG57w4+wLlhY7Uozd9WEWd07hExh/ESJEwXpBBaWDBvT\nHkntXVh+C6a+104Nedl2HREjjAtZdo+sNpmfIV79ML0pyx7YGf5Ks4EfPmg2EhPp\n7mN4DcvQMd2avpxQWb6G49Of5eyKVqh/GQmfqfHpoy/K6LV6udIqjKgdyTERWL3s\nxNv5VXVbD0yo2VYpbaaaJk0Gxm8ZQnG1CtZg0t3JqQHcZZpu/qNo5qbfl0t3tDGs\nz/VwbBkMmVq45HQE7jshPMSdizp+wRnSxIjzeu6em+/YZs9aR3hoBZlQAjHQuA1b\nqK7nZ8NVAgMBAAECggEADnR1Cpf8w+JCHVD9iSt5JvLV4Q8XTqERZEC8t71CTIrj\npGEVWJIJE3ZRmd0W8dOsq1Zs5MNnVZbqvChGAXsDKX9jZCCCghwGnloH2lNMS9y+\nBf1NgrFkECg4KpDb7sMjhx4x4xR6vhbVY4ZKnm+QNDp8l17SxrgA3qqoUMvtNRXV\npf1eQLfugtR6zZco4STCpmwXvUefvaU8AMKZhDdWz5P0mdkz1tKeHzSCOknhntOd\new72vOV6c3Uqg25+K/EgjuoE5xitNeTHr0lUGv/gHQRtEzL2DjssMS0FI6IuQFOS\n/gl7zMdltRo+Uy48r834jDYeR5shyx6NFwQN1ovlSQKBgQDq0smZnsD4gaHZPxc+\nd8k1XJfNo3NvsQ7beHLRvuQ+4Jtmudsb/0IwCEjmtiQbqVL+9OLxTMobUHsoZ0jM\ncZQiFS9C008+X1tpWqMqXJ6pwH6iE7YbDf4ckeRLXojJ4TPAlVnF9MLYFpIw9XxM\nx2fAowaUS5SwH4jteZEQJTdBqQKBgQDDiMH1Hm5DryI0oHGI1VLxApskWbjcZYMn\nxvFRt3AoRNVWA9gcCkeHfnV5Rq46u3mCQJCAFpSZeMw8FjK+b0E1s5us8H4tCFpB\nyuwUn/y8HQb0InV/3RS3jxrnKnet6n4gRYZMxFQxy4ub8a8U5iK4kpGHb5i1k/DR\n5MZ6dnIXzQKBgGnSgCOIlXHoCWX7tp/iH3y6s3ZqeHUXF5j0GNpI6lcjpSSQERv2\n1n8K3L+LyY3lqo9XEIapklLo2/eDRB1N+fG6FkhJLebv1iQOQoWuo5ngM7EarPBY\nR/HcFUOZ4I8Ju+bH52L8QGpdEZiaqF95ZVo8nZRq0yDjtTM/m43pF5OxAoGAL2o2\nPk5GxrrtPH27ikbQegj7vfDT1v32s+qWEg69b8ZhRR5hhUso1T5hFiuBjFRxvpgR\ncj4Hgr+8JsXrQCqSUYdgNKuMrTbdTB786HNzQdp4GTNR8tOVdn2JNI0jwFSgiQrS\n6kKheAG3tPUCU7sKqF9CUulIyp85QmyLhJ68Q/ECgYEApHOjTyQ8hmYzKGm3ZXh1\n//LEj3H6870QZNKWHKPe5iWsPjNZtv5nT6+QxUaE32vrAUNm4YX0OLapbrrxc24d\nKNSAWSG4IsX7xzPS+dEjotOGkLInJgqzXze67CQgRxVLKQEwvHmVZQ5M/xdtg1lE\nIXqt1Ss42uSEG6OpbjCk0+E=\n-----END PRIVATE KEY-----\n",
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





