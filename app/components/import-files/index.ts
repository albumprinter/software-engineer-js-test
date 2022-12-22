export async function importPhotos(): Promise<File[]> {
	return importFiles({accept: 'image/*', multiple: true});
}

async function importFiles({
	accept = 'image/*',
	multiple = true,
}): Promise<File[]> {
	return new Promise((resolve, reject) => {
		const input: HTMLInputElement = document.createElement('input');
		input.type = 'file';
		input.accept = accept;
		input.multiple = multiple;
		input.style.display = 'none';
		document.body.append(input);

		const onChange = () => {
			input.remove();
			input.removeEventListener('change', onChange);
			if (input.files?.length) {
				resolve(Array.from(input.files));
			} else {
				reject(new Error('no files'));
			}

			requestAnimationFrame(() => {
				input.value = null as unknown as string;
			});
			return false;
		};

		input.addEventListener('change', onChange);
		input.click();
	});
}
