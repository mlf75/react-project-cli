#!/usr/bin/env node
const program = require('commander')

program.version(require('../package.json').version)
program.command('init <name>')
  .description('初始化项目结构')
  .action(
    require('../lib/init')
  )

program.parse(process.argv)