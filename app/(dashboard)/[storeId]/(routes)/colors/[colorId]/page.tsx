import prismadb from "@/lib/prismadb"

import { ColorForm } from "./components/color-form"

interface ColorPageProps {
    params: {
        colorId: string
    }
}

export default async function ColorPage({params}: ColorPageProps) {
    const color = await prismadb.color.findUnique({
        where: {
            id: params.colorId
        }
    })

    return (
        <div className="flex-col max-w-[1320px] mx-auto">
            <div className="flex-1 p-8 pt-6 space-y-4">
                <ColorForm initialData={color} />
            </div>
        </div>
    )
}