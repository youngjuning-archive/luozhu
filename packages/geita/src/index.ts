import { program } from 'commander';
import execa from 'execa';
import fs from 'fs-extra';

export const init = () => {
  const pkgJson = require('../package.json');
  program.version(pkgJson.version).description(pkgJson.description);

  program
    .command('prune-file <file>')
    .description('单独清理某个文件的所有历史记录。')
    .action(file => {
      try {
        fs.copyFileSync(file, `${file}.backup`);
        execa.commandSync(
          `FILTER_BRANCH_SQUELCH_WARNING=1 git filter-branch --force --index-filter 'git rm --cached --ignore-unmatch ${file}' --prune-empty --tag-name-filter cat -- --all`,
          {
            shell: true,
            stdout: 'inherit',
            stderr: 'inherit',
          }
        );
        console.log(`
清理完后需要将本地记录覆盖到 Github（所有 branch 以及所有 tags）：

  $ git push origin --force --all
  $ git push origin --force --tags

确保没有什么问题之后，强制解除对本地存储库中的所有对象的引用和垃圾收集：

  $ geita clear

参考：https://help.github.com/articles/remove-sensitive-data/
        `);
      } catch (error: any) {
        console.log(error.message);
      }
    });
  program
    .command('clear')
    .description('强制解除对本地存储库中的所有对象的引用和垃圾收集')
    .action(() => {
      try {
        execa.commandSync(`git reflog expire --expire=now --all`, {
          shell: true,
          stdout: 'inherit',
          stderr: 'inherit',
        });
        execa.commandSync(
          `git for-each-ref --format='delete %(refname)' refs/original | git update-ref --stdin`,
          {
            shell: true,
            stdout: 'inherit',
            stderr: 'inherit',
          }
        );
        execa.commandSync(`git gc --prune=now`, {
          shell: true,
          stdout: 'inherit',
          stderr: 'inherit',
        });
      } catch (error: any) {
        console.log(error.message);
      }
    });
  program
    .command('prune-msg <msg>')
    .description('清理 commit message 中的敏感信息（注意特殊字符要转义）。')
    .action(msg => {
      try {
        execa.commandSync(
          `FILTER_BRANCH_SQUELCH_WARNING=1 git filter-branch -f --msg-filter "perl -CIOED -p -e 's/${msg}/ /g'" --tag-name-filter cat -- --all`,
          {
            shell: true,
            stdout: 'inherit',
            stderr: 'inherit',
          }
        );
        console.log(`
清理完后需要将本地记录覆盖到 Github（所有 branch 以及所有 tags）：

  $ git push origin --force --all
  $ git push origin --force --tags
        `);
      } catch (error: any) {
        console.log(error.message);
      }
    });
  program.parse(process.argv);
};
