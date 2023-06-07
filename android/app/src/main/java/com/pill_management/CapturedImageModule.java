package com.pill_management;

import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.WritableMap;
import com.facebook.react.bridge.Arguments;
import com.facebook.react.bridge.Promise;

public class CapturedImageModule extends ReactContextBaseJavaModule {

    public CapturedImageModule(ReactApplicationContext reactContext) {
        super(reactContext);
    }

    @Override
    public String getName() {
        return "CapturedImageModule";
    }

    @ReactMethod
    public void getCapturedImagePath(Promise promise) {
        WritableMap params = Arguments.createMap();
        params.putString("capturedImagePath", Cam.capturedImagePath);
        promise.resolve(params);
    }
}