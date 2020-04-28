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