import { Callbacks } from '../../types/interface';

/**
 * 表单编辑的Props接口
 */
export interface IFormEditProps {
  /**
   * 弹窗标题
   */
  title: string;
  /**
   * 是否新增
   */
  isAdd: boolean;
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
   * 数据信息
   */
  dataInfo: IFormEditDataInfo[];
  /**
   * 点击取消/关闭 回调
   */
  onClose: Callbacks['onClose'];
  /**
   * 点击保存回调
   * @param data 表单数据
   */
  onOk?: Callbacks['onSave'];
}

/**
 * 表单编辑的字段数据名称接口
 */
export interface IFormEditDataInfo {
  /**
   * 字段
   */
  field: string;
  /**
   * 字段名
   */
  fieldName: string;
  /**
   * 字段值
   */
  fieldValue: string;
  /**
   * 是否展示该字段
   */
  canBeShow: boolean;
  /**
   * 是否可修改该字段
   */
  canBeModify?: boolean;
  /**
   * 是否必填
   */
  mustFill?: boolean;
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
 * 表单编辑的字段下拉列表接口
 */
export interface IFormEditSelectValue {
  name: string;
  value: string;
}
