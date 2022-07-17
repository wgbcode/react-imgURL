import features from "../icons/features.svg";
import technology from "../icons/technology.svg";
import styled from "styled-components";

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  width: 100vw;
  line-height: 30px;
  font-size: 14px;
  .wrapper {
    padding: 20px 50px;
    display: flex;
    flex-direction: column;
    width: 70vw;
    .title {
      padding: 5px 0;
      font-size: 18px;
      text-align: center;
      font-weight: 500;
    }
    .content {
      .features,
      .technology {
        display: flex;
        align-items: center;
        padding: 10px 0 5px 0;
        img {
          height: 1.5em;
          padding-right: 8px;
        }
        h2 {
          font-size: 16px;
          font-weight: 550;
          margin: 0;
        }
      }
      .list {
        list-style: square inside;
      }
    }
  }
`;

const About = () => {
  return (
    <Wrapper>
      <div className="wrapper">
        <h1 className="title">关于 imgURL 图床</h1>

        <div className="content">
          <div>
            imgURL
            图床能提供稳定的图片上传和存储服务，并能在上传图片之后生成一个 URL
            链接，可以直接使用。
          </div>

          <div className="features">
            <img src={features} />
            <h2>功能介绍</h2>
          </div>
          <ul className="list">
            <li>imgURL 网页需要登录后才可上传图片和查询相关数据。</li>
            <li>
              注册或者登录时，会向后台发送数据并验证数据，要求用户名不能重复，并对用户名、密码的样式、长度进行了约束。
            </li>
            <li>
              在首页，用户可以通过拖拽或点击的方式上传图片，要求图片大小不超过 5
              MB，且只能上传 png/jpg/gif
              格式的图片。图片上传后，可以查看上传的图片和复制存储于后台的
              imgURL。
            </li>
            <li>
              点击历史记录界面，可以查看所有已上传的图片的历史记录，而每张图片都展示了相应的属性信息，方便用户查看和使用。另外，图片的历史记录以
              List 列表的形式分页展示，每页只能展示 5 张图片和相关信息。
            </li>
            <li>
              在关于我页面，对网页的功能和开发时使用的技术栈进行了一个整体的概述。
            </li>
          </ul>

          <div className="technology">
            <img src={technology} />
            <h2>技术栈使用情况</h2>
          </div>
          <ul className="list">
            <li>使用了 LeanCloud 对图片数据进行存储和增删改查服务。</li>
            <li>
              网页整体使用前端流行技术框架 react.js 实现，并使用 mobx
              管理网页状态。
            </li>
            <li>
              部分用户交互、数据展示页面基于 Ant Design 设计体系的 React UI
              组件库实现。
            </li>
            <li>使用 styled-components 第三方库对网页的样式进行管理和设计。</li>
            <li>采用 react-router-dom 管理网页路由的切换。</li>
          </ul>
        </div>
      </div>
    </Wrapper>
  );
};

export default About;
