import { get_email_template_service } from "@/app/services/email-template-service";
import { setEmailTemplates } from "./email-template-slice";


export function get_email_templates_thunk() {
  return async function (dispatch, getState) {
    const result = (await get_email_template_service()).data
    dispatch(setEmailTemplates(result)); 
  };
}
