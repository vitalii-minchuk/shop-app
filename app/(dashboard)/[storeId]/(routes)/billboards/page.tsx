import prismadb from "@/lib/prismadb"
import { auth } from "@clerk/nextjs"
import { redirect } from "next/navigation"

import { BillboardClient } from "./components/billboard-client"

interface BillboardsPageProps {
    params: {
        storeId: string
    }
}

export default async function BillboardsPage({params}: BillboardsPageProps) {
    const {userId} = auth()

    if (!userId) {
        redirect('/sign-in')
    }

    const billboards = await prismadb.billboard.findMany({
        where: {
            storeId: params.storeId,
        }
    })

    // if (!store) {
    //     redirect('/')
    // }
console.log('%cpage.tsx line:27 object', 'color: #007acc;', billboards);
    return (
        <div className="flex-col max-w-[1320px] mx-auto">
            <div className="flex-1 p-8 pt-6 space-y-4">
                <BillboardClient />
            </div>
        </div>
    )
}