import React from 'react';
import { DndContext, useDraggable, useDroppable } from '@dnd-kit/core';
import { useCardStore } from '../store/cardStore';
import { PlusCircle, Image, Type } from 'lucide-react';

export function CardEditor() {
  const { activeTemplate, addElement } = useCardStore();

  const handleAddText = () => {
    addElement({
      id: crypto.randomUUID(),
      type: 'text',
      x: 0,
      y: 0,
      width: 100,
      height: 30,
      content: 'New Text',
    });
  };

  const handleAddImage = () => {
    addElement({
      id: crypto.randomUUID(),
      type: 'image',
      x: 0,
      y: 0,
      width: 200,
      height: 200,
      content: 'https://source.unsplash.com/random/200x200',
    });
  };

  if (!activeTemplate) {
    return (
      <div className="flex items-center justify-center h-full">
        <p className="text-gray-500">Select or create a template to begin</p>
      </div>
    );
  }

  return (
    <div className="flex h-full">
      <div className="w-64 bg-white border-r border-gray-200 p-4">
        <h2 className="text-lg font-semibold mb-4">Tools</h2>
        <div className="space-y-2">
          <button
            onClick={handleAddText}
            className="w-full flex items-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg"
          >
            <Type size={20} />
            Add Text
          </button>
          <button
            onClick={handleAddImage}
            className="w-full flex items-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg"
          >
            <Image size={20} />
            Add Image
          </button>
        </div>
      </div>
      
      <div className="flex-1 p-8 bg-gray-50">
        <div
          className="bg-white shadow-lg mx-auto"
          style={{
            width: activeTemplate.width,
            height: activeTemplate.height,
            position: 'relative',
          }}
        >
          {activeTemplate.elements.map((element) => (
            <div
              key={element.id}
              className="absolute border border-gray-200"
              style={{
                left: element.x,
                top: element.y,
                width: element.width,
                height: element.height,
              }}
            >
              {element.type === 'text' && (
                <p style={element.style}>{element.content}</p>
              )}
              {element.type === 'image' && (
                <img
                  src={element.content}
                  alt=""
                  className="w-full h-full object-cover"
                />
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}