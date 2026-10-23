"use client";

import { useState, useRef } from "react";

type FormData = {
  ownerType: string;
  name: string;
  email: string;
  phone: string;
  locality: string;
  pincode: string;
  city: string;
  state: string;
  plotArea: string;
  plotAreaUnit: string;
  propertyType: string;
  expectedRent: string;
  gmapsLink: string;
  fileName: string;
};

const INITIAL: FormData = {
  ownerType: "",
  name: "",
  email: "",
  phone: "",
  locality: "",
  pincode: "",
  city: "",
  state: "",
  plotArea: "",
  plotAreaUnit: "sq yards",
  propertyType: "",
  expectedRent: "",
  gmapsLink: "",
  fileName: "",
};

export default function ListLandForm() {
  const [form, setForm] = useState<FormData>(INITIAL);
  const [errors, setErrors] = useState<Partial<Record<keyof FormData, string>>>({});
  const [submitted, setSubmitted] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);

  const set = (key: keyof FormData) => (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setForm((f) => ({ ...f, [key]: e.target.value }));
    setErrors((er) => ({ ...er, [key]: "" }));
  };

  function validate(): boolean {
    const req: (keyof FormData)[] = [
      "ownerType", "name", "email", "phone",
      "locality", "pincode", "city", "state",
      "plotArea", "propertyType", "expectedRent",
    ];
    const next: Partial<Record<keyof FormData, string>> = {};
    req.forEach((k) => {
      if (!form[k].trim()) next[k] = "Required";
    });
    if (form.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))
      next.email = "Invalid email";
    if (form.phone && !/^\+?[\d\s\-]{7,15}$/.test(form.phone))
      next.phone = "Invalid phone";
    setErrors(next);
    return Object.keys(next).length === 0;
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (validate()) setSubmitted(true);
  }

  if (submitted) {
    return (
      <div className="flex flex-col items-center justify-center text-center py-16 gap-6">
        <div
          className="w-16 h-16 rounded-full flex items-center justify-center"
          style={{ background: "rgba(0,255,135,0.12)", border: "1px solid rgba(0,255,135,0.3)" }}
        >
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#00ff87" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M20 6 9 17l-5-5" />
          </svg>
        </div>
        <div>
          <h3 className="text-xl font-bold text-white mb-2">Listing received!</h3>
          <p className="text-white/50 text-sm max-w-xs">
            Our team will verify your plot and have it live within 24 hours. We&apos;ll reach you at{" "}
            <span className="text-white">{form.email}</span>.
          </p>
        </div>
        <button
          onClick={() => { setForm(INITIAL); setSubmitted(false); }}
          className="mt-2 text-sm text-white/40 hover:text-white transition-colors underline underline-offset-4"
        >
          Submit another listing
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-4">
      {/* Row 1 */}
      <div className="grid grid-cols-2 gap-4">
        <Field label="You are a" error={errors.ownerType} required>
          <Select
            value={form.ownerType}
            onChange={set("ownerType")}
            error={!!errors.ownerType}
            options={["Landowner", "Developer", "Broker / Agent", "Other"]}
            placeholder="Owner type"
          />
        </Field>
        <Field label="Full name" error={errors.name} required>
          <Input value={form.name} onChange={set("name")} placeholder="Your name" error={!!errors.name} />
        </Field>
      </div>

      {/* Row 2 */}
      <div className="grid grid-cols-2 gap-4">
        <Field label="Email" error={errors.email} required>
          <Input value={form.email} onChange={set("email")} placeholder="you@email.com" type="email" error={!!errors.email} />
        </Field>
        <Field label="Phone" error={errors.phone} required>
          <Input value={form.phone} onChange={set("phone")} placeholder="+91 98765 43210" type="tel" error={!!errors.phone} />
        </Field>
      </div>

      {/* Row 3 */}
      <div className="grid grid-cols-2 gap-4">
        <Field label="Locality" error={errors.locality} required>
          <Input value={form.locality} onChange={set("locality")} placeholder="e.g. Madhapur" error={!!errors.locality} />
        </Field>
        <Field label="Pincode" error={errors.pincode} required>
          <Input value={form.pincode} onChange={set("pincode")} placeholder="500081" error={!!errors.pincode} />
        </Field>
      </div>

      {/* Row 4 */}
      <div className="grid grid-cols-2 gap-4">
        <Field label="City" error={errors.city} required>
          <Input value={form.city} onChange={set("city")} placeholder="Hyderabad" error={!!errors.city} />
        </Field>
        <Field label="State" error={errors.state} required>
          <Input value={form.state} onChange={set("state")} placeholder="Telangana" error={!!errors.state} />
        </Field>
      </div>

      {/* Row 5 */}
      <div className="grid grid-cols-2 gap-4">
        {/* Plot area with unit toggle */}
        <Field label="Plot area" error={errors.plotArea} required>
          <div className="flex gap-2">
            <Input
              value={form.plotArea}
              onChange={set("plotArea")}
              placeholder="e.g. 200"
              error={!!errors.plotArea}
              className="flex-1 min-w-0"
            />
            <select
              value={form.plotAreaUnit}
              onChange={set("plotAreaUnit")}
              className="h-11 px-2 rounded-xl text-sm text-white/70 border border-white/10 bg-white/5 focus:outline-none focus:border-[#00ff87]/50 cursor-pointer"
              style={{ minWidth: "96px" }}
            >
              <option value="sq yards">sq yds</option>
              <option value="sq ft">sq ft</option>
              <option value="acres">acres</option>
            </select>
          </div>
        </Field>
        <Field label="Property type" error={errors.propertyType} required>
          <Select
            value={form.propertyType}
            onChange={set("propertyType")}
            error={!!errors.propertyType}
            options={["Open Plot", "Warehouse / Shed", "Ground Floor Space", "Mixed-use Building", "Other"]}
            placeholder="Select type"
          />
        </Field>
      </div>

      {/* Row 6 */}
      <div className="grid grid-cols-2 gap-4">
        <Field label="Expected rent / month" error={errors.expectedRent} required>
          <div className="relative">
            <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-white/30 text-sm select-none">₹</span>
            <Input
              value={form.expectedRent}
              onChange={set("expectedRent")}
              placeholder="1,50,000"
              error={!!errors.expectedRent}
              className="pl-7"
            />
          </div>
        </Field>
        <Field label="Google Maps link" error={errors.gmapsLink}>
          <Input value={form.gmapsLink} onChange={set("gmapsLink")} placeholder="maps.app.goo.gl/…" error={!!errors.gmapsLink} />
        </Field>
      </div>

      {/* File upload */}
      <Field label="Property photos / documents">
        <button
          type="button"
          onClick={() => fileRef.current?.click()}
          className="w-full h-11 px-4 rounded-xl border border-dashed border-white/15 bg-white/[0.03] text-sm text-white/40 hover:border-[#00ff87]/40 hover:text-white/60 transition-all flex items-center gap-2"
        >
          <UploadIcon />
          {form.fileName || "Choose files to upload"}
        </button>
        <input
          ref={fileRef}
          type="file"
          accept="image/*,.pdf"
          multiple
          className="hidden"
          onChange={(e) => {
            const files = e.target.files;
            if (files && files.length > 0) {
              const names = Array.from(files).map((f) => f.name).join(", ");
              setForm((f) => ({ ...f, fileName: names }));
            }
          }}
        />
        <p className="mt-1 text-xs text-white/25">JPG, PNG, PDF — up to 10 MB each</p>
      </Field>

      {/* Submit */}
      <button
        type="submit"
        className="mt-2 w-full h-12 rounded-xl text-sm font-semibold text-[#0a0a0a] transition-opacity hover:opacity-90 active:opacity-80"
        style={{ background: "linear-gradient(135deg, #00ff87, #60efff)" }}
      >
        Submit listing →
      </button>

      <p className="text-center text-xs text-white/25">
        By submitting you agree to our listing terms. Free, no broker fees.
      </p>
    </form>
  );
}

// ── Sub-components ──

function Field({
  label,
  error,
  required,
  children,
}: {
  label: string;
  error?: string;
  required?: boolean;
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-xs font-medium text-white/40 tracking-wide">
        {label}
        {required && <span className="text-[#00ff87] ml-0.5">*</span>}
      </label>
      {children}
      {error && <span className="text-xs text-red-400">{error}</span>}
    </div>
  );
}

function Input({
  error,
  className = "",
  ...props
}: React.InputHTMLAttributes<HTMLInputElement> & { error?: boolean }) {
  return (
    <input
      {...props}
      className={`w-full h-11 px-3.5 rounded-xl text-sm text-white placeholder-white/25 border transition-colors focus:outline-none ${
        error
          ? "border-red-500/50 bg-red-500/5 focus:border-red-400"
          : "border-white/10 bg-white/5 focus:border-[#00ff87]/50 focus:bg-white/[0.07]"
      } ${className}`}
    />
  );
}

function Select({
  options,
  placeholder,
  error,
  ...props
}: React.SelectHTMLAttributes<HTMLSelectElement> & {
  options: string[];
  placeholder: string;
  error?: boolean;
}) {
  return (
    <select
      {...props}
      className={`w-full h-11 px-3.5 rounded-xl text-sm text-white border transition-colors focus:outline-none appearance-none cursor-pointer ${
        error
          ? "border-red-500/50 bg-red-500/5 focus:border-red-400"
          : "border-white/10 bg-white/5 focus:border-[#00ff87]/50"
      }`}
      style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='rgba(255,255,255,0.3)' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='m6 9 6 6 6-6'/%3E%3C/svg%3E")`,
        backgroundRepeat: "no-repeat",
        backgroundPosition: "right 12px center",
        paddingRight: "36px",
      }}
    >
      <option value="" disabled style={{ background: "#1a1a1a" }}>{placeholder}</option>
      {options.map((o) => (
        <option key={o} value={o} style={{ background: "#1a1a1a" }}>{o}</option>
      ))}
    </select>
  );
}

function UploadIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
      <polyline points="17 8 12 3 7 8" />
      <line x1="12" y1="3" x2="12" y2="15" />
    </svg>
  );
}
