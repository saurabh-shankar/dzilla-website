export const serviceOptions = [
  "Campaigns",
  "Social",
  "Studio / Films",
  "CGI + AI",
  "Brand IP",
  "Political PR",
  "Not sure yet",
] as const;

export type Enquiry = {
  name: string;
  email: string;
  phone: string;
  service: string;
  message: string;
};

export type FieldErrors = Partial<Record<keyof Enquiry, string>>;

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PHONE_RE = /^[+()\-\s\d]{7,20}$/;

/** Shared by the client form and the API route. */
export function validateEnquiry(input: Partial<Record<keyof Enquiry, unknown>>): {
  data: Enquiry;
  errors: FieldErrors;
} {
  const str = (v: unknown, max: number) => (typeof v === "string" ? v.trim().slice(0, max) : "");
  const data: Enquiry = {
    name: str(input.name, 120),
    email: str(input.email, 200),
    phone: str(input.phone, 30),
    service: str(input.service, 40),
    message: str(input.message, 5000),
  };
  const errors: FieldErrors = {};
  if (!data.name) errors.name = "Please tell us your name.";
  if (!EMAIL_RE.test(data.email)) errors.email = "Please enter a valid email.";
  if (!PHONE_RE.test(data.phone)) errors.phone = "Please enter a valid phone number.";
  if (!serviceOptions.includes(data.service as (typeof serviceOptions)[number])) errors.service = "Please pick a service.";
  if (data.message.length < 10) errors.message = "A line or two about the project, please.";
  return { data, errors };
}

export function enquirySubject(e: Enquiry) {
  return `New enquiry — ${e.service || "General"} — ${e.name}`;
}

export function enquiryBody(e: Enquiry) {
  return [`Name: ${e.name}`, `Email: ${e.email}`, `Phone: ${e.phone}`, `Service: ${e.service}`, "", "Brief:", e.message].join("\n");
}
