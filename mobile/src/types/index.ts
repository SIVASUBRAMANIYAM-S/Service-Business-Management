export type CategoryGroup = 'home_services' | 'healthcare';

export type Category = {
  id: string;
  group: CategoryGroup;
  name: string;
  icon: string;
};

export type Business = {
  id: string;
  categoryId: string;
  name: string;
  rating: number;
  distanceKm: number;
};

export type Service = {
  id: string;
  businessId: string;
  name: string;
  priceRupees: number;
  durationMinutes: number;
};

export type BookingStatus = 'pending' | 'confirmed' | 'completed' | 'cancelled';

export type Booking = {
  id: string;
  serviceId: string;
  businessName: string;
  serviceName: string;
  status: BookingStatus;
  scheduledAt: string;
};
