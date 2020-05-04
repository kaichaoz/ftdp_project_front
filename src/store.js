import Vue from "vue";
import Vuex from "vuex";
Vue.use(Vuex);

const store = new Vuex.Store({
  //要设置的全局访问的state对象
  state: {
    token: "", //用户token
    isShowLoading: false, // 请求前加载动画
    isShowLoadFailed: false, //请求失败加载页面/断网加载页面
    // 分组ID：与数据库同步
    // libraryId: {
    //   userInfo: "5856212",
    //   theMessageStates: "8706797",
    //   enterInfomation: "0342524",
    //   invalid: "1111111"
    // },

    libraryId: {
      userInfo: "5856212",
      userInfoList: { user: "0445946" },
      theMessageStates: "8706797",
      theMessageStatesList: { infoShow: "0473771" },
      enterInfomation: "0342524",
      enterInfomationList: { numberIndex: "4833953" },
      invalid: "1111111",
    },

    // 同步上面数据：去除invalid，并从上到下排列下来
    // libraryIdIndex:["5856212","8706797","0342524"],
    // libraryIdIndex: [{
    //   libraryId: "5856212",
    //   componentId: require("../src/assets/super/library/user.jpg")
    // },
    // {
    //   libraryId: "8706797",
    //   componentId: require("../src/assets/super/library/infoShow.jpg")
    // },
    // {
    //   libraryId: "0342524",
    //   componentId: require("../src/assets/super/library/numberIndex.jpg")
    // }
    // ],

    // 同步上面数据：去除invalid，并从上到下排列下来
    libraryIdIndex: [
      {
        libraryId: "0445946",
        componentId: require("../src/assets/super/library/user.jpg"),
      },
      {
        libraryId: "0473771",
        componentId: require("../src/assets/super/library/infoShow.jpg"),
      },
      {
        libraryId: "4833953",
        componentId: require("../src/assets/super/library/numberIndex.jpg"),
      },
    ],

    // 根据这里面的id进行，将传递过来的数据，将这个里面的图片放到后端传递过来的数据中

    //下拉刷新内容
    pullRefresh: {
      isLoading: false,
      pulling: "下拉即可刷新",
      lossing: "释放即可刷新",
      loading: "加载中",
      success: "刷新成功",
    },

    //顶部弹框内容
    notifyInfo: [
      {
        loginErr: "用户名或密码错误",
        loginOk: "登陆成功",

        noData: "暂无数据",
        loadFailed: "加载失败",
        deleteSucceed: "删除成功",
        deleteFailed: "删除失败",

        modifySucceed: "修改成功",
        sorry: "抱歉，，，",

        boxEmpty: "文本框不能为空，请输入数据",
        boxInputLong: "文本框输入长度过长",
        inputNumber: "请输入数字，并保证小数位数不超过2位",
        saveSucceed: "保存成功",
        saveFailed: "保存失败",
        failed: "失败",
        noTemplateRule: "当前模板没有输入组件，无法添加模板规则",
        noModification: "暂无修改，无需保存",
      },
      {
        blue: "#29B8DB", //蓝色提示背景-提示成功使用
        orange: "#FF976A", //橘色提示背景-提示失败使用
        yellow: "#FFF667", //黄色
        green: "#8DC149", //绿色
        violet: "#5979C1", //紫色
        red: "#FF0000", //红色
      },
      {
        duration: 1000, //设置顶部提示，显示时长，1s
      },
    ],

    // 提示框内容
    TipsStore: [
      {
        message: "确定删除吗？",
      },
    ],

    // ------------------------------------------------makeForm--------------------

    makeFormDataList: [], // 创建模板二：makeForm编辑模板数据

    // 创建模板二：makeForm编辑模板初始化数据---最初版
    // makeFormInitializationList: [
    //   [true, true, true, true, true, true, true],
    //   [
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
    //   [
    //     {
    //       infoNum: "请输入成就 单位"
    //     },
    //     {
    //       infoNum: "及格分 >=10"
    //     }
    //   ]],

    makeFormInitializationList: [
      {
        templateId: "", //模板ID
        id: "", // 模板内容ID
        groupSequence: "", // 模板内容分组排序
        componentId: "0", // 标识是哪个组件
        isTrue: false, // 底部弹框是否显示
        templateArray: [
          {
            isTrue: true,
            title: "姓名",
            value: "张三",
            bottomName: "姓名是否显示",
            fieldSequence: "0",
          },
          {
            isTrue: true,
            title: "姓名",
            value: "张三",
            bottomName: "姓名是否显示",
            fieldSequence: "0",
          },
          {
            isTrue: true,
            title: "姓名",
            value: "张三",
            bottomName: "姓名是否显示",
            fieldSequence: "0",
          },
          {
            isTrue: true,
            title: "姓名",
            value: "张三",
            bottomName: "姓名是否显示",
            fieldSequence: "0",
          },
          {
            isTrue: true,
            title: "姓名",
            value: "张三",
            bottomName: "姓名是否显示",
            fieldSequence: "0",
          },
          {
            isTrue: true,
            title: "姓名",
            value: "张三",
            bottomName: "姓名是否显示",
            fieldSequence: "0",
          },
          {
            isTrue: true,
            title: "姓名",
            value: "张三",
            bottomName: "姓名是否显示",
            fieldSequence: "0",
          },
        ],
      },
      [
        {
          isTrue: true,
          infoTitle: "某某得分",
          infoNum: "110",
          infoList: ["某某得分", "某某信息", "评分"],
        },
        {
          isTrue: true,
          infoTitle: "某某信息",
          infoNum: "119",
          infoList: ["某某得分", "某某信息", "评分"],
        },
        {
          isTrue: true,
          infoTitle: "评分",
          infoNum: "120",
          infoList: ["某某得分", "某某信息", "评分"],
        },
      ],
      [
        {
          infoNum: "请输入成就 单位",
        },
        {
          infoNum: "及格分 >=10",
        },
      ],
    ],

    // 创建模板二：makeForm编辑模板初始化数据---修改版
    // makeFormInitializationList: [{
    //   templateId: "", //模板ID
    //   id: "", // 模板内容ID
    //   groupSequence: "", // 模板内容分组排序
    //   componentId: "0", // 标识是哪个组件
    //   isTrue: false, // 底部弹框是否显示
    //   templateArray: [
    //     {
    //       isTrue: true, // 组内内容是否显示
    //       title: "姓名",
    //       value: "张三",
    //       bottomName: "姓名是否显示",
    //       fieldSequence: "0" // 组内排序
    //     },
    //     {
    //       isTrue: true, // 组内内容是否显示
    //       title: "性别",
    //       value: "男",
    //       bottomName: "性别是否显示",
    //       fieldSequence: "" // 组内排序
    //     },
    //     {
    //       isTrue: true, // 组内内容是否显示
    //       title: "学号",
    //       value: "12312412123",
    //       bottomName: "学号是否显示",
    //       fieldSequence: "", // 组内排序
    //       infoList: ["姓名", "性别", "年级"] // 下拉框显示
    //     },
    //     {
    //       isTrue: true, // 组内内容是否显示
    //       title: "学院",
    //       value: "学院是否显示",
    //       bottomName: "姓名是否显示",
    //       fieldSequence: "0" // 组内排序
    //     },
    //     {
    //       isTrue: true, // 组内内容是否显示
    //       title: "专业",
    //       value: "电子信息",
    //       bottomName: "专业是否显示",
    //       fieldSequence: "" // 组内排序
    //     },
    //     {
    //       isTrue: true, // 组内内容是否显示
    //       title: "班级",
    //       value: "二班",
    //       fieldSequence: "", // 组内排序
    //       bottomName: "班级是否显示",
    //       infoList: ["姓名", "性别", "年级"] // 下拉框显示
    //     },
    //     {
    //       isTrue: true, // 组内内容是否显示
    //       title: "年级",
    //       value: "一年级",
    //       bottomName: "年级是否显示",
    //       fieldSequence: "", // 组内排序
    //       infoList: ["姓名", "性别", "年级"] // 下拉框显示
    //     }
    //   ]
    // },
    // {
    //   templateId: "", //模板ID
    //   id: "", // 模板内容ID
    //   groupSequence: "", // 模板内容分组排序
    //   componentId: "1", // 标识是哪个组件
    //   isTrue: false, // 底部弹框是否显示
    //   templateArray: [
    //     {
    //       isTrue: true,
    //       infoTitle: "某某得分",
    //       infoNum: "110",
    //       fieldSequence: "2", // 组内排序
    //       infoList: ["某某得分", "某某信息", "评分"]
    //     },
    //     {
    //       isTrue: true,
    //       infoTitle: "某某信息",
    //       infoNum: "119",
    //       fieldSequence: "2", // 组内排序
    //       infoList: ["某某得分", "某某信息", "评分"]
    //     },
    //     {
    //       isTrue: true,
    //       infoTitle: "评分",
    //       infoNum: "120",
    //       fieldSequence: "2", // 组内排序
    //       infoList: ["某某得分", "某某信息", "评分"]
    //     }
    //   ]
    // },
    // {
    //   templateId: "", //模板ID
    //   id: "", // 模板内容ID
    //   groupSequence: "", // 模板内容分组排序
    //   componentId: "2", // 标识是哪个组件
    //   isTrue: false, // 底部弹框是否显示
    //   templateArray: [
    //     {
    //       infoNum: "请输入成就 单位"
    //     },
    //     {
    //       infoNum: "及格分 >=10"
    //     }
    //   ]
    // }],

    // --------------------------------------------------makeForm--------------------

    // managementDataList: [], // 模板管理management页面数据
    // createNameDataList: {}, // 创建模板一：createName页面数据

    // 模板管理management页面数据
    managementDataListStore: [
      {
        activeNames: "1", // 默认值，不需要更改
        title: "公共项目",
        comTitleList: ["仰卧起坐"],
      },
      {
        activeNames: "1",
        title: "男生项目",
        comTitleList: ["1000米", "体前屈"],
      },
      {
        activeNames: "1",
        title: "女生项目",
        comTitleList: ["800米"],
      },
    ],

    // 创建模板一：createName页面数据
    createNameDataList: {
      managementNamevalue: "", // 模板名称输入框输入内容
      groupValue: 0, // 分组选择后的分组value
      personValue: 0, //人员选择后的value
      // 所属分组
      groupOption: [
        {
          text: "公共项目",
          value: 0,
        },
        {
          text: "男生项目",
          value: 1,
        },
        {
          text: "女生项目",
          value: 2,
        },
      ],
      personOption: [
        {
          text: "自己",
          value: 0,
        },
      ], // 人员下拉框
      remarkTxt: "", //备注输入内容
    },

    management_groupName_List: [], // 存储模板管理页的group分组
  },
  //用于监听state的变化的
  getters: {},
  mutations: {
    setMakeFormDataList(state, makeFormDataList) {
      state.makeFormDataList = makeFormDataList;
    },

    //存储模板管理页的group分组名字
    setManagementGroupNameList(state, managementDataList) {
      state.management_groupName_List = managementDataList;
    },

    setManagementDataList(state, managementDataList) {
      state.managementDataList = managementDataList;
    },

    // 存储createName中的数据
    setCreateNameDataList(state, createNameDataList) {
      state.createNameDataList = createNameDataList;
    },
    // 存储token中的数据
    setToken(state, token) {
      state.token = token;
    },
    //暂时不使用
    // getToken() {
    //   return state.token
    // }
  },
  actions: {},
});
export default store;
