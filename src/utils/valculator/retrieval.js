
// eslint-disable-next-line no-unused-vars
import Add from '../valculator/add'
// eslint-disable-next-line no-unused-vars
import Subtraction from '../valculator/subtraction'
import Multiplication from '../valculator/multiplication'
export default {
  retrieval: function (operator, variables1, variables2) {
    switch (operator) {
      case '+':
        // 调取公共加法
        // eslint-disable-next-line no-undef
        variables1 = Add.add(variables1, variables2)
        break
      case '-':
        // 调取公共减法
        // eslint-disable-next-line no-undef
        variables1 = Subtraction.subtraction(variables1, variables2)
        break
      // eslint-disable-next-line no-duplicate-case
      case '*':
        // 调取公共乘法
        // eslint-disable-next-line no-undef
        variables1 = Multiplication.multiplication(variables1, variables2)
        break
      default:
        break
    }
    return variables1
  }
}
