import { motion } from 'framer-motion'
import { FileDown, HandCoins, Receipt } from 'lucide-react'
import { Link } from 'react-router-dom'
import { Accordion } from '@/components/ui/Accordion'
import { ButtonLink } from '@/components/ui/Button'
import { feeCategories, feeConditions } from '@/data/info'
import { admissionDownloads } from '@/data/admissions'
import { notPublished, school } from '@/config/school'

/* Section Q (home teaser) */
export function FeeTeaser() {
  return (
    <section aria-labelledby="fee-teaser-title" className="bg-cream pt-20 sm:pt-28">
      <div className="container-x">
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="grid gap-8 overflow-hidden rounded-[2.5rem] bg-peach-200 p-8 sm:p-12 lg:grid-cols-[1fr_auto] lg:items-center">
          <div className="flex gap-5">
            <span className="hidden size-16 shrink-0 place-items-center rounded-2xl bg-violet text-white sm:grid"><Receipt className="size-7" aria-hidden="true" /></span>
            <div>
              <h2 id="fee-teaser-title" className="font-display text-3xl font-semibold sm:text-4xl">Transparent fees, no donation</h2>
              <p className="mt-3 max-w-2xl leading-relaxed text-muted-strong">
                High-quality education at an affordable cost. Our term-wise fee structure for {school.academicYear} is published for every class, from Nursery to Class X — and no donation is required for admission.
              </p>
            </div>
          </div>
          <div className="flex flex-wrap gap-3">
            <ButtonLink to="/admissions/fees" variant="dark">View fee structure</ButtonLink>
            {school.offers.scholarships && <ButtonLink to="/admissions/scholarships" variant="outline-dark">Scholarships</ButtonLink>}
          </div>
        </motion.div>
      </div>
    </section>
  )
}

/* Section Q — full fee information */
export function FeeInformation() {
  return (
    <div className="grid gap-12 lg:grid-cols-[1.3fr_0.7fr]">
      <div>
        <p className="text-muted-strong">Fee structure {school.academicYear} for existing students, as published by the school. Fees are payable in three terms. Charges for new admissions are shared by the school office.</p>
        <Accordion
          className="mt-6 rounded-[2rem] bg-white px-6 sm:px-8"
          defaultOpen={0}
          items={feeCategories.map((c) => ({
            id: `fee-${c.id}`,
            title: c.title,
            content: (
              <div>
                <p className="mb-4">{c.description}</p>
                <table className="w-full text-left text-sm">
                  <caption className="sr-only">{c.title}</caption>
                  <thead><tr className="border-b border-plum/10 text-plum"><th scope="col" className="py-2 pr-4 font-semibold">Item</th><th scope="col" className="py-2 font-semibold">Amount</th></tr></thead>
                  <tbody>
                    {c.items.map((it) => (
                      <tr key={it.label} className="border-b border-plum/5 align-top">
                        <th scope="row" className="py-3 pr-4 font-normal text-plum">{it.label}{it.note && <span className="block text-xs text-muted-strong">{it.note}</span>}</th>
                        <td className="py-3">{it.amount ?? <span className="text-muted-strong">{notPublished}</span>}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ),
          }))}
        />
        <h2 className="mt-12 font-display text-2xl font-semibold">Conditions</h2>
        <ul className="mt-4 space-y-3">
          {feeConditions.map((c) => <li key={c} className="flex gap-3 text-muted-strong"><span className="mt-2 size-1.5 shrink-0 rounded-full bg-forest" aria-hidden="true" />{c}</li>)}
        </ul>
      </div>
      <aside className="space-y-6 lg:sticky lg:top-28 lg:self-start">
        <div className="rounded-[2rem] bg-violet p-7 text-white">
          <HandCoins className="size-8 text-sun" aria-hidden="true" />
          <h2 className="mt-4 font-display text-2xl font-semibold">Fee enquiry</h2>
          <p className="mt-2 text-sm text-white/85">Questions about fees or payment? Call the school office on {school.contact.phone} or write to us.</p>
          <div className="mt-6 flex flex-col gap-3">
            <ButtonLink to="/contact?subject=Fees">Ask about fees</ButtonLink>
            <a href={`mailto:${school.contact.admissionsEmail}?subject=Fee%20enquiry`} className="text-center text-sm underline underline-offset-4">{school.contact.admissionsEmail}</a>
          </div>
        </div>
        <div className="rounded-[2rem] bg-white p-7">
          <h2 className="font-display text-xl font-semibold">Downloads</h2>
          <ul className="mt-4 space-y-2">
            {admissionDownloads.map((d) => (
              <li key={d.href}><a href={d.href} target="_blank" rel="noopener noreferrer" className="flex items-center justify-between gap-3 rounded-2xl bg-cream px-4 py-3 text-sm font-medium hover:bg-sage"><span className="flex items-center gap-2"><FileDown className="size-4 text-forest" aria-hidden="true" />{d.label}</span><span className="text-xs text-muted-strong">{d.size}</span></a></li>
            ))}
          </ul>
        </div>
        {school.offers.scholarships && <Link to="/admissions/scholarships" className="block rounded-[2rem] bg-lavender p-7 font-display text-lg font-semibold hover:bg-lavender-200">Scholarships & financial assistance →</Link>}
      </aside>
    </div>
  )
}
