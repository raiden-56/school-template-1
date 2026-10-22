import { Check } from 'lucide-react'
import { Modal } from '@/components/ui/Modal'
import { ArtImage } from '@/components/ui/ArtImage'
import { ButtonLink } from '@/components/ui/Button'
import { getFacility } from '@/data/facilities'

/** Detail panel for a facility — shared by the campus explorer hotspots and the bento grid. */
export function FacilityDialog({ facilityId, onClose }: { facilityId: string | null; onClose: () => void }) {
  const f = facilityId ? getFacility(facilityId) : undefined
  return (
    <Modal open={!!f} onClose={onClose} label={f ? `${f.title} details` : 'Facility details'}>
      {f && (
        <div>
          <div className="aspect-[16/9] overflow-hidden rounded-t-[2rem]">
            <ArtImage theme={f.theme} alt={f.title} src={f.image} />
          </div>
          <div className="p-6 sm:p-10">
            <p className="eyebrow text-forest">Facility</p>
            <h2 className="mt-2 font-display text-3xl font-semibold sm:text-4xl">{f.title}</h2>
            <p className="mt-4 leading-relaxed text-muted-strong">{f.summary}</p>
            <ul className="mt-6 grid gap-2 sm:grid-cols-2">
              {f.details.map((d) => (
                <li key={d} className="flex gap-2 text-sm"><Check className="mt-0.5 size-4 shrink-0 text-forest" aria-hidden="true" />{d}</li>
              ))}
            </ul>
            <div className="mt-8 flex flex-wrap gap-3">
              <ButtonLink to={f.link} variant="dark" onClick={onClose}>View on facilities page</ButtonLink>
              <ButtonLink to="/visit" variant="outline-dark" onClick={onClose}>See it on a visit</ButtonLink>
            </div>
          </div>
        </div>
      )}
    </Modal>
  )
}
