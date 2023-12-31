import type {
  IOClients,
  ParamsContext,
  ServiceContext,
  RecorderState,
} from '@vtex/api'
import { Service } from '@vtex/api'
import { createSendEvent } from './routes/notify'
import { getCacheContext, setCacheContext } from './utils/cachedContext'
import { Clients } from './clients'
import { SkuChange } from './events/sku-change'

const TREE_SECONDS_MS = 3 * 1000
const CONCURRENCY = 10

declare global {
  type Context = ServiceContext<IOClients, State>

  interface State extends RecorderState {
    code: number
  }
}

function sendEventWithTimer() {
  setInterval(function () {
    const context = getCacheContext()

    if (!context) {
      console.log('no context in memory')

      return
    }

    return createSendEvent(context)
  }, 30000)
  console.log('FIRED HERE')
}

sendEventWithTimer()

const service = new Service<Clients, State, ParamsContext>({
  clients: {
    implementation: Clients,
    options: {
      events: {
        exponentialTimeoutCoefficient: 2,
        exponentialBackoffCoefficient: 2,
        initialBackoffDelay: 50,
        retries: 1,
        timeout: TREE_SECONDS_MS,
        concurrency: CONCURRENCY,
      },
    },
  },
  events: {
    skuChange: SkuChange
  },
  routes: {
    hcheck: (ctx: any) => {
      setCacheContext(ctx)
      ctx.set('Cache-Control', 'no-cache')
      ctx.status = 200
      ctx.body = 'ok'
    },
  },
})


export default service