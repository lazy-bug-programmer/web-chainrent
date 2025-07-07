export interface Testimonial {
  $id: string;
  name: string;
  position: string;
  content: string;
  rating: TestimonialRating;
  status: TestimonialStatus;
  created_at: Date;
}

export enum TestimonialStatus {
  ACTIVE,
  INACTIVE,
}

export enum TestimonialRating {
  ONE,
  TWO,
  THREE,
  FOUR,
  FIVE,
}
