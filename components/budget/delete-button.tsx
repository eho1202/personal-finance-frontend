import React from 'react'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '../ui/dropdown-menu'
import { IconDotsVertical } from '@tabler/icons-react'
import { Button } from '../ui/button'

const DeleteBtn = ({ onClick }: { onClick: () => void; }) => {
    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button
                    variant="ghost"
                    className="flex text-muted-foreground data-[state=open]:bg-muted"
                    size="icon"
                >
                    <IconDotsVertical />
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
                <DropdownMenuItem variant='destructive' onClick={onClick}>Delete</DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}

export default DeleteBtn