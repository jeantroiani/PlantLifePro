import { Elysia, t } from "elysia";
import { swagger } from '@elysiajs/swagger'
import { note } from './note/note'

const app = new Elysia()
    .use(swagger()) 
    .get('/', () => 'Hello Elysia')
    .get('/path', ({ path }) => path) 
    .post('/hello', 'Do you miss me?')
    .use(note) 
    .listen(3000)

console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
);
