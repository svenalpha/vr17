import fs from 'fs';
import express from 'express';
import { createServer } from 'vite';

const app = express();

const vite = await createServer({
  server: {
    middlewareMode: true,
  },
  appType: 'custom',
});

app.use(vite.middlewares);

app.use('*', async (req, res) => {
  const url = req.originalUrl;

  try {
    const template = await vite.transformIndexHtml(url, fs.readFileSync('index.html', 'utf-8'));
    const { render } = await vite.ssrLoadModule('/src/entry-server.jsx');

    //x const html = template.replace(`<!--outlet-->`, render);
    const { getServerData } = await vite.ssrLoadModule('/src/function.js');      //x     
    const data = await getServerData();                                          //x   
    const script = `<script>window.__data__=${JSON.stringify(data)}</script>`;   //x   

    const html = template.replace(`<!--outlet-->`, `${render(data)} ${script}`); //x  

    res.status(200).set({ 'Content-Type': 'text/html' }).end(html);
  } catch (error) {
    res.status(500).end(error);
  }
});

app.listen(4173, () => {
  console.log('http://localhost:4173.');
});
