import { configureStore } from '@reduxjs/toolkit';
import { useDispatch, TypedUseSelectorHook, useSelector } from 'react-redux';
import kanbanSlice from '../redux/kanbanSlice';
export const kanbanStore = configureStore({
  reducer: {
    kanban: kanbanSlice.reducer,
  },
});

export type RootState = ReturnType<typeof kanbanStore.getState>;
export type AppDispatch = typeof kanbanStore.dispatch;

export const useKanbanDispatch: () => AppDispatch = useDispatch;
export const useKanbanSelector: TypedUseSelectorHook<RootState> = useSelector;