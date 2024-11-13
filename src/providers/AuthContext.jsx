import { createContext, useCallback, useContext } from "react";

export const TasksContext = createContext(null);
export const TasksDispatchContext = createContext(null);

export const usernameContext = createContext('error')

export const loginContext = createContext(false);

// #region Auth
/* 
Inserts username and other infoin header for you
//TODO: Add security here

Requires:
- url

optional:
- method type
- headers
- body (if post/put)

eg:
const handleFetchData = async () => {
    try {
        const data = await tasksFetch('http://yourapi.com/endpoint', {
            method: 'POST',
            body: { password: 'yourPassword' }, // Example body data
        });
        console.log(data); // Handle your data here
    } catch (error) {
        console.error('Error fetching data:', error);
    }
};
*/
export const tasksFetch = (url,options = {}) => {
    console.log("TaskFetch")
    const username = window.sessionStorage.getItem('username')

    const headers = {
        'Content-Type': 'application/json',
        'username': username, 
        ...options.headers, //include rest of the headers
    };

    const fetchOptions = {
        method: options.method || "GET",
        headers: headers,
    }

    if(options.method !== "GET" && options.body){
        // add body if its available, deny if its get
        fetchOptions.body = (options.body);
    }
    console.log('AuthContext.jsx> Fetching with parameters:\n', {
        url,
        fetchOptions,
    });

    const response = fetch(url, fetchOptions);

    return response;
}   



// #endregion