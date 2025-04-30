import {
  Button,
  Col,
  Pagination,
  Row,
  Table,
  Tag,
  Space,
  Input,
  Avatar
} from "antd";
import Title from "antd/es/typography/Title";
//@ts-ignore
import AddIconSvg from "../../assets/svg/add.icon.svg";
//@ts-ignore
import FilterSvg from "../../assets/svg/fillter.icon.svg";
import { useGetTeachers } from "./service/query/useGetTeachersFilter";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import LoadingSpinner from "../../components/spin";
import { useSearchStore } from "../../store/useSearchStore";
import { SearchOutlined, DeleteOutlined, EditOutlined } from "@ant-design/icons";
import dayjs from "dayjs";
import type { TableColumnsType } from 'antd';

const { Search } = Input;

interface ITeacher {
  user_id: string;
  full_name: string;
  data_of_birth: string;
  gender: string;
  phone_number: string;
  images: { url: string }[];
}

const Teachers = () => {
  const navigate = useNavigate();
  const [page, setPage] = useState<number>(1);
  const { search } = useSearchStore();
  const { data, isLoading } = useGetTeachers(page, 10, undefined, undefined, search);
  const [isFilter, setFilter] = useState(false);
  const [searchText, setSearchText] = useState('');

  const columns: TableColumnsType<ITeacher> = [
    {
      title: '#',
      dataIndex: 'index',
      key: 'index',
      width: 60,
      render: (_, __, index) => index + 1,
    },
    {
      title: 'O’qituvchilar F.I.O',
      dataIndex: 'full_name',
      key: 'full_name',
      render: (text, record) => (
        <Space>
          <Avatar src={record.images[0]?.url} />
          <span style={{ fontFamily: "var(--font-family)" }}>{text}</span>
        </Space>
      ),
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
      title: 'Tug’ilgan sana',
      dataIndex: 'data_of_birth',
      key: 'data_of_birth',
      render: (date) => dayjs(date).format('DD-MM-YYYY'),
      sorter: (a, b) => dayjs(a.data_of_birth).unix() - dayjs(b.data_of_birth).unix(),
    },
    {
      title: 'Jinsi',
      dataIndex: 'gender',
      key: 'gender',
      render: (gender) => (
        <Tag color={gender === 'MALE' ? 'blue' : 'pink'}>
          {gender === 'MALE' ? 'Erkak' : 'Ayol'}
        </Tag>
      ),
      filters: [
        { text: 'Erkak', value: 'MALE' },
        { text: 'Ayol', value: 'FEMALE' },
      ],
      onFilter: (value, record) => record.gender === value,
    },
    {
      title: 'Kontakt',
      dataIndex: 'phone_number',
      key: 'phone_number',
      render: (phone) => phone || '-',
    },
    {
      title: 'Imkoniyatlar',
      key: 'action',
      render: (_, record) => (
        <Space size="middle">
          <Button onClick={() => navigate(`/teacher/${record.user_id}`)}>
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
          O’qituvchilar jadvali
        </Title>
        <Row style={{ gap: "15px", alignItems: "center" }}>
          <Button
            onClick={() => navigate("/teacher/create")}
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
            dataSource={data?.data.map((item) => ({ ...item, key: item.user_id }))}
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
              total={data?.meta?.teacherCount}
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

export default Teachers;