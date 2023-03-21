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
