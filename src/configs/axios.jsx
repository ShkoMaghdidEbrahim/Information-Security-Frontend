import axios from 'axios';
import {useEffect, useRef, useState} from 'react';
import {API_URL, localStorageName} from './constants';
import {notification} from 'antd';

const auth = localStorage.getItem(localStorageName);

if (!auth && window.location.pathname !== '/login') {
    window.location.href = '/login';
}

const authObject = JSON.parse(auth);
export const axiosInstance = axios.create({
    baseURL: API_URL,
    headers: {
        authorization: authObject ? `Bearer ${authObject.token}` : ''
    }
});

axiosInstance.interceptors.response.use((response) => response, (error) => {
    if (error.response?.status === 401 && window.location.pathname !== '/login') {
        localStorage.removeItem(localStorageName);
        window.location.href = '/login';
    }
    return Promise.reject(error);
});

export const useAxiosGet = (url, params = {autoRun: false}, headers = {}) => {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    
    const lastParams = useRef(params);
    
    const request = async (queryParams = lastParams.current) => {
        const mergeQueryParams = {
            ...lastParams.current, ...queryParams
        };
        
        try {
            setLoading(true);
            const response = await axiosInstance.get(url, {
                params: mergeQueryParams,
                headers
            });
            setData(response.data);
            setError(null);
            lastParams.current = mergeQueryParams;
            return response.data;
        } catch (err) {
            setError(err);
            notification.error({
                message: err.response?.status,
                description: err.response?.data?.msg || 'Failed to connect to server',
                placement: 'topRight'
            });
            // throw err;
        } finally {
            setLoading(false);
        }
    };
    
    useEffect(() => {
        if (params.autoRun) {
            request().then(r => r);
        }
    }, []);
    return {
        data,
        setData,
        loading,
        error,
        request,
        lastParams: lastParams.current
    };
};

export const useAxiosDelete = (url, params = {autoRun: false}, headers = {}) => {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const request = async (queryParams = params, deleteId = '') => {
        try {
            setLoading(true);
            const response = await axiosInstance.delete(url + deleteId, {
                params: queryParams,
                headers
            });
            setData(response.data);
            return response.data;
        } catch (err) {
            setError(err);
            throw err;
        } finally {
            setLoading(false);
        }
    };
    
    useEffect(() => {
        if (params.autoRun) {
            request().then(r => r);
        }
    }, []);
    
    return {
        data,
        setData,
        loading,
        error,
        request
    };
};

export const useAxiosPost = (url, body, params = {autoRun: false}, headers = {}) => {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const request = async (bodyParams = body, queryParams = params, headersParams = headers) => {
        try {
            setLoading(true);
            const response = await axiosInstance.post(url, bodyParams, {
                params: queryParams,
                headersParams
            });
            setData(response.data);
            return response.data;
        } catch (err) {
            setError(err);
            notification.error({
                message: err.response?.status,
                description: err.response?.data?.msg || 'Failed to connect to server',
                placement: 'topRight'
            });
            throw err;
        } finally {
            setLoading(false);
        }
    };
    
    useEffect(() => {
        if (params.autoRun) {
            request().then(r => r);
        }
    }, []);
    
    return {
        data,
        setData,
        loading,
        error,
        request
    };
};

export const useAxiosPut = (url, body, params = {autoRun: false}, headers = {}) => {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    
    const request = async (bodyParams = body, queryParams = params) => {
        try {
            setLoading(true);
            const response = await axiosInstance.put(url, bodyParams, {
                params: queryParams,
                headers
            });
            setData(response.data);
            return response.data;
        } catch (err) {
            setError(err);
            throw err;
        } finally {
            setLoading(false);
        }
    };
    
    useEffect(() => {
        if (params.autoRun) {
            request().then(r => r);
        }
    }, []);
    
    return {
        data,
        setData,
        loading,
        error,
        request
    };
};

export const useAxiosPatch = (url, body, params = {autoRun: false}, headers = {}) => {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const request = async (bodyParams = body, queryParams = params) => {
        try {
            setLoading(true);
            const response = await axiosInstance.patch(url, bodyParams, {
                params: queryParams,
                headers
            });
            setData(response.data);
            return response.data;
        } catch (err) {
            notification.error({
                message: err.response?.status,
                description: err.response?.data?.msg || 'Failed to connect to server',
                placement: 'topRight'
            });
            setError(err);
            throw err;
        } finally {
            setLoading(false);
        }
    };
    
    useEffect(() => {
        if (params.autoRun) {
            request().then(r => r);
        }
    }, []);
    
    return {
        data,
        setData,
        loading,
        error,
        request
    };
};
