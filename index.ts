import express, { Express, Request, Response, Application } from 'express';
//import workData from './util/static/workData.json' 

const app = express();
const port = process.env.PORT || 8080;

app.get('/', (req: Request, res: Response) => {
    res.send('Welcome to Express & TypeScript Server');
  });
  
app.listen(port, () => {
console.log(`http://localhost:${port}`);
});

app.get('/api/career', async (req, res) => {
    const result = await import('./util/static/workData.json')
    res.json(result.default)
})

app.get('/api/stack', async (req, res) => {
    const result = await import('./util/static/stackPref.json')
    res.json(result.default)
})

app.get('/api/projects', async (req, res) => {
    const result = await import('./util/static/projectData.json')
    res.json(result.default)
})