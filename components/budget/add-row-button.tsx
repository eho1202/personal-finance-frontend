import { Button } from '../ui/button'

const AddRowBtn = ({ onClick }: { onClick: () => void }) => {
    return (
        <Button
            variant="ghost"
            onClick={onClick}
            className="w-full rounded-none border-t font-normal"
        >
            + Add row
        </Button>
    )
}

export default AddRowBtn