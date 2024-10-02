import ProductCard from "@/components/products/ProductCard"
import { prisma } from "@/src/lib/prisma"

type OrderPageProps = {
  params: {category: string}
}

async function getProducts(category: string) {
  const products = await prisma.product.findMany({
    where: {
      category: {
        slug: category // Obetener los productos que tienen el slug de Category
      }
    }
  })

  return products
}

export default async function OrderPage({params}: OrderPageProps) {
  const products = await getProducts(params.category)

  return (
    <>
      <h1 className="text-2xl my-10">Elige y personaliza tu pedido a continuación</h1>
      <div className="grid grid-cols-1 lg:grid-cols-2 2xl:grid-cols-3 gap-4 items-start">
        {products.map(product => (
          <ProductCard // Renderiza el componente
            key={product.id}
            product={product}
          />
        ))}
      </div>
    </>
  )
}