import {
  requireNativeComponent,
  UIManager,
  Platform,
  type ViewStyle,
} from 'react-native';

const LINKING_ERROR =
  `The package '@ankipro/react-native-canvas-view' doesn't seem to be linked. Make sure: \n\n` +
  Platform.select({ ios: "- You have run 'pod install'\n", default: '' }) +
  '- You rebuilt the app after installing the package\n' +
  '- You are not using Expo Go\n';

type ReactNativeCanvasViewProps = {
  color: string;
  style: ViewStyle;
};

const ComponentName = 'ReactNativeCanvasViewView';

export const ReactNativeCanvasViewView =
  UIManager.getViewManagerConfig(ComponentName) != null
    ? requireNativeComponent<ReactNativeCanvasViewProps>(ComponentName)
    : () => {
        throw new Error(LINKING_ERROR);
      };
