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
}

const all: Facility[] = [
  { id: 'smart-classrooms', title: 'Smart Classrooms', theme: 'classroom', size: 'xl', summary: 'Bright, flexible classrooms with interactive displays and movable furniture for group work.', details: ['Interactive display panels', 'Flexible seating for collaborative learning', 'Natural light and ventilation', 'Class libraries in primary rooms'], link: '/campus/facilities#smart-classrooms' },
  { id: 'science-labs', title: 'Science Laboratories', theme: 'science', size: 'lg', summary: 'Separate physics, chemistry and biology labs designed for hands-on experiments.', details: ['Supervised practical sessions', 'Safety equipment and protocols', 'Junior science lab for middle school'], link: '/campus/facilities#science-labs' },
  { id: 'computer-labs', title: 'Computer Labs', theme: 'computer', size: 'md', summary: 'Networked labs for coding, design and digital literacy.', details: ['One student per workstation', 'Filtered, monitored internet access', 'Coding & design software'], link: '/campus/facilities#computer-labs' },
  { id: 'library', title: 'Library', theme: 'library', size: 'lg', summary: 'A calm reading universe with fiction, reference and digital resources.', details: ['Age-graded collections', 'Reading corners and story area', 'Library periods for every class'], link: '/campus/facilities#library' },
  { id: 'indoor-games', title: 'Indoor Games', theme: 'games', size: 'sm', summary: 'Table tennis, chess, carrom and indoor activity spaces.', details: ['Supervised by sports staff', 'Chess club sessions'], link: '/campus/facilities#indoor-games' },
  { id: 'outdoor-sports', title: 'Outdoor Sports', theme: 'sports', size: 'lg', summary: 'Playing fields and courts for athletics, football, cricket and more.', details: ['Qualified coaches', 'Age-appropriate play areas', 'Annual sports day'], link: '/campus/facilities#outdoor-sports' },
  { id: 'art-music', title: 'Art & Music Studios', theme: 'music', size: 'md', summary: 'Studios for painting, sculpture, instrumental and vocal music.', details: ['Exhibition wall for student work', 'Instrument practice rooms'], link: '/campus/facilities#art-music' },
  { id: 'dance-drama', title: 'Dance & Drama', theme: 'drama', size: 'sm', summary: 'Sprung-floor movement room and drama space.', details: ['Rehearsal space for productions', 'Costume and props storage'], link: '/campus/facilities#dance-drama' },
  { id: 'auditorium', title: 'Auditorium', theme: 'auditorium', size: 'md', summary: 'A performance hall for assemblies, concerts and events.', details: ['Stage lighting and sound', 'Accessible seating'], link: '/campus/facilities#auditorium' },
  { id: 'cafeteria', title: 'Cafeteria', theme: 'cafeteria', size: 'sm', summary: 'A clean, airy dining space serving balanced meals (where offered).', details: ['Menu shared with parents', 'Hygiene checks'], link: '/campus/facilities#cafeteria' },
  { id: 'medical', title: 'Medical Room & First Aid', theme: 'medical', size: 'sm', summary: 'A medical room with first-aid provision during school hours.', details: ['Trained first-aid staff', 'Parent notification procedure'], link: '/campus/facilities#medical' },
  { id: 'transport', title: 'School Transport', theme: 'transport', size: 'md', summary: 'School bus routes with attendants (subject to route availability).', details: ['Route details on request', 'Attendant on every bus', 'Transport policy for parents'], link: '/campus/facilities#transport' },
  { id: 'accessible', title: 'Accessible Facilities', theme: 'accessible', size: 'sm', summary: 'Ramps, accessible washrooms and support for students with additional needs.', details: ['Step-free routes to key areas', 'Individual support planning'], link: '/campus/facilities#accessible' },
  { id: 'gardens', title: 'Gardens & Outdoor Learning', theme: 'garden', size: 'lg', summary: 'Kitchen gardens, a butterfly patch and outdoor classrooms.', details: ['Eco club garden plots', 'Outdoor amphitheatre for lessons'], link: '/campus/facilities#gardens' },
  { id: 'boarding', title: 'Boarding', theme: 'boarding', size: 'md', summary: 'Residential facilities with house parents.', details: ['Supervised residential life'], link: '/campus/facilities#boarding' },
]

export const facilities = all.filter((f) => f.id !== 'boarding' || school.offers.boarding).filter((f) => f.id !== 'transport' || school.offers.transport)
export const getFacility = (id: string) => facilities.find((f) => f.id === id)
