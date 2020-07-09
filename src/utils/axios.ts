import axios from 'axios';
import { message } from 'antd';

const codeMessage: any = {
  200: '服务器成功返回请求的数据。',
  201: '新建或修改数据成功。',
  202: '一个请求已经进入后台排队（异步任务）。',
  204: '删除数据成功。',
  400: '发出的请求有错误，服务器没有进行新建或修改数据的操作。',
  401: '用户没有权限（令牌、用户名、密码错误）。',
  403: '用户得到授权，但是访问是被禁止的。',
  404: '发出的请求针对的是不存在的记录，服务器没有进行操作。',
  406: '请求的格式不可得。',
  410: '请求的资源被永久删除，且不会再得到的。',
  422: '当创建一个对象时，发生一个验证错误。',
  500: '服务器发生错误，请检查服务器。',
  502: '网关错误。',
  503: '服务不可用，服务器暂时过载或维护。',
  504: '网关超时。'
};
let loadingCount: number = 0;

export interface OptionsInterface {
  method?: 'POST' | 'PUT' | 'DELETE';
  data?: {};
  params?: {};
  type?: string;
  timeout?: number;
  responseType?: 'arraybuffer' | 'blob' | 'document' | 'json' | 'text' | 'stream' | undefined;
}
const errorHandle = (error: any) => {
  if (error.response) {
    const code = error.response.status || 404;
    const data = error.response.data;

    if ([401, 403].includes(error.response.status)) {
      message.error('请重新登录');
    } else if (code !== 404) {
      message.error(data.message||codeMessage[code]);
    }
  } else if (error.request) {
    console.log('error.request', error.request);
  } else {
    console.log('Error', error.message);
  }
};

const apiResponseError = (res: any) => {
  if (res.status !== 401) {
    message.error(res.data && res.data.message ? res.data.message : '接口发生错误！');
  }
};
// 增加请求数
const addLoadingCount = () => {
  // if (!loadingCount) {
  //   EventBus.emit('changeGlobalLoading', true);
  // }
  loadingCount++;
};
// 减少请求数
const reduceLoadingCount = () => {
  if (loadingCount) {
    loadingCount--;
    // if (!loadingCount) {
    //   EventBus.emit('changeGlobalLoading', false);
    // }
  }
};

const ajax = (url: string, options?: OptionsInterface, isLoading: boolean = true): Promise<any> => {
  const { method = 'GET', data = {}, type, responseType, timeout = 10000 } = options || {};

  isLoading && addLoadingCount();
  return new Promise((resolve, reject): any => {
    axios({
      url,
      headers: {
        'X-Requested-With': 'XMLHttpRequest',
        'Content-Type': type || 'application/x-www-form-urlencoded'
      },
      withCredentials: false,
      ...options,
      method,
      responseType,
      timeout,
      data
    })
      .then((res: { data: any; }) => {
        reduceLoadingCount();

        if (res && res.data) return resolve(res.data);
        apiResponseError(res.data);
        reject(res.data);
      })
      .catch((err: any) => {
        reduceLoadingCount();
        errorHandle(err);
        reject(err);
      });
  });
};

ajax.prototype = {
  get(url: string, options: OptionsInterface, isLoading: boolean = true) {
    return ajax(url, { ...options }, isLoading);
  },
  post(url: string, options: OptionsInterface, isLoading: boolean = true) {
    return ajax(url, { ...options, method: 'POST' }, isLoading);
  },
  put(url: string, options: OptionsInterface, isLoading: boolean = true) {
    return ajax(url, { ...options, method: 'PUT' }, isLoading);
  },
  del(url: string, options: OptionsInterface, isLoading: boolean = true) {
    return ajax(url, { ...options, method: 'DELETE' }, isLoading);
  }
};

export default ajax;
