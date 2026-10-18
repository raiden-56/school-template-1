import { zodResolver } from '@hookform/resolvers/zod'
import { AnimatePresence, motion } from 'framer-motion'
import { ArrowLeft, ArrowRight, CheckCircle2, Loader2, Mail, Phone, RotateCcw, TriangleAlert } from 'lucide-react'
import { useRef, useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { currentGradeOptions, gradesOpen } from '@/data/admissions'
import { isDemoMode, submitForm, type SubmitResult } from '@/lib/api'
import { toISODate } from '@/lib/format'
import { school } from '@/config/school'
import { cn } from '@/lib/cn'
import { ConsentField, DemoBanner, SelectField, TextArea, TextField, phoneRegex } from './fields'

const today = toISODate(new Date())
const years = [school.academicYear]

const makeSchema = (visitRequired: boolean) =>
  z.object({
    parentName: z.string().trim().min(2, 'Please enter the parent or guardian’s full name'),
    phone: z.string().trim().regex(phoneRegex, 'Enter a valid phone number, e.g. +91 98765 43210'),
    email: z.string().trim().email('Enter a valid email address'),
    studentName: z.string().trim().min(2, 'Please enter the student’s name'),
    currentGrade: z.string().min(1, 'Select the student’s current grade'),
    applyingGrade: z.string().min(1, 'Select the grade you are applying for'),
    academicYear: z.string().min(1, 'Select the academic year'),
    visitDate: visitRequired
      ? z.string().min(1, 'Choose a preferred visit date').refine((v) => v > today, 'Choose a date after today')
      : z.string().optional().refine((v) => !v || v > today, 'Choose a date after today'),
    message: z.string().max(1000, 'Please keep your message under 1000 characters').optional(),
    consent: z.boolean().refine((v) => v, 'Please give consent so we can contact you about this enquiry'),
  })

type FormValues = z.infer<ReturnType<typeof makeSchema>>

const steps = [
  { title: 'Parent / guardian', fields: ['parentName', 'phone', 'email'] },
  { title: 'Student', fields: ['studentName', 'currentGrade', 'applyingGrade', 'academicYear'] },
  { title: 'Visit & message', fields: ['visitDate', 'message'] },
  { title: 'Review & consent', fields: ['consent'] },
] as const

export function MultiStepEnquiryForm({ mode = 'enquiry' }: { mode?: 'enquiry' | 'visit' }) {
  const [step, setStep] = useState(0)
  const [dir, setDir] = useState(1)
  const [result, setResult] = useState<SubmitResult | null>(null)
  const headingRef = useRef<HTMLHeadingElement>(null)
  const kind = mode === 'visit' ? 'visit' : 'enquiry'
  const demo = isDemoMode(kind)

  const { register, handleSubmit, trigger, getValues, reset, formState: { errors, isSubmitting } } = useForm<FormValues>({
    resolver: zodResolver(makeSchema(mode === 'visit')),
    mode: 'onTouched',
    defaultValues: { academicYear: school.academicYear, consent: false, visitDate: '', message: '' },
  })

  const focusHeading = () => setTimeout(() => headingRef.current?.focus(), 50)
  const next = async () => {
    const ok = await trigger(steps[step].fields as unknown as (keyof FormValues)[], { shouldFocus: true })
    if (!ok) return
    setDir(1); setStep((s) => s + 1); focusHeading()
  }
  const back = () => { setDir(-1); setStep((s) => s - 1); focusHeading() }

  const onSubmit = async (data: FormValues) => {
    const res = await submitForm(kind, data)
    setResult(res)
    focusHeading()
  }

  if (result && result.status !== 'error') {
    const v = getValues()
    const body = encodeURIComponent(
      `Parent/guardian: ${v.parentName}\nPhone: ${v.phone}\nEmail: ${v.email}\nStudent: ${v.studentName}\nCurrent grade: ${v.currentGrade}\nApplying for: ${v.applyingGrade} (${v.academicYear})\nPreferred visit date: ${v.visitDate || '—'}\n\n${v.message || ''}`,
    )
    const mailto = `mailto:${school.contact.admissionsEmail}?subject=${encodeURIComponent(`${mode === 'visit' ? 'Campus visit request' : 'Admission enquiry'} — ${v.studentName}`)}&body=${body}`
    return (
      <div className="rounded-[2rem] bg-white p-6 sm:p-10" aria-live="polite">
        {result.status === 'sent' ? (
          <>
            <CheckCircle2 className="size-14 text-forest" aria-hidden="true" />
            <h3 ref={headingRef} tabIndex={-1} className="mt-5 font-display text-3xl font-semibold outline-none">Thank you, {v.parentName.split(' ')[0]}.</h3>
            <p className="mt-3 leading-relaxed text-muted-strong">
              Your {mode === 'visit' ? 'visit request' : 'enquiry'} for {v.studentName} has been received. Our admissions team will contact you at {v.email}.
            </p>
          </>
        ) : (
          <>
            <TriangleAlert className="size-14 text-[#b54708]" aria-hidden="true" />
            <h3 ref={headingRef} tabIndex={-1} className="mt-5 font-display text-3xl font-semibold outline-none">Demonstration mode — not sent</h3>
            <p className="mt-3 leading-relaxed text-muted-strong">
              Your details were checked and are complete, but this website is not yet connected to the admissions system, so <strong>nothing was submitted</strong>.
              You can send the same details by email in one click, or call the admissions office.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <a href={mailto} className="inline-flex items-center gap-2 rounded-full bg-violet px-5 py-3 font-display font-semibold text-white"><Mail className="size-4" aria-hidden="true" />Email these details</a>
              <a href={school.contact.phoneHref} className="inline-flex items-center gap-2 rounded-full border-2 border-plum px-5 py-3 font-display font-semibold"><Phone className="size-4" aria-hidden="true" />Call {school.contact.phone}</a>
            </div>
          </>
        )}
        <button onClick={() => { reset(); setStep(0); setResult(null) }} className="mt-8 inline-flex items-center gap-2 text-sm font-semibold text-forest underline-offset-4 hover:underline">
          <RotateCcw className="size-4" aria-hidden="true" />Start a new {mode === 'visit' ? 'request' : 'enquiry'}
        </button>
      </div>
    )
  }

  const v = getValues()
  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate className="rounded-[2rem] bg-white p-5 shadow-[0_40px_80px_-50px_rgba(33,23,47,.5)] sm:p-10">
      {demo && <div className="mb-6"><DemoBanner /></div>}

      {/* progress */}
      <ol className="mb-8 grid grid-cols-4 gap-2" aria-label="Form progress">
        {steps.map((s, i) => (
          <li key={s.title} aria-current={i === step ? 'step' : undefined}>
            <span className="relative block h-1.5 overflow-hidden rounded-full bg-plum/10">
              <motion.span className="absolute inset-y-0 left-0 rounded-full bg-emerald" initial={false} animate={{ width: i < step ? '100%' : i === step ? '50%' : '0%' }} />
            </span>
            <span className={cn('mt-2 hidden text-xs sm:block', i === step ? 'font-semibold text-plum' : 'text-muted-strong')}>{s.title}</span>
          </li>
        ))}
      </ol>
      <p className="text-sm text-muted-strong">Step {step + 1} of {steps.length}</p>
      <h3 ref={headingRef} tabIndex={-1} className="mt-1 font-display text-2xl font-semibold outline-none sm:text-3xl">{steps[step].title}</h3>

      <div className="relative mt-6 min-h-[280px]">
        <AnimatePresence mode="wait" custom={dir} initial={false}>
          <motion.div key={step} custom={dir} initial={{ opacity: 0, x: dir * 30 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: dir * -30 }} transition={{ duration: 0.25 }} className="grid gap-5 sm:grid-cols-2">
            {step === 0 && (
              <>
                <TextField id="parentName" label="Parent or guardian name" required autoComplete="name" reg={register('parentName')} error={errors.parentName} className="sm:col-span-2" />
                <TextField id="phone" label="Phone number" required type="tel" inputMode="tel" autoComplete="tel" reg={register('phone')} error={errors.phone} />
                <TextField id="email" label="Email address" required type="email" autoComplete="email" reg={register('email')} error={errors.email} />
              </>
            )}
            {step === 1 && (
              <>
                <TextField id="studentName" label="Student name" required autoComplete="off" reg={register('studentName')} error={errors.studentName} className="sm:col-span-2" />
                <SelectField id="currentGrade" label="Current grade" required options={currentGradeOptions} reg={register('currentGrade')} error={errors.currentGrade} />
                <SelectField id="applyingGrade" label="Grade applying for" required options={gradesOpen} reg={register('applyingGrade')} error={errors.applyingGrade} />
                <SelectField id="academicYear" label="Academic year" required options={years} reg={register('academicYear')} error={errors.academicYear} />
              </>
            )}
            {step === 2 && (
              <>
                <TextField id="visitDate" label="Preferred campus visit date" required={mode === 'visit'} type="date" min={today} reg={register('visitDate')} error={errors.visitDate} hint="Visits are usually on Saturdays; we will confirm the exact slot." />
                <TextArea id="message" label="Message" reg={register('message')} error={errors.message} className="sm:col-span-2" placeholder="Anything you would like us to know?" />
              </>
            )}
            {step === 3 && (
              <>
                <dl className="grid gap-x-6 gap-y-3 rounded-2xl bg-cream p-5 text-sm sm:col-span-2 sm:grid-cols-2">
                  {([
                    ['Parent / guardian', v.parentName], ['Phone', v.phone], ['Email', v.email], ['Student', v.studentName],
                    ['Current grade', v.currentGrade], ['Applying for', `${v.applyingGrade} · ${v.academicYear}`], ['Preferred visit', v.visitDate || '—'],
                  ] as const).map(([k, val]) => (
                    <div key={k}><dt className="text-muted-strong">{k}</dt><dd className="font-semibold break-words">{val}</dd></div>
                  ))}
                </dl>
                <div className="sm:col-span-2">
                  <ConsentField id="consent" reg={register('consent')} error={errors.consent}>
                    I am the parent or legal guardian and consent to {school.shortName} using these details to respond to this enquiry, as described in the <a href="/privacy" className="underline">privacy policy</a>.
                  </ConsentField>
                </div>
              </>
            )}
          </motion.div>
        </AnimatePresence>
      </div>

      {result?.status === 'error' && (
        <p role="alert" className="mt-4 flex items-center gap-2 rounded-2xl bg-[#fef3f2] p-4 text-sm text-[#b42318]"><TriangleAlert className="size-5 shrink-0" aria-hidden="true" />{result.message}</p>
      )}

      <div className="mt-8 flex items-center justify-between gap-3">
        <button type="button" onClick={back} disabled={step === 0} className="inline-flex items-center gap-2 rounded-full px-5 py-3 font-display font-semibold disabled:invisible">
          <ArrowLeft className="size-4" aria-hidden="true" />Back
        </button>
        {step < steps.length - 1 ? (
          <button type="button" onClick={next} className="inline-flex items-center gap-2 rounded-full bg-violet px-6 py-3 font-display font-semibold text-white hover:bg-[#5a3fd1]">
            Continue<ArrowRight className="size-4" aria-hidden="true" />
          </button>
        ) : (
          <button type="submit" disabled={isSubmitting} className="inline-flex items-center gap-2 rounded-full bg-emerald px-6 py-3 font-display font-semibold text-plum hover:bg-emerald-300 disabled:opacity-60">
            {isSubmitting ? <><Loader2 className="size-4 animate-spin" aria-hidden="true" />Submitting…</> : <>{demo ? 'Check & continue' : mode === 'visit' ? 'Request visit' : 'Submit enquiry'}<ArrowRight className="size-4" aria-hidden="true" /></>}
          </button>
        )}
      </div>
    </form>
  )
}
