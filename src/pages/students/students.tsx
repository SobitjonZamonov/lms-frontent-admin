import {
  Button,
  Col,
  Row,
  Table,
  Input,
  Space
} from "antd";
import Title from "antd/es/typography/Title";
import { SearchOutlined } from '@ant-design/icons';
import { EditOutlined } from '@ant-design/icons';
import { DeleteOutlined } from '@ant-design/icons';
import type { InputRef, TableColumnsType, TableColumnType } from 'antd';
import type { FilterDropdownProps } from 'antd/es/table/interface';
import Highlighter from 'react-highlight-words';
//@ts-ignore
import AddIconSvg from "../../assets/svg/add.icon.svg";
//@ts-ignore
import FilterSvg from "../../assets/svg/fillter.icon.svg";
//@ts-ignore
import CloseIcon from "../../assets/svg/close.icon.svg";
import useGetAllStudent from "./service/query/useGetAllStudent";
import { useNavigate } from "react-router-dom";
import { useRef, useState } from "react";
import { useSearchStore } from "../../store/useSearchStore";
import LoadingSpinner from "../../components/spin";

interface IFilter {
  data_of_birth?: string;
  gender?: string;
  groupId?: string;
  fullname?: string;
}

const Students = () => {
  const [page, setPage] = useState<number>(1);
  const [isFilterQuery] = useState<IFilter | null>(null);
  const { search } = useSearchStore();
  const { data, isLoading } = useGetAllStudent(
    page,
    10,
    isFilterQuery?.data_of_birth,
    isFilterQuery?.gender,
    isFilterQuery?.groupId,
    search
  );
  const [isFilter, setFilter] = useState(false);
  const navigate = useNavigate();

  // Search functionality for table
  const [searchText, setSearchText] = useState('');
  const [searchedColumn, setSearchedColumn] = useState('');
  const searchInput = useRef<InputRef>(null);

  const handleSearch = (
    selectedKeys: string[],
    confirm: FilterDropdownProps['confirm'],
    dataIndex: string,
  ) => {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  };

  const handleReset = (clearFilters: () => void) => {
    clearFilters();
    setSearchText('');
  };

  const getColumnSearchProps = (dataIndex: string): TableColumnType<any> => ({
    filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters, close }) => (
      <div style={{ padding: 8 }} onKeyDown={(e) => e.stopPropagation()}>
        <Input
          ref={searchInput}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])}
          onPressEnter={() => handleSearch(selectedKeys as string[], confirm, dataIndex)}
          style={{ marginBottom: 8, display: 'block' }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() => handleSearch(selectedKeys as string[], confirm, dataIndex)}
            icon={<SearchOutlined />}
            size="small"
            style={{ width: 90 }}
          >
            Search
          </Button>
          <Button
            onClick={() => clearFilters && handleReset(clearFilters)}
            size="small"
            style={{ width: 90 }}
          >
            Reset
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              confirm({ closeDropdown: false });
              setSearchText((selectedKeys as string[])[0]);
              setSearchedColumn(dataIndex);
            }}
          >
            Filter
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              close();
            }}
          >
            Close
          </Button>
        </Space>
      </div>
    ),
    filterIcon: (filtered: boolean) => (
      <SearchOutlined style={{ color: filtered ? '#1677ff' : undefined }} />
    ),
    onFilter: (value, record) =>
      record[dataIndex]
        ?.toString()
        .toLowerCase()
        .includes((value as string).toLowerCase()),
    render: (text) =>
      searchedColumn === dataIndex ? (
        <Highlighter
          highlightStyle={{ backgroundColor: '#ffc069', padding: 0 }}
          searchWords={[searchText]}
          autoEscape
          textToHighlight={text ? text.toString() : ''}
        />
      ) : (
        text
      ),
  });

  const columns: TableColumnsType<any> = [
    {
      title: '#',
      dataIndex: 'index',
      key: 'index',
      render: (_, __, index) => (page - 1) * 10 + index + 1,
    },
    {
      title: "O'quvchi F.I.O",
      dataIndex: 'full_name',
      key: 'full_name',
      ...getColumnSearchProps('full_name'),
    },
    {
      title: "Tug'ilgan sana",
      dataIndex: 'data_of_birth',
      key: 'data_of_birth',
      ...getColumnSearchProps('data_of_birth'),
    },
    {
      title: "Jinsi",
      dataIndex: 'gender',
      key: 'gender',
      render: (gender) => gender === 'MALE' ? 'Og\'il bola' : 'Qiz bola',
      filters: [
        { text: 'Og\'il bola', value: 'MALE' },
        { text: 'Qiz bola', value: 'FEMALE' },
      ],
      onFilter: (value, record) => record.gender === value,
    },
    {
      title: "Guruh raqami",
      dataIndex: ['group_members', '0', 'group', 'name'],
      key: 'group',
      ...getColumnSearchProps('group'),
    },
    {
      title: "To'lov",
      dataIndex: ['PaymentForStudent', '0', 'type'],
      key: 'payment',
      render: (_, record) =>
        record.PaymentForStudent?.[0]?.type
          ? `${record.PaymentForStudent[0].type} (${record.PaymentForStudent[0].sum})`
          : "Naxt"
    },
    {
      title: "Amallar",
      key: 'actions',
      render: (_, record) => (
        <Space size="middle">
          <Button onClick={() => navigate(`/student/about/${record.user_id}`)}>
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
          borderBottom: "2px solid #DDDD",
          justifyContent: "space-between",
        }}
      >
        <Title
          level={2}
          style={{
            fontWeight: 600,
            fontSize: "26px",
            margin: 0,
          }}
        >
          O'quvchilar jadvali
        </Title>
        <Row style={{ gap: "15px", alignItems: "center" }}>
          <Button
            onClick={() => navigate("/student/create")}
            style={{
              display: "flex",
              gap: "10px",
              padding: "18px 20px",
              fontWeight: 500,
              fontSize: "16px",
              border: "2px solid #DDDD",
              borderRadius: "4px",
              boxShadow: "2px 2px 2px 0 rgba(0, 0, 0, 0.1)",
              background: "var(--stroka-rang-2)",
            }}
          >
            <img src={AddIconSvg} alt="" />
            Qo'shish
          </Button>
          <Col
            style={{
              position: "relative",
              display: "inline-block",
            }}
          >
            <Button
              onClick={() => (isFilter ? setFilter(false) : setFilter(true))}
              style={{
                padding: "18px 8px",
                border: " 2px solid #DDDD",
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
            dataSource={data?.data}
            pagination={{
              position: ['bottomCenter'],
              current: page,
              total: data?.meta.studentCount,
              pageSize: 10,
              onChange: (page) => setPage(page),
            }}
            rowKey="user_id"
          />
        </div>
      )}
    </>
  );
};

export default Students;