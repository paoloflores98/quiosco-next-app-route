"use client"

import useSWR from "swr"
import OrderCard from "@/components/order/OrderCard"
import Heading from "@/components/ui/Heading"
import { OrderWithProducts } from "@/src/types"

export default function OrdersPage() {
  const url = '/admin/orders/api'
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
      <Heading>Administrar órdenes</Heading>

      {data.length
        ? (
          <div className="grid grid-cols-1 lg:grid-cols-2 2xl:grid-cols-3 gap-5 mt-5">
            {data.map(order => (
              <OrderCard // Renderiza el componente
                key={order.id}
                order={order}
              />
            ))}
          </div>
        )
        : <p className="text-center">No hay órdenes pendientes</p>
      }
    </>
  )
}