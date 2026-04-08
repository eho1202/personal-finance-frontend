import React from 'react'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '../ui/dropdown-menu'
import { IconDotsVertical } from '@tabler/icons-react'
import { Button } from '../ui/button'

const DeleteBtn = ({ onClick, isEditing }: { onClick: () => void; isEditing: boolean; }) => {
    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button
                    variant="ghost"
                    disabled={!isEditing}
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