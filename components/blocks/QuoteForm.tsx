"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useEffect, useMemo, useRef, useState } from "react";
import { ArrowLeft, Building2, Check, House, Phone } from "lucide-react";
import { site } from "@/content/site";
import { quoteFormGroups, getService } from "@/content/services";
import {
  HEARD_ABOUT_OPTIONS,
  fieldErrors,
  quoteSchema,
  type QuoteInput,
} from "@/lib/quote-schema";
import { trackEvent } from "@/lib/analytics";
import { Button, ButtonLink } from "@/components/ui/Button";
import { CheckboxField } from "@/components/ui/CheckboxField";
import { Field, Select, TextArea, TextInput } from "@/components/ui/Field";

/* --------------------------------------------------------------------------
   The most important flow on the site. One question per screen, progress
   dots at the top, a back button on every step after the first, and state
   kept in React so browser-back within the form never wipes an answer.
   -------------------------------------------------------------------------- */

const STEPS = [
  "What do you need?",
  "Home or business?",
  "Where?",
  "Your details",
  "Confirmation",
] as const;

type FormState = {
  services: string[];
  propertyType: "home" | "business" | "";
  street: string;
  town: string;
  zip: string;
  name: string;
  phone: string;
  email: string;
  message: string;
  heardAbout: string;
  website: string;
};

const EMPTY: FormState = {
  services: [],
  propertyType: "",
  street: "",
  town: "",
  zip: "",
  name: "",
  phone: "",
  email: "",
  message: "",
  heardAbout: "",
  website: "",
};

export function QuoteForm() {
  const params = useSearchParams();
  const [step, setStep] = useState(0);
  const [form, setForm] = useState<FormState>(EMPTY);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const groups = useMemo(
    () =>
      quoteFormGroups().map((group) => ({
        ...group,
        services: group.services.filter((s) => !s.externalUrl),
      })),
    [],
  );

  /* Arriving from a service page pre-checks that service, and arriving from
     the commercial block pre-selects "business". */
  useEffect(() => {
    const service = params.get("service");
    const type = params.get("type");
    setForm((prev) => ({
      ...prev,
      services: service && getService(service) ? [service] : prev.services,
      propertyType:
        type === "business" || type === "home" ? type : prev.propertyType,
    }));
  }, [params]);

  /* Move focus to the new question so screen readers and keyboards follow. */
  useEffect(() => {
    if (step > 0) headingRef.current?.focus();
  }, [step]);

  const update = <K extends keyof FormState>(key: K, value: FormState[K]) => {
    setForm((prev) => ({ ...prev, [key]: value }));
    setErrors((prev) => {
      if (!prev[key]) return prev;
      const next = { ...prev };
      delete next[key as string];
      return next;
    });
  };

  const validateStep = (index: number): boolean => {
    const result = quoteSchema.safeParse(form);
    if (result.success) return true;

    const all = fieldErrors(result.error);
    const stepFields: Record<number, (keyof FormState)[]> = {
      0: ["services"],
      1: ["propertyType"],
      2: ["street", "town", "zip"],
      3: ["name", "phone", "email"],
    };
    const relevant = (stepFields[index] ?? []).reduce<Record<string, string>>(
      (acc, key) => {
        if (all[key]) acc[key] = all[key];
        return acc;
      },
      {},
    );

    setErrors(relevant);
    return Object.keys(relevant).length === 0;
  };

  const next = () => {
    if (validateStep(step)) setStep((s) => s + 1);
  };

  const submit = async () => {
    if (!validateStep(3)) return;
    const result = quoteSchema.safeParse(form);
    if (!result.success) {
      setErrors(fieldErrors(result.error));
      return;
    }

    setSubmitting(true);
    setSubmitError(null);
    try {
      const response = await fetch("/api/quote", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(result.data satisfies QuoteInput),
      });

      if (!response.ok) {
        const body = (await response.json().catch(() => ({}))) as {
          error?: string;
          errors?: Record<string, string>;
        };
        if (body.errors) setErrors(body.errors);
        setSubmitError(
          body.error ??
            `Something went wrong sending that. Call us on ${site.phone.display} and we will take the details directly.`,
        );
        setSubmitting(false);
        return;
      }

      /* Only after the server has accepted it — a lead we failed to send is
         not a lead. `source_service` is the service page that sent the
         visitor here, which is what ties a booking back to the page that
         earned it. */
      trackEvent("quote_submitted", {
        services: result.data.services.join(","),
        property_type: result.data.propertyType,
        source_service: params.get("service") ?? "none",
      });

      setStep(4);
    } catch {
      setSubmitError(
        `We could not reach the server. Check your connection, or call us on ${site.phone.display}.`,
      );
    } finally {
      setSubmitting(false);
    }
  };

  const selectedNames = form.services
    .map((slug) => getService(slug)?.name)
    .filter(Boolean) as string[];

  return (
    <div className="mx-auto w-full max-w-[680px]">
      <ProgressDots step={step} />

      <form
        onSubmit={(e) => {
          e.preventDefault();
          if (step === 3) void submit();
          else if (step < 3) next();
        }}
        noValidate
      >
        {/* Spam trap — visually hidden, never focusable, must stay empty. */}
        <div aria-hidden="true" className="absolute h-0 w-0 overflow-hidden">
          <label htmlFor="website">Leave this field empty</label>
          <input
            id="website"
            name="website"
            type="text"
            tabIndex={-1}
            autoComplete="off"
            value={form.website}
            onChange={(e) => update("website", e.target.value)}
          />
        </div>

        <h1
          ref={headingRef}
          tabIndex={-1}
          className="text-[26px] leading-[1.15] outline-none md:text-[34px]"
        >
          {step === 4 ? "Thanks!" : STEPS[step]}
        </h1>

        {/* ------------------------------------------------------- step 1 */}
        {step === 0 ? (
          <div className="mt-6">
            <p className="max-w-[68ch] text-[17px] text-muted">
              Select everything you need!
            </p>
            {errors.services ? (
              <p role="alert" className="mt-4 text-[15px] text-cross-blue">
                {errors.services}
              </p>
            ) : null}

            <fieldset className="mt-6">
              <legend className="sr-only">Which services do you need?</legend>
              <div className="flex flex-col gap-8">
                {groups.map((group) => (
                  <div key={group.id}>
                    <p className="font-display mb-3 text-[19px] font-semibold text-cross-blue">
                      {group.name}
                    </p>
                    <div className="flex flex-col gap-2">
                      {group.services.map((service) => (
                        <CheckboxField
                          key={service.slug}
                          id={`service-${service.slug}`}
                          name="services"
                          label={service.name}
                          description={service.quoteDescription ?? service.tagline}
                          checked={form.services.includes(service.slug)}
                          onChange={(checked) =>
                            update(
                              "services",
                              checked
                                ? [...form.services, service.slug]
                                : form.services.filter((s) => s !== service.slug),
                            )
                          }
                        />
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </fieldset>
          </div>
        ) : null}

        {/* ------------------------------------------------------- step 2 */}
        {step === 1 ? (
          <div className="mt-6">
            {errors.propertyType ? (
              <p role="alert" className="mt-4 text-[15px] text-cross-blue">
                {errors.propertyType}
              </p>
            ) : null}

            <fieldset className="mt-6">
              <legend className="sr-only">Is this for a home or a business?</legend>
              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                <BigChoice
                  id="type-home"
                  name="propertyType"
                  label="A home"
                  description="A house, condo or second property."
                  Icon={House}
                  checked={form.propertyType === "home"}
                  onSelect={() => update("propertyType", "home")}
                />
                <BigChoice
                  id="type-business"
                  name="propertyType"
                  label="A business"
                  description="An office, retail unit or managed building."
                  Icon={Building2}
                  checked={form.propertyType === "business"}
                  onSelect={() => update("propertyType", "business")}
                />
              </div>
            </fieldset>
          </div>
        ) : null}

        {/* ------------------------------------------------------- step 3 */}
        {step === 2 ? (
          <div className="mt-6 flex flex-col gap-6">
            <Field id="street" label="Street address" error={errors.street} required>
              <TextInput
                id="street"
                name="street"
                value={form.street}
                onChange={(v) => update("street", v)}
                autoComplete="street-address"
                placeholder="19 Tech Circle"
                error={errors.street}
                required
              />
            </Field>

            <Field id="town" label="Town" error={errors.town} required>
              <TextInput
                id="town"
                name="town"
                value={form.town}
                onChange={(v) => update("town", v)}
                autoComplete="address-level2"
                placeholder="Natick"
                error={errors.town}
                required
              />
            </Field>

            <Field id="zip" label="Zip code" error={errors.zip} required>
              <TextInput
                id="zip"
                name="zip"
                value={form.zip}
                onChange={(v) => update("zip", v.replace(/\D/g, "").slice(0, 5))}
                inputMode="numeric"
                autoComplete="postal-code"
                maxLength={5}
                placeholder="01760"
                error={errors.zip}
                required
              />
            </Field>
          </div>
        ) : null}

        {/* ------------------------------------------------------- step 4 */}
        {step === 3 ? (
          <div className="mt-6 flex flex-col gap-6">

            <Field id="name" label="Your name" error={errors.name} required>
              <TextInput
                id="name"
                name="name"
                value={form.name}
                onChange={(v) => update("name", v)}
                autoComplete="name"
                error={errors.name}
                required
              />
            </Field>

            <Field id="phone" label="Phone" error={errors.phone} required>
              <TextInput
                id="phone"
                name="phone"
                type="tel"
                value={form.phone}
                onChange={(v) => update("phone", v)}
                inputMode="tel"
                autoComplete="tel"
                placeholder="508-555-0100"
                error={errors.phone}
                required
              />
            </Field>

            <Field id="email" label="Email" error={errors.email} required>
              <TextInput
                id="email"
                name="email"
                type="email"
                value={form.email}
                onChange={(v) => update("email", v)}
                inputMode="email"
                autoComplete="email"
                placeholder="you@example.com"
                error={errors.email}
                required
              />
            </Field>

            <Field
              id="message"
              label="Anything else we should know?"
              error={errors.message}
            >
              <TextArea
                id="message"
                name="message"
                value={form.message}
                onChange={(v) => update("message", v)}
                error={errors.message}
              />
            </Field>

            <Field id="heardAbout" label="How did you hear about us?" error={errors.heardAbout}>
              <Select
                id="heardAbout"
                name="heardAbout"
                value={form.heardAbout}
                onChange={(v) => update("heardAbout", v)}
                options={HEARD_ABOUT_OPTIONS}
                error={errors.heardAbout}
              />
            </Field>

            {submitError ? (
              <p role="alert" className="text-[16px] text-cross-blue">
                {submitError}
              </p>
            ) : null}
          </div>
        ) : null}

        {/* ------------------------------------------------------- step 5 */}
        {step === 4 ? (
          <Confirmation
            services={selectedNames}
            name={form.name}
            email={form.email}
            propertyType={form.propertyType}
            address={`${form.street}, ${form.town}, MA ${form.zip}`}
          />
        ) : null}

        {/* --------------------------------------------------- navigation */}
        {step < 4 ? (
          <div className="mt-10 flex flex-col-reverse gap-3 sm:flex-row sm:items-center">
            {step > 0 ? (
              <Button
                variant="secondary"
                onClick={() => setStep((s) => s - 1)}
                className="sm:w-auto"
              >
                <ArrowLeft aria-hidden="true" className="size-4.5" />
                Back
              </Button>
            ) : null}

            {step < 3 ? (
              <Button type="submit" size="lg" className="sm:flex-1">
                Continue
              </Button>
            ) : (
              <Button type="submit" size="lg" disabled={submitting} className="sm:flex-1">
                {submitting ? "Sending…" : "Send my request"}
              </Button>
            )}
          </div>
        ) : null}
      </form>

      {step < 4 ? (
        <p className="mt-8 border-t border-line pt-6 text-[15px] text-muted">
          Would rather just talk to someone?{" "}
          <a
            href={site.phone.href}
            className="font-medium text-cross-blue underline underline-offset-4"
          >
            Call {site.phone.display}
          </a>
          .
        </p>
      ) : null}
    </div>
  );
}

/* -------------------------------------------------------------------------- */

function ProgressDots({ step }: { step: number }) {
  return (
    <div className="mb-8">
      <p className="font-display mb-3 text-[17px] font-semibold text-cross-navy">
        Step {Math.min(step + 1, STEPS.length)} of {STEPS.length}
      </p>
      <ol className="flex gap-1.5" aria-hidden="true">
        {STEPS.map((label, i) => (
          <li
            key={label}
            className={`h-1 flex-1 rounded-[2px] transition-colors duration-200 ${
              i <= step ? "bg-cross-blue" : "bg-line"
            }`}
          />
        ))}
      </ol>
    </div>
  );
}

function BigChoice({
  id,
  name,
  label,
  description,
  Icon,
  checked,
  onSelect,
}: {
  id: string;
  name: string;
  label: string;
  description: string;
  Icon: typeof House;
  checked: boolean;
  onSelect: () => void;
}) {
  return (
    <label
      htmlFor={id}
      className={`flex min-h-[120px] cursor-pointer flex-col gap-2 rounded-[3px] border p-6 transition-colors has-[:focus-visible]:outline has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-offset-2 has-[:focus-visible]:outline-cross-blue ${
        checked
          ? "border-cross-blue bg-cross-blue/6"
          : "border-line bg-surface hover:border-cross-blue/40"
      }`}
    >
      <input
        id={id}
        name={name}
        type="radio"
        checked={checked}
        onChange={onSelect}
        className="sr-only"
      />
      <span className="flex items-center justify-between">
        <Icon
          aria-hidden="true"
          className={`size-7 ${checked ? "text-cross-blue" : "text-muted"}`}
          strokeWidth={1.5}
        />
        {checked ? (
          <Check aria-hidden="true" className="size-5 text-cross-blue" />
        ) : null}
      </span>
      <span className="text-[19px] font-medium">{label}</span>
      <span className="text-[15px] text-muted">{description}</span>
    </label>
  );
}

function Confirmation({
  services,
  name,
  email,
  propertyType,
  address,
}: {
  services: string[];
  name: string;
  email: string;
  propertyType: string;
  address: string;
}) {
  return (
    <div className="mt-6">
      <div
        role="status"
        className="rounded-[3px] border border-cross-blue/25 bg-cross-blue/6 p-6 md:p-8"
      >
        <p className="text-[17px]">
          Thanks {name.split(" ")[0]}. Your request is with our office, and a
          confirmation is on its way to {email}.
        </p>
        <p className="mt-4 text-[17px]">
          Someone from the Cross team will be in touch to confirm the details and get
          you a quote.
        </p>
        <div className="mt-6">
          <ButtonLink href={site.phone.href}>
            <Phone aria-hidden="true" className="size-4.5" />
            {site.phone.display}
          </ButtonLink>
        </div>
      </div>

      <div className="mt-8 rounded-[3px] border border-line bg-surface p-6 md:p-8">
        <p className="font-display mb-5 text-[19px] font-semibold text-cross-navy">
          What you sent us
        </p>
        <dl className="flex flex-col gap-4 text-[16px]">
          <div>
            <dt className="font-semibold text-muted">Services</dt>
            <dd className="mt-1">
              <ul className="flex flex-col gap-1.5">
                {services.map((s) => (
                  <li key={s} className="flex items-center gap-2">
                    <Check aria-hidden="true" className="size-4 shrink-0 text-cross-blue" />
                    {s}
                  </li>
                ))}
              </ul>
            </dd>
          </div>
          <div>
            <dt className="font-semibold text-muted">Property</dt>
            <dd className="mt-1">{propertyType === "business" ? "A business" : "A home"}</dd>
          </div>
          <div>
            <dt className="font-semibold text-muted">Address</dt>
            <dd className="mt-1">{address}</dd>
          </div>
        </dl>
      </div>

      <p className="mt-8 text-[16px]">
        <Link
          href="/"
          className="font-medium text-cross-blue underline-offset-4 hover:underline"
        >
          ← Back to the homepage
        </Link>
      </p>
    </div>
  );
}
