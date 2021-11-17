# @luozhu/geita

## Install

```sh
$ npm install @luozhu/geita -g
```

## 命令

### geita prune <file>

单独清理某个文件的所有历史记录。

清理完后需要将本地记录覆盖到 Github（所有 branch 以及所有 tags）

```sh
git push origin --force --all
git push origin --force --tags
```

5. 确保没有什么问题之后,强制解除对本地存储库中的所有对象的引用和垃圾收集

git for-each-ref --format='delete %(refname)' refs/original | git update-ref --stdin
git reflog expire --expire=now --all

————————————————
版权声明：本文为 CSDN 博主「JAVA|Mr.Java」的原创文章，遵循 CC 4.0 BY-SA 版权协议，转载请附上原文出处链接及本声明。
原文链接：https://blog.csdn.net/q258523454/article/details/83899911

- git gc --prune=now
