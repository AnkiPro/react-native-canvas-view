#import "APCanvasView.h"

#import <PencilKit/PencilKit.h>

@interface APCanvasView () <PKCanvasViewDelegate>

@end

@implementation APCanvasView {
  PKCanvasView *_canvasView;
  PKToolPicker *_toolPicker;
}

- (instancetype)init {
  if (self = [super init]) {
    _canvasView = [PKCanvasView new];
    [_canvasView setBackgroundColor:[UIColor whiteColor]];
    _canvasView.drawingPolicy = PKCanvasViewDrawingPolicyAnyInput;
    _canvasView.overrideUserInterfaceStyle = UIUserInterfaceStyleLight;
    _canvasView.delegate = self;
    [self addSubview:_canvasView];
    _canvasView.frame = self.bounds;
    _canvasView.autoresizingMask = UIViewAutoresizingFlexibleWidth | UIViewAutoresizingFlexibleHeight;

    _toolPicker = [PKToolPicker new];
    _toolPicker.overrideUserInterfaceStyle = UIUserInterfaceStyleLight;
  }
  return self;
}

- (void)showToolbar {
  [_toolPicker setVisible:YES forFirstResponder:_canvasView];
  [_toolPicker addObserver:_canvasView];
  [_canvasView becomeFirstResponder];
}

- (void)hideToolbar {
  [_toolPicker setVisible:NO forFirstResponder:_canvasView];
  [_toolPicker removeObserver:_canvasView];
  [_canvasView resignFirstResponder];
}

- (UIImage *)getDrawing {
  return [_canvasView.drawing imageFromRect:self.bounds scale:1.0];
}

- (void)undo {
  [_canvasView.undoManager undo];
  [self notifyUndoRedo];
}

- (void)redo {
  [_canvasView.undoManager redo];
  [self notifyUndoRedo];
}

# pragma mark - Internal

- (void)notifyUndoRedo {
  BOOL canUndo = _canvasView.undoManager.canUndo;
  BOOL canRedo = _canvasView.undoManager.canRedo;
  if (self.onUndoRedoChange) {
    self.onUndoRedoChange(@{@"canUndo": @(canUndo), @"canRedo": @(canRedo)});
  }
}

# pragma mark - PKCanvasViewDelegate

- (void)canvasViewDrawingDidChange:(PKCanvasView *)canvasView {
  [self notifyUndoRedo];
};

@end
