import { zodResolver } from '@hookform/resolvers/zod'
import { CheckCircle2, Loader2, Mail, Send, TriangleAlert } from 'lucide-react'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useSearchParams } from 'react-router-dom'
import { z } from 'zod'
import { isDemoMode, submitForm, type SubmitResult } from '@/lib/api'
import { school } from '@/config/school'
import { ConsentField, DemoBanner, SelectField, TextArea, TextField, phoneRegex } from './fields'

const subjects = ['General enquiry', 'Admissions', 'Fees', 'Academics', 'Careers', 'Feedback', 'Other'] as const

const schema = z.object({
  name: z.string().trim().min(2, 'Please enter your name'),
  email: z.string().trim().email('Enter a valid email address'),
  phone: z.string().trim().optional().refine((v) => !v || phoneRegex.test(v), 'Enter a valid phone number'),
  subject: z.string().min(1, 'Choose a subject'),
  message: z.string().trim().min(10, 'Please write at least 10 characters').max(2000, 'Please keep your message under 2000 characters'),
  consent: z.boolean().refine((v) => v, 'Please give consent so we can reply to you'),
})
type Values = z.infer<typeof schema>

export function ContactForm() {
  const [params] = useSearchParams()
  const pre = params.get('subject')
  const [result, setResult] = useState<SubmitResult | null>(null)
  const demo = isDemoMode('contact')
  const { register, handleSubmit, getValues, reset, formState: { errors, isSubmitting } } = useForm<Values>({
    resolver: zodResolver(schema),
    mode: 'onTouched',
    defaultValues: { subject: pre && (subjects as readonly string[]).includes(pre) ? pre : '', consent: false },
  })

  if (result && result.status !== 'error') {
    const v = getValues()
    const mailto = `mailto:${school.contact.email}?subject=${encodeURIComponent(v.subject)}&body=${encodeURIComponent(`${v.message}\n\n— ${v.name}${v.phone ? ` (${v.phone})` : ''}`)}`
    return (
      <div className="rounded-[2rem] bg-white p-6 sm:p-10" role="status">
        {result.status === 'sent' ? (
          <>
            <CheckCircle2 className="size-12 text-forest" aria-hidden="true" />
            <h3 className="mt-4 font-display text-2xl font-semibold">Message sent</h3>
            <p className="mt-2 text-muted-strong">Thank you, {v.name.split(' ')[0]}. We usually reply within two working days.</p>
          </>
        ) : (
          <>
            <TriangleAlert className="size-12 text-[#b54708]" aria-hidden="true" />
            <h3 className="mt-4 font-display text-2xl font-semibold">Demonstration mode — not sent</h3>
            <p className="mt-2 text-muted-strong">This form is not yet connected, so your message was <strong>not submitted</strong>. Send it by email instead:</p>
            <a href={mailto} className="mt-5 inline-flex items-center gap-2 rounded-full bg-violet px-5 py-3 font-display font-semibold text-white"><Mail className="size-4" aria-hidden="true" />Email this message</a>
          </>
        )}
        <button onClick={() => { reset(); setResult(null) }} className="mt-6 block text-sm font-semibold text-forest underline-offset-4 hover:underline">Write another message</button>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit(async (d) => setResult(await submitForm('contact', d)))} noValidate className="grid gap-5 rounded-[2rem] bg-white p-5 shadow-[0_40px_80px_-50px_rgba(33,23,47,.5)] sm:grid-cols-2 sm:p-8">
      {demo && <div className="sm:col-span-2"><DemoBanner /></div>}
      <TextField id="c-name" label="Name" required autoComplete="name" reg={register('name')} error={errors.name} />
      <TextField id="c-email" label="Email" required type="email" autoComplete="email" reg={register('email')} error={errors.email} />
      <TextField id="c-phone" label="Phone" type="tel" autoComplete="tel" reg={register('phone')} error={errors.phone} />
      <SelectField id="c-subject" label="Subject" required options={subjects} reg={register('subject')} error={errors.subject} />
      <TextArea id="c-message" label="Message" required rows={5} reg={register('message')} error={errors.message} className="sm:col-span-2" />
      <div className="sm:col-span-2">
        <ConsentField id="c-consent" reg={register('consent')} error={errors.consent}>
          I consent to {school.shortName} using these details to reply to my message, as described in the <a href="/privacy" className="underline">privacy policy</a>.
        </ConsentField>
      </div>
      {result?.status === 'error' && <p role="alert" className="text-sm text-[#b42318] sm:col-span-2">{result.message}</p>}
      <div className="sm:col-span-2">
        <button type="submit" disabled={isSubmitting} className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-emerald px-6 py-3.5 font-display font-semibold text-plum hover:bg-emerald-300 disabled:opacity-60 sm:w-auto">
          {isSubmitting ? <><Loader2 className="size-4 animate-spin" aria-hidden="true" />Sending…</> : <><Send className="size-4" aria-hidden="true" />{demo ? 'Check message' : 'Send message'}</>}
        </button>
      </div>
    </form>
  )
}
