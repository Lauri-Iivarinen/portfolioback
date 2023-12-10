import express, { Express, Request, Response, Application } from 'express';
//import workData from './util/static/workData.json' 
import cors from 'cors'
import apiRouter from './routes/apiRoute'

const app = express();
const port = process.env.PORT || 8080;
app.use(cors())
app.use('/api', apiRouter)

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});

