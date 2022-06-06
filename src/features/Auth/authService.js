import axiosInstance from 'api/axios-instance';
import {keyTextAccessToken} from './constants';

const SIGNUP_URL = '/auth/signup';
const SIGNIN_URL = '/auth/signin';
const SIGNIN_WITH_GOOGLE = '/auth/google';
const SIGNIN_WITH_FACEBOOK = '/auth/facebook';
const LOGOUT_URL = '/auth/logout';

const PROFILE_URL = '/users/profile';

// Register user
const register = async userData => {
	const {accessToken} = await axiosInstance.post(SIGNUP_URL, userData);
	if (accessToken) {
		localStorage.setItem(keyTextAccessToken, accessToken);
	}

	return accessToken;
};

// Login
const login = async userData => {
	const {accessToken} = await axiosInstance.post(SIGNIN_URL, userData);

	if (accessToken) {
		localStorage.setItem(keyTextAccessToken, accessToken);
	}

	return accessToken;
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
	const {accessToken} = await axiosInstance.post(SIGNIN_WITH_GOOGLE, userInfo);

	if (accessToken) {
		localStorage.setItem(keyTextAccessToken, accessToken);
	}

	return accessToken;
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
	const {accessToken} = await axiosInstance.post(SIGNIN_WITH_FACEBOOK, userInfo);

	if (accessToken) {
		localStorage.setItem(keyTextAccessToken, accessToken);
	}

	return accessToken;
};

// get profile of user
const getProfile = async accessToken => {
	const data = await axiosInstance.get(PROFILE_URL);

	if (data) {
		localStorage.setItem(keyTextAccessToken, accessToken);
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
