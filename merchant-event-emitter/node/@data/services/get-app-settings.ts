import { IGetAppSettings } from "./iget-app-settings";

export class GetAppSettings implements IGetAppSettings {
  private vtexGetAppSettingsClient: (appId: string) => Promise<{ client_email: string; private_key: string; }>
  constructor(vtexClient: (appId: string) => Promise<{ client_email: string; private_key: string; }>) {
    this.vtexGetAppSettingsClient = vtexClient

  }
  async execute(appId: string): Promise<{ client_email: string; private_key: string; }> {
    const res = await this.vtexGetAppSettingsClient(appId)
    return res
  }
}