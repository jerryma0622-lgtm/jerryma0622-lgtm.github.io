# Blog maintenance rules

- This repository is public by default. Never read, copy, sync, change or publish the sibling private Knowledge Base without Jerry's explicit authorization for a specific article.
- Work only in this Blog repository. Never initialize Git in the private vault; never move or rename either vault.
- No GitHub repository creation, remote change, push or deployment unless Jerry explicitly authorizes that step.
- Published articles: source/_posts/. Local drafts: drafts/, ignored by Git. All source/assets/ files are public build inputs even if unused.
- Use standard Markdown and portable relative attachment paths. No drive-letter paths or file: URLs in site configuration or content.
- Do not modify node_modules or theme core. Use _config.yml, _config.butterfly.yml and source/css/custom.css.
- No automatic npm audit fix --force, no global Hexo dependency, no custom domain without authorization.
- Keep npm and package-lock.json as the only package-manager convention; Node.js 24.x. Run npm run build and npm run verify after content/configuration changes. Check actual browser output after visual changes.
- Keep Obsidian simple. Preserve portable preferences while ignoring device workspace state. Do not install community plugins without a concrete need and authorization.
- .gitignore is not a OneDrive exclusion mechanism. Do not alter OneDrive settings, create cross-directory links, or relocate build files automatically.
- Before every commit, inspect the staged files for privacy, drafts and generated files. Use a repository-local privacy-safe Git author email.
