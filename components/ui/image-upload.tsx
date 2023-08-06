'use client'

import { FC, useEffect, useState } from "react"
import { ImagePlus, Trash } from "lucide-react"
import Image from "next/image"
import { CldUploadWidget } from "next-cloudinary"

import { Button } from "./button"

interface ImageUploadProps {
    disabled?: boolean
    onChange: (value: string) => void
    onRemove: (value: string) => void
    values: string[]
}

export const ImageUpload: FC<ImageUploadProps> = ({
    disabled,
    onChange,
    onRemove,
    values
}) => {
    const [isMounted, setIsMounted] = useState(false)

    useEffect(() => {
        setIsMounted(true)
    }, [])

    const onUpload = (result: any) => {
        onChange(result.info.secure_url)
    }

    if (!isMounted) return null

  return (
    <div>
        <div className="nb-4 flex items-center gap-4">
            {values.map((url) => (
                <div key={url} className="relative w-[200px] h-[200px] rounded-md overflow-hidden">
                    <div className="z-10 absolute top-2 right-2">
                        <Button
                            type="button"
                            variant="destructive"
                            size="icon"
                            onClick={() => onRemove(url)}
                        >
                            <Trash className="h-4 w-4" />
                        </Button>
                    </div>
                    <Image
                    fill
                    src={url}
                    alt="image"
                    className="object-cover"
                    />
                </div>
            ))}
        </div>
        <CldUploadWidget
            onUpload={onUpload}
            uploadPreset="lldqjaep"
        >
            {({open}) => {
                const onClick = () => {
                    open()
                }

                return (
                    <Button
                        type="button"
                        variant="secondary"
                        disabled={disabled}
                        onClick={onClick}
                    >
                        <ImagePlus className="h-4 w-4 mr-2" />
                        Upload an image
                    </Button>
                )
            }}
        </CldUploadWidget>
    </div>
  )
}
