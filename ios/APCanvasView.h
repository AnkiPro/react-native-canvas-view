// Copyright © 2023 Vedas Apps Ltd. All rights reserved.

#import <UIKit/UIKit.h>

#import <React/RCTComponent.h>

NS_ASSUME_NONNULL_BEGIN

@interface APCanvasView : UIView

- (void)showToolbar;
- (void)hideToolbar;
- (UIImage *)getDrawing;
- (void)undo;
- (void)redo;

@property (nonatomic, copy) RCTBubblingEventBlock onUndoRedoChange;

@end

NS_ASSUME_NONNULL_END
