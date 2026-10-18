const fmt = new Intl.DateTimeFormat('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })
export const formatDate = (iso: string) => fmt.format(new Date(iso + 'T00:00:00'))
export const dayOf = (iso: string) => new Date(iso + 'T00:00:00').getDate()
export const monthShort = (iso: string) => new Intl.DateTimeFormat('en-IN', { month: 'short' }).format(new Date(iso + 'T00:00:00'))
export const toISODate = (d: Date) => `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`
