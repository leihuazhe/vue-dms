import * as crud from '../../api/api';

/**
 * 分页公共类 co-pagination.js
 */

export const handleSizeChange = function handleSizeChange(queryCondition, limit, func) {
  queryCondition.pageRequest.limit = limit;
  queryCondition.pageRequest = crud.getQueryCondition(this.queryCondition.pageRequest);
  // this.getServiceList();
  // func();
};

export const handleCurrentChange = (queryCondition,pageIndex, func) => {
  queryCondition.pageRequest.pageIndex = pageIndex;
  queryCondition.pageRequest = crud.getQueryCondition(this.queryCondition.pageRequest);
  // this.getServiceList();
  // func();
};
