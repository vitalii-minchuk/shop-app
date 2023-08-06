import prismadb from "@/lib/prismadb"

import { BillboardForm } from "./components/billboard-form"

interface BillboardPageProps {
    params: {
        billboardId: string
    }
}

export default async function BillboardsPage({params}: BillboardPageProps) {
    const billboard = await prismadb.billboard.findUnique({
        where: {
            id: params.billboardId
        }
    })

    console.log('%cpage.tsx line:17 object', 'color: #007acc;', billboard);
    return (
        <div className="flex-col max-w-[1320px] mx-auto">
            <div className="flex-1 p-8 pt-6 space-y-4">
                <BillboardForm initialData={billboard} />
            </div>
        </div>
    )
}