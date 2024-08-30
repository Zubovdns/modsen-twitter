import { useCallback, useState } from 'react';
import { uploadImage } from '@src/utils/uploadImage';

export const useImageUploader = (initialValue: string | null) => {
	const [image, setImage] = useState(initialValue);
	const [isUploading, setIsUploading] = useState(false);

	const handleImageChange = useCallback(
		async (
			event: React.ChangeEvent<HTMLInputElement>,
			field: string,
			setValue: any
		) => {
			const file = event.target.files?.[0];
			if (file) {
				setIsUploading(true);
				try {
					const downloadURL = await uploadImage(file, field);
					setImage(downloadURL);
					setValue(field, downloadURL);
				} catch (error) {
					console.error('Image upload failed:', error);
				} finally {
					setIsUploading(false);
				}
			}
		},
		[]
	);

	return { image, isUploading, handleImageChange };
};
