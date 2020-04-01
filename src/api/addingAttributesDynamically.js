/*
 * @Description:动态添加属性
 * @Version: 1.0
 * @Author: 白爱民
 * @Date: 2020年1月19日20:49:21
 * @LastEditors:白爱民
 * @LastEditTime: 2020年1月19日20:49:28
 */

export default {

    /**
       *  动态为所有标签添加属性
       * @param labelNameL:string类型标签名,attributeName：string类型属性名,attributeName：string类型属性值
       * @returns {string}
       * @constructor herry
       * @Instructions 首先在使用页面引入，然后直接使用引入的名字直接点方法名即可：addingAttributesDynamically.addingLabelAttributes
       */
    addingLabelAttributes: function (labelNameL,attributeName,attributeValue) {
        const a1 = document.getElementsByTagName(labelNameL);  // 获取当前所有input标签
        // for循环判断有多少个input标签，然后里面写入为每个input标签动态添加属性
        for (let index = 0; index < a1.length; index++) {
            const b1 = document.getElementsByTagName(labelNameL)[index];
            b1.setAttribute(attributeName, attributeValue)  // 让当前input只读
            // b1.setAttribute("disabled", "disabled")  // 让当前input不可使用，但是有阴影框

        }
    }
}


