import React, { useState } from 'react';
import { Form, Button, Input, message } from 'antd';
import { useMutation, useQuery } from '@apollo/client';
import { EDIT_ABOUT } from '../../../graphql/mutation';
import { GET_ABOUT } from '../../../graphql/query';
import { useParams } from 'react-router-dom';
import { EDITOR_JS_TOOLS } from '../../Layouts/tool';
import EditorJs from 'react-editor-js';

const EditAbout = ({ history }) => {
  const instanceRef = React.useRef(null);
  const { id } = useParams();
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [edit_about] = useMutation(EDIT_ABOUT);
  const [datas, setData] = React.useState({
    time: 1556098174501,
    blocks: [
      {
        type: 'header',
        data: {
          text: 'Editor.js',
          level: 2,
        },
      },
    ],
  });
  const {
    loading: loadingAbout,
    data,
    refetch,
  } = useQuery(GET_ABOUT, {
    variables: { id },
  });
  async function handleSave() {
    const savedData = await instanceRef.current.save();
    console.log(JSON.stringify(savedData));
    await setData(savedData);
    // instanceRef.current.clear();
  }
  const onFinish = (values) => {
    const { title } = values;
    edit_about({
      variables: {
        title: title,
        des: JSON.stringify(datas),
        id: id,
      },
    }).then(async (res) => {
      setLoading(true);
      await message.success('Successfull');
      await refetch();
      await history.push('/admin/abouts');
    });
    console.log(values);
  };
  if (loadingAbout) {
    return 'loading.....';
  }
  return (
    <React.Fragment>
      <div className="contenContainer">
        <h1 className="title-top">Edit About</h1>
        <Form
          form={form}
          onFinish={onFinish}
          // onFinishFailed={onFinishFailed}
          layout="vertical"
        >
          <Form.Item
            initialValue={data.get_about.title}
            label="Title"
            name="title"
            rules={[
              {
                required: true,
                message: 'Please input Title!',
              },
            ]}
          >
            <Input className="input-style" size="large" />
          </Form.Item>
          <Form.Item
            // initialValue={data.get_about.des}
            initialValue={JSON.parse(data.get_about.des)}
            label="Description"
            name="des"
            rules={[
              {
                required: true,
                message: 'Please input Desciption!',
              },
            ]}
          >
            {/* <Input.TextArea className="input-style" size="large" /> */}
            <EditorJs
              data={JSON.parse(data.get_about.des)}
              tools={EDITOR_JS_TOOLS}
              instanceRef={(instance) => (instanceRef.current = instance)}
            />
          </Form.Item>
          <Form.Item>
            <Button
              onClick={handleSave}
              className="submit-button"
              // type="primary"
              htmlType="submit"
              size="large"
              // className="standard-btn"
            >
              {loading ? <small>loading...</small> : <small>SUMBIT</small>}
            </Button>
          </Form.Item>
        </Form>
      </div>
    </React.Fragment>
  );
};

export default EditAbout;
