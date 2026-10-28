#!/bin/bash
set -e

PROJECT_ROOT="$(pwd)"
SDK_ROOT="/home/gian-juti-tripura/Android/Sdk"
BUILD_TOOLS="$SDK_ROOT/build-tools/34.0.0"
PLATFORM="$SDK_ROOT/platforms/android-34"
ANDROID_JAR="$PLATFORM/android.jar"
KEYSTORE="/home/gian-juti-tripura/.android/debug.keystore"

AAPT2="$BUILD_TOOLS/aapt2"
D8="$BUILD_TOOLS/d8"
ZIPALIGN="$BUILD_TOOLS/zipalign"
APKSIGNER="$BUILD_TOOLS/apksigner"

BUILD_DIR="$PROJECT_ROOT/tmp/apk_build"

echo "=== TSF.BD ADMISSION COACHING - FRESH CLEAN APK BUILDER ==="
echo "0. Cleaning previous temporary build caches..."
rm -rf "$BUILD_DIR"
mkdir -p "$BUILD_DIR/assets"
mkdir -p "$BUILD_DIR/res/values"
mkdir -p "$BUILD_DIR/res/values-bn"
mkdir -p "$BUILD_DIR/res/drawable"
mkdir -p "$BUILD_DIR/src/org/tsfbd/coaching"
mkdir -p "$BUILD_DIR/bin/classes"
mkdir -p "$BUILD_DIR/gen"

echo "1. Building Web Application & PWA with relative base..."
"$PROJECT_ROOT/node_modules/.bin/vite" build

echo "2. Copying Fresh Web Assets to Android assets/ directory..."
cp -r "$PROJECT_ROOT/dist"/* "$BUILD_DIR/assets/"
rm -f "$BUILD_DIR/assets"/*.apk "$BUILD_DIR/assets"/*.apk.idsig

echo "3. Generating AndroidManifest.xml and Resources with package org.tsfbd.coaching..."
cat << 'XML' > "$BUILD_DIR/AndroidManifest.xml"
<?xml version="1.0" encoding="utf-8"?>
<manifest xmlns:android="http://schemas.android.com/apk/res/android"
    package="org.tsfbd.coaching"
    android:versionCode="2"
    android:versionName="2.0.0">

    <uses-sdk android:minSdkVersion="21" android:targetSdkVersion="34" />

    <uses-permission android:name="android.permission.INTERNET" />
    <uses-permission android:name="android.permission.ACCESS_NETWORK_STATE" />
    <uses-permission android:name="android.permission.READ_EXTERNAL_STORAGE" />
    <uses-permission android:name="android.permission.WRITE_EXTERNAL_STORAGE" />

    <application
        android:label="@string/app_name"
        android:icon="@drawable/ic_launcher"
        android:hardwareAccelerated="true"
        android:theme="@android:style/Theme.DeviceDefault.NoActionBar">
        <activity
            android:name=".MainActivity"
            android:label="@string/app_name"
            android:configChanges="orientation|screenSize|keyboardHidden|screenLayout"
            android:exported="true">
            <intent-filter>
                <action android:name="android.intent.action.MAIN" />
                <category android:name="android.intent.category.LAUNCHER" />
            </intent-filter>
        </activity>
    </application>
</manifest>
XML

cat << 'XML' > "$BUILD_DIR/res/values/strings.xml"
<?xml version="1.0" encoding="utf-8"?>
<resources>
    <string name="app_name">TSF BD Coaching</string>
</resources>
XML

cat << 'XML' > "$BUILD_DIR/res/values-bn/strings.xml"
<?xml version="1.0" encoding="utf-8"?>
<resources>
    <string name="app_name">টিএসএফ.বিডি ভর্তি কোচিং</string>
</resources>
XML

# Copy launcher icon
cp "$PROJECT_ROOT/public/pwa-192x192.png" "$BUILD_DIR/res/drawable/ic_launcher.png"

echo "4. Generating MainActivity.java under org.tsfbd.coaching..."
cat << 'JAVA' > "$BUILD_DIR/src/org/tsfbd/coaching/MainActivity.java"
package org.tsfbd.coaching;

import android.app.Activity;
import android.content.Context;
import android.content.Intent;
import android.net.ConnectivityManager;
import android.net.NetworkInfo;
import android.net.Uri;
import android.os.Bundle;
import android.view.KeyEvent;
import android.view.Window;
import android.view.WindowManager;
import android.webkit.WebSettings;
import android.webkit.WebView;
import android.webkit.WebViewClient;
import android.webkit.WebChromeClient;

public class MainActivity extends Activity {
    private WebView webView;
    private static final String LIVE_URL = "https://tsf-coaching-hub.web.app";
    private static final String OFFLINE_URL = "file:///android_asset/index.html";

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        requestWindowFeature(Window.FEATURE_NO_TITLE);
        getWindow().setFlags(WindowManager.LayoutParams.FLAG_FULLSCREEN, WindowManager.LayoutParams.FLAG_FULLSCREEN);

        webView = new WebView(this);
        setContentView(webView);

        WebSettings settings = webView.getSettings();
        settings.setJavaScriptEnabled(true);
        settings.setDomStorageEnabled(true);
        settings.setDatabaseEnabled(true);
        settings.setAllowFileAccess(true);
        settings.setAllowContentAccess(true);
        settings.setAllowFileAccessFromFileURLs(true);
        settings.setAllowUniversalAccessFromFileURLs(true);
        settings.setUseWideViewPort(true);
        settings.setLoadWithOverviewMode(true);
        settings.setCacheMode(WebSettings.LOAD_DEFAULT);

        webView.setWebChromeClient(new WebChromeClient());
        webView.setWebViewClient(new WebViewClient() {
            @Override
            public boolean shouldOverrideUrlLoading(WebView view, String url) {
                if (url.startsWith(LIVE_URL) || url.startsWith("file:///android_asset") || url.startsWith("https://tsf-coaching-hub.firebaseapp.com")) {
                    view.loadUrl(url);
                    return true;
                }
                try {
                    Intent intent = new Intent(Intent.ACTION_VIEW, Uri.parse(url));
                    startActivity(intent);
                } catch (Exception e) {
                    view.loadUrl(url);
                }
                return true;
            }

            @Override
            public void onReceivedError(WebView view, int errorCode, String description, String failingUrl) {
                if (failingUrl != null && failingUrl.startsWith(LIVE_URL)) {
                    view.loadUrl(OFFLINE_URL);
                }
            }
        });

        if (isNetworkAvailable()) {
            webView.loadUrl(LIVE_URL);
        } else {
            webView.loadUrl(OFFLINE_URL);
        }
    }

    private boolean isNetworkAvailable() {
        try {
            ConnectivityManager cm = (ConnectivityManager) getSystemService(Context.CONNECTIVITY_SERVICE);
            if (cm != null) {
                NetworkInfo netInfo = cm.getActiveNetworkInfo();
                return netInfo != null && netInfo.isConnected();
            }
        } catch (Exception ignored) {}
        return false;
    }

    @Override
    public boolean onKeyDown(int keyCode, KeyEvent event) {
        if (keyCode == KeyEvent.KEYCODE_BACK && webView.canGoBack()) {
            webView.goBack();
            return true;
        }
        return super.onKeyDown(keyCode, event);
    }
}
JAVA

echo "5. Compiling Android Resources with AAPT2..."
"$AAPT2" compile --dir "$BUILD_DIR/res" -o "$BUILD_DIR/compiled_res.zip"

echo "6. Linking Package and Packaging Assets..."
rm -f "$BUILD_DIR/bin/app-unaligned.apk" "$BUILD_DIR/bin/app-aligned.apk"
"$AAPT2" link -I "$ANDROID_JAR" \
    --manifest "$BUILD_DIR/AndroidManifest.xml" \
    -o "$BUILD_DIR/bin/app-unaligned.apk" \
    -A "$BUILD_DIR/assets" \
    --java "$BUILD_DIR/gen" \
    --auto-add-overlay \
    "$BUILD_DIR/compiled_res.zip"

echo "7. Compiling Java Source..."
rm -rf "$BUILD_DIR/bin/classes"/*
javac -cp "$ANDROID_JAR:$BUILD_DIR/gen" -d "$BUILD_DIR/bin/classes" \
    "$BUILD_DIR/src/org/tsfbd/coaching/MainActivity.java" \
    "$BUILD_DIR/gen/org/tsfbd/coaching/R.java"

echo "8. Translating to Dalvik Bytecode with D8..."
"$D8" --output "$BUILD_DIR/bin/" "$ANDROID_JAR" "$BUILD_DIR/bin/classes/org/tsfbd/coaching/"*.class

echo "9. Injecting classes.dex into APK..."
(cd "$BUILD_DIR/bin" && zip -uj app-unaligned.apk classes.dex)

echo "10. ZipAligning APK..."
"$ZIPALIGN" -f -p 4 "$BUILD_DIR/bin/app-unaligned.apk" "$BUILD_DIR/bin/app-aligned.apk"

echo "11. Signing APK with Keystore..."
"$APKSIGNER" sign \
    --ks "$KEYSTORE" \
    --ks-pass pass:android \
    --key-pass pass:android \
    --out "$PROJECT_ROOT/TSF_BD_Coaching_2026.apk" \
    "$BUILD_DIR/bin/app-aligned.apk"

echo "12. Verifying APK Signature..."
"$APKSIGNER" verify --verbose "$PROJECT_ROOT/TSF_BD_Coaching_2026.apk"

echo "=== FRESH CLEAN BUILD SUCCESSFUL ==="
ls -lh "$PROJECT_ROOT/TSF_BD_Coaching_2026.apk"
