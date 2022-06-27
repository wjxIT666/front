## 日志系统
---

### 前端技术库
* react + react-router-dom + antd<br>
    - 配置craco.config.js 按需加载antd
    - 引入reset.css 去除浏览器默认样式
    - 引入rem.js 进行适配
    - 引入react-router-dom 配置路由
    - 配置菜单 实现菜单、面包屑、列表联动
    - 实现登录页面
    - 实现登录权限
    - 封装Card组件
    - 封装Input组件
    - 封装Button组件
    - 封装util.js 校验规则
    - 封装请求api
    - 配置setupProxy.js反向代理 解决跨域
    - 请求登录接口
    - 请求头绑定token
    - 实现日志配置页面
    - 日志配置表格与分页联动
        - 请求创建项目接口
        - 请求列表接口
    - 日志配置-二级目录
        - 日志条目
            - 添加，删除，修改
            - 请求添加条目接口
            - 请求条目列表接口
            - 请求条目列表删除接口
            - 修改条目弹窗实现
    - 权限
        - 实现用户管理页面
        - 请求角色接口
        - 封装抽屉组件
        - 封装树形组件
        - 请求添加用户接口
        - 实现用户列表
        - 请求用户列表接口
        - 请求用户删除接口
        - 请求用户信息接口
        - 请求用户修改接口
        - 实现角色管理页面
---

### 后端技术库
* node.js + koa + mongoose<br>
    - 引入koa 配置服务
    - 引入nodemon 监听服务
    - 设置config.js 配置全局变量
    - 引入koa-router 搭建路由
    - 引入koa-bodyparser 解析post请求
    - 登录路由实现
    - 引入mongoose 搭建数据库
    - 登录数据 非空校验
    - 引入koa-jwt jsonwebtoken 登录认证 koa-jwt 负责对token进行验证 jsonwebtoken 负责生成token
    - 日志
        - 日志配置
            - 创建项目路由实现
            - 日志配置分页查询 Article.find({}).skip((page - 1)*parseInt(limit)).limit(parseInt(limit)).exec(function (err, data) {})
            - 添加条目路由实现 先查，再增 dbRes.updateMany({id: id}, {$push: {list: {name, address, url, port, path}}})
            - 删除条目路由实现
    - 权限
        - 用户权限
            - 角色路由实现
            - 添加用户路由实现
            - 用户列表路由实现
            - 用户删除路由实现
            - 用户信息路由实现
            - 用户修改路由实现



