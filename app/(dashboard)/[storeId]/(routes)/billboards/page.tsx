import prismadb from "@/lib/prismadb"
import {format} from 'date-fns'

import { BillboardClient } from "./components/client"
import { BillboardColumn } from "./components/columns"

interface BillboardsPageProps {
    params: {
        storeId: string
    }
}

export default async function BillboardsPage({params}: BillboardsPageProps) {
    const billboards = await prismadb.billboard.findMany({
        where: {
            storeId: params.storeId
        },
        orderBy: {
            createdAt: 'desc'
        }
    })

    const formattedBillboards: BillboardColumn[] = billboards.map(b => ({
        id: b.id,
        label: b.label,
        createdAt: format(b.createdAt, 'MMMM do, yyyy'),
    }))

    return (
        <div className="flex-col max-w-[1320px] mx-auto">
            <div className="flex-1 p-8 space-y-4">
                <BillboardClient data={formattedBillboards} />
            </div>
        </div>
    )
}