"use client"

import { useEffect } from "react";

import { Modal } from "@/components/ui/modal";
import { useStoreModal } from "@/hooks/use-store-modal";

export default function Home() {
  const isOpen = useStoreModal(state => state.isOpen)
  const onOpen = useStoreModal(state => state.onOpen)

  useEffect(() => {
    if (!isOpen) {
      onOpen()
    }
  }, [isOpen, onOpen])

  return (
    <main>
      Root Page
    </main>
  )
}
  