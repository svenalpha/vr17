import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import express from 'express';

const app = express();

app.use(express.static(path.resolve(path.dirname(fileURLToPath(import.meta.url)), 'dist/client'), { index: false }));

app.use('*', async (_, res) => {
  try {
    const template = fs.readFileSync('./dist/client/index.html', 'utf-8');
    const { render } = await import('./dist/server/entry-server.js');

    //x const html = template.replace(`<!--outlet-->`, render);
    const { getServerData } = await import('./dist/function/function.js');       //x
    const data = await getServerData();                                          //x
    const script = `<script>window.__data__=${JSON.stringify(data)}</script>`;   //x

    const html = template.replace(`<!--outlet-->`, `${render(data)} ${script}`); //x
    res.status(200).set({ 'Content-Type': 'text/html' }).end(html);
  } catch (error) {
    res.status(500).end(error);
  }
});

app.listen(5173, () => {
  console.log('http://localhost:5173.');
});
