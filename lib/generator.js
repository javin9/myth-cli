const ora = require('ora')
const chalk = require('chalk')
const execSync = require('execa').shellSync
const fs = require('fs-extra')
const tplList = require(`${__dirname}/../templates`)
const { download, updatePkgJSON, getRegistry } = require('./index.js')
const shell = require('shelljs')

async function generator(answers, projectName, options, targetDir) {
  fs.mkdirSync(targetDir) //create directory

  let template = tplList[answers.template]
  let repository = `${template.place}${template.branch}` //git repository
  console.log(repository)

  const spinner = ora(`Downloading ${repository} boilerplate project`) //tips提示
  spinner.start()

  /**download template */
  const result = await download(repository, targetDir, { clone: true })

  if (result === true) {
    spinner.stop()
    const pkgResult = await updatePkgJSON(projectName, targetDir, answers)
    if (pkgResult === true) {
      install(answers, projectName, options, targetDir)
    } else {
      exit(err)
    }
  } else {
    /**download error */
    spinner.stop()
    console.log(chalk.red(`\n can not download ${repository}`))
    exit(err)
  }
}

/**show success */
function success(projectName) {
  console.log(chalk.yellow(`Successfully generated project '${projectName}'`))
}

/**show error content */
function exit(err) {
  console.log(chalk.red(err))
  spinner.stop()
  process.exit(1)
}

function install(answers, projectName, options, targetDir) {
  const registry = getRegistry(options.mirror) /**registry*/
  if (!options.noInstall) {
    try {
      console.log(answers)
      shell.cd(targetDir) //进入项目文件  process.chdir(targetDir)
      shell.rm('-rf .git') //删除.git
      execSync(`yarn install --registry=${registry}`, { stdio: 'inherit' })
    } catch (err) {
      exit(err)
    }
    success(projectName)
  } else {
    success(projectName)
    console.log(chalk.yellow('Get started with the following commands:'))
    console.log(chalk.yellow(`cd ${projectName}`))
    console.log(chalk.yellow('npm install'))
    console.log(chalk.yellow('npm start'))
  }
}

module.exports = generator
