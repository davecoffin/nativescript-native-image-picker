// import * as ip from "nativescript-imagepicker";

export class NativeImagePicker {
    chooseMedia(includeVideo?:boolean) {
        return new Promise((resolve, reject) => {
            alert('Sorry, this plugin is not compatible with android yet.')
            resolve();
        })
    }
}