import axiosFetch, { requestMethods, urlLink } from './axios';

const loginToBackend = async(body) => {
    const response = await axiosFetch({ body, method: requestMethods.POST, url: `${urlLink}/users/login` });
    return response;
};

export default loginToBackend;