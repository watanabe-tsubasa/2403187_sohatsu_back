import { Hono } from 'hono'
import { cors } from 'hono/cors'
const app = new Hono()

app.use('/api/*', cors())
app.get('/', (c) => c.text('Hello Cloudflare Workers!'))
app.post(
  '/api/v1',
  async (c) => {
    const post = await c.req.json<{ message: string }>();
    const res = await fetch('https://script.google.com/macros/s/AKfycbwL7KsaGeeFmhxN4LfTpjltiy_Ir1xiZ0HE-d7LZZPPcMLjLPdrLYm1-ii9a0u595nm/exec', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(post)
    })
    const data = await res.json();
    return c.json(data);
  }
)

export default app