import express, { Express, Request, Response, Application } from 'express';
//import workData from './util/static/workData.json' 
import cors from 'cors'

const app = express();
const port = process.env.PORT || 8080;
app.use(cors())

app.listen(port, () => {
console.log(`Server running at http://localhost:${port}`);
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