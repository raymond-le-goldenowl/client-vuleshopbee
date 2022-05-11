import PropTypes from 'prop-types';
import {checkImageString} from 'utils';
import {Skeleton} from '@mui/material';

function DisplayImage({image, slug, style}) {
	// if image not available will render a skeleton
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
};

export default DisplayImage;
