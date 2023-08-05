"use client"

import { FC, useEffect, useState } from "react"
import { Modal } from "@/components/ui/modal"
import { Button } from "@/components/ui/button"

interface AlertModalProps {
    isOpen: boolean
    loading: boolean
    onClose: () => void
    onConfirm: () => void
}

export const AlertModal: FC<AlertModalProps> = ({isOpen, onClose, loading, onConfirm}) => {
    const [isMounted, setIsMounted] = useState(false)

    useEffect(() => {
        setIsMounted(true)
    }, [])

    if (!isMounted) return null

return (
        <Modal
            title="Are you sure?"
            description="This action can not be undone"
            isOpen={isOpen}
            onClose={onClose}
        >
            <div className="pt-6 w-full space-x-2 flex justify-end items-center">
                <Button variant="outline" disabled={loading} onClick={onClose}>
                    Cancel
                </Button>
                <Button variant="destructive" disabled={loading} onClick={onConfirm}>
                    Continue
                </Button>
            </div>
        </Modal>
    )
}