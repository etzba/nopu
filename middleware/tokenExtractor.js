const tokenExtractor = (request, response, next) => {
  request.token = getTokenFrom(request);

  next();
};

const getTokenFrom = (request) => {
  const authorization = request.get("authorization");
  if (authorization && authorization.startsWith("Bearer ")) {
    return authorization.replace("Bearer ", "");
  }
  return null;
};

module.exports = tokenExtractor;
