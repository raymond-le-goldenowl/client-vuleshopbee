import {Typography} from '@mui/material';
import PropTypes from 'prop-types';

function RenderTags({tags = []}) {
	if (typeof tags !== 'object' && tags.length === 0) return null;
	return tags.map(tag => <Typography key={tag?.id}>{tag?.text}</Typography>);
}

RenderTags.propTypes = {
	tags: PropTypes.array.isRequired,
};
export default RenderTags;
