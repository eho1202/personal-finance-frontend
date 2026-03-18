"use client"

import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { FieldGroup } from "@/components/ui/field"
import ETLUpload from "./etl-upload"
import { useRouter } from "next/navigation"
import { useState } from "react"

interface FileUploadDialogProps {
    trigger?: React.ReactNode
    children?: React.ReactNode
}

export function FileUploadDialog({ trigger, children }: FileUploadDialogProps) {
    const router = useRouter()
    const [open, setOpen] = useState(false)

    const handleSuccess = () => {
        setOpen(false)
        router.refresh()
    }

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                {trigger ?? <Button variant="outline">Upload a Statement</Button>}
            </DialogTrigger>
            {children}
            <DialogContent className="bg-card sm:max-w-sm">
                <DialogHeader>
                    <DialogTitle>Upload a Credit Card Statement</DialogTitle>
                    <DialogDescription>
                        Upload your past credit card statements.
                    </DialogDescription>
                </DialogHeader>
                <FieldGroup>
                    <ETLUpload onSuccess={handleSuccess} />
                </FieldGroup>
                <DialogFooter>
                    <DialogClose asChild>
                        <Button variant="outline" className="w-full">Close</Button>
                    </DialogClose>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}