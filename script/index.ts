import ApkBuilder from "../src"
import path from 'path'

const builder = ApkBuilder.Create({
  src: path.resolve("D:\\desktop\\code\\apk-builder-template\\src\\main"),
  dist: path.resolve("D:\\desktop\\code\\apk-builder-template\\dist"),
  androidJar: path.resolve("D:\\Engpath\\android\\platforms\\android-29\\android.jar"),
  buildTools: path.resolve('D:\\Engpath\\android\\build-tools\\29.0.3'),
  sign: {
    key: path.resolve('D:\\desktop\\code\\apk-builder-template\\script\\cert\\app.pk8'),
    cert: path.resolve('D:\\desktop\\code\\apk-builder-template\\script\\cert\\app.x509.pem')
  }
})

builder.watch()