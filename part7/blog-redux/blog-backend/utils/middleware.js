const jwt = require("jsonwebtoken");
const User = require("../models/user");
const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: "unknown endpoint" });
};

const errorHandler = (error, request, response, next) => {
  if (error.name === "CastError") {
    return response.status(400).send({ error: "malformatted id" });
  } else if (error.name === "ValidationError") {
    return response.status(400).json({ error: error.message });
  } else if (
    error.name === "MongoServerError" &&
    error.message.includes("E11000 duplicate key error")
  ) {
    return response
      .status(400)
      .json({ error: "expected `username` to be unique" });
  } else if (error.name === "JsonWebTokenError") {
    return response.status(400).json({ error: "token missing or invalid" });
  }

  next(error);
};

// Token Extractor has been changed to work with userExtractor
const tokenExtractor = (request) => {
  const authorization = request.get("authorization");

  if (authorization && authorization.startsWith("Bearer "))
    return authorization.replace("Bearer ", "");

  return null;
};

const userExtractor = async (request, response, next) => {
  try {
    const token = tokenExtractor(request);
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);

    request.user = await User.findById(decodedToken.id);
    next();
  } catch (error) {
    next(error);
  }
};

module.exports = {
  unknownEndpoint,
  errorHandler,
  userExtractor,
};
