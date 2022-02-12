import axiosFetch, { requestMethods, urlLink } from './axios';

const fetchUser = async(id) => {
    const response = await axiosFetch({ method: requestMethods.GET, url: `${urlLink}/users/id/${id}` });
    return response;
};

export default fetchUser;