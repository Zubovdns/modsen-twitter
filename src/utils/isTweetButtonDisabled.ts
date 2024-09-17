export const isTweetButtonDisabled = (text: string, isUploading: boolean) =>
	!text.trim() || isUploading;
