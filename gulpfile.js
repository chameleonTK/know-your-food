var gulp = require('gulp');
var http = require('http');
var ecstatic = require('ecstatic');


gulp.task('default', [], function () {
    http.createServer(
        ecstatic({ 
          root: __dirname,
        //   headers: {"Set-Cookie":"sessionId=38afes7a8"}
        })
    ).listen(3000);

});
