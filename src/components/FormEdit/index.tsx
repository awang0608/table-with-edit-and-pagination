import React, { useEffect } from 'react';
import { Modal, Input, Form, Select, message } from 'antd';
import {
  IFormEditProps,
  IFormEditDataInfo,
  IFormEditSelectValue,
} from './interface';
import { Callbacks } from '../../types/interface';
import axios from '../../utils/axios';
const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 5 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 19 },
  },
};
const FormEdit = (props: IFormEditProps): JSX.Element => {
  /**
   * form 控制实例
   */
  const [form] = Form.useForm();

  useEffect(() => {
    if (props.dataInfo && props.dataInfo.length) {
      const formData: Record<any, any> = {};

      props.dataInfo.forEach((data: IFormEditDataInfo) => {
        data.field !== 'id' && (formData[data.field] = data.fieldValue);
      });
      form.setFieldsValue(formData);
    }
  }, [props]);
  /**
   * 重置密码表单
   */
  const resetForm = () => {
    form.resetFields();
  };
  /**
   * 点击取消修改
   */
  const handleClickCancelModify = () => {
    resetForm();
    props.onClose();
  };
  /**
   * 点击确认保存
   */
  const handleClickSure = () => {
    form.validateFields().then(() => {
      const fieldsValue: any = form.getFieldsValue();
      const id = props.dataInfo.find(
        (data: IFormEditDataInfo) => data.field === 'id',
      )?.fieldValue;
      const requestUrl = props.isAdd ? props.addInfo?.url : `${(props.modifyInfo?.url)}${props.modifyInfo?.isParamInUrl ? `/${id}` : ''}`;

      delete props.addInfo?.url;
      delete props.modifyInfo?.url;
      Object.keys(fieldsValue).forEach((key: string) => {
        const data = props.dataInfo.find(
          (data: IFormEditDataInfo) => data.field === key,
        );

        (data as IFormEditDataInfo).fieldValue = fieldsValue[key];
      });
      if (requestUrl) {
        axios(requestUrl, {
          ...(props.isAdd ? props.addInfo : props.modifyInfo),
          data: {
            ...fieldsValue,
            id
          },
        }).then(() => {
          message.success({
            content: '保存成功',
            onClose: () => {
              (props.onOk as Callbacks['onSave'])();
            },
          });
        });
      } else {
        (props.onOk as Callbacks['onSave'])({
          data: props.dataInfo,
          formData: {
            ...fieldsValue,
            id,
          }
        });
      }
    });
  };

  return (
    <Modal
      getContainer={false}
      visible={true}
      title={props.title || (props.isAdd ? '新增' : '编辑')}
      onCancel={handleClickCancelModify}
      onOk={() => handleClickSure()}
    >
      <Form {...formItemLayout} form={form}>
        {props.dataInfo.map(
          (data: IFormEditDataInfo) =>
            data.canBeShow &&
            (data.formInfo === undefined || data.formInfo.type === 'input' ? (
              <Form.Item
                key={data.field}
                label={data.fieldName}
                name={data.field}
                rules={
                  data.rules ||
                  (data.mustFill
                    ? [{ required: true, message: `${data.fieldName}不能为空` }]
                    : undefined)
                }
              >
                <Input
                  autoComplete="new-name"
                  disabled={data.fieldValue ? !data.canBeModify : false}
                  placeholder={`请输入${data.fieldName}`}
                />
              </Form.Item>
            ) : data.formInfo?.type === 'select' ? (
              <Form.Item
                key={data.field}
                label={data.fieldName}
                name={data.field}
                rules={
                  data.rules ||
                  (data.mustFill
                    ? [{ required: true, message: `${data.fieldName}不能为空` }]
                    : undefined)
                }
              >
                <Select>
                  {data.formInfo?.optionList?.map(
                    (option: IFormEditSelectValue) => (
                      <Select.Option key={option.value} value={option.value}>
                        {option.name}
                      </Select.Option>
                    ),
                  )}
                </Select>
              </Form.Item>
            ) : null),
        )}
      </Form>
    </Modal>
  );
};

export default FormEdit;
