import { delete_email_template_service, get_email_template_service } from "@/app/services/email-template-service";
import { emailTemplatesSlice, setEmailTemplates } from "./email-template-slice";


export function get_email_templates_thunk() {
  return async function (dispatch, getState) {
    const result = (await get_email_template_service()).data
    dispatch(setEmailTemplates(result)); 
  };
}

export function delete_email_templates_thunk(id) {
  return async function (dispatch, getState) {
    const result = await delete_email_template_service(id)
    dispatch(emailTemplatesSlice.actions.setEmailTemplates(result.data));
  };
}
