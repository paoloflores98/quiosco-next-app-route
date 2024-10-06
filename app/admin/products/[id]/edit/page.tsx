import EditProductForm from "@/components/products/EditProductForm"
import ProductForm from "@/components/products/ProductForm"
import GoBackButton from "@/components/ui/GoBackButton"
import Heading from "@/components/ui/Heading"
import { prisma } from "@/src/lib/prisma"
import Link from "next/link"
import { notFound } from "next/navigation"

async function getProductById(id: number) {
  const product = await prisma.product.findUnique({
    where: {
      id
    }
  })

  if(!product) {
    notFound() // Redirigir a la plantilla not-found.tsx
  }

  return product
}

export default async function EditProductsPage({params}: {params: {id: string}}) {
  const product = await getProductById(+params.id)

  return (
    <>
      <Heading>Editar producto: {product.name}</Heading>

      <GoBackButton /> {/* Renderiza el componente */}

      <EditProductForm>
        <ProductForm product={product} /> {/* Renderiza el componente del servidor desde el cliente */}
      </EditProductForm>
    </>
  )
}