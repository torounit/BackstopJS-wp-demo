"use strict";
const gulp = require('gulp');
const connect = require('gulp-connect-php');
const backstopjs = require('backstopjs');
let server = new connect();

const run = (command) => {
    return server.server({
        host: '127.0.0.1',
        port: '8080',
        base: './www',
        router: './vendor/wp-cli/server-command/router.php'
    }, () => {
        backstopjs(command).then(() => {
            server.closeServer();
        }).catch(() => {
            server.closeServer();
        });;
    });
};

gulp.task('test', () => {
    return run('test');
});

gulp.task('reference', () => {
    return run('reference');
});

