import styled from '@emotion/styled';
import {Skeleton} from '@mui/material';
import PropTypes from 'prop-types';

import {checkImageString} from 'utils';
import {BASE_SERVER_URL} from 'api/base-server-url';
import {Fragment} from 'react';

function ProfileAvatar({user}) {
	return (
		<Fragment>
			{checkImageString(user?.avatar || '') ? (
				<ObjectStyled
					data={`${BASE_SERVER_URL}/users/image/avatar/${user?.avatar}`}>
					<SkeletonStyled variant='rectangular' />
				</ObjectStyled>
			) : (
				<ObjectStyled data={user?.avatar}>
					<ImgStyled src={user?.avatar} alt='' srcset='' />
				</ObjectStyled>
			)}
		</Fragment>
	);
}

ProfileAvatar.propTypes = {
	user: PropTypes.object.isRequired,
};

const ObjectStyled = styled.object`
	height: 40px;
	border-radius: 20px;
`;

const ImgStyled = styled.img`
	height: 40px;
	border-radius: 20px;
`;

const SkeletonStyled = styled(Skeleton)`
	height: 40px;
	width: 40px;
	border-radius: 20px;
`;
export default ProfileAvatar;
