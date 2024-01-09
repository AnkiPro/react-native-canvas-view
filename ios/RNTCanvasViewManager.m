#import "RNTCanvasViewManager.h"

#import <PencilKit/PKCanvasView.h>
#import <PencilKit/PKToolPicker.h>

#import <React/RCTUIManager.h>

#import "APCanvasView.h"

static void getAPCanvasView(RCTUIManager *uiManager, NSNumber *reactTag, void(^callback)(APCanvasView *)) {
  [uiManager addUIBlock:^(RCTUIManager *uiManager, NSDictionary<NSNumber *,UIView *> *viewRegistry) {
    UIView *view = viewRegistry[reactTag];
    if (!view || ![view isKindOfClass:[APCanvasView class]]) {
      RCTLogError(@"Cannot find APCanvasView with tag #%@", reactTag);
      return;
    }
    APCanvasView *canvasView = (APCanvasView *)view;
    callback(canvasView);
  }];
}

@implementation RNTCanvasViewManager

RCT_EXPORT_MODULE(RNTCanvasView)

- (UIView *)view
{
  return [APCanvasView new];
}

RCT_EXPORT_METHOD(showToolbar:(nonnull NSNumber *)reactTag) {
  getAPCanvasView(self.bridge.uiManager, reactTag, ^(APCanvasView * canvasView) {
    [canvasView showToolbar];
  });
}

RCT_EXPORT_METHOD(hideToolbar:(nonnull NSNumber *)reactTag) {
  getAPCanvasView(self.bridge.uiManager, reactTag, ^(APCanvasView * canvasView) {
    [canvasView hideToolbar];
  });
}

RCT_EXPORT_METHOD(getDrawing:(nonnull NSNumber *)reactTag callback:(RCTResponseSenderBlock)callback) {
  getAPCanvasView(self.bridge.uiManager, reactTag, ^(APCanvasView * canvasView) {
    UITraitCollection *traitCollection = [UITraitCollection traitCollectionWithUserInterfaceStyle:UIUserInterfaceStyleLight];
    [traitCollection performAsCurrentTraitCollection:^{
      UIImage *drawing = [canvasView getDrawing];
      NSData *drawingData = UIImageJPEGRepresentation(drawing, 1.0);
      NSString *drawingBase64 = [drawingData base64EncodedStringWithOptions:kNilOptions];
      callback(@[drawingBase64]);
    }];
  });
}

RCT_EXPORT_METHOD(undo:(nonnull NSNumber *)reactTag) {
  getAPCanvasView(self.bridge.uiManager, reactTag, ^(APCanvasView * canvasView) {
    [canvasView undo];
  });
}

RCT_EXPORT_METHOD(redo:(nonnull NSNumber *)reactTag) {
  getAPCanvasView(self.bridge.uiManager, reactTag, ^(APCanvasView * canvasView) {
    [canvasView redo];
  });
}

RCT_EXPORT_VIEW_PROPERTY(onUndoRedoChange, RCTBubblingEventBlock)

@end
