import { sendRequestService } from "./ApiService";
import AsyncStorage from '@react-native-async-storage/async-storage';

const base_url = "https://rental.clikzopdevp.com/api/";

export const isValidToken = async () => {
  try {
    const token = await AsyncStorage.getItem('authToken');
    if (!token) {
      console.log('Token not found');
      return false; // Token does not exist
    }
    console.log('Token found:', token);

    // Perform additional checks if necessary (e.g., token expiration)

    return true; // Token is valid
  } catch (error) {
    console.error('Token validation error:', error);
    return false;
  }
};

export const Login = async (mobilenumber, password) => {
  try {
    const myHeaders = new Headers();
    myHeaders.append("Cookie", "PHPSESSID=4rhec3uir32urn2farjjklv3in");

    const formData = new FormData();
    formData.append('mobile', mobilenumber);
    formData.append('password', password);

    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: formData,
      redirect: "follow"
    };

    const response = await fetch(`${base_url}login`, requestOptions);
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const result = await response.json(); 
    console.log('Login Result:', result);

    if (result && result.data && result.data.token) {
        await AsyncStorage.setItem('authToken', result.data.token);
      } else {
        throw new Error('Invalid token received from server');
      }

    return result;
  } catch (error) {
    console.error('Login Error:', error);
    throw error; 
  }
};

export const Addleadsform = async (
  name, email, mobile, source, type, category, subCategory, classification, campaign, project, state, city, address, comment
) => {
  console.log('----------->', name, email, mobile, source, type, category, subCategory, classification, campaign, project, state, city, address, comment);
  try {
    const isValid = await isValidToken();
    if (!isValid) {
      console.log('invaid')
      throw new Error('Invalid or expired token');
    }

    const token = await AsyncStorage.getItem('authToken');
    console.log('Token:', token);
    if (!token) {
      throw new Error('Token not found');
    }

    const myHeaders = new Headers();
    myHeaders.append("token", token);

    const formdata = new FormData();
    formdata.append("name", name);
    formdata.append("email", email);
    formdata.append("mobile", mobile);
    formdata.append("source", source);
    formdata.append("type", type);
    formdata.append("category_id", category);
    formdata.append("sub_category_id", subCategory);
    formdata.append("classification", classification);
    formdata.append("campaign", campaign);
    formdata.append("project", project);
    formdata.append("state", state);
    formdata.append("city", city);
    formdata.append("address", address);
    formdata.append("comment", comment);
    formdata.append("dob", "");  // Update or remove if not used
    formdata.append("doa", "");  // Update or remove if not used

    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: formdata,
      redirect: "follow"
    };

    const response = await fetch(`${base_url}add-lead`, requestOptions);
    console.log('Response:', response);
    
    const statusCode = response.status;
    console.log('Status Code:', statusCode);
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${statusCode}`);
    }

    const result = await response.json();
    console.log('Result:', result);

    return { statusCode, result };
  } catch (error) {
    console.error('Error:', error);
    throw error;
  }
};


  export const sourceapi = async () => {
    try {
      const token = await AsyncStorage.getItem('authToken');
  
      if (!token) {
        throw new Error('Token not found');
      }
  
      const myHeaders = new Headers();
      myHeaders.append("token", token);
      
      const requestOptions = {
        method: "GET",
        headers: myHeaders,
        redirect: "follow"
      };
  
      const response = await fetch(`${base_url}get-source`, requestOptions);
  
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
  
      const result = await response.json();
  
      return result;
    } catch (error) {
      console.error('API Request Error:', error);
      throw error;
    }
  };

  export const getstateapi = async () => {
    try {
      const token = await AsyncStorage.getItem('authToken');
  
      if (!token) {
        throw new Error('Token not found');
      }
  
      const myHeaders = new Headers();
      myHeaders.append("token", token);
      
      const requestOptions = {
        method: "GET",
        headers: myHeaders,
        redirect: "follow"
      };
  
      const response = await fetch(`${base_url}get-state`, requestOptions);
  
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
  
      const result = await response.json();
  
      return result;
    } catch (error) {
      console.error('API Request Error:', error);
      throw error;
    }
  };

  export const getcityapi = async (state) => {
    try {
      const token = await AsyncStorage.getItem('authToken');
  
      if (!token) {
        throw new Error('Token not found');
      }
  
      const myHeaders = new Headers();
      myHeaders.append("token", token);

      const formdata = new FormData();
      formdata.append("state", state);
      
      const requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: formdata,
        redirect: "follow"
      };
  
      const response = await fetch(`${base_url}get-city`, requestOptions);
  
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
  
      const result = await response.json();
  
      return result;
    } catch (error) {
      console.error('API Request Error:', error);
      throw error;
    }
  };

  export const typeapi = async () => {
    try {
      const token = await AsyncStorage.getItem('authToken');
  
      if (!token) {
        throw new Error('Token not found');
      }
  
      const myHeaders = new Headers();
      myHeaders.append("token", token);
      
      const requestOptions = {
        method: "GET",
        headers: myHeaders,
        redirect: "follow"
      };
  
      const response = await fetch(`${base_url}get-type`, requestOptions);
  
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
  
      const result = await response.json();
  
      return result;
    } catch (error) {
      console.error('API Request Error:', error);
      throw error;
    }
  };

  export const categoryapi = async (typeid) => {
    try {
      const token = await AsyncStorage.getItem('authToken');
  
      if (!token) {
        throw new Error('Token not found');
      }
  
      const myHeaders = new Headers();
      myHeaders.append("token", token);

      const formdata = new FormData();
      formdata.append("typeid", typeid);
      
      const requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: formdata,
        redirect: "follow"
      };
  
      const response = await fetch(`${base_url}get-category`, requestOptions);
  
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
  
      const result = await response.json();
  
      return result;
    } catch (error) {
      console.error('API Request Error:', error);
      throw error;
    }
  };

  export const subcategoryapi = async (typeid) => {
    try {
      const token = await AsyncStorage.getItem('authToken');
  
      if (!token) {
        throw new Error('Token not found');
      }
  
      const myHeaders = new Headers();
      myHeaders.append("token", token);

      const formdata = new FormData();
      formdata.append("category_id", typeid);
      
      const requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: formdata,
        redirect: "follow"
      };
  
      const response = await fetch(`${base_url}get-sub-category`, requestOptions);
  
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
  
      const result = await response.json();
  
      return result;
    } catch (error) {
      console.error('API Request Error:', error);
      throw error;
    }
  };

  export const classificationapi = async () => {
    try {
      const token = await AsyncStorage.getItem('authToken');
  
      if (!token) {
        throw new Error('Token not found');
      }
  
      const myHeaders = new Headers();
      myHeaders.append("token", token);
      
      const requestOptions = {
        method: "GET",
        headers: myHeaders,
        redirect: "follow"
      };
  
      const response = await fetch(`${base_url}get-classification`, requestOptions);
  
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
  
      const result = await response.json();
  
      return result;
    } catch (error) {
      console.error('API Request Error:', error);
      throw error;
    }
  };

  export const campignsapi = async () => {
    try {
      const token = await AsyncStorage.getItem('authToken');
  
      if (!token) {
        throw new Error('Token not found');
      }
  
      const myHeaders = new Headers();
      myHeaders.append("token", token);
      
      const requestOptions = {
        method: "GET",
        headers: myHeaders,
        redirect: "follow"
      };
  
      const response = await fetch(`${base_url}get-campigns`, requestOptions);
  
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
  
      const result = await response.json();
  
      return result;
    } catch (error) {
      console.error('API Request Error:', error);
      throw error;
    }
  };

  export const projectapi = async () => {
    try {
      const token = await AsyncStorage.getItem('authToken');
  
      if (!token) {
        throw new Error('Token not found');
      }
  
      const myHeaders = new Headers();
      myHeaders.append("token", token);
      
      const requestOptions = {
        method: "GET",
        headers: myHeaders,
        redirect: "follow"
      };
  
      const response = await fetch(`${base_url}get-project`, requestOptions);
  
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
  
      const result = await response.json();
  
      return result;
    } catch (error) {
      console.error('API Request Error:', error);
      throw error;
    }
  };

  export const leaddataapi = async (password) => {
    try {
      const token = await AsyncStorage.getItem('authToken');
  console.log(token)
      if (!token) {
        throw new Error('Token not found');
      }
  
      const myHeaders = new Headers();
      myHeaders.append("token", token);

      const formdata = new FormData();
      formdata.append("password", password);
      
      const requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: formdata,
        redirect: "follow"
      };
  
      const response = await fetch(`${base_url}lead-data`, requestOptions);
  
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
  
      const result = await response.json();
  
      return result;
    } catch (error) {
      console.error('API Request Error:', error);
      throw error;
    }
  };

  export const profileapi = async () => {
    try {
      const token = await AsyncStorage.getItem('authToken');
  
      if (!token) {
        throw new Error('Token not found');
      }
  
      const myHeaders = new Headers();
      myHeaders.append("token", token);
      
      const requestOptions = {
        method: "GET",
        headers: myHeaders,
        redirect: "follow"
      };
  
      const response = await fetch(`${base_url}get-profile`, requestOptions);
  
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
  
      const result = await response.json();
  
      return result;
    } catch (error) {
      console.error('API Request Error:', error);
      throw error;
    }
  };

  export const changepasswordapi = async (password) => {
    try {
      const token = await AsyncStorage.getItem('authToken');
  
      if (!token) {
        throw new Error('Token not found');
      }
  
      const myHeaders = new Headers();
      myHeaders.append("token", token);

      const formdata = new FormData();
      formdata.append("password", password);
      
      const requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: formdata,
        redirect: "follow"
      };
  
      const response = await fetch(`${base_url}change-password`, requestOptions);
  
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
  
      const result = await response.json();
  
      return result;
    } catch (error) {
      console.error('API Request Error:', error);
      throw error;
    }
  };

  export const statusapi = async () => {
    try {
      const token = await AsyncStorage.getItem('authToken');
  
      if (!token) {
        throw new Error('Token not found');
      }
  
      const myHeaders = new Headers();
      myHeaders.append("token", token);
      
      const requestOptions = {
        method: "GET",
        headers: myHeaders,
        redirect: "follow"
      };
  
      const response = await fetch(`${base_url}get-status`, requestOptions);
  
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
  
      const result = await response.json();
  
      return result;
    } catch (error) {
      console.error('API Request Error:', error);
      throw error;
    }
  };

  export const tasklistapi = async () => {
    try {
      const token = await AsyncStorage.getItem('authToken');
  
      if (!token) {
        throw new Error('Token not found');
      }
  
      const myHeaders = new Headers();
      myHeaders.append("token", token);
      
      const requestOptions = {
        method: "GET",
        headers: myHeaders,
        redirect: "follow"
      };
  
      const response = await fetch(`${base_url}task-list`, requestOptions);
  
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
  
      const result = await response.json();
  
      return result;
    } catch (error) {
      console.error('API Request Error:', error);
      throw error;
    }
  };

  export const addtaskapi = async (task) => {
    try {
      const token = await AsyncStorage.getItem('authToken');
  
      if (!token) {
        throw new Error('Token not found');
      }
  
      const myHeaders = new Headers();
      myHeaders.append("token", token);

      const formdata = new FormData();
      formdata.append("task", task);
      
      const requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: formdata,
        redirect: "follow"
      };
  
      const response = await fetch(`${base_url}add-task`, requestOptions);
  
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
  
      const result = await response.json();
  
      return result;
    } catch (error) {
      console.error('API Request Error:', error);
      throw error;
    }
  };

  export const updatetaskapi = async (taskid,remarks) => {
    try {
      const token = await AsyncStorage.getItem('authToken');
      if (!token) {
        throw new Error('Token not found');
      }
  
      const myHeaders = new Headers();
      myHeaders.append("token", token);

      const formdata = new FormData();
      formdata.append("task_id", taskid);
      formdata.append("remarks", remarks);
      
      const requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: formdata,
        redirect: "follow"
      };
  
      const response = await fetch(`${base_url}update-task`, requestOptions);
  
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
  
      const result = await response.json();
  
      return result;
    } catch (error) {
      console.error('API Request Error:', error);
      throw error;
    }
  };

  export const dashboardapi = async (password,mobilenumber) => {
    try {
      const token = await AsyncStorage.getItem('authToken');
      if (!token) {
        throw new Error('Token not found');
      }
  
      const myHeaders = new Headers();
      myHeaders.append("token", token);

      const formdata = new FormData();
      formdata.append("password", password);
      formdata.append("mobile", mobilenumber);
      
      const requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: formdata,
        redirect: "follow"
      };
  
      const response = await fetch(`${base_url}dashboard`, requestOptions);
  
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
  
      const result = await response.json();
  
      return result;
    } catch (error) {
      console.error('API Request Error:', error);
      throw error;
    }
  };

  export const getleaddata = async (leadid) => {
    try {
      const token = await AsyncStorage.getItem('authToken');
      if (!token) {
        throw new Error('Token not found');
      }
  
      const myHeaders = new Headers();
      myHeaders.append("token", token);

      const formdata = new FormData();
      formdata.append("lead_id", leadid);
      
      const requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: formdata,
        redirect: "follow"
      };
  
      const response = await fetch(`${base_url}get-lead-data`, requestOptions);
  
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
  
      const result = await response.json();
      console.log(result)
      return result;
    } catch (error) {
      console.error('API Request Error:', error);
      throw error;
    }
  };

  export const updatestatus = async (id,remarks,status) => {
    try {
      const token = await AsyncStorage.getItem('authToken');
      if (!token) {
        throw new Error('Token not found');
      }
  
      const myHeaders = new Headers();
      myHeaders.append("token", token);

      const formdata = new FormData();
      formdata.append("id", id);
      formdata.append("remarks", remarks);
      formdata.append("status", status);
      
      const requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: formdata,
        redirect: "follow"
      };
  
      const response = await fetch(`${base_url}update-status`, requestOptions);
  
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
  
      const result = await response.json();
      console.log(result)
      return result;
    } catch (error) {
      console.error('API Request Error:', error);
      throw error;
    }
  };

  export const getleaddataapi = async (status) => {
    try {
      const token = await AsyncStorage.getItem('authToken');
      console.log(token)
  
      if (!token) {
        throw new Error('Token not found');
      }
  
      const myHeaders = new Headers();
      myHeaders.append("token", token);

      const formdata = new FormData();
      formdata.append("status", status);
      
      const requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: formdata,
        redirect: "follow"
      };
  
      const response = await fetch(`${base_url}lead-data`, requestOptions);
  
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
  
      const result = await response.json();
  
      return result;
    } catch (error) {
      console.error('API Request Error:', error);
      throw error;
    }
  };
  
  export const updateleadsform = async (
    name, email, mobile, source, type, category, subCategory, classification, campaign, project, state, city, address, comment
  ) => {
    console.log('----------->', name, email, mobile, source, type, category, subCategory, classification, campaign, project, state, city, address, comment);
    try {
      const isValid = await isValidToken();
      if (!isValid) {
        console.log('invaid')
        throw new Error('Invalid or expired token');
      }
  
      const token = await AsyncStorage.getItem('authToken');
      console.log('Token:', token);
      if (!token) {
        throw new Error('Token not found');
      }
  
      const myHeaders = new Headers();
      myHeaders.append("token", token);
  
      const formdata = new FormData();
      formdata.append("name", name);
      formdata.append("email", email);
      formdata.append("mobile", mobile);
      formdata.append("source", source);
      formdata.append("type", type);
      formdata.append("category_id", category);
      formdata.append("sub_category_id", subCategory);
      formdata.append("classification", classification);
      formdata.append("campaign", campaign);
      formdata.append("project", project);
      formdata.append("state", state);
      formdata.append("city", city);
      formdata.append("address", address);
      formdata.append("comment", comment);
      formdata.append("dob", "");  // Update or remove if not used
      formdata.append("doa", "");  // Update or remove if not used
  
      const requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: formdata,
        redirect: "follow"
      };
  
      const response = await fetch(`${base_url}update-lead`, requestOptions);
      console.log('Response:', response);
      
      const statusCode = response.status;
      console.log('Status Code:', statusCode);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${statusCode}`);
      }
  
      const result = await response.json();
      console.log('Result:', result);
  
      return { statusCode, result };
    } catch (error) {
      console.error('Error:', error);
      throw error;
    }
  };
 


  
  
  




