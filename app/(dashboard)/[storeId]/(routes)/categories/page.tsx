import prismadb from "@/lib/prismadb"
import { format } from "date-fns"

import { CategoryColumn } from "./components/columns"
import { CategoryClient } from "./components/client"

interface CategoriesPageProps {
    params: {
        storeId: string
    }
}

export default async function CategoriesPage({params}: CategoriesPageProps) {
    const categories = await prismadb.category.findMany({
        where: {
            storeId: params.storeId
        },
        include: {
            billboard: true
        },
        orderBy: {
            createdAt: 'desc'
        }
    })

    const formattedCategories: CategoryColumn[] = categories.map(c => ({
        id: c.id,
        name: c.name,
        billboardLabel: c.billboard.label,
        createdAt: format(c.createdAt, 'MMMM do, yyyy'),
    }))

    return (
        <div className="flex-col max-w-[1320px] mx-auto">
            <div className="flex-1 p-8 space-y-4">
                <CategoryClient data={formattedCategories} />
            </div>
        </div>
    )
}