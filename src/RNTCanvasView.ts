import { Platform, NativeModules, requireNativeComponent } from 'react-native';
import type { RNTCanvasViewProps } from './types';
import type { HostComponent } from 'react-native';

const LINKING_ERROR =
  `The package '@ankipro/react-native-canvas-view' doesn't seem to be linked. Make sure: \n\n` +
  Platform.select({ ios: "- You have run 'pod install'\n", default: '' }) +
  '- You rebuilt the app after installing the package\n';

const NativeComponentName = 'RNTCanvasView';

let RNTCanvasView: HostComponent<RNTCanvasViewProps> | undefined;
if (NativeComponentName in NativeModules.UIManager) {
  RNTCanvasView =
    requireNativeComponent<RNTCanvasViewProps>(NativeComponentName);
} else {
  throw new Error(LINKING_ERROR);
}

export default RNTCanvasView;
// export default RNTCanvasView;
