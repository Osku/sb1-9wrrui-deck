import { create } from 'zustand';
import { CardTemplate, CardElement } from '../types/card';

interface CardStore {
  activeTemplate: CardTemplate | null;
  templates: CardTemplate[];
  setActiveTemplate: (template: CardTemplate) => void;
  addElement: (element: CardElement) => void;
  updateElement: (elementId: string, updates: Partial<CardElement>) => void;
  removeElement: (elementId: string) => void;
}

export const useCardStore = create<CardStore>((set) => ({
  activeTemplate: null,
  templates: [],
  setActiveTemplate: (template) => set({ activeTemplate: template }),
  addElement: (element) =>
    set((state) => ({
      activeTemplate: state.activeTemplate
        ? {
            ...state.activeTemplate,
            elements: [...state.activeTemplate.elements, element],
          }
        : null,
    })),
  updateElement: (elementId, updates) =>
    set((state) => ({
      activeTemplate: state.activeTemplate
        ? {
            ...state.activeTemplate,
            elements: state.activeTemplate.elements.map((el) =>
              el.id === elementId ? { ...el, ...updates } : el
            ),
          }
        : null,
    })),
  removeElement: (elementId) =>
    set((state) => ({
      activeTemplate: state.activeTemplate
        ? {
            ...state.activeTemplate,
            elements: state.activeTemplate.elements.filter((el) => el.id !== elementId),
          }
        : null,
    })),
}));