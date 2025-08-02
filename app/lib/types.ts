export interface Product {
  id: number;
  title: string;
  description: string;
  price: number;
  photo: string;
  user: {
    username: string;
    avatar: string | null;
  };
  user_id: number;
}

export interface User {
  id: number;
  username: string;
  avatar: string | null;
}
