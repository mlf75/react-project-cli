const { promisify } = require("util"); // node 异步请求的统一封装
const figlet = promisify(require("figlet")); // 用于设置控制台输出的打字，比如常见的 欢迎语之类的

const clear = require("clear"); // 清屏，执行的就是 shell 的清屏命令 可有可无根据需求定制
const chalk = require("chalk"); // 粉笔，用于 console 染色，让输出有颜色
const { clone } = require("./download");

const spawn = async (...args) => {
  const { spawn } = require('child_process')
  return new Promise(resolve => {
      const proc = spawn(...args)
      proc.stdout.pipe(process.stdout)
      proc.stderr.pipe(process.stderr)
      proc.on('close', () => {
          resolve()
      })
  })
}

const log = (content) => console.log(chalk.green(content)); // 使用 chalk.预设的颜色('需要上色的内容')

module.exports = async (name) => {
  // 打印欢迎界面
  clear();
  const data = await figlet("React Project Template");
  log(data);

  log("创建项目：" + name);
  await clone("github:mlf75/react-webpack-template", name);

  log("安装依赖");
  await spawn("npm", ["install"], { cwd: `./${name}` });
  log(`
  👌安装完成：
  To get Start:
  ===========================
      cd ${name}
      npm run dev
  ===========================
                  `);
};

// child_process.spawn(command[, args][, options])
// command <string> 要运行的命令。
// args <string[]> 字符串参数的列表。
// options.cwd 子进程的当前工作目录。
