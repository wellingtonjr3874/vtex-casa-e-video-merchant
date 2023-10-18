export interface IGetAppSettings {
  execute(appId: string): Promise<{
    client_email: string,
    private_key: string
  }>
}