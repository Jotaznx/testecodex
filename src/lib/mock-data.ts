import { Flavor, Order, Rider, Route, User, Review } from './types';

export const users: User[] = [
  { id: 'u1', role: 'cliente', name: 'Camila Souza', phone: '11999990001' },
  { id: 'u2', role: 'motoboy', name: 'Diego Lopes', phone: '11999990002' },
  { id: 'u3', role: 'admin', name: 'Marina Costa', phone: '11999990003' }
];

export const routes: Route[] = [
  {
    id: 'r1',
    name: 'Rota Centro',
    neighborhoods: ['Centro', 'Bela Vista', 'Liberdade']
  },
  {
    id: 'r2',
    name: 'Rota Norte',
    neighborhoods: ['Santana', 'Tucuruvi', 'Casa Verde']
  },
  {
    id: 'r3',
    name: 'Rota Sul',
    neighborhoods: ['Moema', 'Vila Mariana', 'Saúde']
  }
];

export const flavors: Flavor[] = [
  { id: 'f1', name: 'Marguerita', tags: ['clássica'], allergens: ['lactose'] },
  { id: 'f2', name: 'Calabresa', tags: ['apimentada'], allergens: ['lactose'] },
  { id: 'f3', name: 'Quatro Queijos', tags: ['cremosa'], allergens: ['lactose'] },
  { id: 'f4', name: 'Frango com Catupiry', tags: ['cremosa'], allergens: ['lactose'] },
  { id: 'f5', name: 'Chocolate com Morango', tags: ['doce'], allergens: ['lactose'] },
  { id: 'f6', name: 'Portuguesa', tags: ['clássica'], allergens: ['lactose', 'ovo'] }
];

export const riders: Rider[] = [
  {
    id: 'm1',
    name: 'Rafa Moto',
    rating: 4.8,
    active: true,
    routeId: 'r1',
    etaMin: 12,
    photoUrl: '/riders/rider-1.png',
    menuLive: [
      { flavorId: 'f1', availableQty: 12 },
      { flavorId: 'f2', availableQty: 8 },
      { flavorId: 'f4', availableQty: 6 }
    ]
  },
  {
    id: 'm2',
    name: 'Bruna Flash',
    rating: 4.9,
    active: true,
    routeId: 'r2',
    etaMin: 18,
    photoUrl: '/riders/rider-2.png',
    menuLive: [
      { flavorId: 'f3', availableQty: 10 },
      { flavorId: 'f5', availableQty: 4 },
      { flavorId: 'f6', availableQty: 5 }
    ]
  },
  {
    id: 'm3',
    name: 'Léo Express',
    rating: 4.6,
    active: false,
    routeId: 'r3',
    etaMin: 0,
    photoUrl: '/riders/rider-3.png',
    menuLive: []
  }
];

export const orders: Order[] = [
  {
    id: 'o1',
    userId: 'u1',
    riderId: 'm1',
    items: [
      { flavorId: 'f1', qty: 2 },
      { flavorId: 'f2', qty: 2 }
    ],
    combo: '8 fatias',
    payment: 'Pix',
    gateReference: 'Portão preto, casa 12',
    status: 'A_CAMINHO',
    createdAt: new Date().toISOString()
  }
];

export const reviews: Review[] = [
  { id: 'rev1', orderId: 'o1', rating: 5, comment: 'Chegou rápido e quentinho!' }
];
