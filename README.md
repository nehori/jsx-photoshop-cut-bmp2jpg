photoshop-cut-bmp2jpg-jsx
==============

## 用途 ##

指定したフォルダの画像(*.bmp)全てに対して、PhotoShopに登録されたアクション（"アクション 3", "セット 1"）を適用して、指定したフォルダにJPGとして保存するスクリプト

アクションは適時作成してください。今回の場合は次の手順で作成します。

    1) 「アクションの作成」を開始
    2) 選択範囲で、画像の少し内側を選び [イメージ→切り抜き] を行う（スキャンの仕方によっては「角度を補正して切り抜き」が失敗するため）
    3) 切り分けたい画像を開き、[ファイル→自動処理→角度を補正して切り抜き]を実行

## 利用方法 ## 

    (1) ファイルをダウンロード
    (2) スクリプト上の4行～6行目を変更する
        4行目：処理したいファイルの拡張子（jpgの場合には"*.jpg"と記載する）
        5行目：処理したいアクション名を記述する
        6行目：処理したいアクションのセット名を記述する
    (3) PhotoShopを起動する
    (4) 「ファイル」→「スクリプト」→「参照」で保存しておいたスクリプトを選択
    (5) 「処理したいファイルのあるフォルダ」を選択
    (6) 「処理したファイルを保存したいフォルダ」を選択
    (7) 自動的に処理が走ります

## License
Copyright 2016 nehori.

Licensed under the Apache License, Version 2.0 (the "License");
You may not use this file except in compliance with the License.
You may obtain a copy of the License at

   http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
