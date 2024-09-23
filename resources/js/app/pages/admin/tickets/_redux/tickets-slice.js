import { createSlice } from "@reduxjs/toolkit";

export const ticketsSlice = createSlice({
    name: "tickets",
    initialState: {
        tickets: [],
        ticket: {},
        page: 1,
        search: {
            id: null,
            page: 1,
        },
        activities: [],
        notes: [],
        selectedTemplate: {},
        refund: {},
        replacement: {},
        repair: {},
        internals: [],
        asc: [],
        selectedRowKeys: [],
    },
    reducers: {
        setTickets: (state, action) => {
            state.tickets = action.payload;
        },
        setPage: (state, action) => {
            state.page = action.payload;
        },
        setSearch: (state, action) => {
            state.search = action.payload;
        },
        setTicket: (state, action) => {
            state.ticket = action.payload;
        },
        setActivities: (state, action) => {
            state.activities = action.payload;
        },
        setNotes: (state, action) => {
            state.notes = action.payload;
        },
        setSelectedTemplate: (state, action) => {
            state.selectedTemplate = action.payload;
        },
        setRefund: (state, action) => {
            state.refund = action.payload;
        },
        setRepair: (state, action) => {
            state.repair = action.payload;
        },
        setReplacement: (state, action) => {
            state.replacement = action.payload;
        },
        setInternals: (state, action) => {
            state.internals = action.payload;
        },
        setAsc: (state, action) => {
            state.asc = action.payload;
        },
        setSelectedRowKeys: (state, action) => {
            state.selectedRowKeys = action.payload;
        },
    },
});
export const {
    setTickets,
    setPage,
    setSearch,
    setTicket,
    setActivities,
    setNotes,
    setSelectedTemplate,
    setRefund,
    setRepair,
    setReplacement,
    setInternals,
    setAsc,
    setSelectedRowKeys,
} = ticketsSlice.actions;

export default ticketsSlice.reducer;
