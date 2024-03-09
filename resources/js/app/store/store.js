
import { configureStore } from '@reduxjs/toolkit';
import appSlice from '../redux/app-slice';
import ascsSlice from '../pages/ascs/redux/ascs-slice';
import brandsSlice from '../pages/brands/redux/brands-slice';
import bupSlice from '../pages/bup/redux/bup-slice';
import common_issuesSlice from '../pages/common_issues/redux/common_issues-slice';
import dashboardSlice from '../pages/dashboard/redux/dashboard-slice';
import email_templateSlice from '../pages/email_template/redux/email_template-slice';
import httSlice from '../pages/htt/redux/htt-slice';
import item_typesSlice from '../pages/item_types/redux/item_types-slice';
import permissionsSlice from '../pages/permissions/redux/permissions-slice';
import productsSlice from '../pages/products/redux/products-slice';
import rolesSlice from '../pages/roles/redux/roles-slice';
import ticketsSlice from '../pages/tickets/_redux/tickets-slice';
import usersSlice from '../pages/users/redux/users-slice';
import ticketFormSlice from '../pages/ticket_form/redux/ticket-form-slice';
import ticketsCreateSlice from '../pages/tickets/create/redux/tickets-create-slice';
const store = configureStore({
    reducer: {
        app: appSlice,
        ascs: ascsSlice,
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
