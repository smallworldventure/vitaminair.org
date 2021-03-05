import React, { useState } from "react";
import { Col, Row, Layout, Form, Button, Input, Upload, message } from "antd";
import { LoadingOutlined, PlusOutlined } from "@ant-design/icons";
import TopNavbar from "../../Layouts/topNavbar";
import LeftNavbar from "../../Layouts/leftNavbar";
import { useMutation, useQuery } from "@apollo/client";
import { ADD_ABOUT } from "../../../graphql/mutation";
import { GET_ABOUTS } from "../../../graphql/query";
import addFile from "../../../assets/undraw_Add_files_re_v09g.png";
import FooterDashboard from "../../Layouts/footer";

const { Content, Footer } = Layout;
const AddAbout = () => {
  const [form] = Form.useForm();

  const [loading, setLoading] = useState(false);
  const [add_about] = useMutation(ADD_ABOUT);
  const { refetch } = useQuery(GET_ABOUTS);

  const onFinish = (values) => {
    add_about({
      variables: {
        ...values,
      },
    }).then(async (res) => {
      setLoading(true);

      await message.success("Successfull");
      form.resetFields();

      await refetch();
      setLoading(false);
    });
    console.log(values);
  };
  return (
    <React.Fragment>
      <Layout style={{ minHeight: "100vh" }}>
        <LeftNavbar />
        <Layout className="site-layout">
          <TopNavbar />
          <Content style={{ backgroundColor: "#fff" }}>
            <div className="contenContainer">
              <h1 className="title-top">Add About</h1>
              <Form
                form={form}
                onFinish={onFinish}
                // onFinishFailed={onFinishFailed}
                layout="vertical"
              >
                <Form.Item
                  label="Title"
                  name="title"
                  rules={[
                    {
                      required: true,
                      message: "Please input Title!",
                    },
                  ]}
                >
                  <Input className="input-style" size="large" />
                </Form.Item>
                <Form.Item
                  label="Description"
                  name="des"
                  rules={[
                    {
                      required: true,
                      message: "Please input Desciption!",
                    },
                  ]}
                >
                  <Input.TextArea className="input-style" size="large" />
                </Form.Item>
                <Form.Item>
                  <Button
                    className="submit-button"
                    // type="primary"
                    htmlType="submit"
                    size="large"
                    // className="standard-btn"
                  >
                    {loading ? (
                      <small>loading...</small>
                    ) : (
                      <small>SUMBIT</small>
                    )}
                  </Button>
                </Form.Item>
              </Form>
            </div>
          </Content>
          <FooterDashboard />
        </Layout>
      </Layout>
    </React.Fragment>
  );
};

export default AddAbout;
