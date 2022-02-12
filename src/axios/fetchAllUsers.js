import axiosFetch, { requestMethods, urlLink } from './axios';

const fetchAllUsers = async() => {
    const response = await axiosFetch({ method: requestMethods.GET, url: `${urlLink}/users/all` });
    return response;
};

export default fetchAllUsers;