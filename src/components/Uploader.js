import Stores from "../stores/index";
import { observer } from "mobx-react";
import { Upload, message } from "antd";

const Uploader = observer((props) => {
  const UploadProps = {
    showUploadList: false,
    beforeUpload: (file) => {
      console.log(file);
      if (Stores.currentUser === null) {
        message.warning("请先登录再上传！");
        return false;
      }
      window.file = file;
      if (!/(svg$)|(png$)|(jpg$)|(jpeg$)|(gif$)/gi.test(file.type)) {
        message.error("只能上传png/svg/jpg/gif格式的图片");
        return false;
      }
      if (file.size > 1024 * 1024 * 5) {
        message.error("图片最大1M");
        return false;
      }

      Stores.upload(file, file.name)
        .then((serverFile) => {
          console.log("上传成功", serverFile);
        })
        .catch((error) => {
          console.log("上传失败", error);
          message.error("上传失败");
        });
      return false;
    },
  };
  return (
    <>
      <Upload {...UploadProps} listType={props.listType}>
        {props.children}
      </Upload>
    </>
  );
});

export default Uploader;
