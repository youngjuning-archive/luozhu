import { program } from 'commander';
import path from 'path';
import execa from 'execa';

export const init = () => {
  const pkgJson = require('../package.json');
  program.version(pkgJson.version).description(pkgJson.description);

  program
    .command('prune <file>')
    .description('start named service')
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

  program.parse(process.argv);
};
