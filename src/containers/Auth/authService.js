import axiosInstance from 'config/axios-instance';

const SIGNUP_URL = '/users/signup';
const SIGNIN_URL = '/users/signin';
const PROFILE_URL = '/users/profile';
const SIGNIN_WITH_GOOGLE = '/users/google';
const SIGNIN_WITH_FACEBOOK = '/users/facebook';

// Register user
const register = async userData => {
	const response = await axiosInstance().post(SIGNUP_URL, userData);
	if (response.data) {
		localStorage.setItem('user', JSON.stringify(response.data));
	}

	return response.data;
};

// Login
const login = async userData => {
	const response = await axiosInstance().post(SIGNIN_URL, userData);

	if (response.data) {
		localStorage.setItem('user', JSON.stringify(response.data));
	}

	return response.data;
};

// Login user with google
const loginWithGoogle = async googleUserInfo => {
	const userInfo = {
		id: googleUserInfo?.googleId,
		email: googleUserInfo?.profileObj?.email,
		picture: googleUserInfo?.profileObj?.imageUrl,
		provider: googleUserInfo?.tokenObj?.idpId,
		displayName: googleUserInfo?.profileObj?.name,
		accessToken: googleUserInfo?.tokenObj?.access_token,
	};
	const response = await axiosInstance().post(SIGNIN_WITH_GOOGLE, userInfo);

	if (response.data) {
		localStorage.setItem('user', JSON.stringify(response.data));
	}

	return response.data;
};

// Login user with facebook
const loginWithFacebook = async facebookUserInfo => {
	const userInfo = {
		id: facebookUserInfo?.userID,
		email: facebookUserInfo?.email,
		picture: facebookUserInfo?.picture?.data?.url,
		provider: facebookUserInfo?.graphDomain,
		displayName: facebookUserInfo?.name,
		accessToken: facebookUserInfo?.accessToken,
	};
	const response = await axiosInstance().post(SIGNIN_WITH_FACEBOOK, userInfo);

	if (response.data) {
		localStorage.setItem('user', JSON.stringify(response.data));
	}

	return response.data;
};

// get profile of user
const getProfile = async accessToken => {
	const response = await axiosInstance(accessToken).get(PROFILE_URL);
	if (response.data) {
		localStorage.setItem(
			'user',
			JSON.stringify({
				user: response.data,
				accessToken,
			}),
		);
	}

	return response.data;
};

// Logout user
const logout = () => {
	localStorage.removeItem('user');
};

const authService = {
	register,
	login,
	logout,
	getProfile,
	loginWithGoogle,
	loginWithFacebook,
};

export default authService;
