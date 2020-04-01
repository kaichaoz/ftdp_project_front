<!--
 * @描述: 学单词设置
 * @版本: V2.0
 * @作者: 白爱民
 * @Date: 2019年12月27日20:34:54
 * @最后修改人: herry
 * @LastEditTime: 2019年12月1日23:24:46

彩蛋：此页面没有做接收返回的值，烦劳请教如何使用for循环来接受所有的值，或者有更好的办法
 -->
<template>
  <div style="margin-top: 50px;">

<!-- 开关设置 -->
    <settingListTemplate
      select="switch"
      :arrowIconSwitch="realSettingSwitchData[0].arrowIcon"
      :allColumnsTitle="realSettingSwitchData[0].allColumnsTitle"
      :isTrue="realSettingSwitchData[0].isTrue"
    ></settingListTemplate>
    <settingListTemplate
      select="switch"
      :arrowIconSwitch="realSettingSwitchData[1].arrowIcon"
      :allColumnsTitle="realSettingSwitchData[1].allColumnsTitle"
      :isTrue="realSettingSwitchData[1].isTrue"
    ></settingListTemplate>

    <!-- for循环显示 -->
    <settingListTemplate
      v-for="(item, i) in realSettingData "
      :key="i"
      :settingLogo="realSettingData[i].settingLogo"
      :allColumnsTitle="realSettingData[i].allColumnsTitle"
      :settingTextName="realSettingData[i].settingTextName"
      :unit="realSettingData[i].unit"
      :arrowIcon="realSettingData[i].arrowIcon"
      :userInputTitle="userInputTitle"
      :acceptSubValue="acceptSubValue[i]"
    ></settingListTemplate>
  </div>
</template>
<script>
import settingListTemplate from "../../components/settingListTemplate.vue";
import {
  settingData,
  settingSwitchData
} from "../../Entity/settingDataEntity.js";
import "../../utils/commonCss/common.css";
import { modifyById } from "../../api/mine/settings";
import { format } from "path";
export default {
  components: { settingListTemplate },
  data() {
    return {
      select: "", // 选择是否数值还是开关
      realSettingData: [], // 接收实体传递过来的值
      userInputTitle: "请输入自定义数量", //用户自定义输入框的标题--传向子组件数据
      acceptSubValue: [], // 向子组件传递当前五个值

      realSettingSwitchData: [], // 接收实体传递过来的开关实体
      isdelayedJumpNow: false, // 如果自动模式为0则不显示，为1显示
      realSettingData: settingData, // 接收五个值
      realSettingSwitchData: settingSwitchData // 接受开关值
    };
  },
  created() {},
  // 组件销毁前调用
  beforeDestroy() {},
  methods: {}
};
</script>
