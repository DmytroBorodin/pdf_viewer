import { useGeneratePdfContext } from "@/app/providers/generatePdfProvider";
import {
  DragDropContext,
  Draggable,
  Droppable,
  DropResult,
} from "@hello-pangea/dnd";
import classes from "./styles.module.css";

export default function DraggableList() {
  const { pdfFiles, deletePdf, setPdfs } = useGeneratePdfContext();

  const handleDragEnd = (result: DropResult) => {
    if (!result.destination) return;

    const updatedItems = [...pdfFiles];
    const [movedItem] = updatedItems.splice(result.source.index, 1);
    updatedItems.splice(result.destination.index, 0, movedItem);

    setPdfs(updatedItems);
  };

  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <Droppable droppableId="pdfList">
        {(provided) => (
          <ul
            style={{
              height: pdfFiles.length * 40,
            }}
            className={classes.songs}
            {...provided.droppableProps}
            ref={provided.innerRef}
          >
            {pdfFiles.map((item, index) => (
              <Draggable
                key={item.title + item.key}
                draggableId={item.title + item.key}
                index={index}
              >
                {(provided) => (
                  <li
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                  >
                    {item.title} ({item.key})
                    <button onClick={() => deletePdf(item.title, item.key)}>
                      X
                    </button>
                  </li>
                )}
              </Draggable>
            ))}
          </ul>
        )}
      </Droppable>
    </DragDropContext>
  );
}
