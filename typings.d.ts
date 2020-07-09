declare module '*.css';
declare module '*.less' {
  const content: any;
  export default content;
};
declare module 'table-with-edit-and-pagination' {
  import Pagination from './components/Pagination/index';
  import CustomTable from './components/CustomTable/index';
  import FormEdit from './components/FormEdit/index';

  export { CustomTable, Pagination, FormEdit };
};