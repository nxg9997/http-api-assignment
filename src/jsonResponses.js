
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
  const queries = getQueries(req.headers.referer);
  if (queries.valid === 'true') sendResponse(req, res, 200, { 'Content-Type': 'application/json' }, { Message: 'This is a bad request response' });
  else sendResponse(req, res, 400, { 'Content-Type': 'application/json' }, { Message: 'This is a bad request response' });
};

const getUnauthorized = (req, res) => {
  const queries = getQueries(req.headers.referer);
  if (queries.loggedIn === 'true') sendResponse(req, res, 200, { 'Content-Type': 'application/json' }, { Message: 'This is an unauthorized response' });
  else sendResponse(req, res, 401, { 'Content-Type': 'application/json' }, { Message: 'This is an unauthorized response' });
};

const getForbidden = (req, res) => {
  sendResponse(req, res, 403, { 'Content-Type': 'application/json' }, { Message: 'This is a forbidden response' });
};

const getInternal = (req, res) => {
  sendResponse(req, res, 500, { 'Content-Type': 'application/json' }, { Message: 'This is an internal response' });
};

const getNotimplemented = (req, res) => {
  sendResponse(req, res, 501, { 'Content-Type': 'application/json' }, { Message: 'This is a not implemented response' });
};

const getNotFound = (req, res) => {
  sendResponse(req, res, 404, { 'Content-Type': 'application/json' }, { Message: 'This is a not found response' });
};

module.exports.getSuccess = getSuccess;
module.exports.getBadRequest = getBadRequest;
module.exports.getUnauthorized = getUnauthorized;
module.exports.getForbidden = getForbidden;
module.exports.getInternal = getInternal;
module.exports.getNotimplemented = getNotimplemented;
module.exports.getNotFound = getNotFound;
