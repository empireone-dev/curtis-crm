import React, { useState } from 'react';
import {
    MenuFoldOutlined,
    MenuUnfoldOutlined,
    MoreOutlined,
    UserOutlined,
    HolderOutlined,
    UsergroupAddOutlined,
    FileSearchOutlined,
    SignatureOutlined,
    MedicineBoxOutlined,
    UserDeleteOutlined,
    ContactsOutlined,
    IdcardOutlined,
    AppstoreOutlined
} from '@ant-design/icons';
import { Layout, Menu, Button, theme } from 'antd';
import { router, usePage } from '@inertiajs/react';
import { BriefcaseIcon, ExclamationTriangleIcon, HomeIcon, InboxArrowDownIcon, KeyIcon, TicketIcon, UserCircleIcon, UserGroupIcon, UserIcon } from '@heroicons/react/24/outline';
const { Header, Sider, Content } = Layout;


const AdminLayout = ({ children }) => {
    const { url } = usePage()
    const [collapsed, setCollapsed] = useState(false);
    const {
        token: { colorBgContainer, borderRadiusLG },
    } = theme.useToken();

    const items = [
        {
            key: 'dashboard',
            icon: <HomeIcon className='h-6' />,
            label: 'Dashboard',
            onClick: () => router.visit('/administrator/dashboard')
        },
        {
            label: 'Permissions',
            key: 'permissions',
            icon: <KeyIcon className='h-6' />,
            onClick: () => router.visit('/administrator/permissions')
        },
        {
            label: 'Roles',
            key: 'roles',
            icon: <UserIcon className='h-6' />,
            onClick: () => router.visit('/administrator/roles')
        },
        {
            label: 'Users',
            key: 'users',
            icon: <UserGroupIcon className='h-6' />,
            onClick: () => router.visit('/administrator/users')
        },
        {
            label: 'Email Template',
            key: 'email_template',
            icon: <InboxArrowDownIcon className='h-6' />,
            onClick: () => router.visit('/administrator/email_template')
        },
        {
            label: 'Item Types',
            key: 'item_types',
            icon: <BriefcaseIcon className='h-6' />,
            onClick: () => router.visit('/administrator/item_types')
        },
        {
            label: 'Common Issues',
            key: 'common_issues',
            icon: <ExclamationTriangleIcon className='h-6' />,
            onClick: () => router.visit('/administrator/common_issues')
        }, {
            label: 'Tickets',
            key: 'tickets',
            icon: <TicketIcon className='h-6' />,
            onClick: () => router.visit('/administrator/tickets')
        },
        {
            label: 'ASC',
            key: 'asc',
            icon: <UserCircleIcon className='h-6' />,
            onClick: () => router.visit('/administrator/asc')
        },
      
    ]
    const path = url.split('/').slice(1, -1)
    const active = url.split('/')[5] ? url.split('/')[url.split('/').length - 2] : url.split('/')[url.split('/').length - 1]


    return (
        <Layout
            className='h-screen'
        >
            <Sider
                width={250}
                theme="light"
                className='shadow-lg'
                trigger={null} collapsible collapsed={collapsed}>
                <div className='flex items-center justify-center py-3'>
                    <img src='/images/logo.png' width={collapsed ? 50 : 200} />
                </div>
                <div className="flex items-center justify-center">
                    <div className="flex items-center gap-3">
                        <div className="">
                            <div className="inline-block relative shrink-0 cursor-pointer rounded-[.95rem]">
                                <img className="w-[40px] h-[40px] shrink-0 inline-block rounded-[.95rem]" src="https://raw.githubusercontent.com/Loopple/loopple-public-assets/main/riva-dashboard-tailwind/img/avatars/avatar1.jpg" alt="avatar image" />
                            </div>
                        </div>
                        <div className={`${collapsed ? 'hidden' : ''} mr-2`}>
                            <a className="dark:hover:text-primary flex hover:text-primary transition-colors duration-200 ease-in-out text-[1.075rem] font-medium dark:text-neutral-400/90 text-secondary-inverse">Sarah Bangbang</a>
                            <span className="text-secondary-dark dark:text-stone-500 font-medium block text-[0.85rem]">SEO Manager</span>
                        </div>
                    </div>
                </div>

                <Menu className={`text-lg ${collapsed ? 'my-12' : 'my-10 '}`}
                    mode="inline"
                    defaultSelectedKeys={active}
                    defaultOpenKeys={path.slice(1 - path.length)}
                    items={items}
                />

            </Sider>
            <Layout>
                <Header
                    style={{
                        padding: 0,
                        background: colorBgContainer,
                    }}
                >
                    <Button
                        type="text"
                        icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
                        onClick={() => setCollapsed(!collapsed)}
                        style={{
                            fontSize: '16px',
                            width: 64,
                            height: 64,
                        }}
                    />
                </Header>
                <Content
                    style={{
                        margin: '24px 16px',
                        padding: 24,
                        minHeight: 280,
                        background: colorBgContainer,
                        borderRadius: borderRadiusLG,
                    }}
                >
                    {children}
                </Content>
            </Layout>
        </Layout>
    );
};
export default AdminLayout;