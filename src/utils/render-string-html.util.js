export const renderStringHtml = (str = '', style = {}) => {
	// check type
	if (typeof str !== 'string') return null;

	// remove all special character
	const cloneStr = str.replace(/(?:\\[rnt"]|[\r\n\t\\"]+)+/g, '');

	if (typeof style !== 'object') return null;
	return <div dangerouslySetInnerHTML={{__html: cloneStr}} style={style}></div>;
};
