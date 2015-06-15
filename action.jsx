/**
 * Copyright (c) 2015 Kazutaka Yasuda
 * Released under the MIT license
 * http://opensource.org/licenses/mit-license.php
 */
/**
   ユーザの変更値（ユーザ毎に変更が必要）
**/
IMG_EXTENSION = "*.bmp";
ACTION_NAME   = "アクション 3";
SET_NAME      = "セット 1";

/**
  任意の設定追加（指定方法は次の通り）
  C:\Users\Public → /C/Users/Public/
  C:\Users\User\Desktop\フォルダ → ~/Desktop/フォルダ/
**/
INPUT_FOLDER  = ""; // 処理したいファイルが存在するフォルダ
OUTPUT_FOLDER = ""; // 処理後のファイルを保存するフォルダ

/**
   桁あわせ（0で埋める）
   @param   桁数
**/
Number.prototype.fillZero = function(n) {
   var r = this.toString().split('');
   while(r.length < n) {
      r.unshift('0');
   }
   return r.join('');
}

/**
   JPGで保存する
   @param   ファイル名
**/
function saveAsJPG( Name ) {
   var fileObj = new File( Name );
   var jpegOpt = new JPEGSaveOptions();
   jpegOpt.embedColorProfile = true;
   jpegOpt.quality = 12;
   jpegOpt.formatOptions = FormatOptions.PROGRESSIVE;
   jpegOpt.scans = 3;
   jpegOpt.matte = MatteType.NONE;
   activeDocument.saveAs(fileObj, jpegOpt, true, Extension.LOWERCASE);
}

/**
   登録済みのアクションを実行する。
   @param   Actn      アクション名
   @param   ActSet    アクションセット名
**/
function doAction( Actn, ActSet )
{
   var actRef = new ActionReference();
   actRef.putName( charIDToTypeID( "Actn" ), Actn );
   actRef.putName( charIDToTypeID( "ASet" ), ActSet );
   var actDesc = new ActionDescriptor();
   actDesc.putReference( charIDToTypeID( "null" ), actRef );
   executeAction( charIDToTypeID( "Ply " ), actDesc, DialogModes.NO );
}

/**
   ファイルを閉じる
**/
function doFinsh() {
   activeDocument.close(SaveOptions.DONOTSAVECHANGES);
}

/**
   フォルダを選択
**/
function selectFolder( Comment ) {
   var folderObj = Folder.selectDialog( Comment );
   return folderObj;
}

/**
   ファイルを開く
**/
function doOpen(fileName) {
   var fileRef = new File(fileName);
   open (fileRef);
   fileRef = null;
}

/********** PhotoShop向け ***************/
if (BridgeTalk.appName == "photoshop") {
   main();
}

function main() {
   var inPath, outPath;
   if (INPUT_FOLDER == "") {
      inPath = selectFolder("処理したいファイルが存在するフォルダを選択");
   } else {
      inPath = new Folder(INPUT_FOLDER);
   }
   if (OUTPUT_FOLDER == "") {
      outPath = selectFolder("処理後のファイルを保存するフォルダを選択");
   } else {
      outPath = new Folder(OUTPUT_FOLDER);
   }
   var fileList = inPath.getFiles(IMG_EXTENSION);
   var i;
   for (i = 0; i < fileList.length; i ++) {
      // 元ファイルを保存する
      doOpen(inPath + "/" + fileList[i].name);
      // ファイル名の取得（拡張子を削除）
      var myName = fileList[i].name.split(".")[0];
      saveAsJPG(outPath + "/" + myName + ".jpg");
      while (documents.length) {
         // 開いたファイルにアクションを適用
         doAction(ACTION_NAME, SET_NAME);
         var num = 1;
         while (documents.length > 1) {
            // 分割されたファイルを保存する
            saveAsJPG(outPath + "/"  + myName + "_" + num++ + ".jpg");
            doFinsh();
         }
         doFinsh();
      }
   }
}
