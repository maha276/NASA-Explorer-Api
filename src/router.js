const { handlerHome, handlerPublic, handlerData } = require("./handler");
const router = (request, response) => {
  const endpoint = request.url;

  if (endpoint === "/") {
    handlerHome(request, response);
  }
};
module.exports = router;
