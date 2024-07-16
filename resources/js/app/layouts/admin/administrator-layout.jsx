import React, { useEffect, useState } from "react";
import LayoutSidebarSection from "./sections/layout-sidebar-section";
import LayoutSubSidebarSection from "./sections/layout-sub-sidebar-section";
import axios from "axios";
import { get_user_service } from "@/app/services/user-service";
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "@/app/redux/app-slice";
import {
    MenuFoldOutlined,
    MenuUnfoldOutlined,
    UploadOutlined,
    UserOutlined,
    VideoCameraOutlined,
} from "@ant-design/icons";
import { Button, Layout, Menu, theme } from "antd";
import {
    ExclamationTriangleIcon,
    HomeIcon,
    InboxArrowDownIcon,
    KeyIcon,
    PowerIcon,
    TicketIcon,
    UserCircleIcon,
    UserGroupIcon,
    UserIcon,
    WrenchScrewdriverIcon,
} from "@heroicons/react/24/outline";
import { Link, router, usePage } from "@inertiajs/react";
import SearchTicketSection from "@/app/pages/sections/search-ticket-section";
const { Header, Sider, Content } = Layout;
const AdministratorLayout = ({ children }) => {
    const [collapsed, setCollapsed] = useState(false);
    const {
        token: { colorBgContainer, borderRadiusLG },
    } = theme.useToken();
    const { component } = usePage();
    const path = component.split("/")[1];
    const dispatch = useDispatch();
    const { user } = useSelector((state) => state.app);

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
                router.visit("/administrator/dashboard");
            },
        },
        {
            key: "2",
            icon: <KeyIcon className="h-6" />,
            label: "Permissions",
            onClick: () => {
                router.visit("/administrator/permissions");
            },
        },
        {
            key: "3",
            icon: <UserIcon className="h-6" />,
            label: "Roles",
            onClick: () => {
                router.visit("/administrator/roles");
            },
        },
        {
            key: "4",
            icon: <UserGroupIcon className="h-6" />,
            label: "Users",
            onClick: () => {
                router.visit("/administrator/users");
            },
        },
        {
            key: "5",
            icon: <InboxArrowDownIcon className="h-6" />,
            label: "Email Template",
            onClick: () => {
                router.visit("/administrator/email_template");
            },
        },
        {
            key: "6",
            icon: <ExclamationTriangleIcon className="h-6" />,
            label: "Common-Issues",
            onClick: () => {
                router.visit("/administrator/common_issues");
            },
        },
        {
            key: "7",
            icon: <TicketIcon className="h-6" />,
            label: "Tickets",
            onClick: () => {
                router.visit("/administrator/tickets");
            },
        },
        {
            key: "8",
            icon: <WrenchScrewdriverIcon className="h-6" />,
            label: "ASC",
            onClick: () => {
                router.visit("/administrator/asc");
            },
        },
        {
            key: "9",
            icon: <UserCircleIcon className="h-6" />,
            label: "Productivity",
            onClick: () => {
                router.visit("/administrator/productivity");
            },
        },
    ];

    let active = "0";
    if (path == "dashboard") {
        active = "1";
    } else if (path == "permissions") {
        active = "2";
    } else if (path == "roles") {
        active = "3";
    } else if (path == "users") {
        active = "4";
    } else if (path == "email_template") {
        active = "5";
    } else if (path == "common_issues") {
        active = "6";
    } else if (path == "tickets") {
        active = "7";
    } else if (path == "asc") {
        active = "8";
    } else if (path == "productivity") {
        active = "9";
    }
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

                       <Link
                            method="post"
                            as="button"
                            href={route("logout")}
                            className="block transition-opacity duration-200 rounded-full text-blue-800 hover:text-blue-600"
                        >
                            <span className="sr-only">User menu</span>
                            {/* <img
                                className="w-10 h-10 rounded-full"
                                src="https://avatars.githubusercontent.com/u/57622665?s=460&u=8f581f4c4acd4c18c33a87b3e6476112325e8b38&v=4"
                                alt="Ahmed Kamel"
                            /> */}
                            <PowerIcon className="h-10" />
                        </Link>
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
};
export default AdministratorLayout;
