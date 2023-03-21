# vue-waimai-h5

## husky 管理 Git Hooks

安装 husky

```shell
npx husky-init && npm install
```

### 管理 commitlint

commitlint (https://github.com/conventional-changelog/commitlint) 检测 git commit 内容是否符合定义的规范

在开发项目时产生大量的 commit 版本， 这些 commit 记录了整个项目的开发进程，当我们需要通过 commit 来回顾项目开发进展或者回退版本时，良好的 commit 信息可以帮我们快速了解但是开发和修改的需求背景和动机。

commitlint 会提供一套规范来约束项目的 commit 信息，并在提供 commit 的时候自动校验。

规范要求我们按以下规定来填写 commit 信息：

```
type(scope?):subject
```

- `type` 表示 commit 的类型
- `scope` 是可选的，表示当前 commit 的修改范围
- `subject` 就是描述 commit 的详细说明

根据规范 type 可以为一下这些值

- build
- chore
- ci
- docs
- feat（新功能）
- fix（修复）
- perf（性能）
- refactor（重构）
- revert
- style
- test

## Eslint

Eslint 是 Javascript 的 Lint 工具，可以保证代码的一致性和避免错误。可以在运行代码前就发现语法错误和潜在的 bug，非常适合用于制定团队代码规范。

## Prettier

代码格式化工具，用于检测代码中格式问题。**Prettier** 自身的规范倾向于团队的代码风格的规范或统一，例如每行最大长度，单引号还是双引号，等号左右空格，使用 tab 还是空格等等。

除了 js/ts 外，它还支持对多种语言进行格式化，如 vue、html、css、less、scss、json、jsx 等等，是一个比较综合的代码格式化工具。

**有了 ESLint 为啥还要用 Prettier**

- **ESlint** 偏向于把控代码的质量，而 **Prettier** 更偏向于项目的编码风格
- **ESLint** 安装和配置比较麻烦，而且 lint 的速度并不快
- **Prettier** 并不只针对 JavaScript，它可以格式化各种流行语言
- **Prettier** 的配置选项没那么眼花缭乱，比 ESLint 少很多，这在 **Prettier** 选项的哲学中说明精简的原因。

Prettier 目前在很多脚手架中都会帮我们集成，比如在`create-vue`创建 Vue3 的项目中，执行`yarn format`就会自动按照配置文件帮我们统一风格化代码。

下面是使用 Prettier 的常用配置，写在`.prettierrc.js` 文件中即可。

```js
module.exports = {
  printWidth: 100, // 单行代码字符数量不能超过 100
  tabWidth: 2, // tab 使用两个空格
  useTabs: false, // 不使用制表符缩进，使用空格缩进
  semi: false, // 不需要分号结束
  singleQuote: true, // 单引号
  bracketSpacing: true, // 对象左右两侧都需要空格
}
```

- [彻底搞懂 ESLint 与 Prettier 在 vscode 中的代码自动格式化](https://juejin.cn/post/7156893291726782500)

## EditorConfig

**什么是 EditorConfig？**

EditorConfig 是一个文件格式工具，它可以针对项目维度，设置项目的文件格式，比如字符集、缩进使用空格等。

**为什么需要 EditorConfig？**

既然我们有了 eslint 和 prettier，为什么还需要 EditorConfig？在开发工作中，不同的开发人员可能会使用不同的代码编辑器或 IDE，比如 vscode、webstorm 等。在保存文件的时候，eslint 和 prettier 会帮助我们自动修复不符合规范的代码。但在我们编写代码还未保存文件前，eslint 就帮不了我们了。

这时就需要 EditorConfig！在我们打开项目时，编辑器或 IDE 会读取 EditorConfig 的配置文件 .editorconfig，然后在我们编写代码的时候，帮我们按照配置自动格式化文件内容。比如当我们按下 tab 键时，会缩进两个空格等。

EditorConfig 有助于为跨各种编辑器和 IDE 处理同一项目的多个开发人员保持一致的编码风格。 EditorConfig 项目由用于定义编码样式的文件格式和一组文本编辑器插件组成，这些插件使编辑器能够读取文件格式并遵守定义的样式。 EditorConfig 文件易于阅读，并且可以很好地与版本控制系统配合使用。

**如何配置 EditorConfig？**

首先我们在项目文件下新建一个 `.editorconfig` 文件，然后填写下面的内容。

```
root = true

[*]
charset = utf-8
indent_size = 2
indent_style = space

# // 当打开一个文件时，EditorConfig插件会在打开文件的目录和每个父目录中寻找一个名为.editorconfig的文件。
# // 如果达到根文件路径或找到一个root=true的EditorConfig文件，对.editorconfig文件的搜索将停止。
# root = true

# [*]
# charset = utf-8 // 字符集
# indent_style = space // 设置为tab或space
# indent_size = 2  // 缩进级别的列数
# insert_final_newline = true // 以换行符结尾
# trim_trailing_whitespace = true // 删除文件中换行符之前的所有空白字符

# [*.ts]
# quote_type = single // ts文件中为单引方式

```
