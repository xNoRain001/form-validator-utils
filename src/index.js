import { getType } from "./utils/index"

class Validator {
  constructor () {
    this.cache = []
  }

  /**
   * 给表单添加验证
   * 
   * @param {HTMLElement} dom - 添加验证的 DOM
   * @param {(Array|Object)} rules - 添加的校验规则，是一个以冒号隔开的字符串。冒号前
   *  面的内容代表选择的策略，冒号后面的内容代表在校验过程中所必需的一些参数。
   *  如 'minLength:6' 的意思就是校验 DOM.value 的最小长度要为 6。如果这个字符串中不包
   *  含冒号，说明校验过程中不需要额外的参数信息，比如 'isNonEmpty'。
   */
  add (dom, rules) {
    if (getType(rules) === 'object') {
      rules = [rules]
    }
    
    for (let i = 0, rule; rule = rules[i++];) {
      const ary = rule.strategy.split(':')
      const { errorMsg } = rule
      
      this.cache.push(function () {
        const helper = ary.slice()
        const strategy = helper.shift()
        helper.unshift(dom.value)
        helper.push(errorMsg)
        return strategies[strategy].apply(dom, helper)
      })
    }
  }

  /**
   * 开始验证
   * 
   * @returns {(string|undefined)} 未通过验证返回 errorMsg，通过验证返回 undefined。
   */
  start () {
    const { cache } = this

    for (let i = 0, validateFunc; validateFunc = cache[i++];) {
      const errorMsg = validateFunc()
      
      if (errorMsg) {
        return errorMsg
      }
    }
  }
}

export default Validator