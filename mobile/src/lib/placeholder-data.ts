import type { Business, Category, Service } from '@/types';

// Static placeholder data so screens have something to render before
// Phase 2 connects them to real Supabase tables.
export const CATEGORIES: Category[] = [
  { id: 'ac-repair', group: 'home_services', name: 'AC Repair', icon: '❄️' },
  { id: 'plumbing', group: 'home_services', name: 'Plumbing', icon: '🔧' },
  { id: 'electrical', group: 'home_services', name: 'Electrical', icon: '💡' },
  { id: 'cleaning', group: 'home_services', name: 'Cleaning', icon: '🧹' },
  { id: 'pest-control', group: 'home_services', name: 'Pest Control', icon: '🐜' },
  { id: 'appliance-repair', group: 'home_services', name: 'Appliance Repair', icon: '🛠️' },
  { id: 'clinic', group: 'healthcare', name: 'Clinics', icon: '🏥' },
  { id: 'dentist', group: 'healthcare', name: 'Dentists', icon: '🦷' },
  { id: 'physiotherapy', group: 'healthcare', name: 'Physiotherapists', icon: '🧑‍⚕️' },
  { id: 'veterinary', group: 'healthcare', name: 'Veterinary', icon: '🐾' },
];

export const BUSINESSES: Business[] = [
  { id: 'biz-1', categoryId: 'ac-repair', name: 'CoolFix AC Services', rating: 4.6, distanceKm: 2.1 },
  { id: 'biz-2', categoryId: 'ac-repair', name: 'Chill Masters', rating: 4.3, distanceKm: 3.4 },
  { id: 'biz-3', categoryId: 'plumbing', name: 'QuickFlow Plumbers', rating: 4.5, distanceKm: 1.8 },
];

export const SERVICES: Service[] = [
  { id: 'svc-1', businessId: 'biz-1', name: 'AC Gas Refill', priceRupees: 1200, durationMinutes: 60 },
  { id: 'svc-2', businessId: 'biz-1', name: 'AC General Service', priceRupees: 500, durationMinutes: 45 },
  { id: 'svc-3', businessId: 'biz-3', name: 'Tap Repair', priceRupees: 300, durationMinutes: 30 },
];
