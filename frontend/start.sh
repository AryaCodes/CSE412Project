#!/bin/bash

browserify js/external.js --standalone dbConn > public/external.js
node app.js
