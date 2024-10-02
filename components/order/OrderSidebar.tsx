import { prisma } from "@/src/lib/prisma";
import CategoryIcon from "../ui/CategoryIcon";

async function getCategories() {
  return await prisma.category.findMany() // Obtener las categorías
}

export default async function OrderSidebar() {
  const categories = await getCategories()

  return (
    <aside className="md:w-72 md:h-screen bg-white">
      <nav className="mt-10"> 
        {categories.map(category => (
          <CategoryIcon // Renderiza el componente
            key={category.id}
            category={category}
          />
        ))}
      </nav>
    </aside>
  )
}