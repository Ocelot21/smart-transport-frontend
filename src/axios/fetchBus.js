import axiosFetch, { requestMethods, urlLink } from './axios';

const fetchBus = async(id) => {
    const response = await axiosFetch({ method: requestMethods.GET, url: `${urlLink}/bus/get/${id}` });
    return response;
};

export default fetchBus;