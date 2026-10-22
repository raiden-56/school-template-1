import type { ArtTheme } from '@/components/ui/ArtImage'
import { school } from '@/config/school'

export interface Facility {
  id: string
  title: string
  theme: ArtTheme
  size: 'xl' | 'lg' | 'md' | 'sm'
  summary: string
  details: string[]
  link: string
  /** Real photo. Without it an illustration is shown. */
  image?: string
}

/**
 * Facilities as described on the school's About Us page and in its CBSE
 * mandatory disclosure (Section E — School infrastructure).
 */
const all: Facility[] = [
  { id: 'classrooms', title: 'A/C Classrooms', theme: 'classroom', size: 'xl', image: '/images/campus/school-building.jpg', summary: '31 air-conditioned classrooms of about 48 sq m each, in our four-storey school building at Pai Layout.', details: ['31 classrooms (approx. 48 sq m each)', 'Air-conditioned learning spaces', 'Internet-enabled campus', 'Activity plan for every learning session'], link: '/campus/facilities#classrooms' },
  { id: 'laboratories', title: 'Laboratories', theme: 'science', size: 'lg', summary: 'Three well-equipped laboratories, including the computer lab, for hands-on practical learning.', details: ['3 laboratories (approx. 56 sq m each)', 'Science and computer labs', 'Internet facility', 'Supervised practical sessions'], link: '/campus/facilities#laboratories' },
  { id: 'multi-sports', title: 'NPPS Multi-Sports Activity Centre', theme: 'sports', size: 'lg', image: '/images/home/sports-day.jpg', summary: 'A state-of-the-art playground with a vast play area for our students.', details: ['Vast outdoor play area', 'Sports Day and inter-school meets', 'Professional training for future athletes', 'Kho-kho, athletics and team games'], link: '/campus/facilities#multi-sports' },
  { id: 'playzone', title: 'NPPS Playzone', theme: 'games', size: 'md', summary: 'A well-defined, futuristic play area with exceptional playing equipment that boosts physical development.', details: ['Modern play equipment', 'Designed for younger children', 'Supervised play'], link: '/campus/facilities#playzone' },
  { id: 'gymnasium', title: 'Children’s Gymnasium', theme: 'sports', size: 'sm', summary: 'A gymnasium designed for children’s fitness and physical development.', details: ['Age-appropriate equipment', 'Guided by physical education teachers'], link: '/campus/facilities#gymnasium' },
  { id: 'cricket', title: 'Cricket Bowling Machine', theme: 'sports', size: 'sm', summary: 'Practice batting with a cricket bowling machine.', details: ['Structured cricket practice', 'Guided by physical education teachers'], link: '/campus/facilities#cricket' },
  { id: 'indoor-sports', title: 'Indoor Sports Activity Centre', theme: 'games', size: 'md', summary: 'Indoor sports and activities, whatever the weather.', details: ['Indoor games and activities', 'Yoga sessions'], link: '/campus/facilities#indoor-sports' },
  { id: 'mini-pool', title: 'Mini Pool', theme: 'sports', size: 'sm', summary: 'A mini pool for water play and confidence in the water.', details: ['Supervised sessions'], link: '/campus/facilities#mini-pool' },
  { id: 'student-support', title: 'Special Education & Counselling', theme: 'accessible', size: 'md', summary: 'A qualified special educator and a counsellor & wellness teacher support every learner.', details: ['Special Educator — B.Ed. in Special Education', 'Counsellor & Wellness Teacher — M.Sc. in Psychology', 'Individual support for additional needs'], link: '/campus/facilities#student-support' },
  { id: 'safety', title: 'Safe & Hygienic Campus', theme: 'medical', size: 'sm', summary: 'Certified building, fire, water and sanitation safety, with separate toilets for girls and boys.', details: ['Building safety certificate', 'Fire safety certificate', 'Water, health & sanitation certificates', '20 girls’ and 20 boys’ toilets'], link: '/campus/facilities#safety' },
  { id: 'transport', title: 'School Transport', theme: 'transport', size: 'md', summary: 'School transport (details on request).', details: ['Contact the school office for routes'], link: '/campus/facilities#transport' },
  { id: 'boarding', title: 'Boarding', theme: 'boarding', size: 'md', summary: 'Residential facilities.', details: [], link: '/campus/facilities#boarding' },
]

export const facilities = all.filter((f) => f.id !== 'boarding' || school.offers.boarding).filter((f) => f.id !== 'transport' || school.offers.transport)
export const getFacility = (id: string) => facilities.find((f) => f.id === id)
