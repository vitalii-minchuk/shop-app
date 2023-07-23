"use client"

import { ComponentPropsWithoutRef, FC, useState } from "react"
import { useParams, useRouter } from "next/navigation"
import { Store } from "@prisma/client"
import { CheckIcon, ChevronsUpDownIcon, PlusCircle, Store as StoreIcon } from "lucide-react"

import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { useStoreModal } from "@/hooks/use-store-modal"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
    CommandSeparator
} from "@/components/ui/command"
    
type PopoverTriggerProps = ComponentPropsWithoutRef<typeof PopoverTrigger>

interface StoreSwitcherProps extends PopoverTriggerProps {
    items: Store[]
}

export const StoreSwitcher: FC<StoreSwitcherProps> = ({
    className,
    items = []
}) => {
    const [open, setOpen] = useState(false)
    const storeModal = useStoreModal()
    const params = useParams()
    const router = useRouter()

    const formattedItems = items.map(item => ({
        label: item.name,
        value: item.id
    }))
    const currentStore = formattedItems.find(item => item.value === params.storeId)

    const onStoreSelect = (store: typeof currentStore) => {
        setOpen(false)
        router.push(`/${store?.value}`)
    }

    return (
        <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
                <Button
                    size="sm"
                    role="combobox"
                    variant="outline"
                    aria-expanded={open}
                    aria-label="Select a store"
                    className={cn('w-[200px] justify-between', className)}
                >
                    <StoreIcon className="h-4 w-4 mr-2" />
                    {currentStore?.label}
                    <ChevronsUpDownIcon className="w-4 h-4 shrink-0 ml-auto opacity-50" />
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-[200px] p-0">
                <Command>
                    <CommandList>
                        <CommandInput placeholder="Search store ..."/>
                        <CommandEmpty>No store found</CommandEmpty>
                        <CommandGroup heading="Stores">
                            {formattedItems.map(item => (
                                <CommandItem
                                    key={item.value}
                                    className="text-sm"
                                    onSelect={() => onStoreSelect(item)}
                                >
                                    {item.label}
                                    <CheckIcon
                                        className={cn(
                                            'ml-auto h-4 w-4',
                                            currentStore?.value === item.value
                                                ? 'opacity-95'
                                                : 'opacity-0'
                                        )}
                                    />
                                </CommandItem>
                            ))}
                        </CommandGroup>
                    </CommandList>
                    <CommandSeparator />
                    <CommandList>
                        <CommandGroup>
                            <CommandItem
                                onSelect={() => {
                                    setOpen(false)
                                    storeModal.onOpen()
                                }}
                            >
                                <PlusCircle className="h-5 w-5 mr-2" />
                                Create Store
                            </CommandItem>
                        </CommandGroup>
                    </CommandList>
                </Command>
            </PopoverContent>
        </Popover>
    )
}
