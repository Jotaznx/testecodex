import { useQuery } from '@tanstack/react-query';
import type { Flavor, Order, Rider, Route, Review } from '@/lib/types';

const fetcher = async <T,>(url: string): Promise<T> => {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error('Erro ao carregar dados');
  }
  return response.json() as Promise<T>;
};

export function useRiders(neighborhood?: string) {
  return useQuery({
    queryKey: ['riders', neighborhood],
    queryFn: () =>
      fetcher<{ riders: Rider[] }>(
        `/api/riders${neighborhood ? `?neighborhood=${neighborhood}` : ''}`
      )
  });
}

export function useRoutes() {
  return useQuery({
    queryKey: ['routes'],
    queryFn: () => fetcher<{ routes: Route[] }>('/api/routes')
  });
}

export function useFlavors() {
  return useQuery({
    queryKey: ['flavors'],
    queryFn: () => fetcher<{ flavors: Flavor[] }>('/api/flavors')
  });
}

export function useOrders() {
  return useQuery({
    queryKey: ['orders'],
    queryFn: () => fetcher<{ orders: Order[] }>('/api/orders')
  });
}

export function useReviews() {
  return useQuery({
    queryKey: ['reviews'],
    queryFn: () => fetcher<{ reviews: Review[] }>('/api/reviews')
  });
}
