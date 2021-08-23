/* eslint-disable no-param-reassign */
import Axios from 'axios';
import vscode from 'vscode';
import qs from 'qs';

// 中文文档: http://t.cn/ROfXFuj
// 创建实例
const axios = Axios.create({
  baseURL: '',
  timeout: 10000,
});

// 添加请求拦截器
axios.interceptors.request.use(
  config => {
    if (config.method === 'get') {
      config.paramsSerializer = params => qs.stringify(params, { arrayFormat: 'repeat' });
    }
    return config;
  },
  error => {
    vscode.window.showErrorMessage(error.message);
    return Promise.reject(error);
  }
);

// 添加响应拦截器
axios.interceptors.response.use(
  response => {
    const { data } = response;
    return data;
  },
  error => {
    vscode.window.showErrorMessage(error.message);
    return Promise.reject(error);
  }
);

export default axios;
