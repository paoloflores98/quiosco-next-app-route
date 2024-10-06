"use client"

import useSWR from "swr";
import Logo from "@/components/ui/Logo";
import { OrderWithProducts } from "@/src/types";
import LatesOrderItem from "@/components/order/LatesOrderItem";

export default function OrdersPage() {
  const url = '/orders/api'
  const fetcher = () => fetch(url)
    .then(response => response.json())
    .then(data => data)
  const { data, isLoading } = useSWR<OrderWithProducts[]>(url, fetcher, {
    refreshInterval: 10000, // 10 segundos para no rebalsar el plan gratuito
    revalidateOnFocus: false // No consultar cuando cambias las ventanas
  })

  if(isLoading) return <p>Cargando...</p>

  if(data) return (
    <>
      <h1 className="text-center mt-20 text-6xl font-black">Órdenes listas</h1>
      <Logo />

      {data.length
        ? (
          <div className="grid grid-cols-2 gap-5 max-w-5xl mx-auto mt-10">
            {data.map(order =>(
              <LatesOrderItem
                key={order.id}
                order={order}
              />
            ))}
          </div>
        )
        : <p className="text-center my-10">No hay órdenes listas </p>
      }
    </>
  )
}