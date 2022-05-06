import React, { useState } from "react";
import { Form, Input, Button, Card, notification } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import { LogoLogin } from "@Assets/image";
import { useHistory, useLocation } from "react-router-dom";
import { callAPI } from "@Services/HttpService";
import { configURL, HTTP_CREATE } from "@Constants/Http";
import { getToken } from "@Http/storage/localStorage";
import { Redirect } from "react-router-dom";

export default function Login() {
  const [form] = Form.useForm();
  const [isLoading, setIsLoading] = useState(false);
  let history = useHistory();
  let location = useLocation();

  let { from } = location.state || { from: { pathname: "/office" } };
  console.log(location);
  const login = async (account) => {
    try {
      setIsLoading(true);
      const res = await callAPI(HTTP_CREATE, "auth/login", {}, account, false);

      if (res) {
        Object.keys(res).forEach((key) => {
          localStorage.setItem(key, JSON.stringify(res[key]));
        });
      }
      setIsLoading(false);
      history.push(from);
    } catch (error) {
      form.setFields([
        {
          name: error.message.includes("User") ? "username" : "password",
          errors: [error.message],
        },
      ]);
      setIsLoading(false);
    }
  };

  const onFinish = (values) => {
    login(values);
  };

  return (
    <div>
      {getToken() && <Redirect to={from} />}
      <div className={"login-container"}>
        <div className={"login-body"}>
          <div className={"login-form"}>
            <div className="form-header">
              <img src={LogoLogin} alt="logo" />
              <p>Office Mananement System</p>
            </div>
            <Form
              initialValues={{ remember: true }}
              onFinish={onFinish}
              form={form}
              autoComplete="true"
              className="form-wapper"
            >
              <Form.Item
                name="username"
                rules={[{ required: true, message: "Username is required" }]}
                className="form-item"
              >
                <Input
                  prefix={<UserOutlined />}
                  className={"input"}
                  disabled={isLoading}
                />
              </Form.Item>

              <Form.Item
                name="password"
                rules={[{ required: true, message: "Password is required" }]}
                className="form-item"
              >
                <Input.Password
                  prefix={<LockOutlined />}
                  className={"input"}
                  visibilityToggle={false}
                  disabled={isLoading}
                  autoComplete="on"
                />
              </Form.Item>

              <Form.Item noStyle={true}>
                <Button
                  type="primary"
                  htmlType="submit"
                  block
                  loading={isLoading}
                  className="btn-primary"
                >
                  Log in
                </Button>
              </Form.Item>
            </Form>
          </div>
          <div className="login-bg" />
        </div>
      </div>
    </div>
  );
}
