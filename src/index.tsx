import React, {
  Component,
  forwardRef,
  useImperativeHandle,
  useRef,
} from 'react';
import type { ForwardedRef } from 'react';
import type { NativeMethods } from 'react-native';
import { findNodeHandle, NativeModules } from 'react-native';
import type {
  CanvasViewRef,
  CanvasViewProps,
  RNTCanvasViewProps,
  RNTUndoRedoChangeEvent,
} from './types';
import RNTCanvasView from './RNTCanvasView';

type RefType = Component<RNTCanvasViewProps> & Readonly<NativeMethods>;

function CanvasView(
  { onUndoRedoChange, style }: CanvasViewProps,
  ref: ForwardedRef<CanvasViewRef>
) {
  const canvasViewRef = useRef<RefType>(null);

  useImperativeHandle(ref, () => ({
    showToolbar: () => {
      NativeModules.RNTCanvasView.showToolbar(
        findNodeHandle(canvasViewRef.current)
      );
    },
    hideToolbar: () => {
      NativeModules.RNTCanvasView.hideToolbar(
        findNodeHandle(canvasViewRef.current)
      );
    },
    undo: () => {
      NativeModules.RNTCanvasView.undo(findNodeHandle(canvasViewRef.current));
    },
    redo: () => {
      NativeModules.RNTCanvasView.redo(findNodeHandle(canvasViewRef.current));
    },
    getDrawingBase64: (onComplete) => {
      NativeModules.RNTCanvasView.getDrawing(
        findNodeHandle(canvasViewRef.current),
        onComplete
      );
    },
  }));

  const handleOnUndoRedoChange = ({ nativeEvent }: RNTUndoRedoChangeEvent) => {
    onUndoRedoChange(nativeEvent);
  };

  return RNTCanvasView ? (
    <RNTCanvasView
      ref={canvasViewRef}
      style={style}
      onUndoRedoChange={handleOnUndoRedoChange}
    />
  ) : null;
}

export default forwardRef(CanvasView);

export type {
  CanvasViewRef,
  CanvasViewProps,
  CanvasViewUndoRedo,
} from './types';
