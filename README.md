# Albelli test

**Read this entire document carefully.**

This repository contains a basic setup for a JavaScript project. 
See "_System requirements_" below to get up  and running!
The "_Project outline_" section walks you through a basic  rundown of the structure.

## The test

You will be working in a company where our customers purchase printed products.
As such your expertise should not be restricted to developing applications,
but also extend to understand the requirements
of print and how to translate between the app and the print world and  vice versa.

### Goal

You should write a very simple application where there are two scenarios:

##### Scenario 1.

* The application have a fixed size canvas where your application will show images
* The user can select a photo file from his/her device and import it into the application
  * The photo must fill entirely the fixed size canvas.
    If the application have a landscape canvas and a portrait image is uploaded,
    then only the middle of photo is drawn on the canvas
* The user can position and scale (zoom) this photo on a canvas. **Important**: Photo must always cover the full canvas.
  * Correct:

  ![correct](./doc/correct.png)

  * Not correct:

  ![not correct](./doc/not_correct.png)

  When you are zooming the photo it is not allowed to make the image smaller, than the canvas.
  In that case the zoom button should not allow any downsizing.

  * Think about scenarios, like zoom in the image, then move it to right, then zoom out.
    Still the image should cover the entire canvas.

* Hit a submit button which will generate the print description as described
  [below](https://github.com/albumprinter/software-engineer-js-test/tree/photo-editor#print-description)
  These instructions should be stored locally as a JSON file.

##### Scenario 2.

* The user can hit an import button which loads a previously saved JSON description
* Upon loading, the application should show a canvas that contains the photo
* Photo is scaled and positioned as expected according to the loaded print instructions
* Customer should be able to further modify the image

#### Deliverables

Out of the box, the application already provides you some code to load
and validate image files from your computer. You can take some inspiration
here, or if you don't like the design approach of that code, feel free
to show what you think is the "right approach" to code this application.
Don't write code that just "get's the job done", write it as if was an
application that you would have to maintain for years to come ;)

It is by no means necessary to make this application look attractive or
to spend a lot of time in providing the best interaction with the photo.
If you need to add buttons to “_move photo left_”, "_move photo right_" or
“_scale photo 50%_", "_scale photo 200%_” that is enough. It is about the
_design of your code_, NOT the design of the application interface!

It is more important to show how you write (in your eyes) a maintainable
application. Be prepared to explain the steps you took in a review of this test.

It is preferred to use **React** and **TypeScript**.

Don't forget to add the necessary **documentations** and **tests**.

#### Product canvas properties

At Albelli, we define the dimensions of our printed products in inches.
For this application we will name the product “Canvas” (a single printable surface).
This Canvas is a rectangle of 15” x 10” in size.

A photo must always fill the full surface of the canvas (in other words:
a photo must cover an area equal to or larger than 15” in width or 10” in height).

A photo has the following properties: width, height, x and y (once more
all in inches). X and Y describe the coordinates of the photo relative
to the top-left position of its canvas.

#### Print description

The print description you will generate (in scenario #1 of your application) can be in JSON format.
Example:

    {
        "canvas": {
            "width": 15
            "height": 10,
            "photo" : {
                "id": “fileName”,
                "width": 20,
                "height": 20,
                "x": -2.5,
                "y": -5
            }
        }
    }

#### Rules

Once you receive this test by e-mail please fork this repository to your own GitHub account.

Your application should run on the latest public version of Google Chrome.
You don't have to worry about making your code work on any other browser, as
such you are free to use anything that is supported by Chrome and not worry
about cross-browser implementations.

Although it is always good to make a code that is cross-browser compatible (Edge, Firefox, Safari).

## Project outline

The entry point for your JavaScript application is _./app/js/main.js_. The build script
will ensure these get automatically built for use in your browser.

The project uses SASS as a preprocessor for writing your styles (though you can
write regular CSS inside a .scss file if you would like to). If you choose to use CSS,
you can use _./app/css/main.scss_ as your entry point SASS file.

Using `npm run build` all build output will be stored in the _./dist_ folder, this is
automatically generated by the build script and its contents can be ignored.

## System requirements

In order to build the project you will need [Node.js](https://nodejs.org/en/).

In the root of this repository, you can resolve all these dependencies via
the command line using:

    npm install
    
You can now start developing the application using Webpack by typing:

    npm start
    
The following will happen:

 * All JavaScript is included and built for the browser
 * All SASS styles are converted into CSS
 * Your browser will open and run the application
 * File watchers are started

You can add / remove / change files to in the source folder and your
browser will automatically update to reflect the changes.

## Check before submitting your code

### Scenarios
* Customer can upload photos and they are showing on canvas
  * The photos can have landscape, portrait or square formats
  * The photos can have small and large sizes (in pixels)
  * Application can handle all files without breaking
* Customer can move and scale the photo
  * The photo is always covering the entire canvas
* Customer able to export JSON file with print description
* Customer able to import JSON file with print description
  * Then the correct photo is showing on canvas with correct position and scale
* Customer able to modify the photo after import

If the above scenarios are not working, then your code is not ready to be submitted.

### Code
* You used React and TypeScript
* Your code has documentation
* Your code has tests

**We wish you success with your test!**
