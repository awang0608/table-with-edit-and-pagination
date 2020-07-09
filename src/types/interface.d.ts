export interface Callbacks {
  onSave: ({
    data,
    formData,
  }?: {
    data: Record<any, any>;
    formData: Record<any, any>;
  }) => void;
  onClose: () => void;
  onRefresh: () => void;
}

export interface IProps {
  [propName: string]: any;
}
