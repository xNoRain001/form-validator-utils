## 介绍

表单验证器

## 下载

### npm

```
npm i form-validator-utils
```

### src

```html
<script src="../dist/form-validator-utils.js"></script>
```

## 使用

```html
<form id="registerForm">
  请输入用户名：<input type="text" name="username" />
  <br />
  请输入密码：<input type="text" name="password" /> 
</form>
<button id="submitBtn">提交</button>
```

```javascript
// import Validator from 'type-storage-utils'

// 定义验证策略
const strategies = {
  isNonEmpty (value, errorMsg) {
    if (value === '') {
      return errorMsg
    }
  },
  minLength (value, length, errorMsg) {
    if (value.length < length) {
      return errorMsg
    }
  }
  // ...
}

// 调用该函数进行验证
const validateFunc = (function () {
  const validator = new Validator()

  // 给输入框添加校验规则
  validator.add(registerForm.username, [
    {
      strategy: 'isNonEmpty', 
      errorMsg: '用户名不能为空'
    },
    {
      strategy: 'minLength:6', 
      errorMsg: '用户名长度至少为6'
    }
  ])

  // 如果只添加一个校验规则，也可以直接写成对象的形式。
  validator.add(registerForm.password, { /** ... */ })

  return function () {
    // 进行验证，如果失败则返回错误信息。
    const errorMsg = validator.start()

    return errorMsg
  }
})()

submitBtn.addEventListener('click', () => {
  const errorMsg = validateFunc()

  if (errorMsg) {
    // Fail, do something...

    return
  }

  // Success, do something...
})
```

## API

### add

```javascript
/**
 * 给表单添加验证
 * 
 * @param {HTMLElement} dom - 添加验证的 DOM
 * @param {(Array|Object)} rules - 添加的校验规则，是一个以冒号隔开的字符串。冒号前
 *  面的内容代表选择的策略，冒号后面的内容代表在校验过程中所必需的一些参数。
 *  如 'minLength:6' 的意思就是校验 DOM.value 的最小长度要为 6。如果这个字符串中不包
 *  含冒号，说明校验过程中不需要额外的参数信息，比如 'isNonEmpty'。
 */
validator.add(registerForm.username, [
  {
    strategy: 'isNonEmpty', 
    errorMsg: '用户名不能为空'
  },
  {
    strategy: 'minLength:6', 
    errorMsg: '用户名长度至少为6'
  }
])

validator.add(registerForm.password, {
  strategy: 'minLength:10', 
  errorMsg: '密码长度至少为10'
})
```

### start

```javascript
/**
 * 开始验证
 * 
 * @returns {(string|undefined)} 未通过验证返回 errorMsg，通过验证返回 undefined。
 */
validator.start()
```
