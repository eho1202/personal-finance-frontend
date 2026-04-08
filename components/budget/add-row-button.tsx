import { Button } from '../ui/button'

const AddRowBtn = ({ onClick, isEditing }: { onClick: () => void; isEditing: boolean; }) => {
    return (
        <Button
            variant="ghost"
            onClick={onClick}
            disabled={!isEditing}
            className="w-full rounded-none border-t font-normal"
        >
            + Add row
        </Button>
    )
}

export default AddRowBtn