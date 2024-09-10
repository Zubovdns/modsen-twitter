import {
	getDownloadURL,
	getStorage,
	ref,
	uploadBytesResumable,
} from 'firebase/storage';

export const uploadImage = async (
	file: File,
	folder: string
): Promise<string> =>
	new Promise((resolve, reject) => {
		const storage = getStorage();
		const storageRef = ref(storage, `${folder}/${file.name}`);
		const uploadTask = uploadBytesResumable(storageRef, file);

		uploadTask.on(
			'state_changed',
			() => {},
			(error) => {
				reject(error);
			},
			() => {
				getDownloadURL(uploadTask.snapshot.ref)
					.then((downloadURL) => {
						resolve(downloadURL);
					})
					.catch((error) => {
						reject(error);
					});
			}
		);
	});
