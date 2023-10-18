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
      "project_id": "merchant-center-1605705920540",
      "private_key_id": "5c601eedad6313e88dc03a6682400748d788cf94",
      "private_key": "-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQCv94TZCbt23VJL\n7PDOlFWW76h+raNJKPT8uLM+Bs5A9rQy40jQJqtLgJTJKjtxHaKGOdBM5cKyAKBL\nbB7NHK5ISwiygOkZXimyUKLcwGilhyWscWs5Sd4Pez3/H5T8qP3v+oooRrHesrJx\nDgrZx/EVsBC3NShdxG6LsUyYR2YZ06nDVfzZXTjvSEneQqDoVx9YbhjuQYboLXnR\n/aVZHARFBlQa15t4bS49JyZMddCoEg4yiV2ri6NyDcZKih02zSxfzpEKiKhh4MaQ\nffS04vxGiKN7dSE0vkR9aTN5xvjON4gbSAVdYFSMH5AVGMwmwRpGIVXPHzF/n/vO\nbMoeD7ibAgMBAAECggEABr1GG0HiKiVD16CVgHPx6zv2ihOAY3bsGxm/06pTD+3i\n7OgDi+VPPi8Ig8PYTvbBmL5yGd/a2xJnETxs2ZI1opMtHBkP1Gbk1e18r1O3Lk/E\nw5v8bU9E7/baYwEEpcCbKSvBStWaTlsttmLBS6H6u8foe/vPNfgl+7eopVRmtqpy\nOedJRLwlRfthci0tENqlLTD7t9E3S7mDDsJG/aUz48xQZjlOPLN9jVW0vqR3K0EF\n0BMFVKLWLwuO8ay2csb+dHwRPVkWvVjo2xi/jiJT5sqcAjoa1nPw99cfEfQq3BsO\nD7oAwmHMai+1AAB0zD67n2TSscDTyA8J9jXGydCXsQKBgQDyH3QGGurkgWzlhrhY\n+muXLCgD3nSIwlEPGACmpgGqtaJhhNo/4iw5aGGSYFupN9wZt9CkP2AFSnG4YDXE\nab1LSXua/9ZHv/EySDAb2UGkNrXorxfD/YScJLWHHwvsDn4bSW2c1tiE400eHYnP\nS5Haz6Z+4jCrEIg1wcmiIyM6FwKBgQC6DWRk5KbAu03ipzwHQ2s5CzZIYlGsQRzL\ny5lFsafCGhQrcU15+th9nsqrWEtVXQRHL13O4DhimnqaIXCwKID293gdRC/RmGJm\nyxknGQqYnFDqCYxgN/Yyq4KfzT5VIqpQLqjKZgpHmofeuGECfwgYsWLCrB0UuXaf\nxubG7Ol8HQKBgQC4y9DeKAVHypC2zpA9OUSM6SLRcSQ4jTcY8hTtHJ8BEAiTrbZ2\nM8XVOxndgrXy/bN73ZPdCJHc9+i79JKVCq9zmu5Aayu9L36EBhzR5Iv5LdjBc4IM\nEJ76Hfp+2u9ah+UwJmcG4eP36RSe+6SHFwKHox1Mko7awY90mCexHGhymQKBgDZE\nqb/0Id+dwr4V4aCMvb3J02+RnhkMdQXMwUxe4Xvwd2mkhuDJllQt+Re5jV+83f6V\nhltNc6TvQkuq7V+0sMlYraR7uyb7t9gb7Z5F451YGxHo7xUxvZJSDKvoBgJ3Ng5l\nTb6bvOvd2zvPtBwySX5KX3BBG8prvnokXjQv7nrRAoGAK5+yyH2oD+Clfels+x74\ntsbCWst8uWOaiiJlwTbWRWBHfHvkJj+PPKG5gEFTq8SyIsC012sUn5BrcFLSE9G8\n13mSoeDbTEgAEHBcUmCB9T+HOQd3D9sjP1+JKQi/4m1uedrhsAK4Ufu9+D/ZbnWs\nFNeW7cD1XkX/felLZyI2Ngk=\n-----END PRIVATE KEY-----\n",
      "client_email": "merchant-center-1605705920540@merchant-center-1605705920540.iam.gserviceaccount.com",
      "client_id": "109851471685370972296",
      "auth_uri": "https://accounts.google.com/o/oauth2/auth",
      "token_uri": "https://oauth2.googleapis.com/token",
      "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
      "client_x509_cert_url": "https://www.googleapis.com/robot/v1/metadata/x509/merchant-center-1605705920540%40merchant-center-1605705920540.iam.gserviceaccount.com",
      "universe_domain": "googleapis.com"
    };

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





