import { UserButton, auth } from "@clerk/nextjs"

import { redirect } from "next/navigation"
import prismadb from "@/lib/prismadb"

import { MainNav } from "@/components/navbar/main-nav"
import { StoreSwitcher } from "@/components/navbar/store-switcher"

export const Navbar = async () => {
    const {userId} = auth()

    if(!userId) {
        redirect('/sign-in')
    }

    const stores= await prismadb.store.findMany({
        where: {
            userId
        }
    })
  return (
    <div className="border-b">
        <div className="h-16 max-w-[1320px] mx-auto flex items-center px-4 gap-3">
           <StoreSwitcher items={stores} />
           <MainNav className="mx-6" />
           <div className="ml-auto flex items-center space-x-3">
                <UserButton />
           </div>
        </div>
    </div>
  )
}
