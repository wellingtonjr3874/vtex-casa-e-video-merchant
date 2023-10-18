import { content_v2_1 } from "googleapis/build/src/apis/content";

export namespace IPostGoogleProduct {
  export type Params = content_v2_1.Schema$Product;
}

export interface IPostGoogleProduct {
  execute(params: IPostGoogleProduct.Params): Promise<string>
}