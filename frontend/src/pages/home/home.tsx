import React, { FC, useCallback, useEffect, useState } from "react";
import { Button, Popconfirm, Space, Table, message } from "antd";
import type { ColumnsType, TablePaginationConfig } from "antd/es/table";
import { PlusOutlined } from "@ant-design/icons";
import style from "./home.module.scss";
import { FormBuilder } from "@/components/formBuilder";
import { Layout } from "@/components/layout";
import { classNames } from "@/utils";
import { IForm } from "@/types";
import { deleteForm, getForms } from "@/store";
import { useNavigate } from "react-router-dom";

export const Home: FC = () => {
  const navigate = useNavigate();
  const [messageApi, contextHolder] = message.useMessage();
  const [data, setData] = useState<IForm[]>();
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [activeForm, setActiveForm] = useState<IForm>();
  const [pagination, setPagination] = useState<TablePaginationConfig>({
    current: 1,
    pageSize: 10,
  });
  const [total, setTotal] = useState(0);

  const columns: ColumnsType<IForm> = [
    {
      title: "Title",
      dataIndex: "title",
      key: "title",
    },
    {
      title: "Action",
      key: "action",
      width: 80,
      render: (_, record) => (
        <Space size="middle">
          <Button
            type="link"
            onClick={(e) => {
              edit(e, record);
            }}
          >
            Edit
          </Button>

          <Popconfirm
            title="Delete the form"
            description="Are you sure to delete this form?"
            onConfirm={(e) => {
              e?.stopPropagation();
              remove(record);
            }}
            onCancel={(e) => {
              e?.stopPropagation();
            }}
            placement="topRight"
            okText="Yes"
            cancelText="No"
          >
            <Button
              type="link"
              danger
              onClick={(e) => {
                e.stopPropagation();
              }}
            >
              Delete
            </Button>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  const remove = (record: IForm) => {
    deleteForm(record.id)
      .then(loadData)
      .catch(() => {
        messageApi.open({
          type: "error",
          content: "Delete failed",
        });
      });
  };

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
    setActiveForm(undefined);

    if (needReload) {
      loadData();
    }
  };

  const loadData = useCallback(() => {
    setLoading(true);
    getForms(pagination.current ?? 1, pagination.pageSize ?? 10).then(
      (data) => {
        setLoading(false);
        setData(data.data);
        setTotal(data.total);
      }
    );
  }, [pagination]);

  const handleTableChange = (p: TablePaginationConfig) => {
    setPagination(p);
    if (p.pageSize !== pagination?.pageSize) {
      setData([]);
    }
  };

  useEffect(() => {
    loadData();
  }, [pagination, loadData]);

  return (
    <Layout title="All the forms table">
      {contextHolder}
      <div className={style.content}>
        <div>
          <div className={classNames("f-bc", style.buttonContainer)}>
            <Button
              loading={loading}
              onClick={() => {
                setPagination({ ...pagination, current: 1 });
                loadData();
              }}
            >
              Reload
            </Button>
            <Button type="primary" icon={<PlusOutlined />} onClick={showDrawer}>
              New
            </Button>
          </div>
          <Table
            rowKey={"id"}
            columns={columns}
            dataSource={data}
            loading={loading}
            pagination={{ ...pagination, total }}
            onChange={handleTableChange}
            onRow={(record) => {
              return {
                onClick: () => {
                  navigate(`/form/${record.id}`, { replace: false });
                },
              };
            }}
          />
        </div>
        <FormBuilder
          onClose={onClose}
          open={open}
          drawerTitle={`${activeForm ? "Edit" : "Create"} form`}
          form={activeForm}
        />
      </div>
    </Layout>
  );
};
