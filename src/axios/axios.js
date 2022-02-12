import axios from 'axios';

//export const urlLink = 'http://localhost:4000';
export const urlLink = 'https://smart-transport-backend.herokuapp.com/';

export const requestMethods = {
  DELETE: 'DELETE',
  GET: 'GET',
  POST: 'POST',
  PUT: 'PUT',
};

export const getTokenFromStorage = () => {
  return localStorage.getItem('smartTransportTokenV2');
}

export const setTokenToStorage = (value) => {
  return localStorage.setItem('smartTransportTokenV2', value);
}

const axiosFetch = async ({ body, method, url }) => {
  try {
    if(method === requestMethods.GET){
      const response = await axios.get(url, {
        method: method,
        headers: {
          Authorization: `Bearer ${getTokenFromStorage()}`,
        }
      })
      return response.data.values;
    } else if (method === requestMethods.DELETE) {
      
    }

    const response = await axios.post(url, body, {
      method: method,
      headers: {
        Authorization: `Bearer ${getTokenFromStorage()}`,
      }
    })
    return response.data.values;
  } catch (error) {
    return undefined;
  }
};

export default axiosFetch;
