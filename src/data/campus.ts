/**
 * Campus explorer — the scroll story and clickable hotspots.
 * Positions refer to the stylised 3D campus in /components/three/CampusModel.tsx.
 * `map` gives the same hotspot's position (in %) on the 2D fallback map.
 */
export interface CampusStage {
  id: string
  title: string
  kicker: string
  text: string
  camera: [number, number, number]
  target: [number, number, number]
}

export interface CampusHotspotData {
  id: string
  facilityId: string
  label: string
  position: [number, number, number]
  map: { x: number; y: number }
}

export const campusStages: CampusStage[] = [
  { id: 'arrive', kicker: '01 — Arrive', title: 'Discover the campus', text: 'From above, the campus unfolds as a small city of learning — academic blocks, gardens and fields connected by shaded pathways.', camera: [16, 15, 18], target: [0, 0, 0] },
  { id: 'academic', kicker: '02 — Learn', title: 'The academic building', text: 'Smart classrooms are arranged around light-filled courtyards so every grade has its own neighbourhood.', camera: [-1, 5, 9], target: [-3, 1.2, 0] },
  { id: 'library', kicker: '03 — Wonder', title: 'Library & laboratories', text: 'The library and science labs sit side by side — reading and experimenting are two halves of the same curiosity.', camera: [8, 4.5, 5], target: [4, 1, -2.5] },
  { id: 'create', kicker: '04 — Play & create', title: 'Sports and creative spaces', text: 'Fields, courts, studios and the auditorium give every student a stage — athletic, artistic or both.', camera: [3, 6, -11], target: [1, 0.5, -5] },
  { id: 'overview', kicker: '05 — Belong', title: 'A campus that feels like home', text: 'Gardens, outdoor classrooms and a central green tie it all together. Come and see it in person.', camera: [0, 26, 0.01], target: [0, 0, 0] },
]

export const campusHotspots: CampusHotspotData[] = [
  { id: 'hs-academic', facilityId: 'smart-classrooms', label: 'Academic block', position: [-3, 3.4, 0], map: { x: 34, y: 48 } },
  { id: 'hs-library', facilityId: 'library', label: 'Library', position: [3, 2.6, -1.2], map: { x: 62, y: 42 } },
  { id: 'hs-labs', facilityId: 'science-labs', label: 'Science labs', position: [5.6, 2.4, -3], map: { x: 74, y: 32 } },
  { id: 'hs-sports', facilityId: 'outdoor-sports', label: 'Sports ground', position: [-1, 0.8, -6.5], map: { x: 42, y: 16 } },
  { id: 'hs-studios', facilityId: 'art-music', label: 'Art & music studios', position: [5.5, 2, 3.5], map: { x: 74, y: 68 } },
  { id: 'hs-auditorium', facilityId: 'auditorium', label: 'Auditorium', position: [-6.5, 2.6, -3.5], map: { x: 16, y: 30 } },
  { id: 'hs-cafeteria', facilityId: 'cafeteria', label: 'Cafeteria', position: [-6, 1.8, 4], map: { x: 18, y: 74 } },
  { id: 'hs-gardens', facilityId: 'gardens', label: 'Gardens', position: [1, 1.2, 5.5], map: { x: 50, y: 84 } },
]
