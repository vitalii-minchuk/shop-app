import prismadb from "@/lib/prismadb"
import {format} from 'date-fns'

import { ColorClient } from "./components/client"
import { ColorColumn } from "./components/columns"

interface ColorsPageProps {
    params: {
        storeId: string
    }
}

export default async function ColorsPage({params}: ColorsPageProps) {
    const colors = await prismadb.color.findMany({
        where: {
            storeId: params.storeId
        },
        orderBy: {
            createdAt: 'desc'
        }
    })

    const formattedColors: ColorColumn[] = colors.map(c => ({
        id: c.id,
        createdAt: format(c.createdAt, 'MMMM do, yyyy'),
        name: c.name,
        value: c.value,
    }))

    return (
        <div className="flex-col max-w-[1320px] mx-auto">
            <div className="flex-1 p-8 space-y-4">
                <ColorClient data={formattedColors} />
            </div>
        </div>
    )
}