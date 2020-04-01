/*
 * @Description:转义字符
 * @Version: 1.0
 * @Author: 白爱民
 * @Date: 2020年1月19日20:49:21
 * @LastEditors:白爱民
 * @LastEditTime: 2020年1月19日20:49:28
 */

export default {
    /**
       *  把html转义成HTML实体字符
       * @param str
       * @returns {string}
       * @constructor herry
       * @Instructions 首先在使用页面引入，然后直接使用引入的名字直接点方法名即可：escape.htmlEncode
       */
    htmlEncode: function(str) {
      var s = ''
      if (str.length === 0) {
        return ''
      }
      s = str.replace(/&/g, '&amp;')
      s = s.replace(/</g, '&lt;')
      s = s.replace(/>/g, '&gt;')
      s = s.replace(/ /g, '&nbsp;')
      s = s.replace(/\'/g, '&#39;') // IE下不支持实体名称
      s = s.replace(/\"/g, '&quot;')
      return s
    },
    /**
       *  转义字符还原成html字符
       * @param str
       * @returns {string}
       * @constructor herry
       * @Instructions 首先在使用页面引入，然后直接使用引入的名字直接点方法名即可：escape.htmlRestore
       */
    htmlRestore: function(str) {
      var s = ''
      if (str.length === 0) {
        return ''
      }
      s = str.replace(/&amp;/g, '&')
      s = s.replace(/&lt;/g, '<')
      s = s.replace(/&gt;/g, '>')
      s = s.replace(/&nbsp;/g, ' ')
      s = s.replace(/&#39;/g, "'")
      s = s.replace(/&quot;/g, '"')
      return s
    }
  }
  
  