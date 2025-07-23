import React from "react";
import * as XLSX from "xlsx";
import { useSelector } from "react-redux";
import moment from "moment";

// Helper to auto-fit column widths
const autoFitColumns = (data) => {
    const cols = [];
    const keys = Object.keys(data[0] || {});
    keys.forEach((key, i) => {
        const maxLen = Math.max(
            key.length,
            ...data.map((row) => (row[key] ? row[key].toString().length : 0))
        );
        cols.push({ wch: maxLen + 2 }); // +2 for padding
    });
    return cols;
};

const ExportExcel = () => {
    const { users } = useSelector((state) => state.users);

    const data = users
        .map((res) =>
            res.agent_type === "Warranty" ||
            res.agent_type === "Parts" ||
            res.agent_type === "Admin"
                ? {
                      id: res.id,
                      agent: res.name,
                      position: res.agent_type,
                      overdue_cases: res.overdue_cases,
                      cases_due_today: res.cases_due_today,
                      overdue_direct_emails: res.overdue_direct_emails,
                      direct_emails_due_today: res.direct_emails_due_today,
                      handled_cases: res.handled_cases,
                      handled_direct_emails: res.handled_direct_emails,
                      upcoming_dues: res.upcoming_dues,
                      upcoming_dues_direct_emails: res.upcoming_dues_direct_emails,
                      handled_cases_notes: res.handled_cases_notes,
                      handled_direct_emails_notes: res.handled_direct_emails_notes,
                      total:
                          parseInt(res.handled_cases) +
                          parseInt(res.handled_direct_emails),
                  }
                : null
        )
        .filter((item) => item !== null);

    const exportToExcel = () => {
        const agentSummary = data.map((agent) => ({
            Agent: agent.agent,
            Position: agent.position,
            "Cases Due Today": agent.cases_due_today,
            "Direct Emails Due Today": agent.direct_emails_due_today,
            "Handled Cases": agent.handled_cases,
            "Handled Direct Emails": agent.handled_direct_emails,
            "Overdue Cases": agent.overdue_cases,
            "Overdue Direct Emails": agent.overdue_direct_emails,
            "Upcoming Dues": agent.upcoming_dues,
            "Upcoming Dues Direct Emails": agent.upcoming_dues_direct_emails,
            Total: agent.total,
        }));

        const caseNotes = [];
        const directEmailNotes = [];

        data.forEach((agent) => {
            if (Array.isArray(agent.handled_cases_notes)) {
                agent.handled_cases_notes.forEach((note) => {
                    caseNotes.push({
                        Agent: agent.agent,
                        Ticket_ID: note?.ticket?.ticket_id || "",
                        Email: note?.ticket?.email || "",
                        Case_Status: note.case_status || "",
                        Type: note.case_type || "",
                        Remarks: note.remarks || "",
                        Escalated: note.isEscalate || "",
                        Logged_From: note.log_from || "",
                        Created_At: moment(note.created_at).format("YYYY-MM-DD HH:mm"),
                        Updated_At: moment(note.updated_at).format("YYYY-MM-DD HH:mm"),
                    });
                });
            }

            if (Array.isArray(agent.handled_direct_emails_notes)) {
                agent.handled_direct_emails_notes.forEach((note) => {
                    directEmailNotes.push({
                        Agent: agent.agent,
                        Ticket_ID: note?.id || "",
                        Email: note?.ticket?.email || "",
                        Case_Status: note.case_status || "",
                        Type: note.case_type || "",
                        Remarks: note.remarks || "",
                        Escalated: note.isEscalate || "",
                        Logged_From: note.log_from || "",
                        Created_At: moment(note.created_at).format("YYYY-MM-DD HH:mm"),
                        Updated_At: moment(note.updated_at).format("YYYY-MM-DD HH:mm"),
                    });
                });
            }
        });

        // Create workbook and sheets
        const workbook = XLSX.utils.book_new();

        // Agent Summary Sheet
        const summarySheet = XLSX.utils.json_to_sheet(agentSummary);
        summarySheet["!cols"] = autoFitColumns(agentSummary);
        XLSX.utils.book_append_sheet(workbook, summarySheet, "Agent Summary");

        // Handled Case Notes Sheet
        const caseNotesSheet = XLSX.utils.json_to_sheet(caseNotes);
        caseNotesSheet["!cols"] = autoFitColumns(caseNotes);
        XLSX.utils.book_append_sheet(workbook, caseNotesSheet, "Handled Case Notes");

        // Handled Email Notes Sheet
        const emailNotesSheet = XLSX.utils.json_to_sheet(directEmailNotes);
        emailNotesSheet["!cols"] = autoFitColumns(directEmailNotes);
        XLSX.utils.book_append_sheet(workbook, emailNotesSheet, "Handled Email Notes");

        // Export file
        XLSX.writeFile(workbook, "agents_with_notes.xlsx");
    };

    return (
        <button
            onClick={exportToExcel}
            className="bg-blue-600 text-white p-1.5 rounded hover:bg-blue-700"
        >
            Export Cases
        </button>
    );
};

export default ExportExcel;
