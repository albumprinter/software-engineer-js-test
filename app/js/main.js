// NOTE: you can use CommonJS here, for instance:
// var foo = require("npm-dependency");
// var bar = require("./path/to/local/file_without_extension");
// module.exports = someVariable;
var localForage = require('localforage');
var PhotoCanvas = require('./photo-canvas');

const CANVAS_WIDTH = 15,
    CANVAS_HEIGHT = 10;
// grab DOM elements inside index.html

var fileSelector = document.getElementById( 'fileSelector' );
var imageContainer = document.getElementById( 'imageContainer' );
var debugContainer = document.getElementById( 'debugContainer' );
var generateButton = document.getElementById( 'generateButton' );
var saveButton = document.getElementById( 'saveButton' );
var loadButton = document.getElementById( 'loadButton' );
var moveButtons = document.querySelectorAll( '.move-button' );
var scaleButtons = document.querySelectorAll( '.scale-button' );
var descriptionField = document.getElementById( 'description' );

var photoCanvas;

// some functions to get you started !!

function log( msg ) {
    // show debug/state message on screen
    debugContainer.innerHTML += `<p>${msg}</p>`;
}
// Cleaning up any previously existing local photos
// localForage.clear()

function initializeCanvas() {
    photoCanvas = PhotoCanvas(CANVAS_WIDTH, CANVAS_HEIGHT);
    // Get canvas element
    let $canvas = photoCanvas.getCanvas();
    log( `Loaded Canvas w/dimensions ${$canvas.width} x ${$canvas.height}` );
    // console.log(photoCanvas);
    
    while ( imageContainer.childNodes.length > 0 )
        imageContainer.removeChild( imageContainer.childNodes[ 0 ]);
    
    // add image to container
    imageContainer.appendChild( $canvas );
}

fileSelector.onchange = function( e ) {
    // get all selected Files
    var files = e.target.files;
    var file;
    for ( var i = 0; i < files.length; ++i ) {
        file = files[ i ];
        // check if file is valid Image (just a MIME check)
        switch ( file.type ) {
            case "image/jpeg":
            case "image/png":
            case "image/gif":
                // read Image contents from file
                var reader = new FileReader();
                reader.onload = function( e ) {
                    var imageData = {
                        id: fileSelector.value.replace(/^.*[\\\/]/, ''),
                        src: reader.result,
                    };
                    log(`FileName: ${fileSelector.value}`);
                    
                    // add image to canvas
                    photoCanvas.updateImg(imageData, true);
                };
                reader.readAsDataURL( file );
                // process just one file.
                return;


            default:
                log( "not a valid Image file :" + file.name );
        }
    }
};

generateButton.onclick = function( e ) {
    let printDescription = photoCanvas.getPrintDescription();
    printDescription.photo.src = undefined;
    descriptionField.value = JSON.stringify(printDescription, null, 4);
    // log(`Print description ${JSON.stringify(printDescription)}`);
};

saveButton.onclick = function( e ) {
    let printDescription = photoCanvas.getPrintDescription();
    localForage.setItem(printDescription.photo.id, printDescription).then(() => {
        log(`Saved description for ${printDescription.photo.id}`);
        localForage.keys().then((photos) => {
            photos.forEach((name) => log(`<li>${name}</li>`));
        });
    });
    // log(`Print description ${JSON.stringify(printDescription)}`);
};

loadButton.onclick = function( e ) {
    localForage.keys().then((photos) => {
        localForage.getItem(photos[0]).then((desc) => {
            log(`Loaded <b>${photos[0]}</b><div>${JSON.stringify(desc, null, '\t')}</div>`);
            photoCanvas.applyPrintDescription(desc);
        });
    });
}
moveButtons.forEach((moveButton) => {
    moveButton.onclick = function ( e ) {
        let dir = e.target.dataset.dir || 'LEFT';
        photoCanvas.move(dir, 0.1);
    }
});

scaleButtons.forEach((scaleButton) => {
    scaleButton.onclick = function ( e ) {
        let value = parseFloat(e.target.dataset.value) || 0.5;
        photoCanvas.scale(value);
    }
});

initializeCanvas();
log( "Test application ready" );
