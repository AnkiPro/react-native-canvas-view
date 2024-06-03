import React, { useEffect, useRef, useState } from 'react';
import { Button, StyleSheet, View } from 'react-native';
import CanvasDrawView from '@ankipro/react-native-canvas-view';
import type {
  CanvasViewRef,
  CanvasViewUndoRedo,
} from '@ankipro/react-native-canvas-view';

export default function App() {
  const canvasViewRef = useRef<CanvasViewRef>(null);
  const [undoRedo, setUndoRedo] = useState<CanvasViewUndoRedo>({
    canUndo: false,
    canRedo: false,
  });

  useEffect(() => {
    canvasViewRef.current?.showToolbar();
  }, []);

  const performSave = () => {
    canvasViewRef.current?.getDrawingBase64((base64) => {
      console.log('Canvas base64: ', base64);
    });
  };

  const undo = () => canvasViewRef.current?.undo();

  const redo = () => canvasViewRef.current?.redo();

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Button title="Undo" onPress={undo} disabled={!undoRedo.canUndo} />
        <Button title="Save" onPress={performSave} />
        <Button title="Redo" onPress={redo} disabled={!undoRedo.canRedo} />
      </View>

      <CanvasDrawView
        ref={canvasViewRef}
        style={styles.canvas}
        onUndoRedoChange={setUndoRedo}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    position: 'absolute',
    top: 60,
    left: 20,
    right: 20,
    flexDirection: 'row',
    zIndex: 1,
    justifyContent: 'space-between',
  },
  canvas: {
    flex: 1,
  },
});
