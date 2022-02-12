import axiosFetch, { requestMethods, urlLink } from './axios';

const createNewDriver = async(body) => {
    const response = await axiosFetch({ body, method: requestMethods.POST, url: `${urlLink}/users/register` });
    return response;
};

export default createNewDriver;