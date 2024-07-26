import React, { useEffect, useState } from "react";
import { get_user_service } from "@/app/services/user-service";
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "@/app/redux/app-slice";
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UploadOutlined,
  UserOutlined,
  DownOutlined,
} from "@ant-design/icons";
import { Button, Layout, Menu, theme, Dropdown, Space } from "antd";
import {
  HomeIcon,
  TicketIcon,
} from "@heroicons/react/24/outline";
import { Link, router, usePage } from "@inertiajs/react";
import SearchTicketSection from "@/app/pages/sections/search-ticket-section";
const { Header, Sider, Content } = Layout;
const WarehouseLayout = ({ children }) => {
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
        router.visit("/warehouse/dashboard");
      },
    },

    {
      key: "2",
      icon: <TicketIcon className="h-6" />,
      label: "Tickets",
      onClick: () => {
        router.visit("/warehouse/tickets");
      },
    },

  ];

  let active = "0";
  if (path == "dashboard") {
    active = "1";
  } else if (path == "tickets") {
    active = "2";
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
};
export default WarehouseLayout;
