import express from 'express';
import cors from 'cors';
import routes from './routes';

const app = express();

//active express to read post json
app.use(express.json()); 
app.use(routes);

// localhost:3333
app.listen(3333);