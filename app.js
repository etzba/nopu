const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");
const config = require("./utils/config");
const logger = require("./utils/logger");
const loginRouter = require('./controllers/login')
const blogRouter = require("./controllers/blogs");
const usersRouter = require("./controllers/users");
const errorHandler = require("./middleware/errorHandler");
const morgan = require("./middleware/requestLogger");
const tokenExtractor = require("./middleware/tokenExtractor");
const userExtractor = require("./middleware/userExtractor")

logger.info("connecting to", config.MONGODB_URI);

mongoose
  .connect(config.MONGODB_URI)
  .then(() => {
    logger.info("connected to MongoDB");
  })
  .catch((error) => {
    logger.error("error connecting to MongoDB:", error.message);
  });

app.use(cors());
app.use(express.json());
app.use(
  morgan(
    ':remote-addr - :remote-user [:date[clf]] ":method" ":url" :status :res[content-length] :body - :req[content-length]',
    { immediate: true }
  )
);
app.use(express.json());
app.use((req, res, next) => {
  next();
});

app.use("/api/locations", usersRouter)
app.use('/api/login', loginRouter)

app.use(errorHandler);

module.exports = app;