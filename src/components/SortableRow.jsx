import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { Button } from "@/components/ui/button";

export default function SortableRow({ id, row, index, onEdit, onDelete }) {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <tr
      ref={setNodeRef}
      {...attributes}
      {...listeners}
      style={style}
      className="border border-gray-300"
    >
      <td className="border border-gray-300 p-2">
        <input
          type="text"
          value={row.duration}
          onChange={(e) => onEdit(index, "duration", e.target.value)}
          className="w-full p-1 border rounded"
        />
      </td>
      <td className="border border-gray-300 p-2">
        <input
          type="text"
          value={row.guide}
          onChange={(e) => onEdit(index, "guide", e.target.value)}
          className="w-full p-1 border rounded"
        />
      </td>
      <td className="border border-gray-300 p-2">
        <input
          type="text"
          value={row.remarks}
          onChange={(e) => onEdit(index, "remarks", e.target.value)}
          className="w-full p-1 border rounded"
        />
      </td>
      <td className="border border-gray-300 p-2 text-center">
        <Button
          onClick={() => onDelete(index)}
          className="bg-red-500 text-white px-3 py-1"
        >
          Delete
        </Button>
      </td>
    </tr>
  );
}
