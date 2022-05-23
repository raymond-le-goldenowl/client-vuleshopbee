export const checkImageString = imageString => {
	// return null or array.
	return /(\.jpg|\.jpeg|\.png|\.gif|\.svg)$/i.exec(imageString)?.length > 0;
};
