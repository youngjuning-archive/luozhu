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
      execa.commandSync(
        `git filter-branch -f --prune-empty --index-filter ‘git rm --cached --ignore-unmatch -fr ${file} – --all`,
        {
          shell: true,
          stdout: 'inherit',
          stderr: 'inherit',
        }
      );
    });

  program.parse(process.argv);
})();
