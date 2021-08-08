function _getNaturalFit(canvasWidth, canvasHeight, img) {
    let canvasAspectRatio = canvasWidth / canvasHeight;
    let imgAspectRatio = img.naturalWidth / img.naturalHeight;
    if (canvasAspectRatio < imgAspectRatio) {
        return {
            width: img.naturalWidth * canvasHeight / img.naturalHeight,
            height: canvasHeight
        }
    } else {
        return {
            width: canvasWidth,
            height: img.naturalHeight * canvasWidth / img.naturalWidth
        }
    }
}

function _getBestFit(canvasWidth, canvasHeight, img) {
    let imgAspectRatio = img.naturalWidth / img.naturalHeight;
    let isRotated = imgAspectRatio < 1;
    let imgDimensions = {
        naturalWidth: img.naturalWidth,
        naturalHeight: img.naturalHeight,
    }
    // To make the best fit of the photo inside the canvas, 
    // just invert the image dimensions if the photo is in portrait mode
    if (isRotated) {
        imgAspectRatio = img.naturalHeight / img.naturalWidth;
        imgDimensions = {
            naturalWidth: img.naturalHeight,
            naturalHeight: img.naturalWidth,
        }
    }

    return {
        ..._getNaturalFit(canvasWidth, canvasHeight, imgDimensions),
        isRotated,
    };
}

function PhotoCanvas(width, height, dpi = 300) {
    var canvas, context, image = new Image(),
        photo = {
            x: 0,
            y: 0,
            width,
            height,
            isRotated: false,
        };

    function _toPixels(value) {
        return value * dpi;
    }
    function _toInches(value) {
        return value / dpi;
    }
    function _createCanvas() {
        canvas = document.createElement('canvas');
        context = canvas.getContext('2d');

        canvas.width = _toPixels(width);;
        canvas.height = _toPixels(height);
    }
    function _resetPhoto() {
        photo = {
            x: 0,
            y: 0,
            width,
            height,
            isRotated: false,
        };
    }
    function _drawImg() {
        if (!image.src) {
            return;
        }
        let cWidth, cHeight, pWidth, pHeight;
        if (photo.isRotated) {
            cWidth = _toPixels(height);
            cHeight = _toPixels(width);

            pWidth = _toPixels(photo.height);
            pHeight = _toPixels(photo.width);

            // Add rotated state to canvas class for the convenience of consuming modules
            canvas.classList.add('is-rotated');
        } else {
            cWidth = _toPixels(width);
            cHeight = _toPixels(height);

            pWidth = _toPixels(photo.width);
            pHeight = _toPixels(photo.height);

            canvas.classList.remove('is-rotated');
        }
        canvas.width = cWidth;
        canvas.height = cHeight;
        
        context.fillStyle = '#fff';
  		context.fillRect(0,0, cWidth, cHeight);

        context.drawImage(image, _toPixels(photo.x), _toPixels(photo.y), pWidth, pHeight);
    }

    function getCanvas() {
        return canvas;
    }

    function updateImg(img, bestFit = false) {
        let cWidth = _toPixels(width), cHeight = _toPixels(height);
        let fitPhoto = bestFit ? _getBestFit : _getNaturalFit;
        image.src = img.src;
        
        function load() {
            let fitDetails = fitPhoto(cWidth, cHeight, image);
            // Convert values to inches
            fitDetails.width = _toInches(fitDetails.width);
            fitDetails.height = _toInches(fitDetails.height);

            _resetPhoto();
            // Cache photo details
            photo = { ...photo, ...img, ...fitDetails };

            // Write image to canvas
            _drawImg();
        }
        if (img.id === photo.id) {
            load();
        }
        image.onload = load;
    }

    function getPrintDescription() {
        // let printablePhoto = { ...photo };
        // // convert pixel values to inches
        // printablePhoto.width = _toInches(photo.width);
        // printablePhoto.height = _toInches(photo.height);
        return {
            width,
            height,
            photo,
        }
    }

    function applyPrintDescription(desc) {
        // Get details from description
        ({ width, height, photo } = desc);

        // Cache image
        image.src = photo.src;
        image.onload = _drawImg;
    }

    function _isValid(photo) {
        let leftExceeds = photo.x > 0,
            topExceeds = photo.y > 0,
            rightExceeds = (photo.x + photo.width) < width,
            bottomExceeds = (photo.height + photo.y) < height;
        
        if (photo.isRotated) {
            rightExceeds = (photo.x + photo.height) < height;
            bottomExceeds = (photo.y + photo.width) < width;
        }
        return !(leftExceeds || rightExceeds || topExceeds || bottomExceeds);
        // return true
    }

    // amount in inches
    function move(direction, amount) {
        if (!image.src) {
            return;
        }
        let newPhoto = { ...photo };
        if (newPhoto.isRotated) {
            direction = (direction === 'LEFT' && 'UP') || 
                    (direction === 'RIGHT' && 'DOWN') ||
                    (direction === 'UP' && 'RIGHT') ||
                    (direction === 'DOWN' && 'LEFT');
        }
        switch (direction) {
            case 'LEFT':
                newPhoto.x -= amount;
                break;
            case 'RIGHT':
                newPhoto.x += amount;
                break;
            case 'UP':
                newPhoto.y -= amount;
                break;
            case 'DOWN':
                newPhoto.y += amount;
                break;
        }
        // Fix movement accuracy to 2 floating points to avoid unnecessary decimal values of x and y
        newPhoto.x = parseFloat(newPhoto.x.toFixed(2));
        newPhoto.y = parseFloat(newPhoto.y.toFixed(2));

        if (_isValid(newPhoto)) {
            photo = newPhoto;
            _drawImg();
        }
    }

    function scale(value) {
        if (!image.src) {
            return;
        }
        let newPhoto = { ...photo };
        newPhoto.width *= value;
        newPhoto.height *= value;

        if (_isValid(newPhoto)) {
            photo = newPhoto;
            _drawImg();
        } else {
            // TODO: This can be done better
            updateImg({
                id: photo.id,
                src: image.src,
            }, true);
        }

    }

    // Create a simple canvas
    _createCanvas();

    return {
        getCanvas,
        updateImg,
        getPrintDescription,
        applyPrintDescription,
        move,
        scale,
    }
}
module.exports = PhotoCanvas;