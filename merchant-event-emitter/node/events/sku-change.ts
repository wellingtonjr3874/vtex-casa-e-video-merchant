import type { EventContext } from '@vtex/api'
import { skuChangeControllerFactory } from '../factory'
import { Clients } from '../clients';

export async function SkuChange(ctx: EventContext<Clients>) {
  const skuController = skuChangeControllerFactory(ctx);
  await skuController.execute(ctx.body)
  return true
}
