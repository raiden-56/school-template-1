import type { SchoolEvent } from '@/data/events'
import { school } from '@/config/school'

const compact = (iso: string) => iso.replaceAll('-', '')

function nextDay(iso: string) {
  const d = new Date(iso + 'T00:00:00')
  d.setDate(d.getDate() + 1)
  return `${d.getFullYear()}${String(d.getMonth() + 1).padStart(2, '0')}${String(d.getDate()).padStart(2, '0')}`
}

/** Generates and downloads an .ics file so the event can be added to any calendar app. */
export function downloadICS(event: SchoolEvent) {
  const lines = [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    `PRODID:-//${school.shortName}//Events//EN`,
    'BEGIN:VEVENT',
    `UID:${event.slug}@${new URL(school.siteUrl).host}`,
    `DTSTAMP:${new Date().toISOString().replace(/[-:]/g, '').split('.')[0]}Z`,
    `DTSTART;VALUE=DATE:${compact(event.start)}`,
    `DTEND;VALUE=DATE:${nextDay(event.end ?? event.start)}`,
    `SUMMARY:${event.title}`,
    `DESCRIPTION:${event.description}${event.time ? ' (' + event.time + ')' : ''}`,
    `LOCATION:${event.location} — ${school.name}`,
    'END:VEVENT',
    'END:VCALENDAR',
  ]
  const blob = new Blob([lines.join('\r\n')], { type: 'text/calendar' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = `${event.slug}.ics`
  a.click()
  setTimeout(() => URL.revokeObjectURL(url), 1000)
}
