
import Fastify from 'fastify'
import FastifySensible from 'fastify-sensible'
import FastifyPlugin from 'fastify-plugin'
import FastifyVite from 'fastify-vite'

import { 
  devLogger, 
  resolveInit, 
  getContext,
} from './utils.mjs'

export async function setup (context, dispatcher) {  
  const { init, renderer, root, dev, server, tenants } = context

  const app = Fastify({
    logger: {
      prettyPrint: dev ? devLogger : false,
    }
  })

  await app.register(FastifySensible)
  await app.register(FastifyVite, { root, renderer })
  await app.vite.ready() 

  if (typeof init === 'function') {
    const initializer = FastifyPlugin(async function () {
      await init(app, context)
    })

    await app.register(initializer)
  }

  return app
}

export async function listen (app, { dev, port, host }) {
  if (dev) {
    app.log.info('Development mode is enabled')
  }
  await app.listen(port, host)
}