"use client"

import { Product } from "@prisma/client"
import { useStore } from "@/src/store"

type AddProductButtonProps = {
  product: Product
}

export default function AddProductButton({product}: AddProductButtonProps) {
  const { addToOrder } = useStore()

  return (
    <button
      className="bg-indigo-600 hover:bg-indigo-700 text-white w-full mt-5 p-3 uppercase font-bold cursor-pointer"
      type="button"
      onClick={() => addToOrder(product)}
    >Agregar</button>
  )
}