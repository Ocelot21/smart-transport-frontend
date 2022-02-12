import axiosFetch, { requestMethods, urlLink } from './axios';

const getMe = async() => {
    const response = await axiosFetch({ method: requestMethods.GET, url: `${urlLink}/users/me` });
    return response;
};

export default getMe;