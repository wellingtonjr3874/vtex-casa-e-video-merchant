import { IOClients } from "@vtex/api";
import CatalogService from "../@data/services/catalog-service";

export class Clients extends IOClients {
  public get CatalogSkuRest() {
    return this.getOrSet('CatalogSkuRes', CatalogService)
  }
}