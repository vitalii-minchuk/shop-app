import { UserButton } from "@clerk/nextjs"
import { MainNav } from "@/components/navbar/main-nav"

export const Navbar = () => {
  return (
    <div className="border-b">
        <div className="h-16 max-w-[1320px] mx-auto flex items-center px-4 gap-3">
           <div>
d
           </div>
           <MainNav className="mx-6" />
           <div className="ml-auto flex items-center space-x-3">
                <UserButton />
           </div>
        </div>
    </div>
  )
}
