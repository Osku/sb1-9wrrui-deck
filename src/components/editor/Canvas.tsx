import React from 'react';
import { useDndContext, DndContext, DragEndEvent, DragStartEvent } from '@dnd-kit/core';
import { useCardStore } from '../../store/cardStore';
import { DesignElement } from './DesignElement';
import { restrictToParentElement } from '@dnd-kit/modifiers';

export function Canvas() {
  const { activeTemplate, updateElement } = useCardStore();

  const handleDragStart = (event: DragStartEvent) => {
    const { active } = event;
    const element = document.getElementById(active.id.toString());
    if (element) {
      element.style.opacity = '0.5';
    }
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, delta } = event;
    const element = document.getElementById(active.id.toString());
    if (element) {
      element.style.opacity = '1';
    }

    updateElement(active.id.toString(), {
      x: delta.x,
      y: delta.y,
    });
  };

  if (!activeTemplate) return null;

  return (
    <DndContext
      modifiers={[restrictToParentElement]}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
    >
      <div
        className="bg-white shadow-lg mx-auto relative"
        style={{
          width: activeTemplate.width,
          height: activeTemplate.height,
        }}
      >
        {activeTemplate.elements.map((element) => (
          <DesignElement key={element.id} element={element} />
        ))}
      </div>
    </DndContext>
  );
}