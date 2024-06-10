import axios from 'axios';

export const REQUEST_TIMEOUT = 20000;

const instance = axios.create({
  timeout: REQUEST_TIMEOUT,
  paramsSerializer: {},
});

const request = instance.request;

export default request;
