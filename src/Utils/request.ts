import axios from 'axios';

const instance = axios.create({
  timeout: 2000,
  paramsSerializer: {},
});

const request = instance.request;

export default request;
