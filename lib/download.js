const {promisify} = require('util')

module.exports.clone = async function(repo, desc) {
  const download = promisify(require('download-git-repo'))
  const ora = require('ora')  // 用于展示下载进度的
  const process = ora(`模板下载中...`)
  process.start() // 
  await download(repo, desc)
  process.succeed()
}