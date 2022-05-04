import React from 'react';
import PropTypes from 'prop-types';
import {checkImageString} from 'utils';
import {Skeleton} from '@mui/material';

function DisplayImage({image, slug, style}) {
	return image && checkImageString(image) ? (
		<object data={image} style={style} alt={slug}>
			<Skeleton variant='rectangular' style={style} />
		</object>
	) : (
		<Skeleton variant='rectangular' style={style} />
	);
}

DisplayImage.propTypes = {
	image: PropTypes.string.isRequired,
	style: PropTypes.object,
	// height: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
	// width: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
};

export default DisplayImage;
