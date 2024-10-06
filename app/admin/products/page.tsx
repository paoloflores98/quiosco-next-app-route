import { redirect } from "next/navigation"
import ProductsPagination from "@/components/products/ProductsPagination"
import ProductTable from "@/components/products/ProductTable"
import Heading from "@/components/ui/Heading"
import { prisma } from "@/src/lib/prisma"
import Link from "next/link"
import ProductSearchForm from "@/components/products/ProductSearchForm"

async function productCount() {
  return await prisma.product.count()
}

async function getProducts(page: number, pageSize: number) {
  const skip = (page - 1) * pageSize

  const products = await prisma.product.findMany({
    take: pageSize, // Limitar productos
    skip, // Saltar prodcutos
    include: {
      category: true
    }
  })
  return products
}

// Type que describe una lista de productos con la información de sus categorías, una vez que la promesa de getProducts se haya resuelto
export type ProductsWithCategory = Awaited<ReturnType<typeof getProducts>>

export default async function ProductsPage({searchParams}: {searchParams: {page: string}}) {
  const page = +searchParams.page || 1
  const pageSize = 10

  if(page < 0) redirect('/admin/products')

  const productsData = await getProducts(page, pageSize)
  const totalProductsData = await productCount()
  const [products, totalProducts] = await Promise.all([productsData, totalProductsData])
  const totalPages = Math.ceil(totalProducts / pageSize)

  if(page > totalPages) redirect('/admin/products')

  return (
    <>
      <Heading>Administrar productos</Heading> {/* Renderiza el componente */}

      <div className="flex flex-col lg:flex-row lg:justify-between gap-5">
        <Link
          className="bg-amber-400 w-full lg:w-auto text-xl px-10 py-3 text-center font-bold cursor-pointer"
          href={'/admin/products/new'}
        >Crear producto</Link>
        <ProductSearchForm /> {/* Renderiza el componente */}
      </div>

      <ProductTable products={products} /> {/* Renderiza el componente */}
      <ProductsPagination page={page} totalPages={totalPages} /> {/* Renderiza el componente */}
    </>
  )
}