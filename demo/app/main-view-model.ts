import { Observable } from 'tns-core-modules/data/observable';
import { NativeImagePicker } from 'nativescript-native-image-picker';

export class HelloWorldModel extends Observable {
    private nativeImagePicker: NativeImagePicker;
    public imageSrc;

    constructor() {
        super();

        this.nativeImagePicker = new NativeImagePicker();
    }

    choosePhoto() {
        this.nativeImagePicker.chooseMedia(false).then(image => {
            this.set('imageSrc', image);
        });
    }
}
