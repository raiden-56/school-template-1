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
  { id: 'arrive', kicker: '01 — Arrive', title: 'Discover the campus', text: 'Our campus at Pai Layout, K R Puram spans about 2,415 sq m — a four-storey school building with playgrounds and activity spaces around it.', camera: [16, 15, 18], target: [0, 0, 0] },
  { id: 'academic', kicker: '02 — Learn', title: 'The school building', text: '31 air-conditioned classrooms on four floors, with an internet-enabled campus and an activity plan for every learning session.', camera: [-1, 5, 9], target: [-3, 1.2, 0] },
  { id: 'labs', kicker: '03 — Explore', title: 'Laboratories', text: 'Three well-equipped laboratories, including the computer lab, make learning hands-on and experiential.', camera: [8, 4.5, 5], target: [4, 1, -2.5] },
  { id: 'play', kicker: '04 — Play', title: 'Two playgrounds & more', text: 'The NPPS Multi-Sports Activity Centre and the NPPS Playzone, plus a children’s gymnasium, indoor sports centre, cricket bowling machine and mini pool.', camera: [3, 6, -11], target: [1, 0.5, -5] },
  { id: 'overview', kicker: '05 — Belong', title: 'A campus that feels like home', text: 'An ambient atmosphere of love and respect, where every child can learn, play and grow. Come and see it in person.', camera: [0, 26, 0.01], target: [0, 0, 0] },
]

export const campusHotspots: CampusHotspotData[] = [
  { id: 'hs-academic', facilityId: 'classrooms', label: 'A/C classrooms', position: [-3, 3.4, 0], map: { x: 34, y: 48 } },
  { id: 'hs-labs', facilityId: 'laboratories', label: 'Laboratories', position: [5.6, 2.4, -3], map: { x: 74, y: 32 } },
  { id: 'hs-sports', facilityId: 'multi-sports', label: 'Multi-Sports Activity Centre', position: [-1, 0.8, -6.5], map: { x: 42, y: 16 } },
  { id: 'hs-playzone', facilityId: 'playzone', label: 'NPPS Playzone', position: [1, 1.2, 5.5], map: { x: 50, y: 84 } },
  { id: 'hs-indoor', facilityId: 'indoor-sports', label: 'Indoor sports centre', position: [-6.5, 2.6, -3.5], map: { x: 16, y: 30 } },
  { id: 'hs-gym', facilityId: 'gymnasium', label: 'Children’s gymnasium', position: [5.5, 2, 3.5], map: { x: 74, y: 68 } },
  { id: 'hs-support', facilityId: 'student-support', label: 'Counselling & special education', position: [3, 2.6, -1.2], map: { x: 62, y: 42 } },
  { id: 'hs-pool', facilityId: 'mini-pool', label: 'Mini pool', position: [-6, 1.8, 4], map: { x: 18, y: 74 } },
]
