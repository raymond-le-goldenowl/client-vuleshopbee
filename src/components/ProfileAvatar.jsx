import React from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';
import {checkImageString} from 'utils';
import {Skeleton} from '@mui/material';

function ProfileAvatar({imageString, user}) {
	return (
		<React.Fragment>
			{checkImageString(imageString) ? (
				<object data={imageString}>
					<Skeleton variant='rectangular' />
				</object>
			) : (
				<ProfileAvatarStyled src={user?.user?.avatar} alt={user?.name} />
			)}
		</React.Fragment>
	);
}

ProfileAvatar.propTypes = {
	imageString: PropTypes.string.isRequired,
	user: PropTypes.object.isRequired,
};

const ProfileAvatarStyled = styled.img`
	height: 40px;
	border-radius: 20px;
`;
export default ProfileAvatar;
