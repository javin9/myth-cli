//tpl模板地址
const tplList = require(`${__dirname}/../templates.json`)
const tplChoices = Object.keys(tplList) || []

//questions
const templates = {
  type: 'list',
  name: 'template',
  message: 'which template to use?',
  choices: tplChoices,
  default: tplChoices[0]
}

const questions = [
  //版本号
  {
    type: 'input',
    name: 'version',
    message: 'project version',
    default: '1.0.1'
  },
  //描述
  {
    type: 'input',
    name: 'description',
    message: 'project description',
    default: 'project description'
  },
  //作者
  {
    type: 'input',
    name: 'author',
    message: 'project author',
    default: 'unknow'
  },
  {
    type: 'confirm',
    name: 'yes',
    message: 'Are your sure about above answers?'
  }
]

module.exports = function() {
  return [templates].concat(questions)
}
