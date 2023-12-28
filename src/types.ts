import type { NativeSyntheticEvent, StyleProp, ViewStyle } from 'react-native';

export type CanvasViewUndoRedo = {
  canUndo: boolean;
  canRedo: boolean;
};

export type RNTUndoRedoChangeEvent = NativeSyntheticEvent<CanvasViewUndoRedo>;
export type RNTOnUndoRedoChange = (event: RNTUndoRedoChangeEvent) => void;

export type RNTCanvasViewProps = {
  style?: StyleProp<ViewStyle>;
  onUndoRedoChange?: RNTOnUndoRedoChange;
};

export type CanvasViewRef = {
  showToolbar: () => void;
  hideToolbar: () => void;
  undo: () => void;
  redo: () => void;
  getDrawingBase64: (onComplete: (base64: string) => void) => void;
};

export type CanvasViewProps = {
  style?: StyleProp<ViewStyle>;
  onUndoRedoChange: (undoRedo: CanvasViewUndoRedo) => void;
};
