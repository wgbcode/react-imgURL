import { Auth } from "../models/index";
import { Button, Form, Input, message } from "antd";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import Stores from "../stores/index";
import { observer } from "mobx-react";

const Wrapper = styled.div`
  width: 40vw;
  margin-left: 30vw;
`;
const Title = styled.h1`
  text-align: center;
  padding: 0 0 18px 0;
  font-size: 24px;
  font-weight: 500;
`;
const StyledForm = styled(Form)`
  margin-top: 72px;
  padding: 16px 0;
  border-radius: 4px;
  box-shadow: 2px 2px 4px 0 rgba(0, 0, 0, 0.2),
    -2px -2px 4px 0 rgba(0, 0, 0, 0.2);
`;

const AuthForm = observer(({ name }) => {
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const onFinish = (values) => {
    const { username, password } = values;
    if (name === "register") {
      Auth.register(username, password)
        .then(() => {
          navigate("/login");
        })
        .catch((error) => {
          message.error("用户名已存在！");
          console.log(error);
        });
    } else if (name === "login") {
      Auth.login(username, password)
        .then(() => {
          navigate("/home");
          Stores.pullUser();
          window.Auth = Auth;
        })
        .catch((error) => console.log(error));
    }
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };
  const onReset = () => {
    form.resetFields();
  };
  const passwordConfirm = (formInstance) => ({
    validator(rule, value) {
      const { getFieldValue } = formInstance;
      if (getFieldValue("password") !== value) {
        return Promise.reject("输入密码不一致，请重新输入！");
      }
      return Promise.resolve();
    },
  });
  const usernameConfirm = (rule, value) => {
    if (/\W/.test(value)) return Promise.reject("只能是字母数字下划线");
    if (value.length < 3 || value.length > 8)
      return Promise.reject("请输入3~8个字符");
    return Promise.resolve();
  };
  return (
    <Wrapper>
      <StyledForm
        name="basic"
        labelCol={{ span: 6 }}
        wrapperCol={{ span: 14 }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
        form={form}
      >
        <Title>{name === "register" ? "注册" : "登录"}</Title>
        <StyledForm.Item
          label="用户名"
          name="username"
          rules={[
            { required: true, message: "请输入用户名" },
            { validator: usernameConfirm },
          ]}
        >
          <Input />
        </StyledForm.Item>

        <StyledForm.Item
          label="输入密码"
          name="password"
          rules={[
            { required: true, message: "请输入密码" },
            { min: 5, message: "最少输入5个字符" },
            { max: 12, message: "最多输入12个字符" },
          ]}
        >
          <Input.Password />
        </StyledForm.Item>

        {name === "register" ? (
          <StyledForm.Item
            label="确认密码"
            name="confirm"
            rules={[{ required: true, message: "" }, passwordConfirm]}
          >
            <Input.Password />
          </StyledForm.Item>
        ) : (
          ""
        )}

        <StyledForm.Item wrapperCol={{ offset: 6, span: 8 }}>
          <Button
            type="primary"
            htmlType="submit"
            style={{ borderRadius: "4px", marginRight: "16px" }}
          >
            提交
          </Button>
          <Button
            htmlType="button"
            onClick={onReset}
            style={{ borderRadius: "4px" }}
          >
            重置
          </Button>
        </StyledForm.Item>
      </StyledForm>
    </Wrapper>
  );
});

export default AuthForm;
