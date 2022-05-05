export const checkImageString = imageString => {
	return /(\.jpg|\.jpeg|\.png|\.gif|\.svg)$/i.exec(imageString)?.length > 0;
};
