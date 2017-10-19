declare var UIImagePickerController: any;
import * as imageSource from 'tns-core-modules/image-source';
import * as frame from 'tns-core-modules/ui/frame';
import * as types from 'tns-core-modules/utils/types';

export class NativeImagePicker {
    private ctrl: UIImagePickerController = new UIImagePickerController();
    private listener;

    chooseMedia(includeVideo?:boolean) {
        return new Promise((resolve, reject) => {
            var reqWidth = 0;
            var reqHeight = 0;
            var keepAspectRatio = true;
            var saveToGallery = true;
            this.listener = UIImagePickerControllerDelegateImpl.new().initWithCallback(resolve);
            this.ctrl.delegate = this.listener;
            var sourceType = UIImagePickerControllerSourceType.PhotoLibrary;
            var mediaTypes:NSArray<any> = UIImagePickerController.availableMediaTypesForSourceType(sourceType);
            if (mediaTypes) {
                // when you want to allow the user to choose videos, change to:
                // imagePickerController.mediaTypes = mediaTypes;
                if (includeVideo) {
                    this.ctrl.mediaTypes = mediaTypes;
                } else {
                    this.ctrl.mediaTypes = [mediaTypes[0]];
                }
                
                this.ctrl.sourceType = sourceType;
            }
            this.ctrl.modalPresentationStyle = UIModalPresentationStyle.CurrentContext;

            var topMostFrame = frame.topmost();
            if (topMostFrame) {
                var viewController = topMostFrame.currentPage && topMostFrame.currentPage.ios;
                if (viewController) {
                    viewController.presentViewControllerAnimatedCompletion(this.ctrl, true, null);
                }
            }
        });
    }
}

class UIImagePickerControllerDelegateImpl extends NSObject implements UIImagePickerControllerDelegate {
    public static ObjCProtocols = [UIImagePickerControllerDelegate];
    
    static new(): UIImagePickerControllerDelegateImpl {
        return <UIImagePickerControllerDelegateImpl>super.new();
    }
    
    private _callback: (images?: imageSource.ImageSource) => void;
    
    public initWithCallback(callback: (images?: imageSource.ImageSource) => void): UIImagePickerControllerDelegateImpl {
        this._callback = callback;
        return this;
    }
    
    public imagePickerControllerDidFinishPickingMediaWithInfo(picker, info) {
        if (info) {
            var source:UIImage = info.valueForKey(UIImagePickerControllerOriginalImage);
            var path = info.valueForKey(UIImagePickerControllerReferenceURL);
            if (source) {
                var imageSourceResult = imageSource.fromNativeSource(source);
                this._callback(imageSourceResult);
            }
        }   
        picker.presentingViewController.dismissViewControllerAnimatedCompletion(true, null);
    }

    public imagePickerControllerDidCancel(picker) {
        console.log('canceled');
        picker.presentingViewController.dismissViewControllerAnimatedCompletion(true, null);
    }
}