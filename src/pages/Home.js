import Stores from "../stores/index";
import { observer } from "mobx-react";
import styled, { withTheme } from "styled-components";
import UploadImg from "../components/UploadImg";
import ShowImg from "../components/ShowImg";
import add from "../icons/add.svg";
import { Spin } from "antd";
import picture from "../icons/picture.svg";
import warn from "../icons/warn.svg";

const WrapperWarn = styled.div`
  font-size: 16px;
  background: #cfe8fd;
  margin: 50px 100px 0px 100px;
  padding: 10px 15px;
  border-radius: 4px;
  color: black;
  display: flex;
  align-items: center;
  span {
    padding-left: 10px;
  }
`;
const WrapperUpload = styled.div`
  margin: 30px 100px;
  .title {
    h1 {
      text-shadow: 4px 3px 1px rgba(108, 101, 101, 0.47);
      font-size: 24px;
    }
    p {
      font-size: 12px;
      font-weigth: 300;
      padding: 0px 0 15px 0;
    }
  }
  .loadImg1 {
    padding: 20px;
    box-shadow: 2px 2px 4px rgba(0, 0, 0, 0.2), -2px -2px 4px rgba(0, 0, 0, 0.2);
    .ant-upload-picture-card-wrapper {
      border: 1px dashed black;
      :hover {
        border: 1px dashed #38adf4;
      }
      .ant-upload {
        width: 100%;
        background: white;
        height: 250px;
        margin: 0;
        border: none;
      }
    }
  }
  .loadImg2 {
    border-radius: 4px;
    margin-top: 20px;
    box-shadow: 2px 2px 4px rgba(0, 0, 0, 0.2), -2px -2px 4px rgba(0, 0, 0, 0.2);
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 12px;
    padding-left: 10px;
    button {
      border: none;
      background: #2383eb;
      color: white;
      padding: 6px 15px;
      border-radius: 0 4px 4px 0;
    }
  }
`;
const Home = observer(() => {
  return (
    <>
      {Stores.currentUser ? (
        ""
      ) : (
        <WrapperWarn>
          <img src={warn} style={{ height: "1.2em" }} />
          <span>请登录后再上传图片！</span>
        </WrapperWarn>
      )}
      {Stores.serverFile ? (
        <ShowImg />
      ) : (
        <WrapperUpload>
          <div className="title">
            <h1>Image Upload</h1>
            <p>最大可上传 5.00 MB 的图片，图片格式应为 png/jpg/gif。</p>
          </div>
          <div className="loadImg1">
            <UploadImg listType="picture-card">
              {Stores.isUpLoading ? (
                <Spin />
              ) : (
                <div>
                  <img src={add} style={{ height: 50, width: 50 }} />
                  <div style={{ fontSize: 14, fontWeight: 345 }}>
                    拖拽文件到这里,即可完成上传...
                  </div>
                </div>
              )}
            </UploadImg>
          </div>
          <div className="loadImg2">
            <span>请选择你要上传的文件...</span>

            <UploadImg listType="">
              <button style={{ display: "flex", alignItems: "center" }}>
                <img src={picture} style={{ height: "1.3em" }} />
                <div style={{ paddingLeft: "5px" }}>选择</div>
              </button>
            </UploadImg>
          </div>
        </WrapperUpload>
      )}
    </>
  );
});

export default Home;
