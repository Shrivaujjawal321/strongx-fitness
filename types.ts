
export interface Service {
  id: string;
  name: string;
  image: string;
  description: string;
}

export interface Trainer {
  id: string;
  name: string;
  role: string;
  image: string;
}

export interface Transformation {
  id: string;
  name: string;
  age: number;
  duration: string;
  weight: { before: string; after: string };
  bodyFat: { before: string; after: string };
  images: { before: string; after: string };
}

export interface ApiResponse<T> {
  data: T;
  error?: string;
}
