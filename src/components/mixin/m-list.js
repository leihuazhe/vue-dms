const ListMixin = {
  data () {
    return {
      searchArr: '收起搜索',
      expandName: '1',
      queryCondition: {},
      record: {
        typeList: [{
          value:'get',
          label: 'GET'
        }, {
          value: 'post',
          label: 'POST'
        }]
      }
    }
  },
  methods: {
    collapseHandler () {
      this.searchArr = this.searchArr === '收起搜索' ? '展开搜索' : '收起搜索'
    },
    getQueryCondition (obj) {
      obj = obj || {}
      let page = {
        start: obj.start || 0,
        size: obj.limit || 10,
        results: obj.results || 0
      }
      page.pageIndex = obj.pageIndex || Math.floor(page.start / page.size) + 1
      const start = (page.pageIndex - 1) * page.size
      page.start = start
      return page
    }
  }
}

export default ListMixin