<sub>**Go back to the [index](https://github.com/fastify/fastify-dx/blob/main/packages/fastify-dx-vue/README.md).**</sub>

<br>

## Basic setup

The [starter template](https://github.com/fastify/fastify-dx/tree/dev/starters/vue) follows [fastify-vite](https://github.com/fastify/fastify-vite)'s convention of having a `client` folder with an `index.js` file, which is automatically resolved as your `clientModule` setting. 

If you want flat directory setup, where server and client files are mixed together, you can manually set `clientModule` to something else. Note that in this case you'll also need to update `root` in your `vite.config.js` file.

When deploying to production, bear in mind the `client/dist` directory, generated when you run `npm run build`, needs to be included. You'll also want to enable Fastify's [built-in logging](https://www.fastify.io/docs/latest/Reference/Logging/):

```js
const server = Fastify({ logger: true })
```

The starter template's `server.js` file:

```js
import Fastify from 'fastify'
import FastifyVite from 'fastify-vite'
import FastifyDXVue from 'fastify-dx-vue'

const server = Fastify()

await server.register(FastifyVite, { 
  root: import.meta.url, 
  renderer: FastifyDXVue,
})

await server.vite.ready()
await server.listen({ port: 3000 })
```

The starter template's [`vite.config.js`](https://github.com/fastify/fastify-dx/blob/main/starters/vue/vite.config.js) file:

```js
import viteVue from '@vitejs/plugin-vue'
import viteVueFastifyDX from 'fastify-dx-vue/plugin'
import unocss from 'unocss/vite'

const path = fileURLToPath(import.meta.url)

const root = join(dirname(path), 'client')
const plugins = [
  viteVue(), 
  viteVueFastifyDX(), 
  unocss()
]

export default { root, plugins }
```

Note that you only need to use Fastify DX's Vite plugin, which includes all functionality from [fastify-vite](https://github.com/fastify/fastify-vite)'s Vite plugin.

</td>
</tr>
</table>
