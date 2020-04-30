 /*
 * @Description:定时器
 * @Version: 1.0
 * @Author: 白爱民
 * @Date: 2020年4月29日21:11:34
 * @LastEditors:张颖娟
 * @LastEditTime: 2020年4月30日09:12:14
 * @Remarks:  初始化:进入设置更改setting_Leave值为1，当setting页面保存数据后改为0；
              当前进入此页面先判断setting_Leave值是否为0，为0加载数据，为1持续查询直到为0结束定时器，
              当时间超过20s时则自动加载数据
 */

   export default {
       
       start: function () {
           let setting_Leave = sessionStorage.getItem("setting_Leave");
           if (setting_Leave == 0) {
               return;
           } else {
               var startTime = new Date().getTime();
               var num = 0;

               // 如果超时一分钟则自动清理，
               // 每隔1s执行一次函数
               var interval = setInterval(function () {
                   if (new Date().getTime() - startTime > 60000) {
                       clearInterval(interval);
                       return;
                   }
                   num++;
                   console.log(num);

                   //do whatever here..
               }, 1000);
           }
       },
   }