import axiosInstance from 'api/axios-instance';

const SIGNUP_URL = '/users/signup';
const SIGNIN_URL = '/users/signin';
const PROFILE_URL = '/users/profile';
const SIGNIN_WITH_GOOGLE = '/users/google';
const SIGNIN_WITH_FACEBOOK = '/users/facebook';
const LOGOUT_URL = '/users/logout';

// Register user
const register = async userData => {
	const data = await axiosInstance.post(SIGNUP_URL, userData);
	if (data) {
		localStorage.setItem('auth', JSON.stringify(data));
	}

	return data;
};

// Login
const login = async userData => {
	const data = await axiosInstance.post(SIGNIN_URL, userData);

	if (data) {
		localStorage.setItem('auth', JSON.stringify(data));
	}

	return data;
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
	const data = await axiosInstance.post(SIGNIN_WITH_GOOGLE, userInfo);

	if (data) {
		localStorage.setItem('auth', JSON.stringify(data));
	}

	return data;
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
	const data = await axiosInstance.post(SIGNIN_WITH_FACEBOOK, userInfo);
	if (data) {
		localStorage.setItem('auth', JSON.stringify(data));
	}

	return data;
};

// get profile of user
const getProfile = async accessToken => {
	const data = await axiosInstance.get(PROFILE_URL);
	if (data) {
		localStorage.setItem(
			'auth',
			JSON.stringify({
				// user: data,
				accessToken,
			}),
		);
	}

	return data;
};

// Logout user
const logout = async () => {
	const data = await axiosInstance.post(LOGOUT_URL);
	return data;
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
