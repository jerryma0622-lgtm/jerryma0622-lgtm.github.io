# Jerry's Blog

独立的 Obsidian 写作 Vault、Hexo 源码仓库和本地 Git 工作目录。定位：个人主页 + 技术博客 + 数字花园。

## 隐私边界

- 私人知识库：C:\Users\jerry\OneDrive\Obsidian\Jerry Knowledge Base
- 公开 Blog：C:\Users\jerry\OneDrive\Obsidian\Jerry Blog

两者完全独立。不得自动读取、同步、复制或发布私人 Knowledge Base 的内容。只有 Jerry 明确要求迁移某篇指定文章时，才允许在该授权范围内操作。不得在私人知识库初始化 Git，也不得修改、移动、重命名或删除它的文件。

**本项目默认按公开内容管理。** 未来公开 GitHub 仓库会公开已提交的全部源码、Obsidian 配置及 Git 历史，不仅是构建后的网页。不要放入个人隐私、客户资料、密码、令牌或未经许可的素材。

drafts/ 默认被 Git 忽略，也不被 Hexo 构建，但不是安全存储；OneDrive 仍可能同步它。所有 source/assets/ 附件即使未被正式文章引用，也会被构建公开。

## 目录

    .obsidian/                 可移植 Obsidian 基础配置，无第三方插件
    source/
      _posts/                  正式文章，目前只有 welcome.md
      assets/                  公开图片、附件及站点资源
        posts/welcome/         按文章 slug 分类的附件
        site/                  favicon 等站点资源
      about/                   关于
      categories/              分类汇总
      tags/                    标签汇总
      projects/                项目入口，目前无虚构项目
      css/custom.css           少量可维护的主题外观覆盖
      js/accessibility.js      跳转正文入口
    drafts/                    本地草稿，新笔记默认落在这里
      assets/                  尚未准备公开的草稿附件
    scaffolds/                 Hexo front matter 模板
    scripts/                   项目级附件路径转换及本地图标生成
    tools/verify-site.cjs       生成站点链接与资源验证
    themes/                    预留目录；Butterfly 通过 npm 安装
    .github/workflows/pages.yml 将来的 Pages 部署流程
    _config.yml                Hexo 配置
    _config.butterfly.yml       Butterfly 配置覆盖
    package.json
    package-lock.json          提交锁文件，便于 npm ci 重现安装
    .gitignore
    .gitattributes
    .node-version
    AGENTS.md                  后续维护和隐私规则
    DESIGN.md                  轻量主题方向

assets 放在 source/assets 而非根目录，是因为 Hexo 原生只会发布 source 内的资源。归档 /archives/ 由 Hexo 生成器产生，无需手写 source/archives。主题采用官方支持的 npm 方式，所以 themes 里没有 Butterfly 核心源码。

## 本地运行

安装 Node.js 24.x 和 Git，无需全局安装 Hexo。在本项目目录运行：

    npm install
    npx hexo generate
    npm run verify
    npm run server

浏览 http://127.0.0.1:4000/，按 Ctrl+C 停止服务。npm run server 仅绑定本机回环地址。
Windows PowerShell 如遇 npm.ps1 执行策略限制，可使用 npm.cmd 和 npx.cmd，不需要修改系统执行策略。

换电脑后打开项目目录，用 npm ci 安装锁定依赖；不要复制 node_modules。修改内容后运行 npm run clean，再 npm run build 和 npm run verify。

## Obsidian 写作

在 Obsidian 的 Vault 管理器中选择“打开文件夹作为仓库”，选择本项目根目录；不要将它合并进私人 Vault。这里的 .obsidian 配置从零创建，未复制私人 Vault 配置。

- 正式文章：source/_posts/，建议使用小写英文连字符文件名，路径 /posts/<文件名>/。
- 草稿：drafts/。新笔记默认创建于此；从 scaffolds/post.md 参考 YAML 字段并填写实际标题、日期、分类、标签、description。
- 使用标准 Markdown 链接和嵌入；不使用仅 Obsidian 识别的 [[wikilink]] 或 ![[图片]]。
- 内置搜索、文件浏览、反链、outline、文件恢复保持启用；没有安装第三方插件。
- node_modules、public 等从 Obsidian 搜索/图谱中排除；这不保证它们完全消失在文件浏览器里，也不影响 OneDrive。
- Obsidian 原生标签与 Hexo front matter 的 tags 展示方式不同。分类和网站标签以 YAML 字段为准。

从 Obsidian 发布：先检查正文和附件是否允许公开，再把 Markdown 移到 source/_posts/，确认 Obsidian 更新了相对引用，检查 YAML 日期不是未来时间，然后执行本地构建与预览。仅移动文件不会提交、push 或部署。
不要使用 hexo new draft / hexo publish 管理本项目 drafts，它们使用的是 Hexo 的 source/_drafts 约定。这里直接在 Obsidian 写草稿并人工移动；不需要插件。

## 图片与附件

默认附件目录是 source/assets。这意味着粘贴附件时就应按“可公开”对待。
正式附件建议按文章组织，例如 source/assets/posts/my-post/diagram.png；Obsidian 默认粘贴至 source/assets 根目录后，可在 Obsidian 文件浏览器移动到该文章目录，自动更新链接。

从 source/_posts/my-post.md 引用：

    ![说明文字](../assets/posts/my-post/diagram.png)
    [下载公开 PDF](../assets/posts/my-post/reference.pdf)

从 drafts/my-post.md 引用已公开附件：

    ![说明文字](../source/assets/posts/my-post/diagram.png)

尚未公开的草稿附件先存于 drafts/assets/，例如草稿中使用 ![说明](assets/diagram.png)。正式发布时将附件人工移动到 source/assets/posts/my-post/，更新图片引用后再移动文章。

scripts/asset-links.js 只将解析后指向本项目 source/assets 的相对图片和附件链接转换为 /assets/... 网站路径。Markdown 源文不变，Obsidian 按真实文件路径预览，Hexo 首页、文章页和搜索内容按网站路径显示。子目录文章按实际相对位置填写 ../ 层级。文件名建议小写、无空格，路径分隔使用 /。

网站页面间导航使用 /about/、/archives/ 等站点路径；Obsidian 中这类网站导航链接需在本地网页预览。附件相对路径可直接在 Obsidian 预览。不使用 Windows 盘符或 file:/// 链接。主题 CSS/JS 与附件都通过 Git 跟随项目，无当前 Windows 用户目录依赖。

## Git 与 OneDrive

Git 只初始化在 Jerry Blog，主分支 main，初始提交只在本地。没有 remote，没有创建远程仓库，没有 push。

忽略 node_modules、public、db.json、.deploy_git、.cache、日志、系统临时文件和本地 workspace 状态；保留 .obsidian/app.json、appearance.json、core-plugins.json、community-plugins.json 等可移植偏好。插件目录暂时忽略，未来需要共享插件时明确调整规则并检查插件配置中的凭据。

**.gitignore 不控制 OneDrive。** 标准 npm 安装会在此目录生成 node_modules，标准 Hexo 构建会生成 public 和 db.json；这些仍可能被 OneDrive 同步。OneDrive 的“选择文件夹”功能主要选择哪些云文件留在本机，并不等同于将本机子目录从上传中排除。本次没有修改 OneDrive 设置，没有建立跨目录 junction 或符号链接，没有调整私人知识库。

不要让两台电脑同时修改该项目或操作同一份 .git；等待 OneDrive 同步完成再切换设备。不要用 OneDrive 同步 .git 取代 Git 的 clone/pull。遇到冲突副本先停止 Git 操作，确认完整备份后再恢复。

如果依赖文件导致同步负担，后续可明确授权建立 OneDrive 外的独立构建 checkout，由 Git 传递源码；当前阶段保持用户要求的单目录方案，不自动迁移。重新安装前确保需要的源码本地可用。不要对共享 Git 工作目录或整库运行未经检查的递归清理命令。

## GitHub Pages（仅预配置）

计划仓库名：jerryma0622-lgtm.github.io，预设网站地址：https://jerryma0622-lgtm.github.io，root: /。没有自定义域名，没有 CNAME。

流程：Obsidian 写 Markdown → 本地检查 → Git commit → 明确授权后 push → GitHub Actions 运行 npm ci、Hexo build 和 verify → 上传 public artifact → Pages 部署。
workflow 使用 main 的 push 和手动触发，Node 24、npm 缓存、独立 build/deploy job、github-pages environment，以及部署所需的最小 pages/id-token 权限。它只是本地文件，目前未执行远程 Actions。

后续顺序：先检查本地结构与 OneDrive/Git 边界，再创建空的 GitHub Repository，确认 GitHub 用户名与此站点名称一致，连接 remote，然后在明确授权后 push；GitHub Settings → Pages → Source 选择 GitHub Actions。

## 升级与依赖检查

Hexo 8.1.2，Butterfly 5.7.0，通过项目本地 npm 安装，package-lock.json 固定依赖。外观定制只在 _config.butterfly.yml 和 source/css/custom.css，不改 node_modules 或主题核心源码。主题配置采用官方支持的合并覆盖机制，未复制整份默认配置，以减少升级后的过时选项。

升级时先阅读主题 changelog，再明确安装目标版本、更新锁文件、执行构建和站点验证。不要自动运行 npm audit fix --force。
2026-10-03 初始 npm audit 报告 7 个 high 条目，来自 braces 的间接依赖拒绝服务问题及其传播链。自动建议会降级 Hexo/CLI；本次未采取该建议。发布前再次核查上游修复，当前版本的构建和本机预览验证不等于依赖审计通过。

## 官方参考

- [Butterfly 安装与配置覆盖](https://butterfly.js.org/posts/21cfbf15/)
- [Hexo 资源目录](https://hexo.io/docs/asset-folders)
- [GitHub Pages 自定义 Actions 工作流](https://docs.github.com/en/pages/getting-started-with-github-pages/using-custom-workflows-with-github-pages)
- [Obsidian 附件](https://obsidian.md/help/attachments)
- [OneDrive 文件夹选择](https://support.microsoft.com/en-US/onedrive/choose-which-onedrive-folders-you-want-to-sync-on-windows-or-macos)

视觉只参考 https://zhaputao.github.io/ 的博客导航和文章卡片类型；未复制其源码、文字、图片或个人信息。
