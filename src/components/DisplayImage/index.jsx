import PropTypes from 'prop-types';
import {checkImageString} from 'utils';
import {Skeleton} from '@mui/material';
import placeholderFallbackImage from 'assets/images/placeholder.jpg';
function DisplayImage({image, slug, style}) {
	// if image not available will render a skeleton
	return image && checkImageString(image) ? (
		<object data={image} style={style} alt={slug}>
			<img
				src={image}
				style={style}
				alt={slug}
				onError={({target}) => {
					target.src = placeholderFallbackImage;
				}}
			/>
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
