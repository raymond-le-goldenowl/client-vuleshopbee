export const checkImageString = imageString => {
	return /(\.jpg|\.jpeg|\.png|\.gif)$/i.exec(imageString)?.length > 0;
};
