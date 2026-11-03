"use client";

import { useState } from "react";
import { track } from "@/lib/analytics";
import { enquiryBody, enquirySubject, serviceOptions, validateEnquiry, type Enquiry, type FieldErrors } from "@/lib/contact";

const labelCls = "eyebrow text-meta";
const lineInput =
  "rounded-none border-0 border-b border-[rgba(11,12,14,0.22)] bg-transparent py-3.5 text-[17px] text-ink outline-none transition-[border-color] duration-200 placeholder:text-faint focus:border-green aria-[invalid=true]:border-[#B42318]";

type Status = "idle" | "sending" | "sent" | "mailto" | "error";

function Field({ label, error, id, children }: { label: string; error?: string; id: string; children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-[9px]">
      <label htmlFor={id} className={labelCls}>
        {label}
      </label>
      {children}
      {error ? (
        <span id={`${id}-error`} className="text-sm text-[#B42318]">
          {error}
        </span>
      ) : null}
    </div>
  );
}

/**
 * Enquiry form. With a configured backend it posts to /api/contact;
 * otherwise (or if delivery fails) it composes the email in the visitor's
 * mail app, exactly like the reference.
 */
export function ContactForm({ email, hasBackend }: { email: string; hasBackend: boolean }) {
  const [values, setValues] = useState<Enquiry>({ name: "", email: "", phone: "", service: "", message: "" });
  const [errors, setErrors] = useState<FieldErrors>({});
  const [status, setStatus] = useState<Status>("idle");
  const [honeypot, setHoneypot] = useState("");

  const set = (key: keyof Enquiry) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setValues((v) => ({ ...v, [key]: e.target.value }));
    if (errors[key]) setErrors((er) => ({ ...er, [key]: undefined }));
  };

  const openMail = (data: Enquiry) => {
    setStatus("mailto");
    window.location.href = `mailto:${email}?subject=${encodeURIComponent(enquirySubject(data))}&body=${encodeURIComponent(enquiryBody(data))}`;
  };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const { data, errors: errs } = validateEnquiry(values);
    if (Object.keys(errs).length) {
      setErrors(errs);
      track("form_error", { form: "contact", fields: Object.keys(errs).join(",") });
      document.getElementById(`contact-${Object.keys(errs)[0]}`)?.focus();
      return;
    }
    track("generate_lead", { form: "contact", service: data.service, method: hasBackend ? "api" : "mailto" });

    if (!hasBackend) return openMail(data);

    setStatus("sending");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...data, company: honeypot }),
      });
      if (res.ok) {
        setStatus("sent");
        setValues({ name: "", email: "", phone: "", service: "", message: "" });
        return;
      }
      if (res.status === 422) {
        const json = await res.json().catch(() => ({}));
        setErrors(json.fields ?? {});
        setStatus("idle");
        return;
      }
      openMail(data);
    } catch {
      openMail(data);
    }
  };

  const aria = (key: keyof Enquiry) => ({
    id: `contact-${key}`,
    name: key,
    "aria-invalid": errors[key] ? true : undefined,
    "aria-describedby": errors[key] ? `contact-${key}-error` : undefined,
  });

  return (
    <form onSubmit={onSubmit} noValidate className="order-1 flex flex-col gap-[22px]" data-track-section="contact-form">
      <div className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,220px),1fr))] gap-[22px]">
        <Field label="YOUR NAME" id="contact-name" error={errors.name}>
          <input {...aria("name")} type="text" required autoComplete="name" placeholder="Full name" value={values.name} onChange={set("name")} className={lineInput} />
        </Field>
        <Field label="EMAIL" id="contact-email" error={errors.email}>
          <input {...aria("email")} type="email" required autoComplete="email" placeholder="you@company.com" value={values.email} onChange={set("email")} className={lineInput} />
        </Field>
      </div>
      <div className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,220px),1fr))] gap-[22px]">
        <Field label="PHONE" id="contact-phone" error={errors.phone}>
          <input {...aria("phone")} type="tel" required autoComplete="tel" placeholder="+91 00000 00000" value={values.phone} onChange={set("phone")} className={lineInput} />
        </Field>
        <Field label="SERVICE" id="contact-service" error={errors.service}>
          <select {...aria("service")} required value={values.service} onChange={set("service")} className={`${lineInput} appearance-none`}>
            <option value="">Select a service</option>
            {serviceOptions.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>
        </Field>
      </div>
      <Field label="TELL US ABOUT IT" id="contact-message" error={errors.message}>
        <textarea
          {...aria("message")}
          required
          rows={7}
          placeholder="What are you launching, who is it for, and what does success look like?"
          value={values.message}
          onChange={set("message")}
          className="min-h-40 resize-y rounded-[14px] border border-[rgba(11,12,14,0.22)] bg-white p-4 text-[17px] leading-[1.6] text-ink outline-none transition-[border-color] duration-200 placeholder:text-faint focus:border-green aria-[invalid=true]:border-[#B42318]"
        />
      </Field>

      {/* Honeypot (hidden from people and assistive tech). */}
      <div aria-hidden className="absolute -left-[9999px] h-px w-px overflow-hidden">
        <label>
          Company
          <input tabIndex={-1} autoComplete="off" value={honeypot} onChange={(e) => setHoneypot(e.target.value)} />
        </label>
      </div>

      <div className="flex flex-wrap items-center gap-[18px]">
        <button
          type="submit"
          disabled={status === "sending"}
          className="cursor-pointer rounded-full border-0 bg-ink px-8 py-[15px] text-[15px] font-semibold text-paper transition-[background] duration-200 hover:bg-green disabled:cursor-wait disabled:opacity-70"
        >
          {status === "sending" ? "Sending…" : "Submit enquiry"}
        </button>
        <span role="status" aria-live="polite" className="text-[15px] font-medium text-green">
          {status === "mailto" && "Opening your mail app with the details filled in."}
          {status === "sent" && "Thanks — your enquiry is in. We'll be in touch shortly."}
        </span>
      </div>
      <p className="m-0 max-w-[520px] text-sm leading-[1.6] text-meta">
        {hasBackend
          ? `Your enquiry goes straight to ${email}. We reply within one working day.`
          : `Submitting composes the message in your own mail app and sends it to ${email} — nothing leaves your device until you hit send.`}
      </p>
    </form>
  );
}
