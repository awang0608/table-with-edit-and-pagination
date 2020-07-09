import { ColumnType } from 'antd/lib/table/interface';
import { TableProps } from 'antd/lib/table/Table';
import { PaginationProps } from 'antd/lib/pagination/Pagination';
import { Callbacks } from '../../types/interface';
import { IFormEditSelectValue } from '../FormEdit/interface';

/**
 * ITableColumn table列表接口类型
 */
export interface ITableColumn extends ColumnType<any> {
  /**
   * 新增字段类型：0 新增字段 1 新增必填字段
   */
  fieldTypeWhenAdd?: 0 | 1;
  /**
   * 修改字段类型：0 修改字段 1 修改必填字段 2 修改时只显示、不可修改字段
   */
  fieldTypeWhenModify?: 0 | 1 | 2;
  /**
   * 字段校验规则
   */
  rules?: Record<any, any>[];
  /**
   * 表单信息 默认input
   */
  formInfo?: {
    /**
     * 表单类型
     */
    type: 'input' | 'select' | 'dataPicker';
    /**
     * 下拉列表时列表数组
     */
    optionList?: IFormEditSelectValue[];
  };
}

/**
 * ITable 分页接口类型，继承自antd<Pagination>组件，参数参考官网
 */
export interface ITablePagination extends PaginationProps {
  /**
   * 分页组件总数展示类型：0 共{num}页|共{num}条记录  1 共{num}条记录
   */
  totalType: 0 | 1;
}
/**
 * ITableDataSource 单个数据源接口类型，一定要有id属性
 */
export interface ITableDataSource extends Record<any, any> {
  /**
   * id 唯一键
   */
  id: string;
}
/**
 * ITable table接口类型，继承自antd<Table>组件，参数参考官网
 */
export interface ITable extends TableProps<any> {
  /**
   * 添加按钮的配置信息，不为空时显示添加按钮
   */
  add: null | {
    /**
     * 添加按钮文本信息
     */
    addText?: string;
    /**
     * 添加按钮Icon
     */
    addIcon?: JSX.Element;
    /**
     * 添加方法
     */
    addInfo?: {
      /**
       * 是否将参数放于接口上
       */
      isParamInUrl?: boolean;
      /**
       * 参数参照axios
       */
      [propName: string]: any;
    };
  },
  /**
   * 分页接口类型
   */
  pagination?: ITablePagination;
  /**
   * 保存回调
   */
  saveCallBack?: Callbacks['onSave'];
  /**
   * 刷新回调
   */
  refreshCallBack?: Callbacks['onRefresh'];
  /**
   * 是否显示操作栏修改按钮（modifyInfo为空canBeModify为true时，调用保存回调）
   */
  canBeModify?: boolean;
  /**
   * 保存接口请求
   */
  modifyInfo?: {
    /**
     * 是否将参数放于接口上
     */
    isParamInUrl?: boolean;
    /**
     * 参数参照axios
     */
    [propName: string]: any;
  };
  /**
   * 删除
   */
  deleteInfo?: {
    /**
     * 是否将参数放于接口上
     */
    isParamInUrl?: boolean;
    /**
     * 参数参照axios
     */
    [propName: string]: any;
  };
}
