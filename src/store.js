
import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

const store = new Vuex.Store({

  //要设置的全局访问的state对象
  state: {
    token: '',//用户token
    // managementDataList: [], // 模板管理management页面数据
    // createNameDataList: {}, // 创建模板一：createName页面数据
    makeFormDataList: [], // 创建模板二：makeForm编辑模板数据
    // makeFormInitializationList: [], // 创建模板二：makeForm编辑模板初始化数据


    // 创建模板二：makeForm编辑模板初始化数据
    // makeFormInitializationList: {
    //   isTrueUserList: [true, true, true, true, true, true, true],
    //   isTrueInfoShowList: [
    //     {
    //       isTrue: true,
    //       infoTitle: "某某得分",
    //       infoNum: "110",
    //       infoList: ["某某得分", "某某信息", "评分"]
    //     },
    //     {
    //       isTrue: true,
    //       infoTitle: "某某信息",
    //       infoNum: "119",
    //       infoList: ["某某得分", "某某信息", "评分"]
    //     },
    //     {
    //       isTrue: true,
    //       infoTitle: "评分",
    //       infoNum: "120",
    //       infoList: ["某某得分", "某某信息", "评分"]
    //     }
    //   ],
    //   isTrueNumberIndexList: [
    //     {
    //       infoNum: "请输入成就 单位"
    //     },
    //     {
    //       infoNum: "及格分 >=10"
    //     }
    //   ]
    // },
    // 创建模板二：makeForm编辑模板初始化数据
    makeFormInitializationList: [
      [true, true, true, true, true, true, true],
      [{
        isTrue: true,
        infoTitle: "某某得分",
        infoNum: "110",
        infoList: ["某某得分", "某某信息", "评分"]
      },
      {
        isTrue: true,
        infoTitle: "某某信息",
        infoNum: "119",
        infoList: ["某某得分", "某某信息", "评分"]
      },
      {
        isTrue: true,
        infoTitle: "评分",
        infoNum: "120",
        infoList: ["某某得分", "某某信息", "评分"]
      }
      ],
      [
        {
          infoNum: "请输入成就 单位"
        },
        {
          infoNum: "及格分 >=10"
        }
      ]],


    // 模板管理management页面数据
    managementDataListStore: [
      {
        activeNames: "1",
        title: "公共项目",
        comTitleList: ["仰卧起坐"]
      },
      { activeNames: "1", title: "男生项目", comTitleList: ["1000米"] },
      { activeNames: "1", title: "女生项目", comTitleList: ["800米"] }
    ],

    // 创建模板一：createName页面数据
    createNameDataList: {
      managementNamevalue: "", // 模板名称输入框输入内容
      groupValue: 0, // 分组选择后的分组value
      personValue: 0, //人员选择后的value
      // 所属分组
      groupOption: [
        { text: "公共项目", value: 0 },
        { text: "男生项目", value: 1 },
        { text: "女生项目", value: 2 }
      ],
      personOption: [{ text: "自己", value: 0 }], // 人员下拉框
      remarkTxt: "" //备注输入内容

    },

  },
  //用于监听state的变化的
  getters: {

  },
  mutations: {
    setManagementDataList(state, managementDataList) {
      state.managementDataList = managementDataList
    },

    // 存储createName中的数据
    setCreateNameDataList(state, createNameDataList) {
      state.createNameDataList = createNameDataList
    },
    // 存储token中的数据
    setToken(state, token) {
      state.token = token
    },
    //暂时不使用
    // getToken() {
    //   return state.token
    // }
  },
  actions: {

  }
})
export default store