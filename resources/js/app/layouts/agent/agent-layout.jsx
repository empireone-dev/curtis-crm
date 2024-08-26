import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { get_user_service } from "@/app/services/user-service";
import { setUser } from "@/app/redux/app-slice";
// import AgentLayoutSubSidebarSection from "./sections/agent-layout-sub-sidebar-section";
// import AgentLayoutSidebarSection from "./sections/agent-layout-sidebar-section";
// import axios from "axios";
import {
    EnvelopeIcon,
    ExclamationTriangleIcon,
    HomeIcon,
    InboxArrowDownIcon,
    KeyIcon,
    PowerIcon,
    RectangleStackIcon,
    TicketIcon,
    UserCircleIcon,
    UserGroupIcon,
    UserIcon,
    WrenchScrewdriverIcon,
} from "@heroicons/react/24/outline";

import {
    DownOutlined,
    MenuFoldOutlined,
    MenuUnfoldOutlined,
    UploadOutlined,
    UserOutlined,
    VideoCameraOutlined,
} from "@ant-design/icons";
import { Link, router, usePage } from "@inertiajs/react";
import SearchTicketSection from "@/app/pages/sections/search-ticket-section";
import { Button, Layout, Menu, theme, Dropdown, Space } from "antd";
const { Header, Sider, Content } = Layout;

export default function AgentLayout({ children, account }) {
    const [collapsed, setCollapsed] = useState(false);
    const dispatch = useDispatch();
    const { user } = useSelector((state) => state.app);
    const { component } = usePage();
    const path = component.split("/")[1];
    const {
        token: { colorBgContainer, borderRadiusLG },
    } = theme.useToken();

    useEffect(() => {
        async function get_account() {
            const result = await get_user_service();
            dispatch(setUser(result));
        }
        if (!user.id) {
            get_account();
        }
    }, [user]);

    const navData = [
        {
            key: "1",
            icon: <HomeIcon className="h-6" />,
            label: "Dashboard",
            onClick: () => {
                router.visit("/agent/dashboard");
            },
        },
        {
            key: "2",
            icon: <TicketIcon className="h-6" />,
            label: "Tickets",
            onClick: () => {
                router.visit("/agent/tickets");
            },
        },
        account.agent_type !== "CSR" && {
            key: "3",
            icon: <InboxArrowDownIcon className="h-6" />,
            label: "Open Cases",
            onClick: () => {
                router.visit("/agent/open_cases?page=1");
            },
        },
        account.agent_type !== "CSR" && {
            key: "4",
            icon: <EnvelopeIcon className="h-6" />,
            label: "Direct Emails",
            onClick: () => {
                router.visit("/agent/direct_emails?page=1");
            },
        },
        account.agent_type !== "CSR" && {
            key: "5",
            icon: <EnvelopeIcon className="h-6" />,
            label: "Productivity",
            onClick: () => {
                router.visit("/agent/productivity?page=1");
            },
        },{
            key: "6",
            icon: <RectangleStackIcon className="h-6" />,
            label: "Product Registration",
            onClick: () => {
                router.visit("/agent/product_registration");
            },
        }
    ];
    let active = "0";
    if (path == "dashboard") {
        active = "1";
    } else if (path == "tickets") {
        active = "2";
    } else if (path == "open_cases") {
        active = "3";
    } else if (path == "direct_emails") {
        active = "4";
    } else if (path == "productivity") {
        active = "5";
    }else if (path == "product_registration") {
        active = "6";
    }
    const items = [
        {
            label: (
                <Link
                    method="post"
                    as="button"
                    href={route("logout")}
                    className="block transition-opacity duration-200 rounded-full text-blue-800 hover:text-blue-600"
                >
                    LOGOUT
                </Link>
            ),
            key: "1",
        },
    ];
    return (
        <Layout className="h-screen">
            <Sider trigger={null} collapsible collapsed={collapsed}>
                <img src="/images/logo.png" className="w-full h-16 " />
                <Menu
                    className="h-[93vh] pt-4"
                    theme="light"
                    mode="inline"
                    defaultSelectedKeys={[active]}
                    items={navData}
                />
            </Sider>
            <Layout>
                <Header
                    style={{
                        padding: 0,
                        background: colorBgContainer,
                    }}
                >
                    <div className="flex items-center justify-between">
                        <Button
                            type="text"
                            icon={
                                collapsed ? (
                                    <MenuUnfoldOutlined />
                                ) : (
                                    <MenuFoldOutlined />
                                )
                            }
                            onClick={() => setCollapsed(!collapsed)}
                            style={{
                                fontSize: "16px",
                                width: 64,
                                height: 64,
                            }}
                        />
                        <div className="mx-5 flex gap-4">
                            <SearchTicketSection />

                            {/* <Link
                                method="post"
                                as="button"
                                href={route("logout")}
                                className="block transition-opacity duration-200 rounded-full text-blue-800 hover:text-blue-600"
                            >
                                <span className="sr-only">User menu</span>
                                <PowerIcon className="h-10" />
                            </Link> */}
                            <Dropdown
                                menu={{
                                    items,
                                }}
                                trigger={["click"]}
                            >
                                <a onClick={(e) => e.preventDefault()}>
                                    <Space>
                                        <div className="capitalize">
                                            {user.name}
                                        </div>
                                        <DownOutlined />
                                    </Space>
                                </a>
                            </Dropdown>
                        </div>
                    </div>
                </Header>
                <Content
                    className="overflow-auto"
                    style={{
                        margin: "24px 16px",
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
}
