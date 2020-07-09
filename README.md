# table-with-edit-and-pagination

基于antd的table组件、pagination组件和form表单，实现配置即生成列表的增删改查（React + ts）

## 引入方式

```
// bash
$ npm i table-with-edit-and-pagination
```

```
// tsx文件内
import { Pagination } from 'table-with-edit-and-pagination';
import 'antd/lib/pagination/style/css'; // 注意：组件中未打包引入antd相关css，需自行引入

function App() {
  return (
    <div className="App">
      <Pagination {...{
        totalType: 1,
        total: 26,
        current: 1,
          }}/>
    </div>
  );
}
```

## 常见问题

1. 没有antd组件的样式
> 组件中未打包引入antd相关css，需自行引入
2. 引入了该插件以后编译报错

```
Error: Invalid hook call. Hooks can only be called inside of the body of a function component. This could happen for one of the following reasons:
1. You might have mismatching versions of React and the renderer (such as React DOM)
2. You might be breaking the Rules of Hooks
3. You might have more than one copy of React in the same app
See https://fb.me/react-invalid-hook-call for tips about how to debug and fix this problem.
```
> 因组件内引入了react和react-dom，引起原本项目有包名重复的问题：打包时使用alias别名将包指向同一个地址

```
    'react': path.resolve('./node_modules/react') ,
    'react-dom': path.resolve('./node_modules/react-dom') ,
```
