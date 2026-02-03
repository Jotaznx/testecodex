# Rodízio de Pizza na Moto

Web app responsivo (mobile-first) estilo marketplace para rodízio itinerante de pizzas. Motoboys percorrem rotas por bairros, atualizam sabores ao vivo e o cliente reserva para pegar no portão quando o motoboy estiver chegando.

## Stack

- Next.js (App Router) + TypeScript
- TailwindCSS
- TanStack Query (React Query)
- Zod

## Como rodar

```bash
npm install
npm run dev
```

Acesse `http://localhost:3000`.

## Credenciais mock

Use o login por telefone + código (qualquer código válido):

- Cliente: `11999990001`
- Motoboy: `11999990002`
- Admin: `11999990003`

## Fluxo principal (cliente)

1. Entre na landing e selecione o bairro/CEP.
2. Visualize motoboys ativos com ETA e sabores ao vivo.
3. Escolha um motoboy, selecione combo e sabores.
4. Faça o checkout informando referência do portão e pagamento.
5. Acompanhe o status do pedido na timeline.

## Funcionalidades mock

- **API Routes** com dados em memória para usuários, motoboys, sabores, rotas, pedidos e avaliações.
- **Autenticação mock** com papéis (cliente/motoboy/admin) controlando telas.
- **Estados de UI**: loading, empty, erro, pedidos atrasados.
- **Live updates**: ETA e sabores atualizados com intervalos/polling.
