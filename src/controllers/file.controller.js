const express = require('express');



class FileController {
  path = '/api/file';
  router = express.Router();

  constructor() {
    this.intializeRoutes();
  }
 
  intializeRoutes() {
    this.router.get(`${this.path}/:path*`, this.readContent);
    this.router.post(`${this.path}/:path*`, this.createContent);
    this.router.put(`${this.path}/:path*`, this.updateContent);
    this.router.delete(`${this.path}/:path*`, this.deleteContent);
  }
 
  readContent = (request, response, next) => {
    response.send("request. posts");
  }
 
  createContent = (request, response, next) => {
    response.send("post");
  }

  updateContent = (request, response, next) => {
    response.send("post");
  }

  deleteContent = (request, response, next) => {
    response.send("post");
  }

}
 
// export default FileController;