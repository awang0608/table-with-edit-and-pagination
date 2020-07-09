import React, { useState, useMemo } from 'react';
import { Button, ConfigProvider, Table, Modal, message } from 'antd';
import {
  EditOutlined,
  DeleteOutlined,
  QuestionCircleOutlined,
} from '@ant-design/icons';
import { ITable, ITableColumn, ITableDataSource } from './interface';
import { ColumnsType } from 'antd/lib/table/interface';
import zhCN from 'antd/es/locale/zh_CN';
import { IFormEditDataInfo } from '../FormEdit/interface';
import { Pagination, FormEdit } from '../../index';
import { Callbacks } from '../../types/interface';
import axios from '../../utils/axios';
const styles = require('./index.less');

const CustomTable = (props: ITable): JSX.Element => {
  const operationColumn = {
    title: '操作',
    width: 150,
    render: (row: ITableDataSource) => (
      <div>
        {props.canBeModify || props.modifyInfo && 
          <span className={styles.btn} onClick={() => handleModify(row)}>
            <EditOutlined style={{ color: '#147CDD' }} />
            修改
          </span>}
        {props.deleteInfo && (
          <span className={styles.btn} onClick={() => handleDeleteAccout(row.id)}>
            <DeleteOutlined style={{ color: '#147CDD' }} />
            删除
          </span>
        )}
      </div>
    ),
  };
  /**
   * 是否展示弹窗
   */
  const [showDialog, setshowDialog] = useState<boolean>(false);
  /**
   * 修改的数据源
   */
  const [modifyData, setmodifyData] = useState<ITableDataSource>({
    id: '',
  });
  /**
   * 表单对应信息(新增)
   */
  const dataMapInfo: IFormEditDataInfo[] | undefined = useMemo(() => {
    if (!showDialog) return;
    const isAdd: boolean = !Boolean(modifyData.id);
    const info: IFormEditDataInfo[] = [
      {
        field: 'id',
        fieldName: 'id',
        fieldValue: modifyData.id,
        canBeShow: false,
      },
    ];

    (props.columns as ITableColumn[]).forEach((column: ITableColumn) => {
      const canBeShow: boolean =
        column[isAdd ? 'fieldTypeWhenAdd' : 'fieldTypeWhenModify'] !==
        undefined;

      if (canBeShow) {
        info.push({
          field: column.dataIndex as string,
          fieldName: column.title as string,
          fieldValue: isAdd ? '' : modifyData[column.dataIndex as string],
          canBeShow,
          mustFill:
            column[isAdd ? 'fieldTypeWhenAdd' : 'fieldTypeWhenModify'] === 1,
          canBeModify: column.fieldTypeWhenModify !== 2,
          rules: column.rules,
          formInfo: column.formInfo,
        });
      }
    });

    return info;
  }, [props.dataSource, props.columns, showDialog]);
  /**
   * 点击删除
   * @param id 即将被删除的数据id
   */
  const handleDeleteAccout = (id: string) => {
    if (!id) return;
    Modal.confirm({
      title: '确定要删除用户吗？',
      icon: <QuestionCircleOutlined />,
      okText: '确定',
      cancelText: '取消',
      onOk() {
        deleteAccout(id);
      },
    });
  };
  /**
   * 删除用户
   * @param id 即将被删除的数据id
   */
  const deleteAccout = (id: string) => {
    const url: string = `${(props.deleteInfo?.url)}${props.deleteInfo?.isParamInUrl ? `/${id}` : ''}`;

    delete props.deleteInfo?.url;
    axios(url, {
      ...(props.deleteInfo as Record<any, any>),
    }).then(() => {
      message.success({
        content: '删除成功',
        onClose: () => {
          (props.refreshCallBack as () => void)();
        },
      });
    })
  };
  /**
   * 点击修改
   * @param row 修改的数据源
   */
  const handleModify = (row: ITableDataSource) => {
    setshowDialog(true);
    setmodifyData(row);
  };

  return (
    <ConfigProvider locale={zhCN}>
      <div className={styles.customTable}>
        {showDialog && (
          <FormEdit
            title={Boolean(modifyData.id) ? '修改前台用户' : props.add?.addText || ''}
            dataInfo={dataMapInfo as IFormEditDataInfo[]}
            isAdd={!Boolean(modifyData.id)}
            addInfo={props.add?.addInfo}
            modifyInfo={props.modifyInfo}
            onClose={() => {
              setshowDialog(false);
              setmodifyData({
                id: '',
              });
            }}
            onOk={(data: any) => {
              setshowDialog(false);
              (props.saveCallBack as Callbacks['onSave'])(data);
            }}
          />
        )}
        <div
          className={`${styles.toolBar} ${props.add?.addText ? '' : styles.noRight}`}
        >
          {props.add && (
          <div className={styles.customTableBtnArea}>
            <Button type="primary" onClick={() => setshowDialog(true)}>
              {props.add.addIcon}
              新增{props.add.addText}
            </Button>
          </div>
        )}
          {props.children}
        </div>
        <Table
          {...{
            ...props,
            columns:
              (props.columns as ColumnsType<any>)[
                (props.columns as ColumnsType<any>).length - 1
              ].title === '操作' ||
              (!(props.canBeModify || props.modifyInfo) && !props.deleteInfo)
                ? [...(props.columns as ColumnsType<any>)]
                : [...(props.columns as ColumnsType<any>), operationColumn],
            pagination: false,
            bordered: props.bordered === undefined ? true : props.bordered,
          }}
        />
        {props.pagination && (
          <Pagination
            {...{
              ...props.pagination,
              totalType:
                props.pagination.totalType === undefined
                  ? 1
                  : props.pagination.totalType,
            }}
          />
        )}
      </div>
    </ConfigProvider>
  );
};

export default CustomTable;
