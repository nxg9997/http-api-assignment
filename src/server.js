const http = require('http');
const htmlHandler = require('./htmlResponses.js');
const jsonHandler = require('./jsonResponses.js');
const jsHandler = require('./jsResponses.js');
const xmlHandler = require('./xmlResponses.js');
const cssHandler = require('./cssResponses.js');

const port = process.env.PORT || process.env.NODE_PORT || 3000;

const onRequest = (req, res) => {
  console.log(`line 11:${req.url}`);
  console.log(req.headers);
  const rawUrl = req.url.split('?')[0];

  switch (rawUrl) {
    case '/':
      htmlHandler.getIndex(req, res);
      break;
    case '/success':
      if (req.headers.accept === 'text/xml') xmlHandler.getSuccess(req, res);
      else jsonHandler.getSuccess(req, res);
      break;
    case '/badRequest':
      if (req.headers.accept === 'text/xml')xmlHandler.getBadRequest(req, res);
      else jsonHandler.getBadRequest(req, res);
      break;
    case '/unauthorized':
      if (req.headers.accept === 'text/xml')xmlHandler.getUnauthorized(req, res);
      else jsonHandler.getUnauthorized(req, res);
      break;
    case '/forbidden':
      if (req.headers.accept === 'text/xml')xmlHandler.getForbidden(req, res);
      else jsonHandler.getForbidden(req, res);
      break;
    case '/internal':
      if (req.headers.accept === 'text/xml')xmlHandler.getInternal(req, res);
      else jsonHandler.getInternal(req, res);
      break;
    case '/notImplemented':
      if (req.headers.accept === 'text/xml')xmlHandler.getNotimplemented(req, res);
      else jsonHandler.getNotimplemented(req, res);
      break;
    case '/client.js':
      jsHandler.getClientJs(req, res);
      break;
    case '/style.css':
      cssHandler.getClientCss(req, res);
      break;
    default:
      if (req.headers.accept === 'text/xml')xmlHandler.getNotFound(req, res);
      else jsonHandler.getNotFound(req, res);
      // htmlHandler.getIndex(req, res);
      break;
  }
};

http.createServer(onRequest).listen(port);
console.log(`Listening on localhost:${port}`);
