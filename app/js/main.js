// NOTE: you can use CommonJS here, for instance:
// var foo = require("npm-dependency");
// var bar = require("./path/to/local/file_without_extension");
// module.exports = someVariable;

// grab DOM elements inside index.html

var fileSelector = document.getElementById( "fileSelector" );
var imageContainer = document.getElementById( "imageContainer" );
var debugContainer = document.getElementById( "debugContainer" );
var generateButton = document.getElementById( "generateButton" );

// some functions to get you started !!

function log( msg ) {
    // show debug/state message on screen
    debugContainer.innerHTML += "<p>" + msg + "</p>";
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
                    // create HTMLImageElement holding image data
                    var img = new Image();
                    img.src = reader.result;

                    // remove existing images from ImageContainer
                    while ( imageContainer.childNodes.length > 0 )
                        imageContainer.removeChild( imageContainer.childNodes[ 0 ]);

                    // add image to container
                    imageContainer.appendChild( img );

                    // grab some data from the image
                    var imageData = {
                        "width": img.naturalWidth,
                        "height": img.naturalHeight
                    };
                    log( "Loaded Image w/dimensions " + imageData.width + " x " + imageData.height );
                    // do your magic here...
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
    log( "GENERATED BUTTON CLICKED!! Show this do something else?" );
};

log( "Test application ready" );
