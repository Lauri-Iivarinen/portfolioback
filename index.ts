import express, { Express, Request, Response, Application } from 'express';

const app = express();
const port = process.env.PORT || 8080;

app.get('/', (req: Request, res: Response) => {
    res.send('Welcome to Express & TypeScript Server');
  });
  
app.listen(port, () => {
console.log(`http://localhost:${port}`);
});