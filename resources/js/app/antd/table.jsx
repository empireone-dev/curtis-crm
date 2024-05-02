import React, { useRef, useState } from 'react';
import { EyeOutlined, SearchOutlined } from '@ant-design/icons';
import { Button, Input, Space, Table, Tag } from 'antd';
import Highlighter from 'react-highlight-words';
import { Link } from '@inertiajs/react';

export default function TicketTableComponent() {
    const [searchText, setSearchText] = useState('');
    const [searchedColumn, setSearchedColumn] = useState('');
    const searchInput = useRef(null);
    const handleSearch = (selectedKeys, confirm, dataIndex) => {
        confirm();
        setSearchText(selectedKeys[0]);
        setSearchedColumn(dataIndex);
    };
    const handleReset = (clearFilters) => {
        clearFilters();
        setSearchText('');
    };

    const getColumnSearchProps = (dataIndex) => ({
        filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters, close }) => (
            <div
                style={{
                    padding: 8,
                }}
                onKeyDown={(e) => e.stopPropagation()}
            >
                <Input
                    ref={searchInput}
                    placeholder={`Search ${dataIndex}`}
                    value={selectedKeys[0]}
                    onChange={(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])}
                    onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
                    style={{
                        marginBottom: 8,
                        display: 'block',
                    }}
                />
                <Space>
                    <Button
                        type="primary"
                        onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
                        icon={<SearchOutlined />}
                        size="small"
                        style={{
                            width: 90,
                        }}
                    >
                        Search
                    </Button>
                    <Button
                        onClick={() => clearFilters && handleReset(clearFilters)}
                        size="small"
                        style={{
                            width: 90,
                        }}
                    >
                        Reset
                    </Button>
                    <Button
                        type="link"
                        size="small"
                        onClick={() => {
                            confirm({
                                closeDropdown: false,
                            });
                            setSearchText(selectedKeys[0]);
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
                        close
                    </Button>
                </Space>
            </div>
        ),
        filterIcon: (filtered) => (
            <SearchOutlined
                style={{
                    color: filtered ? '#1677ff' : undefined,
                }}
            />
        ),
        onFilter: (value, record) =>
            record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()),
        onFilterDropdownOpenChange: (visible) => {
            if (visible) {
                setTimeout(() => searchInput.current?.select(), 100);
            }
        },
        render: (text) =>
            searchedColumn === dataIndex ? (
                <Highlighter
                    highlightStyle={{
                        backgroundColor: '#ffc069',
                        padding: 0,
                    }}
                    searchWords={[searchText]}
                    autoEscape
                    textToHighlight={text ? text.toString() : ''}
                />
            ) : (
                text
            ),
    });

    const data = [
        {
            key: '1',
            applicant_number: 32,
            dob: '34534',
            fullname: 'John Brown',
            gender: 32,
            civil_status: 'single',
            status: 'Initial Phase',
            email: 'dawdwa@gmail.com',
            contact: 'New York No. 1 Lake Park',
        },
        {
            key: '2',
            applicant_number: 32,
            dob: '34534',
            fullname: 'Joe Black',
            gender: 42,
            civil_status: 'single',
            status: 'Initial Phase',
            email: 'dawdwa@gmail.com',
            contact: 'London No. 1 Lake Park',
        },
        {
            key: '3',
            applicant_number: 32,
            dob: '34534',
            fullname: 'Jim Green',
            gender: 32,
            civil_status: 'single',
            status: 'Initial Phase',
            email: 'dawdwa@gmail.com',
            contact: 'Sydney No. 1 Lake Park',
        },
        {
            key: '4',
            applicant_number: 32,
            dob: '34534',
            fullname: 'Jim Red',
            gender: 32,
            civil_status: 'single',
            status: 'Initial Phase',
            email: 'dawdwa@gmail.com',
            contact: 'London No. 2 Lake Park',
        },
    ];
    const columns = [
        {
            title: 'Applicant #',
            dataIndex: 'applicant_number',
            key: 'applicant_number',
            ...getColumnSearchProps('applicant_number'),
        },
        {
            title: 'Fullname',
            dataIndex: 'fullname',
            key: 'fullname',
            ...getColumnSearchProps('fullname'),
        },
        {
            title: 'Date of Birth',
            dataIndex: 'dob',
            key: 'dob',
            ...getColumnSearchProps('dob'),
        },
        {
            title: 'Gender',
            dataIndex: 'gender',
            key: 'gender',
            ...getColumnSearchProps('gender'),
        },
        {
            title: 'Marital Status',
            dataIndex: 'civil_status',
            key: 'civil_status',
            ...getColumnSearchProps('civil_status'),
        },
        {
            title: 'Email',
            dataIndex: 'email',
            key: 'email',
            ...getColumnSearchProps('email'),
        },
        {
            title: 'Contact',
            dataIndex: 'contact',
            key: 'contact',
            ...getColumnSearchProps('contact'),
        },
        {
            title: 'Status',
            dataIndex: 'status',
            key: 'status',
            render: (_, record, i) => {

                return (
                    <Tag color={'red'} key={i}>
                        {record.status}
                    </Tag>
                )
            }
        },
        {
            title: 'action',
            dataIndex: 'action',
            render: (_, record) => {
                return (
                    <Link href={'/admin/recruitment/applicants/failed/' + record.key}>
                        <EyeOutlined className='text-lg text-blue-500' />
                    </Link>
                )
            }
        },
    ];

    return <Table columns={columns} dataSource={data} />;
};