import axios from 'axios';

const retrieveData = async () => {
  try {
    const authToken = localStorage.getItem('authToken');
    return authToken;
  } catch (error) {
    console.error('Error retrieving authentication token:', error);
    return null;
  }
};


export const sendRequestService = async (method, url, body, includeToken) => {
  try {
    let headers = {};
    if (includeToken) {
      const authToken = await retrieveData();
      headers = authToken ? { Authorization: `Bearer ${authToken}` } : {};
    }
    headers = {
      ...headers,
      "Content-Type": "application/json"
    };

    let response;
    if (method === 'GET') {
      // console.log('getcountry-------', url, headers); 
      response = await axios.get(url, { headers });
    } else if (method === 'POST') {
      response = await axios.post(url, body, { headers });
    } else if (method === 'PUT') {
      response = await axios.put(url, body, { headers });
    } else if (method === 'PATCH') {
      response = await axios.patch(url, body, { headers });
      console.log(response, "api responnse===")
    } else if (method === 'DELETE') {
      response = await axios.delete(url, { headers });
    }
    // console.log('getResponse!!!!!!!!!!!', url,  response.data.data);
    return response.data;
  } catch (error) {
    // console.log('error ()', error.response);
    if (error?.response?.status === 401) {
      console.log('Response error:', error);
      // } else if (axios.isCancel(error)) {
      //   console.log('Request canceled:', error.message);
    } else if (error.response) {
      console.log('Response error:', error.response.data);
      console.log('Status code:', error.response.status);
      console.log('Headers:', error.response.headers);
    } else if (error.request) {
      console.log('Request error:', error.request);
    } else {
      console.log('Error:', error.message);
    }
    throw error.response;
  }
};