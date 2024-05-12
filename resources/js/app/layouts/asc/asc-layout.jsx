import React, { useEffect } from "react";
import ASCLayoutSubSidebarSection from "./sections/asc-layout-sub-sidebar-section";
import ASCLayoutSidebarSection from "./sections/asc-layout-sidebar-section";
import { useDispatch, useSelector } from "react-redux";
import { get_user_service } from "@/app/services/user-service";
import { setUser } from "@/app/redux/app-slice";

export default function ASCLayout({account,children}) {
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

    return (
        <div>
            <div className="flex gap-3">
                <div className="flex-none">
                    <div className="flex sticky top-0 ">
                        <ASCLayoutSubSidebarSection />
                        <ASCLayoutSidebarSection account={account} />
                    </div>
                </div>
                <div className="flex-1">{children}</div>
            </div>
        </div>
    );
}
