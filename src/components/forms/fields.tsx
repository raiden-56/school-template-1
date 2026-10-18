import { AlertCircle, Info } from 'lucide-react'
import type { InputHTMLAttributes, ReactNode, SelectHTMLAttributes, TextareaHTMLAttributes } from 'react'
import type { FieldError, UseFormRegisterReturn } from 'react-hook-form'
import { school } from '@/config/school'

interface Base { id: string; label: string; error?: FieldError; hint?: string; required?: boolean; reg: UseFormRegisterReturn; className?: string }

function Shell({ id, label, error, hint, required, children, className }: Omit<Base, 'reg'> & { children: ReactNode }) {
  return (
    <div className={className}>
      <label htmlFor={id} className="mb-2 block font-display text-sm font-semibold">
        {label} {required ? <span className="text-[#b42318]" aria-hidden="true">*</span> : <span className="font-sans text-xs font-normal text-muted-strong">(optional)</span>}
      </label>
      {children}
      {hint && !error && <p id={`${id}-hint`} className="mt-1.5 text-xs text-muted-strong">{hint}</p>}
      {error && (
        <p id={`${id}-error`} role="alert" className="mt-1.5 flex items-center gap-1.5 text-sm text-[#b42318]">
          <AlertCircle className="size-4 shrink-0" aria-hidden="true" />{error.message}
        </p>
      )}
    </div>
  )
}

const describedBy = (id: string, error?: FieldError, hint?: string) => (error ? `${id}-error` : hint ? `${id}-hint` : undefined)

export function TextField({ id, label, error, hint, required, reg, className, ...rest }: Base & InputHTMLAttributes<HTMLInputElement>) {
  return (
    <Shell id={id} label={label} error={error} hint={hint} required={required} className={className}>
      <input id={id} {...rest} {...reg} aria-required={required} aria-invalid={!!error} aria-describedby={describedBy(id, error, hint)} className="field" />
    </Shell>
  )
}

export function SelectField({ id, label, error, hint, required, reg, options, className, placeholder = 'Select…', ...rest }: Base & SelectHTMLAttributes<HTMLSelectElement> & { options: readonly string[]; placeholder?: string }) {
  return (
    <Shell id={id} label={label} error={error} hint={hint} required={required} className={className}>
      <select id={id} {...rest} {...reg} aria-required={required} aria-invalid={!!error} aria-describedby={describedBy(id, error, hint)} className="field appearance-none bg-[url('data:image/svg+xml;utf8,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 24 24%22 fill=%22none%22 stroke=%22%2321172F%22 stroke-width=%222%22><path d=%22m6 9 6 6 6-6%22/></svg>')] bg-[length:18px] bg-[right_14px_center] bg-no-repeat pr-10">
        <option value="">{placeholder}</option>
        {options.map((o) => <option key={o} value={o}>{o}</option>)}
      </select>
    </Shell>
  )
}

export function TextArea({ id, label, error, hint, required, reg, className, ...rest }: Base & TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return (
    <Shell id={id} label={label} error={error} hint={hint} required={required} className={className}>
      <textarea id={id} rows={4} {...rest} {...reg} aria-required={required} aria-invalid={!!error} aria-describedby={describedBy(id, error, hint)} className="field resize-y" />
    </Shell>
  )
}

export function ConsentField({ id, reg, error, children }: { id: string; reg: UseFormRegisterReturn; error?: FieldError; children: ReactNode }) {
  return (
    <div>
      <div className="flex items-start gap-3">
        <input id={id} type="checkbox" {...reg} aria-invalid={!!error} aria-describedby={error ? `${id}-error` : undefined} className="mt-1 size-5 shrink-0 accent-[#174C3C]" />
        <label htmlFor={id} className="text-sm leading-relaxed text-muted-strong">{children}</label>
      </div>
      {error && <p id={`${id}-error`} role="alert" className="mt-1.5 flex items-center gap-1.5 text-sm text-[#b42318]"><AlertCircle className="size-4" aria-hidden="true" />{error.message}</p>}
    </div>
  )
}

export function DemoBanner() {
  return (
    <div role="note" className="flex gap-3 rounded-2xl border border-[#b54708]/30 bg-[#fffaeb] p-4 text-sm text-[#7a2e0e]">
      <Info className="mt-0.5 size-5 shrink-0" aria-hidden="true" />
      <p>
        <strong>Demonstration mode.</strong> This form is not yet connected to the school’s admissions system, so submissions are <strong>not sent</strong>.
        Until it is, please email <a className="underline" href={`mailto:${school.contact.admissionsEmail}`}>{school.contact.admissionsEmail}</a> or call <a className="underline" href={school.contact.phoneHref}>{school.contact.phone}</a>.
      </p>
    </div>
  )
}

export const phoneRegex = /^\+?[0-9][0-9\s-]{7,15}$/
