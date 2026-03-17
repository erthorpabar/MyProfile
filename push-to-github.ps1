# 推送代码到 GitHub 的脚本

Write-Host "================================" -ForegroundColor Cyan
Write-Host "  MyProfile 项目推送到 GitHub" -ForegroundColor Cyan
Write-Host "================================" -ForegroundColor Cyan
Write-Host ""

# 步骤 1: 检查远程仓库
Write-Host "[1/3] 检查远程仓库配置..." -ForegroundColor Yellow
git remote -v

# 步骤 2: 检查本地提交
Write-Host "`n[2/3] 检查本地提交..." -ForegroundColor Yellow
git log --oneline -n 5

# 步骤 3: 推送到 GitHub
Write-Host "`n[3/3] 推送代码到 GitHub..." -ForegroundColor Yellow
Write-Host "如果需要登录，请使用以下方式之一：" -ForegroundColor Cyan
Write-Host "  - Personal Access Token (推荐)"
Write-Host "  - SSH 密钥"
Write-Host ""

try {
    git push -u origin main
    Write-Host "`n✅ 成功推送到 GitHub!" -ForegroundColor Green
    Write-Host "访问你的仓库: https://github.com/erthorpabar/MyProfile" -ForegroundColor Cyan
} catch {
    Write-Host "`n❌ 推送失败" -ForegroundColor Red
    Write-Host "请检查：" -ForegroundColor Yellow
    Write-Host "  1. 是否已在 GitHub 创建仓库: https://github.com/new" -ForegroundColor Yellow
    Write-Host "  2. 网络连接是否正常" -ForegroundColor Yellow
    Write-Host "  3. 是否有权限访问该仓库" -ForegroundColor Yellow
    Write-Host "`n详细错误信息：" -ForegroundColor Yellow
    Write-Host $_.Exception.Message -ForegroundColor Red
}

Write-Host "`n按任意键退出..." -ForegroundColor Gray
$null = $Host.UI.RawUI.ReadKey("NoEcho,IncludeKeyDown")
