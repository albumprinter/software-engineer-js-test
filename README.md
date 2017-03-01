# Albumprinter test

This repository contains a basic setup for a JavaScript project.

## Project outline

The project uses SASS for writing your styles (you can use regular
CSS inside a .scss file if you would like to). If you choose to use CSS,
you can use ./css/main.scss_ as your entry point SASS file.

The JavaScript code supports ES6 as the input language (will be transpiled
to browser friendly ES5, though you can choose to write in ES5). The
entry point for your application is ./js/main.js_. You can use the
CommonJS require/exports pattern to include dependencies.

## System requirements

In order to build the project you will need Node.js

Once you have Node, you have NPM available to you which is Node's
package manager.

In the root of this repository, you can resolve all dependencies using:

    npm install
    
You can now start developing the application using Gulp (build system/task
runner). By typing:

    gulp dev
    
The following will happen:

 * All SASS styles are converted into CSS
 * All JavaScript is concatenated and transformed
 * Your browser will open and run the application
 * Watchers are started:
   If you add/remove/change HTML, SCSS or JS files the
   appropriate rebuild tasks are automatically run and your browser will
   be refreshed automatically. This allows you to instantly view the
   results of your changes.
