import React from 'react';
import moment from 'moment';
import { Spin, Table, Tag, Divider, message, Popconfirm } from 'antd';
import { Link } from 'react-router-dom';
import { BsTrash, BsPencil } from 'react-icons/bs';
import { useQuery, useMutation } from '@apollo/client';
import { GET_PROJECTS } from '../../../graphql/query';
import { DELETE_PROJECT } from '../../../graphql/mutation';
import Output from 'editorjs-react-renderer';

const AllProject = () => {
  const { loading, data, refetch } = useQuery(GET_PROJECTS);
  const [delete_project] = useMutation(DELETE_PROJECT);
  if (loading)
    return (
      <center style={{ marginTop: '100px' }}>
        <Spin style={{ color: 'red !important' }} size="large" />
      </center>
    );
  // console.log(data);
  const columns = [
    {
      title: 'Image',
      width: 200,
      dataIndex: 'image',
      render: (data) => {
        return (
          <img
            // style={{ borderRadius: "20px", border: "2px solid gray" }}
            height="40px"
            width="40px"
            // src={"http://localhost:3500/public/uploads/" + data}
            src={'https://backend.vitaminair.org/public/uploads/' + data}
            alt="avatar"
            // src={'http://localhost:7002/public/uploads/' + data}
          ></img>
        );
      },
    },
    {
      title: 'Title',
      dataIndex: 'title',
      render: (data) => {
        return data.length <= 25 ? data : data.substring(0, 25) + ' ...';
      },
    },
    {
      title: 'Description',
      key: 'tree',
      dataIndex: 'des',
      render: (data) => {
        const result = <Output data={JSON.parse(data)} />;
        // return data.length <= 25 ? data : data.substring(0, 25) + " ...";
        return `${
          result.props.data.blocks[0].data.text.length <= 25
            ? result.props.data.blocks[0].data.text
            : result.props.data.blocks[0].data.text.substring(0, 50) + '...'
        }`;
      },
    },
    {
      title: 'Date',
      dataIndex: 'create_at',
      render: (create_at) => {
        return moment.unix(create_at / 1000).format(' Do YYYY, h:mm:ss A');
      },
    },
    {
      title: 'Action',
      dataIndex: 'action',
      key: 'action',
      render: (index, data) => {
        const { id } = data;
        return (
          <div>
            <Link to={`/admin/edit-project/${id}`}>
              <Tag className="edit-button">
                <BsPencil
                  color="rgb(32, 166, 147)"
                  size="20px"
                  style={{ marginTop: '6px' }}
                />
              </Tag>
            </Link>
            <Divider type="vertical" />
            <Popconfirm
              placement="topRight"
              title="Are you sure to delete?"
              okText="Yes"
              cancelText="No"
              onConfirm={() => {
                delete_project({ variables: { id: `${id}` } })
                  .then(async (res) => {
                    await message.success(res.data.delete_project.message);
                    await refetch();
                  })
                  .catch((error) => {
                    console.log(error);
                    return null;
                  });
              }}
            >
              <Tag className="delete-button">
                {/* <DeleteOutlined /> Delete */}
                <BsTrash
                  color="#ff5858"
                  size="20px"
                  style={{ marginTop: '6px' }}
                />
              </Tag>
              {/* <div className="delete-button">
                <center>
                  <BsTrash
                    color="#ff5858"
                    size="20px"
                    style={{ marginTop: "6px" }}
                  />
                </center>
              </div> */}
            </Popconfirm>
          </div>
        );
      },
    },
  ];

  function onChange(pagination, filters, sorter, extra) {
    console.log('params', pagination, filters, sorter, extra);
  }

  return (
    <div>
      <div className="contenContainer">
        <h1 className="title-top">Projects</h1>
        <div>
          <Table
            columns={columns}
            dataSource={data.get_projects}
            onChange={onChange}
          />
        </div>
      </div>
    </div>
  );
};

export default AllProject;
