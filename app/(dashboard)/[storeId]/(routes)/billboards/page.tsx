import prismadb from "@/lib/prismadb"
import { BillboardClient } from "./components/client"

interface BillboardsPageProps {
    params: {
        storeId: string
    }
}

export default async function BillboardsPage({params}: BillboardsPageProps) {
    const billboards = await prismadb.billboard.findMany({
        where: {
            storeId: params.storeId
        }
    })
    
    console.log('%cpage.tsx line:16 object', 'color: #007acc;', billboards);
    return (
        <div className="flex-col max-w-[1320px] mx-auto">
            <div className="flex-1 p-8 pt-6 space-y-4">
                <BillboardClient />
            </div>
        </div>
    )
}