# 提交规范

基于 Conventional Commits。

```
<type>[scope]: <description>

[body]

[footer(s)]
```

## 类型

`type` 只能为以下之一；均不符合时，停止操作并询问用户。

- `feat`：新特性
- `fix`：修复 bug
- `docs`：仅文档
- `style`：仅格式，不影响逻辑
- `refactor`：重构，不新增功能或修 bug
- `perf`：优化性能或体验
- `test`：测试
- `build`：依赖
- `ci`：CI 配置
- `chore`：杂务（工具、配置等）
- `revert`：回滚

## 规则

- 破坏性变更用 `<type>(<scope>)!:`，并在 footer 后加 `BREAKING-CHANGE: ...`。
- `scope` 可选，小写；多层位置用 `/` 分隔。
- `description` 用中文，结尾不加句号，尽量简短，不超过 72 字符。

## 钩子

- 提交时检查暂存文件：前端 `client/src` 下的脚本、样式、JSON、Markdown 先自动修复再格式化，后端 Rust 只格式化本次暂存的文件。
- 推送前跑完整的格式检查、lint 检查和测试，任一失败即中止。
- 钩子会改写暂存内容，这是预期行为；被改写的文件会一并进入本次提交。
- 需要整仓检查时手动执行根目录的 `verify` 脚本。
