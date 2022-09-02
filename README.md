# 关于 imgURL 图床

imgURL 图床能提供稳定的图片上传和存储服务，并能在上传图片之后生成一个 URL 链接，可以直接使用。

## 源码使用

- yarn clone SSHUrl
- yarn install
- yarn start

## 功能介绍

- imgURL 网页需要登录后才可上传图片和查询相关数据。
- 注册或者登录时，会向后台发送数据并验证数据，要求用户名不能重复，并对用户名、密码的样式、长度进行了约束。
- 在首页，用户可以通过拖拽或点击的方式上传图片，要求图片大小不超过 5 MB，且只能上传 png/jpg/gif 格式的图片。图片上传后，可以查看上传的图片和复制存储于后台的 imgURL。
- 点击历史记录界面，可以查看所有已上传的图片的历史记录，而每张图片都展示了相应的属性信息，方便用户查看和使用。另外，图片的历史记录以 List 列表的形式分页展示，每页只能展示 5 张图片和相关信息。
- 在关于我页面，对网页的功能和开发时使用的技术栈进行了一个整体的概述。

## 技术栈使用情况

- 使用了 LeanCloud 对图片数据进行存储和增删改查服务。
- 网页整体使用前端流行技术框架 react.js 实现，并使用 mobx 管理网页状态。
- 部分用户交互、数据展示页面基于 Ant Design 设计体系的 React UI 组件库实现。
- 使用 styled-components 第三方库对网页的样式进行管理和设计。
- 采用 react-router-dom 管理网页路由的切换。
