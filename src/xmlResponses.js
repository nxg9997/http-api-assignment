
const sendResponse = (req, res, code, headers, msg) => {
  res.writeHead(code, headers);
  res.write(`<response>${msg}</response>`);
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
  sendResponse(req, res, 200, { 'Content-Type': 'application/xml' }, '<message>This is an XML success response</message>');
};

const getBadRequest = (req, res) => {
  const queries = getQueries(req.url);
  if (queries.valid === 'true') sendResponse(req, res, 200, { 'Content-Type': 'application/xml' }, '<message>This is an XML valid request response</message>');
  else sendResponse(req, res, 400, { 'Content-Type': 'application/xml' }, '<message>This is an XML bad request response</message><id>Bad Request</id>');
};

const getUnauthorized = (req, res) => {
  const queries = getQueries(req.url);
  if (queries.loggedIn === 'true') sendResponse(req, res, 200, { 'Content-Type': 'application/xml' }, '<message>This is an XML authorized response</message>');
  else sendResponse(req, res, 401, { 'Content-Type': 'application/xml' }, '<message>This is an XML unauthorized response</message><id>Unauthorized</id>');
};

const getForbidden = (req, res) => {
  sendResponse(req, res, 403, { 'Content-Type': 'application/xml' }, '<message>This is an XML forbidden response</message><id>Forbidden</id>');
};

const getInternal = (req, res) => {
  sendResponse(req, res, 500, { 'Content-Type': 'application/xml' }, '<message>This is an XML internal response</message><id>Internal Server Error</id>');
};

const getNotimplemented = (req, res) => {
  sendResponse(req, res, 501, { 'Content-Type': 'application/xml' }, '<message>This is an XML not implemented response</message><id>Not Implemented</id>');
};

const getNotFound = (req, res) => {
  sendResponse(req, res, 404, { 'Content-Type': 'application/xml' }, '<message>This is an XML not found response</message><id>Not Found</id>');
};

module.exports.getSuccess = getSuccess;
module.exports.getBadRequest = getBadRequest;
module.exports.getUnauthorized = getUnauthorized;
module.exports.getForbidden = getForbidden;
module.exports.getInternal = getInternal;
module.exports.getNotimplemented = getNotimplemented;
module.exports.getNotFound = getNotFound;
