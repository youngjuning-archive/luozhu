import { program } from 'commander';
import path from 'path';
import execa from 'execa';

export const init = () => {
  const pkgJson = require('../package.json');
  program.version(pkgJson.version).description(pkgJson.description);

  program
    .command('prune-file <file>')
    .description('单独清理某个文件的所有历史记录。')
    .action(file => {
      try {
        execa.command(
          `FILTER_BRANCH_SQUELCH_WARNING=1 git filter-branch --force --index-filter 'git rm --cached --ignore-unmatch ${file}' --prune-empty --tag-name-filter cat -- --all`,
          {
            shell: true,
            stdout: 'inherit',
            stderr: 'inherit',
          }
        );
      } catch (error: any) {
        console.log(error.message);
      }
    });
  program
    .command('prune-msg <msg>')
    .description('清理 commit message 中的敏感信息。')
    .action(msg => {
      try {
        execa.command(
          `FILTER_BRANCH_SQUELCH_WARNING=1 git filter-branch -f --msg-filter "perl -CIOED -p -e 's/${msg}/ /g'" -- --all`,
          {
            shell: true,
            stdout: 'inherit',
            stderr: 'inherit',
          }
        );
      } catch (error: any) {
        console.log(error.message);
      }
    });
  program.parse(process.argv);
};
