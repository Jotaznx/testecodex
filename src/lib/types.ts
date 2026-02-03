export type Role = 'cliente' | 'motoboy' | 'admin';

export type User = {
  id: string;
  role: Role;
  name: string;
  phone: string;
};

export type Flavor = {
  id: string;
  name: string;
  tags: string[];
  allergens: string[];
};

export type FlavorStock = {
  flavorId: string;
  availableQty: number;
};

export type Route = {
  id: string;
  name: string;
  neighborhoods: string[];
};

export type Rider = {
  id: string;
  name: string;
  rating: number;
  active: boolean;
  routeId: string;
  etaMin: number;
  menuLive: FlavorStock[];
  photoUrl: string;
};

export type OrderStatus =
  | 'CRIADO'
  | 'CONFIRMADO'
  | 'A_CAMINHO'
  | 'CHEGOU_NO_PORTAO'
  | 'ENTREGUE'
  | 'CANCELADO';

export type OrderItem = {
  flavorId: string;
  qty: number;
};

export type Order = {
  id: string;
  userId: string;
  riderId: string;
  items: OrderItem[];
  combo: string;
  payment: 'Pix' | 'Cartao' | 'Dinheiro';
  gateReference: string;
  status: OrderStatus;
  createdAt: string;
};

export type Review = {
  id: string;
  orderId: string;
  rating: number;
  comment: string;
};
