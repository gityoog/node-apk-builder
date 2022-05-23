import ApkBuilder from "../src"
import path from 'path'

const builder = ApkBuilder.Create({
  src: path.resolve("D:\\desktop\\code\\android.app\\src\\main"),
  dist: path.resolve("D:\\desktop\\code\\android.app\\dist"),
  androidJar: path.resolve("D:\\Engpath\\android\\platforms\\android-29\\android.jar"),
  buildTools: path.resolve('D:\\Engpath\\android\\build-tools\\29.0.3'),
  sign: {
    key: path.resolve('D:\\desktop\\code\\android.app\\script\\cert\\app.pk8'),
    cert: path.resolve('D:\\desktop\\code\\android.app\\script\\cert\\app.x509.pem')
  }
})

builder.watch()