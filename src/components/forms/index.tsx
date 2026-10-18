import { lazy, Suspense, type ComponentProps } from 'react'

/* Forms (react-hook-form + zod) are loaded on demand to keep the initial bundle small. */
const EnquiryLazy = lazy(() => import('./MultiStepEnquiryForm').then((m) => ({ default: m.MultiStepEnquiryForm })))
const ContactLazy = lazy(() => import('./ContactForm').then((m) => ({ default: m.ContactForm })))

function FormSkeleton({ height }: { height: number }) {
  return (
    <div className="animate-pulse rounded-[2rem] bg-white/70 p-8" style={{ minHeight: height }} role="status" aria-label="Loading form">
      <div className="h-3 w-1/3 rounded bg-plum/10" />
      <div className="mt-6 h-12 rounded-2xl bg-plum/5" />
      <div className="mt-4 h-12 rounded-2xl bg-plum/5" />
    </div>
  )
}

export function MultiStepEnquiryForm(props: ComponentProps<typeof EnquiryLazy>) {
  return <Suspense fallback={<FormSkeleton height={560} />}><EnquiryLazy {...props} /></Suspense>
}

export function ContactForm() {
  return <Suspense fallback={<FormSkeleton height={620} />}><ContactLazy /></Suspense>
}
