import { AnimatePresence, motion, type PanInfo } from 'framer-motion'
import { ChevronLeft, ChevronRight, Expand, Play } from 'lucide-react'
import { useCallback, useMemo, useState } from 'react'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { ArtImage } from '@/components/ui/ArtImage'
import { Modal } from '@/components/ui/Modal'
import { ButtonLink } from '@/components/ui/Button'
import { SampleNote } from '@/components/ui/misc'
import { gallery, galleryCategories, type GalleryItem } from '@/data/community'
import { cn } from '@/lib/cn'

const spanCls: Record<GalleryItem['span'], string> = {
  normal: '',
  tall: 'row-span-2',
  wide: 'sm:col-span-2',
  big: 'sm:col-span-2 row-span-2',
}

function Lightbox({ items, index, onClose, onIndex }: { items: GalleryItem[]; index: number | null; onClose: () => void; onIndex: (i: number) => void }) {
  const [dir, setDir] = useState(0)
  const item = index !== null ? items[index] : null
  const go = useCallback((d: number) => {
    if (index === null) return
    setDir(d)
    onIndex((index + d + items.length) % items.length)
  }, [index, items.length, onIndex])

  const onKey = useCallback((e: KeyboardEvent) => {
    if (e.key === 'ArrowRight') go(1)
    if (e.key === 'ArrowLeft') go(-1)
  }, [go])

  return (
    <Modal open={index !== null} onClose={onClose} label="Gallery viewer" variant="fullscreen" onKeyDown={onKey}>
      {item && (
        <div className="flex h-full flex-col text-plum">
          <div className="flex items-center justify-between gap-4 px-5 py-5 pr-20 sm:px-8">
            <p className="font-display text-sm text-plum/70" aria-live="polite">{index! + 1} / {items.length}</p>
          </div>
          <div className="relative flex flex-1 items-center justify-center overflow-hidden px-4 sm:px-20">
            <AnimatePresence initial={false} custom={dir} mode="popLayout">
              <motion.figure
                key={item.id}
                custom={dir}
                initial={{ opacity: 0, x: dir * 80 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: dir * -80 }}
                transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                drag="x"
                dragConstraints={{ left: 0, right: 0 }}
                dragElastic={0.6}
                onDragEnd={(_: unknown, info: PanInfo) => { if (info.offset.x < -60) go(1); else if (info.offset.x > 60) go(-1) }}
                className="w-full max-w-5xl touch-pan-y"
              >
                <div className="relative aspect-[4/3] overflow-hidden rounded-[1.5rem] sm:aspect-[16/10]">
                  {item.type === 'video' && item.videoUrl ? (
                    <video src={item.videoUrl} controls className="h-full w-full bg-black object-contain" />
                  ) : (
                    <ArtImage theme={item.theme} alt={item.title} src={item.src} seed={Number(item.id.slice(1))} iconScale={0.8} />
                  )}
                  {item.type === 'video' && !item.videoUrl && (
                    <div className="absolute inset-x-4 bottom-12 rounded-2xl bg-white/95 p-4 text-sm shadow-xl sm:inset-x-auto sm:right-4 sm:max-w-sm">
                      <p className="font-semibold">Video not yet published</p>
                      <p className="mt-1 text-plum/75">Add a <code>videoUrl</code> for this item in <code>src/data/community.ts</code> to play it here.</p>
                    </div>
                  )}
                </div>
                <figcaption className="mt-4 flex flex-wrap items-baseline justify-between gap-2">
                  <span className="font-display text-xl font-semibold">{item.title}</span>
                  <span className="text-sm text-plum/60">{item.category}</span>
                </figcaption>
              </motion.figure>
            </AnimatePresence>
            <button onClick={() => go(-1)} aria-label="Previous image" className="absolute left-2 top-1/2 hidden size-12 -translate-y-1/2 place-items-center rounded-full bg-white/70 hover:bg-emerald hover:text-plum sm:grid sm:left-6"><ChevronLeft className="size-6" /></button>
            <button onClick={() => go(1)} aria-label="Next image" className="absolute right-2 top-1/2 hidden size-12 -translate-y-1/2 place-items-center rounded-full bg-white/70 hover:bg-emerald hover:text-plum sm:grid sm:right-6"><ChevronRight className="size-6" /></button>
          </div>
          <div className="flex justify-center gap-3 py-6 sm:hidden">
            <button onClick={() => go(-1)} aria-label="Previous image" className="grid size-12 place-items-center rounded-full bg-white/70"><ChevronLeft className="size-6" /></button>
            <button onClick={() => go(1)} aria-label="Next image" className="grid size-12 place-items-center rounded-full bg-white/70"><ChevronRight className="size-6" /></button>
          </div>
          <p className="hidden pb-6 text-center text-xs text-plum/50 sm:block">Use ← → keys to navigate · Esc to close</p>
        </div>
      )}
    </Modal>
  )
}

/* Section M — magazine-style gallery */
export function InteractiveGallery({ limit, showHeading = true }: { limit?: number; showHeading?: boolean }) {
  const [cat, setCat] = useState<(typeof galleryCategories)[number]>('All')
  const [open, setOpen] = useState<number | null>(null)
  const items = useMemo(() => {
    const f = cat === 'All' ? gallery : gallery.filter((g) => g.category === cat)
    return limit ? f.slice(0, limit) : f
  }, [cat, limit])

  return (
    <section aria-labelledby="gallery-title" className="bg-cream py-20 sm:py-32">
      <div className="container-x">
        {showHeading ? (
          <div className="flex flex-col justify-between gap-8 lg:flex-row lg:items-end">
            <SectionHeading
              eyebrow="Gallery"
              lines={[<span id="gallery-title">Moments in</span>, <span className="accent text-forest">motion.</span>]}
              intro="Life at school, one frame at a time."
            />
            {limit && <ButtonLink to="/gallery" variant="outline-dark" className="shrink-0 self-start lg:self-auto">Open full gallery</ButtonLink>}
          </div>
        ) : <h2 id="gallery-title" className="sr-only">Gallery</h2>}

        <div className="mt-10 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div role="group" aria-label="Filter gallery" className="scrollbar-none -mx-4 flex gap-2 overflow-x-auto px-4 lg:mx-0 lg:flex-wrap lg:px-0">
            {galleryCategories.map((c) => (
              <button key={c} onClick={() => setCat(c)} aria-pressed={cat === c} className={cn('relative shrink-0 rounded-full px-4 py-2 text-sm font-medium transition-colors', cat === c ? 'text-white' : 'ring-1 ring-plum/15 hover:bg-plum/5')}>
                {cat === c && <motion.span layoutId="gallery-pill" className="absolute inset-0 rounded-full bg-violet" />}
                <span className="relative">{c}</span>
              </button>
            ))}
          </div>
          <SampleNote>Illustrated sample visuals — replace with authentic school photos.</SampleNote>
        </div>

        <motion.ul layout className="mt-10 grid auto-rows-[180px] grid-flow-dense grid-cols-2 gap-3 sm:auto-rows-[220px] sm:gap-4 lg:grid-cols-4">
          <AnimatePresence mode="popLayout">
            {items.map((g, i) => (
              <motion.li key={g.id} layout initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.9 }} transition={{ duration: 0.4 }} className={cn(spanCls[g.span], '[perspective:1000px]')}>
                <button onClick={() => setOpen(i)} className="group relative block h-full w-full overflow-hidden rounded-[1.5rem] text-left transition-transform duration-500 [@media(hover:hover)]:hover:[transform:rotateX(4deg)_rotateY(-4deg)]" aria-label={`${g.type === 'video' ? 'Play video' : 'View image'}: ${g.title}`}>
                  <div className="h-full w-full transition-transform duration-700 ease-out group-hover:scale-110">
                    <ArtImage theme={g.theme} alt={g.title} src={g.src} seed={Number(g.id.slice(1))} hideTag={g.span === 'normal'} />
                  </div>
                  <span className="absolute bottom-3 left-3 max-w-[calc(100%-4rem)] rounded-xl bg-white/90 px-3 py-1.5 font-display text-sm font-semibold text-plum shadow-sm backdrop-blur sm:text-base">{g.title}</span>
                  <span className="absolute right-3 top-3 grid size-9 place-items-center rounded-full bg-white/70 text-plum backdrop-blur" aria-hidden="true">
                    {g.type === 'video' ? <Play className="size-4 fill-current" /> : <Expand className="size-4" />}
                  </span>
                </button>
              </motion.li>
            ))}
          </AnimatePresence>
        </motion.ul>
        <p className="sr-only" aria-live="polite">{items.length} items shown</p>
      </div>
      <Lightbox items={items} index={open} onClose={() => setOpen(null)} onIndex={setOpen} />
    </section>
  )
}
