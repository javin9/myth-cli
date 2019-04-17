const shell = require('shelljs')
const path = require('path')
const fs = require('fs-extra')
const chalk = require('chalk')

function update() {
  console.log(chalk.yellow('updating material...'))

  shell.cd(path.join(__dirname, '..'))
  const materialDir = path.join(__dirname, '..', 'material')

  if (fs.existsSync(materialDir)) {
    shell.rm('-rf', './material')
  }
  shell.rm('-rf', './.git')

  shell.exec('git init')
  shell.exec('git config core.sparsecheckout true')
  shell.exec('echo material/* >> .git/info/sparse-checkout')
  shell.exec(
    'git remote add -f origin https://github.com/rcupid/joao-website.git'
  )
  shell.exec('git pull origin master')
}

//export
module.exports = update
