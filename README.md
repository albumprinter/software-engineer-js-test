# Albumprinter test

This repository contains a variation of a well known software test.

## The test

You will be working in a team that doesn't shy away from using libraries or third party modules.
Why reinvent the wheel? However, you are expected to be able to write your own logically structured
modules with self contained code!

### Goal

You should write a very simple application that does the following:

The application will have a text input field. The user of the application should be able to enter a number
inside this field and click a button.

When this button is clicked:

The application should write out a numerical range from 1 up to the number the user entered. So if the
user entered _"3"_, the application should write :

    1, 2, 3
   
However, there are three _rules_ to make things more interesting:

* If the number is a multiple of 2, instead of showing the number, the application should write _"foo"_
* If the number is a multiple of 3, instead of showing the number, the application should write _"bar"_
* And finally if the number is _both_ a multiple of 2 _and_ 3, the application should write _"foo bar"_

So taking the above rules into account, if the user would have entered _"12"_, the application should write:

    1, foo, bar, foo, 5, foo bar, 7, foo, bar, foo, 11, foo bar
    
That's it! :)

#### Deliverables

It is by no means necessary to make this application look attractive. It is about the
_design of your code_, NOT the design of the application interface!

If you are uncertain how to write the code for a certain part and get stuck: write _pseudo code_
that basically explains what _should_ happen to achieve the goal in context of the full application flow.

Also don't be afraid to show of your skills, even though this applications goal is a bit silly, imagine
it was a project that should be future proof, well maintainable, etc. How would you structure it?

Be prepared to be able to explain the steps you took in a review of this test.

#### Rules

Your application should run on the latest public version of Google Chrome.
You don't have to worry about making your code work on any other browser, as
such you are free to use anything that is supported by Chrome and not worry
about cross-browser implementations.

## Project outline

You will get an _./index.html_ file which has a simple template with a simple HTML form.
Inside this template you will find:

* form with id _"numberForm"_
* input field with id _"numberInput"_
* submit button with id _"submitButton"_
* a container field which you can use to show the application results in with id _"resultOutput"_

You can write your JavaScript code inside _./application.js_.
