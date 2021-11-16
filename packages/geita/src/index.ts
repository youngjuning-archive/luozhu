#!/usr/bin/env node
import { program } from 'commander';
import execa from 'execa';

(() => {
  const pkgJson = require('../package.json');
  program.version(pkgJson.version).description(pkgJson.description);

  program
    .command('prune <file>')
    .description('start named service')
    .action(file => {
      try {
        execa.commandSync(
          `FILTER_BRANCH_SQUELCH_WARNING=1 git filter-branch --force --index-filter 'git rm --cached --ignore-unmatch ${process.cwd()}/${file}' --prune-empty --tag-name-filter cat -- --all`,
          {
            shell: true,
            stdout: 'inherit',
            stderr: 'inherit',
          }
        );
      } catch (error) {
        console.log(error.message);
      }
    });

  program.parse(process.argv);
})();
