export const conversionEvents = {
  whatsappClick: "whatsapp_click",
  phoneClick: "phone_click",
  emailClick: "email_click",
  consultationPageClick: "consultation_page_click",
  leadFormSubmit: "lead_form_submit",
} as const;

export type ConversionEvent = (typeof conversionEvents)[keyof typeof conversionEvents];
