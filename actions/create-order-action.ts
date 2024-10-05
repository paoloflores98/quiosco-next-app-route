"use server"

import { prisma } from "@/src/lib/prisma"
import { OrderSchema } from "@/src/schema"

export async function createOrder(data: unknown) {
  const result = OrderSchema.safeParse(data) // Validar el esquema de Zod

  if(!result.success) {
    return {
      errors: result.error.issues // Retornar todos los errores que muestra Zod
    }
  }

  try {
    await prisma.order.create({
      data: {
        name: result.data.name,
        total: result.data.total,
        orderProducts: {
          create: result.data.order.map(product => ({
            productId: product.id,
            quantity: product.quantity
          }))
        }
      }
    })
  }catch(error) {
    console.log(error)
  }
}