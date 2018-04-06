// server
import express from 'express';
import morgan from 'morgan';
import bodyParser from 'body-parser';
// import path from 'path';

// routers
import screenRouter from './routes/screenRouter';

// react server side
import { handleRender } from './ssrFunctions';


const app = express();
app.use(morgan('dev'));
const port = process.env.PORT || 3000;

// for parsing urlencoded in req.body
app.use(bodyParser.urlencoded({
  extended: true,
}));

// for parsing json in req.body
app.use(bodyParser.json());


// get gzip files
app.get('*.js', (req, res, next) => {
  req.url += '.gz';
  res.set('Content-Encoding', 'gzip');
  res.set('Content-Type', 'text/javascript');
  next();
});

app.get('*.css', (req, res, next) => {
  req.url += '.gz';
  res.set('Content-Encoding', 'gzip');
  res.set('Content-Type', 'text/css');
  next();
});

app.get('*.svg', (req, res, next) => {
  req.url += '.gz';
  res.set('Content-Encoding', 'gzip');
  res.set('Content-Type', 'image/svg+xml');
  next();
});

// serve js files
app.use(express.static('dist'));
app.use(express.static('imgs'));


// client api
app.use('/screen', screenRouter);

// use handleRender for each request
app.use(handleRender);


// Check mode
if (app.get('env') === 'development') {
  console.log('Development mode!');
} else {
  console.log('Production mode!');
}


app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});

