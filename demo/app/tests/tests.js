var NativeImagePicker = require("nativescript-native-image-picker").NativeImagePicker;
var nativeImagePicker = new NativeImagePicker();

describe("greet function", function() {
    it("exists", function() {
        expect(nativeImagePicker.greet).toBeDefined();
    });

    it("returns a string", function() {
        expect(nativeImagePicker.greet()).toEqual("Hello, NS");
    });
});