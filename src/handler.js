const fs = require("fs");
const path = require("path");
const url = require("url");
const querystring = require("querystring");
const rqst = require("request");

const handlerHome = (request, response) => {
  const endpoint = request.url;
  response.writeHead(200, { "Content-Type": "text/html" });
  const filePath = path.join(__dirname, "..", "public", "index.html");
  fs.readFile(filePath, (error, file) => {
    if (error) {
      response.writeHead(404, { "Content-Type": "text/html" });
      response.end("404 - file not found");
      return;
    }
    response.writeHead(200, { "Content-Type": "text/html" });
    response.end(file);
  });
};

const handlerPublic = (request, response) => {
  const url = request.url;
  const extension = url.split(".")[1];
  const filePath = path.join(__dirname, "..", "public", url);
  const type = {
    html: "text/html",
    js: "application/javascript"
  }[extension];

  fs.readFile(filePath, (error, file) => {
    if (error) {
      response.writeHead(404, { "Content-Type": "text/html" });
      response.end("404 - file not found");
      return;
    }
    response.writeHead(200, { "Content-Type": type });
    response.end(file);
  });
};

const handlerData = (request, response) => {
  const parseUrl = url.parse(request.url);
  const dataUrl =
    "https://api.nasa.gov/planetary/apod?api_key=BMHggSwBnQdeRBJp4k6yE6GTtQqJ6y9K7LoAU0jq";
  rqst(dataUrl, (err, res, body) => {
    if (err) {
      res.writeHead(404, { "content-type": "text/html" });
      res.end("file not found");
    } else {
      const parseBody = Json.parse(body);
      let resUrl = parseBody.url;
      response.writeHead(200);
      response.end(JSON.stringify(`${resUrl}`));
    }
  });
};

module.exports = {
  handlerHome,
  handlerData,
  handlerPublic
};
