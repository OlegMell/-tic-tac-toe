const express = require('express');
const app = express();
const http = require('http').createServer(app);

module.exports = {app, http};