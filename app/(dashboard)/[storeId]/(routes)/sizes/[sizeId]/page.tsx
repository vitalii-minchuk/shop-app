import prismadb from "@/lib/prismadb"

import { SizeForm } from "./components/size-form"

interface SizePageProps {
    params: {
        sizeId: string
    }
}

export default async function SizePage({params}: SizePageProps) {
    const size = await prismadb.size.findUnique({
        where: {
            id: params.sizeId
        }
    })

    return (
        <div className="flex-col max-w-[1320px] mx-auto">
            <div className="flex-1 p-8 pt-6 space-y-4">
                <SizeForm initialData={size} />
            </div>
        </div>
    )
}