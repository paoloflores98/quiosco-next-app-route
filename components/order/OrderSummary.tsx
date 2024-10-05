"use client"

import { useMemo } from "react"
import { toast } from "react-toastify"
import { useStore } from "@/src/store"
import ProductDetails from "./ProductDetails"
import { formatCurrency } from "@/src/utils"
import { createOrder } from "@/actions/create-order-action"
import { OrderSchema } from "@/src/schema"

export default function OrderSummary() {
  const { order, clearOrder } = useStore()

  const total = useMemo(() => order.reduce((total, item) => total + (item.quantity * item.price), 0), [order])

  // formaData: Se incluye auto. en los actions y su type FormData es propio de Next.js
  const handleCreateOrder = async (formData: FormData) => {
    toast.dismiss(); // Evitar múltiples mensajes

    const data = {
      name: formData.get('name'),
      total,
      order
    }

    // Validar desde el cliente
    const result = OrderSchema.safeParse(data) // Validar el esquema de Zod
    if(!result.success) {
      result.error.issues.forEach((issue) => { // Iterar todos los errores que muestra Zod
        toast.error(issue.message)
      })
      return
    }  
    
    // Validar desde el servidor
    const response = await createOrder(data)
    if(response?.errors) {
      response.errors.forEach((issue) => { // Iterar todos los errores que muestra Zod
        toast.error(issue.message)
      })
    }

    toast.success('Pedido realizado correctamente')
    clearOrder() // Reiniciar el formulario
  }

  return (
    <aside className="lg:h-screen lg:overflow-y-scroll md:w-64 lg:w-96 p-5">
      <h1 className="text-4xl text-center font-black">Mi pedido</h1>

      {order.length == 0
        ? <p className="text-center my-10">El pedido está vacío</p>
        : (
          <div className="mt-5">
            {order.map(item => (
              <ProductDetails // Renderiza el componente
                key={item.id}
                item={item}
              />
            ))}

            <p className="text-2xl mt-10 text-center">
              Total a pagar: {''}
              <span className="font-bold">{formatCurrency(total)}</span>
            </p>

            <form
              className="w-full mt-10 space-y-5"
              action={handleCreateOrder}
            >
              <input
                className="bg-white border border-gray-100 p-2 w-full"
                type="text"
                name="name"
                placeholder="Tu nombre" />

              <input
                className="py-2 rounded uppercase text-white bg-black w-full text-center cursor-pointer font-bold"
                type="submit"
                value="Confirmar pedido" />
            </form>
          </div>
        )
      }
    </aside>
  )
}