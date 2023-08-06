import prismadb from "@/lib/prismadb"
import {format} from 'date-fns'

import { SizeClient } from "./components/client"
import { SizeColumn } from "./components/columns"

interface SizesPageProps {
    params: {
        storeId: string
    }
}

export default async function SizesPage({params}: SizesPageProps) {
    const sizes = await prismadb.size.findMany({
        where: {
            storeId: params.storeId
        },
        orderBy: {
            createdAt: 'desc'
        }
    })

    const formattedSizes: SizeColumn[] = sizes.map(s => ({
        id: s.id,
        createdAt: format(s.createdAt, 'MMMM do, yyyy'),
        name: s.name,
        value: s.value,
    }))

    return (
        <div className="flex-col max-w-[1320px] mx-auto">
            <div className="flex-1 p-8 space-y-4">
                <SizeClient data={formattedSizes} />
            </div>
        </div>
    )
}