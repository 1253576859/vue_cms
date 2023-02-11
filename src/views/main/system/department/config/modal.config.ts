const modalConfig = {
  pageName: 'department',
  header: {
    newTitle: '新建部门',
    editTitle: '编辑部门'
  },
  formItems: [
    { type: 'input', label: '部门名称', prop: 'name', placeholder: '请输入部门名称', initialValue: 'aaa' },
    { type: 'input', label: '部门领导', prop: 'leader', placeholder: '请输入要查询的部门领导' },
    {
      type: 'select', label: '上级部门', prop: 'parentId', placeholder: '请选择上级部门', options: []
    },
  ]
}

export default modalConfig
