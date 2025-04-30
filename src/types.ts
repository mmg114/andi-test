export interface Service {
  id: number;
  name: string;
  price: number;
  description: string;
  longDescription?: string[];
  image: string;
  category: string;
  duration: string;
  provider: {
    name: string;
    rating: number;
    reviews: number;
    experience?: string;
    specialties?: string[];
  };
}

export interface CartItem extends Service {
  quantity: number;
}