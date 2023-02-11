const contentConfig = {
  pageName: 'department',
  header: {
    title: '部门列表',
    btnTitle: '新建部门'
  },
  propsList: [
    { type: "selection", prop: "name", width: "50px" },
    { type: "index", label: "序号", prop: "name", width: "60px" },
    { type: "normal", label: "部门名称", prop: "name", width: "120px" },
    { type: "normal", label: "部门领导", prop: "leader", width: "120px" },
    { type: "normal", label: "上级部门", prop: "parentId", width: "150px" },
    { type: "timer", label: "创建时间", prop: "createAt" },
    { type: "timer", label: "更新时间", prop: "updateAt" },
    { type: "handler", label: "操作", width: "200px" }
  ]
}

export default contentConfig
