import React, { FC } from 'react';
import { Col, Row, Layout as AntdLayout } from 'antd';
import { useNavigate } from 'react-router-dom';
import { ArrowLeftOutlined } from '@ant-design/icons';
import styles from './layout.module.scss';
const { Header, Content } = AntdLayout;

export interface IProps {
  children: React.ReactNode;
  showBack?: boolean;
  title?: string;
  operator?: React.ReactNode;
}

export const Layout: FC<IProps> = (props) => {
  const navigate = useNavigate();
  const { children, showBack, title, operator } = props;
  return (
    <AntdLayout className={styles.layout}>
      <Header>
        <Row className={styles.header}>
          <Col
            span={8}
            className={styles.back}
            onClick={() => {
              navigate(-1);
            }}>
            {showBack ? <ArrowLeftOutlined /> : null}
          </Col>
          <Col span={8} className={styles.title}>
            {title?.length ? title : null}
          </Col>
          <Col span={8} className={styles.operator}>
            {operator ? operator : null}
          </Col>
        </Row>
      </Header>
      <Content className={styles.content}>{children}</Content>
    </AntdLayout>
  );
};
