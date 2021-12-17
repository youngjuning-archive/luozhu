# @luozhu/geita

## Install

```sh
$ npm install @luozhu/geita -g
```

## Commands

### `geita prune-file <file>`

单独清理某个文件的所有历史记录。

清理完后需要将本地记录覆盖到 Github（所有 branch 以及所有 tags）

```sh
$ git reflog expire --expire=now --all
$ git for-each-ref --format='delete %(refname)' refs/original | git update-ref --stdin
$ git gc --prune=now
$ git push origin --force --all
$ git push origin --force --tags
```

确保没有什么问题之后,强制解除对本地存储库中的所有对象的引用和垃圾收集：

```sh
$ git gc --prune=now
```

### `geita prune-msg <msg>`

清理 commit message 中的敏感信息。
