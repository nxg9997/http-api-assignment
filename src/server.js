const http = require('http');
const htmlHandler = require('./htmlResponses.js');
const jsonHandler = require('./jsonResponses.js');
const jsHandler = require('./jsResponses.js');
const xmlHandler = require('./xmlResponses.js');

const port = process.env.PORT || process.env.NODE_PORT || 3000;

const onRequest = (req, res) => {
  console.log(req.url);
  console.log(req.headers);

  switch (req.url) {
    case '/':
      htmlHandler.getIndex(req, res);
      break;
    case '/success':
      if (req.headers.accept === 'application/json') jsonHandler.getSuccess(req, res);
      else xmlHandler.getSuccess(req, res);
      break;
    case '/badRequest':
      if (req.headers.accept === 'application/json')jsonHandler.getBadRequest(req, res);
      else xmlHandler.getBadRequest(req, res);
      break;
    case '/unauthorized':
      if (req.headers.accept === 'application/json')jsonHandler.getUnauthorized(req, res);
      else xmlHandler.getUnauthorized(req, res);
      break;
    case '/forbidden':
      if (req.headers.accept === 'application/json')jsonHandler.getForbidden(req, res);
      else xmlHandler.getForbidden(req, res);
      break;
    case '/internal':
      if (req.headers.accept === 'application/json')jsonHandler.getInternal(req, res);
      else xmlHandler.getInternal(req, res);
      break;
    case '/notImplemented':
      if (req.headers.accept === 'application/json')jsonHandler.getNotimplemented(req, res);
      else xmlHandler.getNotimplemented(req, res);
      break;
    case '/client.js':
      jsHandler.getClientJs(req, res);
      break;
    default:
      // jsonHandler.getNotFound(req, res);
      htmlHandler.getIndex(req, res);
      break;
  }
};

http.createServer(onRequest).listen(port);
console.log(`Listening on localhost:${port}`);
