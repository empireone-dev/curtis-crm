
import { configureStore } from '@reduxjs/toolkit';
import appSlice from '../redux/app-slice';
import ascsSlice from '../pages/admin/asc/redux/asc-slice';
import brandsSlice from '../pages/admin/brands/redux/brands-slice';
import bupSlice from '../pages/admin/bup/redux/bup-slice';
import common_issuesSlice from '../pages/admin/common_issues/redux/common-issues-slice';
import dashboardSlice from '../pages/admin/dashboard/redux/dashboard-slice';
import email_templateSlice from '../pages/admin/email_template/redux/email_template-slice';
import httSlice from '../pages/admin/htt/redux/htt-slice';
import item_typesSlice from '../pages/admin/item_types/redux/item-types-slice';
import permissionsSlice from '../pages/admin/permissions/redux/permissions-slice';
import productsSlice from '../pages/admin/products/redux/products-slice';
import rolesSlice from '../pages/admin/roles/redux/roles-slice';
import ticketsSlice from '../pages/admin/tickets/_redux/tickets-slice';
import usersSlice from '../pages/admin/users/redux/users-slice';
import ticketFormSlice from '../pages/admin/ticket_form/redux/ticket-form-slice';
import ticketsCreateSlice from '../pages/admin/tickets/create/redux/tickets-create-slice';
const store = configureStore({
    reducer: {
        app: appSlice,
        asc: ascsSlice,
        brands: brandsSlice,
        bup: bupSlice,
        common_issues: common_issuesSlice,
        dashboard: dashboardSlice,
        email_template: email_templateSlice,
        htt: httSlice,
        item_types: item_typesSlice,
        permissions: permissionsSlice,
        products: productsSlice,
        roles: rolesSlice,
        tickets: ticketsSlice,
        users: usersSlice,
        ticket_form:ticketFormSlice,
        tickets_create:ticketsCreateSlice
    },
});

export const RootState = store.getState;
export const AppDispatch = store.dispatch;

export default store;
