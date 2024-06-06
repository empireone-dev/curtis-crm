import React, { useRef, useState } from 'react';
import { ExclamationCircleFilled, FolderOpenFilled, SearchOutlined } from '@ant-design/icons';
import { Button, Input, Space, Table, Tag } from 'antd';
import Highlighter from 'react-highlight-words';
import ProductivitySearchSection from './productivity-search-section';
import ProductivityDateSection from './productivity-date-section';

export default function ProductivityTableSection() {
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
            cases: 32,
            emails: 32,
            webdata: '2',
            agent: 'John Brown',
            total: '8',
            status: '24',
        },
        {
            key: '2',
            cases: 32,
            emails: 32,
           webdata: '2',
            agent: 'John Brown',
            total: '8',
            status: '24',
        },
        {
            key: '3',
            cases: 32,
            emails: 32,
           webdata: '2',
            agent: 'John Brown',
            total: '8',
            status: '24',
        },
        {
            key: '4',
            cases: 32,
            emails: 32,
           webdata: '2',
            agent: 'John Brown',
            total: '8',
            status: '24',
        },
    ];

    const columns = [
        {
            title: 'Agent',
            dataIndex: 'agent',
            key: 'app_id',
            // ...getColumnSearchProps('app_id'),
        },
        {
            title: 'Handled Cases',
            dataIndex: 'cases',
            key: 'cases',
            // ...getColumnSearchProps('app_name'),
        },
        {
            title: 'Handled Direct Emails',
            dataIndex: 'emails',
            key: 'position',
            // ...getColumnSearchProps('position'),
        },
        {
            title: 'Handled Webdata',
            dataIndex: 'webdata',
            key: 'salary',
            // ...getColumnSearchProps('salary'),
        },
        {
            title: 'Assigned Cases/Direct Emails(Based on Date)',
            dataIndex: 'status',
            key: 'status',
        },
        {
            title: 'Remaining Open Cases/Direct Emails',
            dataIndex: 'status',
            key: 'status',
        },
        {
            title: 'Total',
            dataIndex: 'total',
            key: 'total',
        },
    ];

    return (
        <div>
            <div className="p-3 rounded-md">
                <div className='flex'>
                <ProductivityDateSection/>
                <ProductivitySearchSection/>
                </div>
                <Table columns={columns} dataSource={data} />
            </div>
        </div>
    );
    
    
};
