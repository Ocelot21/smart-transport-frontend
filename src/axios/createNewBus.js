import axiosFetch, { requestMethods, urlLink } from './axios';

const createNewBus = async(body) => {
    const response = await axiosFetch({ body, method: requestMethods.POST, url: `${urlLink}/bus/create` });
    return response;
};

export default createNewBus;