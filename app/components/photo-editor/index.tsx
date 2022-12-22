import React from 'react';
import {useState, useEffect, useRef} from 'react';
import {importPhotos} from '../import-files';

export const PhotoEditor = () => {
	const [image, setImage] = useState<HTMLImageElement>();
	const canvasRef = useRef<HTMLCanvasElement>(null);

	useEffect(() => {
		if (image && canvasRef.current) {
			const canvas = canvasRef.current;
			const ctx = canvas.getContext('2d');
			const width = image.naturalWidth;
			const height = image.naturalHeight;
			canvas.width = 500;
			canvas.height = 500 * height / width;

			ctx?.drawImage(image, 0, 0, width, height, 0, 0, canvas.width, canvas.height);
		}
	}, [image]);

	const handlePhotoUpload = async () => {
		// get all selected Files
		const files = await importPhotos();
		let file;
		for ( let i = 0; i < files.length; ++i ) {
			file = files[ i ];
			// check if file is valid Image (just a MIME check)
			switch ( file.type ) {
				case "image/jpeg":
				case "image/png":
				case "image/gif":
					// read Image contents from file
					const reader = new FileReader();
					reader.onload = (e: ProgressEvent<FileReader>) => {
						// create HTMLImageElement holding image data
						const img = new Image();
						img.src = reader.result as string;
						img.onload = () => setImage(img)
					};
					reader.readAsDataURL( file );
					// process just one file
					return;

			}
		}
	};

	return (
		<>
			<div>
				<h1>Photo Editor</h1>
				<button onClick={handlePhotoUpload}>Upload Images</button>
			</div>
			<canvas ref={canvasRef} />
		</>
	);
};
