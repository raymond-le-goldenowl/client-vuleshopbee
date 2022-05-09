import {Typography} from '@mui/material';
import PropTypes from 'prop-types';

function RenderTags({tags = []}) {
	if (typeof tags !== 'object' && tags.length === 0) return null;
	const textTags = tags.map(({tag}) => ` ${tag.text}`).join(',');
	return <Typography component='span'> {textTags}.</Typography>;
}

RenderTags.propTypes = {
	tags: PropTypes.array.isRequired,
};
export default RenderTags;
