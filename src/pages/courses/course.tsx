import {
  Button,
  Col,
  Pagination,
  Row,
  Table,
  Tag,
  Space,
  Input
} from "antd";
import Title from "antd/es/typography/Title";
//@ts-ignore
import AddIconSvg from "../../assets/svg/add.icon.svg";
//@ts-ignore
import FilterSvg from "../../assets/svg/fillter.icon.svg";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useGetCourse } from "./service/query/useGetAllCourseAll";
import LoadingSpinner from "../../components/spin";
import { useSearchStore } from "../../store/useSearchStore";
import { SearchOutlined, EditOutlined, DeleteOutlined } from "@ant-design/icons";
import type { TableColumnsType } from 'antd';

const { Search } = Input;

interface ICourse {
  course_id: string;
  name: string;
  duration: string;
  status: string;
}

const Courses = () => {
  const navigate = useNavigate();
  const [page, setPage] = useState<number>(1);
  const [isStatus] = useState<string | undefined>(undefined);
  const { search } = useSearchStore();
  const { data, isLoading } = useGetCourse(page, 10, isStatus, search);
  const [isFilter, setFilter] = useState(false);
  const [searchText, setSearchText] = useState('');

  const columns: TableColumnsType<ICourse> = [
    {
      title: '#',
      dataIndex: 'index',
      key: 'index',
      width: 60,
      render: (_, __, index) => index + 1,
    },
    {
      title: 'Nomi',
      dataIndex: 'name',
      key: 'name',
      render: (text) => <span style={{ fontFamily: "var(--font-family)" }}>{text}</span>,
      filterDropdown: ({ setSelectedKeys, selectedKeys, confirm }) => (
        <div style={{ padding: 8 }}>
          <Search
            placeholder="Qidiruv..."
            value={selectedKeys[0]}
            onChange={(e) => {
              setSelectedKeys(e.target.value ? [e.target.value] : []);
              setSearchText(e.target.value);
            }}
            onSearch={() => confirm()}
            style={{ width: 200 }}
          />
        </div>
      ),
      filterIcon: (filtered) => (
        <SearchOutlined style={{ color: filtered ? '#1890ff' : undefined }} />
      ),
    },
    {
      title: 'Davomiligi',
      dataIndex: 'duration',
      key: 'duration',
      render: (duration) => `${duration} oy`,
      sorter: (a, b) => parseInt(a.duration) - parseInt(b.duration),
    },
    {
      title: 'Holati',
      dataIndex: 'status',
      key: 'status',
      render: (status) => (
        <Tag color={status === "ACTIVE" ? "green" : "red"}>
          {status === "ACTIVE" ? "ACTIVE" : "INACTIVE"}
        </Tag>
      ),
      filters: [
        { text: 'ACTIVE', value: 'ACTIVE' },
        { text: 'INACTIVE', value: 'INACTIVE' },
      ],
      onFilter: (value, record) => record.status === value,
    },
    {
      title: 'Imkoniyatlar',
      key: 'action',
      render: (_, record) => (
        <Space size="middle">
          <Button onClick={() => navigate(`/course/${record.course_id}`)}>
            i
          </Button>
          <Button>
            <DeleteOutlined style={{ color: 'red', fontSize: '18px' }} />
          </Button>
          <Button>
            <EditOutlined style={{ color: '#1890ff', fontSize: '18px' }} />
          </Button>
        </Space>
      ),
    },
  ];

  return (
    <>
      <Row
        style={{
          padding: "22px 20px 15px 20px",
          borderBottom: "1px solid var(--qidiruv-tizimi-1)",
          justifyContent: "space-between",
        }}
      >
        <Title
          level={2}
          style={{
            fontWeight: 600,
            fontSize: "26px",
            color: "var(--matn-rang-1)",
            fontFamily: "var(--font-family)",
            margin: 0,
          }}
        >
          Kurslar jadvali
        </Title>
        <Row style={{ gap: "15px", alignItems: "center" }}>
          <Button
            onClick={() => navigate("/course/create")}
            style={{
              display: "flex",
              gap: "10px",
              padding: "18px 20px",
              fontFamily: " var(--font-family)",
              fontWeight: 500,
              fontSize: "16px",
              color: "var(--breand-rang-2)",
              border: "1px solid var(--qidiruv-tizimi-1)",
              borderRadius: "4px",
              boxShadow: "2px 2px 2px 0 rgba(0, 0, 0, 0.1)",
              background: "var(--stroka-rang-2)",
            }}
          >
            <img src={AddIconSvg} alt="" />
            Qo'shish
          </Button>
          <Col style={{ position: "relative", display: "inline-block" }}>
            <Button
              onClick={() => setFilter(!isFilter)}
              style={{
                padding: "18px 8px",
                border: "1px solid var(--qidiruv-tizimi-1)",
                borderRadius: "4px",
                boxShadow: "2px 2px 2px 0 rgba(0, 0, 0, 0.1)",
                background: "var(--stroka-rang-2)",
              }}
            >
              <img src={FilterSvg} alt="" />
            </Button>
          </Col>
        </Row>
      </Row>

      {isLoading ? (
        <Row
          style={{
            height: "600px",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <LoadingSpinner />
        </Row>
      ) : (
        <div style={{ padding: "20px" }}>
          <Table
            columns={columns}
            dataSource={data?.data.map((item, index) => ({ ...item, key: item.course_id, index: index + 1 }))}
            pagination={false}
            style={{
              fontFamily: "var(--font-family)",
              borderRadius: "4px",
              boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
            }}
            scroll={{ x: true }}
          />

          <Row
            style={{
              width: "100%",
              justifyContent: "center",
              padding: "30px 0px 10px 0px",
            }}
          >
            <Pagination
              current={page}
              total={data?.meta?.total}
              pageSize={10}
              onChange={(page) => setPage(page)}
              showSizeChanger={false}
            />
          </Row>
        </div>
      )}
    </>
  );
};

export default Courses;