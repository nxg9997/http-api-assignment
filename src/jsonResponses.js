
const sendResponse = (req, res, code, headers, msg) => {
  res.writeHead(code, headers);
  res.write(JSON.stringify(msg));
  res.end();
};

const getQueries = (url) => {
  const querySplit = url.split('?');
  let valid = null;
  let loggedIn = null;

  querySplit.forEach((value) => {
    const q = value.split('=');
    console.log(q);
    if (q[0] === 'valid') {
      [, valid] = q;
    } else if (q[0] === 'loggedIn') {
      [, loggedIn] = q;
    }
  });

  return { valid, loggedIn };
};

const getSuccess = (req, res) => {
  sendResponse(req, res, 200, { 'Content-Type': 'application/json' }, { Message: 'This is a successful response' });
};

const getBadRequest = (req, res) => {
  console.log(`line 31:${req.url}`);
  const queries = getQueries(req.url);
  if (queries.valid === 'true') sendResponse(req, res, 200, { 'Content-Type': 'application/json' }, { Message: 'This is a valid request response' });
  else sendResponse(req, res, 400, { 'Content-Type': 'application/json' }, { Message: 'This is a bad request response', id: 'Bad Request' });
};

const getUnauthorized = (req, res) => {
  const queries = getQueries(req.url);
  if (queries.loggedIn === 'true') sendResponse(req, res, 200, { 'Content-Type': 'application/json' }, { Message: 'This is an authorized response' });
  else sendResponse(req, res, 401, { 'Content-Type': 'application/json' }, { Message: 'This is an unauthorized response', id: 'Unauthorized' });
};

const getForbidden = (req, res) => {
  sendResponse(req, res, 403, { 'Content-Type': 'application/json' }, { Message: 'This is a forbidden response', id: 'Forbidden' });
};

const getInternal = (req, res) => {
  sendResponse(req, res, 500, { 'Content-Type': 'application/json' }, { Message: 'This is an internal response', id: 'Internal Server Error' });
};

const getNotimplemented = (req, res) => {
  sendResponse(req, res, 501, { 'Content-Type': 'application/json' }, { Message: 'This is a not implemented response', id: 'Not Implemented' });
};

const getNotFound = (req, res) => {
  sendResponse(req, res, 404, { 'Content-Type': 'application/json' }, { Message: 'This is a not found response', id: 'Not Found' });
};

module.exports.getSuccess = getSuccess;
module.exports.getBadRequest = getBadRequest;
module.exports.getUnauthorized = getUnauthorized;
module.exports.getForbidden = getForbidden;
module.exports.getInternal = getInternal;
module.exports.getNotimplemented = getNotimplemented;
module.exports.getNotFound = getNotFound;
