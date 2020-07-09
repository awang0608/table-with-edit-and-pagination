import React from 'react';
import { Pagination } from 'antd';
import { PaginationProps } from 'antd/lib/pagination';
const style = require('./index.less');

export interface PaginationInterface extends PaginationProps {
  pageInfo?: PageInterface;
  totalType?: number;
}
export interface PageInterface {
  current: number;
  pageSize: number;
  total: number;
}
const defaultConfig = {
  defaultPageSize: 10,
  defaultCurrent: 1,
  showQuickJumper: true,
  showSizeChanger: false,
};
const MyPagination: React.FC<PaginationInterface> = props => {
  const showTotal = () => {
    switch (props.totalType) {
      case 0:
        return `共 ${(props.pageInfo &&
          Math.ceil(props.pageInfo.total / props.pageInfo.pageSize)) ||
          0} 页 |
        共 ${(props.pageInfo && props.pageInfo.total) || 0} 条记录`;
      case 1:
        return `共 ${
          props.pageInfo ? props.pageInfo.total : props.total || 0
        } 条记录`;
      default:
        return null;
    }
  };

  return (
    <div className={`${style.container} flex`}>
      <div className={style.total}>{showTotal()}</div>
      <Pagination
        {...{ ...defaultConfig, ...props, ...props.pageInfo }}
      ></Pagination>
    </div>
  );
};

export default MyPagination;
