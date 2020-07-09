declare function axios(url: string, options?: any): Promise<any>;
declare namespace axios {
  function get(url: string, options: any): Promise<any>;
  function post(url: string, options: any): Promise<any>;
  function put(url: string, options: any): Promise<any>;
  function del(url: string, options: any): Promise<any>;
}
