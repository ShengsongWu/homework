import React, { FC, useEffect, useState } from 'react';
import { Button, Space, Table } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { PlusOutlined } from '@ant-design/icons';
import style from './home.module.scss';
import { FormBuilder } from '@/components/formBuilder';
import { Layout } from '@/components/layout';
import { classNames } from '@/utils';
import { IForm } from '@/types';
import { getForms } from '@/store';
import { useNavigate } from 'react-router-dom';

export const Home: FC = () => {
  const navigate = useNavigate();
  const [data, setData] = useState<IForm[]>();
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [activeForm, setActiveForm] = useState<IForm>();

  const columns: ColumnsType<IForm> = [
    {
      title: 'Title',
      dataIndex: 'title',
      key: 'title'
    },
    {
      title: 'Action',
      key: 'action',
      width: 80,
      render: (_, record) => (
        <Space size="middle">
          <Button
            type="link"
            onClick={(e) => {
              edit(e, record);
            }}>
            Edit
          </Button>
          <Button type="link" danger>
            Delete
          </Button>
        </Space>
      )
    }
  ];

  const edit = (event: React.MouseEvent<any, MouseEvent>, record: IForm) => {
    event.stopPropagation();
    setActiveForm(record);
    setOpen(true);
  };
  const showDrawer = () => {
    setActiveForm(undefined);
    setOpen(true);
  };

  const onClose = (needReload?: boolean) => {
    setOpen(false);
    if (needReload) {
      loadData();
    }
  };

  const loadData = () => {
    setLoading(true);
    getForms().then((data) => {
      setLoading(false);
      setData(data);
    });
  };

  useEffect(() => {
    loadData();
  }, []);

  return (
    <Layout title="All the forms table">
      <div className={style.content}>
        <div>
          <div className={classNames('f-bc', style.buttonContainer)}>
            <Button loading={loading} onClick={loadData}>
              Reload
            </Button>
            <Button type="primary" icon={<PlusOutlined />} onClick={showDrawer}>
              New
            </Button>
          </div>
          <Table
            rowKey={'id'}
            columns={columns}
            dataSource={data}
            loading={loading}
            onRow={(record) => {
              return {
                onClick: () => {
                  navigate(`/form/${record.id}`, { replace: false });
                }
              };
            }}
          />
        </div>
        <FormBuilder
          onClose={onClose}
          open={open}
          drawerTitle={`${activeForm ? 'Edit' : 'Create'} form`}
          form={activeForm}
        />
      </div>
    </Layout>
  );
};
