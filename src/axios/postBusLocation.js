import axiosFetch, { requestMethods, urlLink } from './axios';

const postBusLocation = async(body, id) => {
    const response = await axiosFetch({ body, method: requestMethods.POST, url: `${urlLink}/bus/post-location/${id}` });
    return response;
};

export default postBusLocation;