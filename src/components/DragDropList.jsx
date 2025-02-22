import { useState } from "react";
import { DndContext, closestCenter } from "@dnd-kit/core";
import {
  SortableContext,
  arrayMove,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import SortableRow from "./SortableRow";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function DragDropList({ items, setItems }) {
  const [newRow, setNewRow] = useState({
    duration: "",
    guide: "",
    remarks: "",
  });

  const handleAddRow = () => {
    if (newRow.duration.trim() && newRow.guide.trim()) {
      setItems([...items, newRow]);
      setNewRow({ duration: "", guide: "", remarks: "" });
    }
  };

  const handleDeleteRow = (index) => {
    const updatedItems = items.filter((_, i) => i !== index);
    setItems(updatedItems);
  };

  const handleEditRow = (index, field, value) => {
    const updatedItems = [...items];
    updatedItems[index][field] = value;
    setItems(updatedItems);
  };

  const handleDragEnd = (event) => {
    const { active, over } = event;
    if (active.id !== over.id) {
      const oldIndex = items.findIndex((item) => item === active.id);
      const newIndex = items.findIndex((item) => item === over.id);
      setItems(arrayMove(items, oldIndex, newIndex));
    }
  };

  return (
    <div className="p-4 border rounded bg-gray-100">
      <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
        <SortableContext items={items} strategy={verticalListSortingStrategy}>
          {items.length > 0 && (
            <table className="w-full border-collapse border border-gray-300 bg-white">
              <thead>
                <tr className="bg-gray-200">
                  <th className="border border-gray-300 p-2">
                    Duration (Minutes)
                  </th>
                  <th className="border border-gray-300 p-2">Guide</th>
                  <th className="border border-gray-300 p-2">Remarks</th>
                  <th className="border border-gray-300 p-2">Actions</th>
                </tr>
              </thead>
              <tbody>
                {items.map((row, index) => (
                  <SortableRow
                    key={index}
                    id={row}
                    row={row}
                    index={index}
                    onEdit={handleEditRow}
                    onDelete={handleDeleteRow}
                  />
                ))}
              </tbody>
            </table>
          )}
        </SortableContext>
      </DndContext>

      <div className="flex gap-2 mt-4">
        <Input
          type="text"
          placeholder="Duration (e.g. 15 minutes)"
          value={newRow.duration}
          onChange={(e) => setNewRow({ ...newRow, duration: e.target.value })}
        />
        <Input
          type="text"
          placeholder="Guide"
          value={newRow.guide}
          onChange={(e) => setNewRow({ ...newRow, guide: e.target.value })}
        />
        <Input
          type="text"
          placeholder="Remarks (Optional)"
          value={newRow.remarks}
          onChange={(e) => setNewRow({ ...newRow, remarks: e.target.value })}
        />
        <Button onClick={handleAddRow} className="bg-blue-500 text-white">
          + Add
        </Button>
      </div>
    </div>
  );
}
