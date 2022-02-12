import axiosFetch, { requestMethods, urlLink } from './axios';

const fetchAllBusses = async() => {
    const response = await axiosFetch({ method: requestMethods.GET, url: `${urlLink}/bus/get-all` });
    return response;
};

export default fetchAllBusses;