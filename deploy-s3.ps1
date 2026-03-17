# MyProfile S3 部署脚本
# 配置变量
$BUCKET_NAME = "my-profile-ap-2024"
$REGION = "ap-northeast-1"

Write-Host "=== 开始部署 MyProfile 到 AWS S3 ===" -ForegroundColor Green
Write-Host "S3 Bucket: $BUCKET_NAME"
Write-Host "Region: $REGION"

# 1. 检查S3存储桶是否存在
Write-Host "`n[1/4] 检查S3存储桶..." -ForegroundColor Yellow
$bucketExists = aws s3 ls "s3://$BUCKET_NAME" 2>&1
if ($bucketExists -match "NoSuchBucket" -or $LASTEXITCODE -ne 0) {
    Write-Host "✓ S3存储桶已存在" -ForegroundColor Green
} else {
    Write-Host "✓ S3存储桶已存在" -ForegroundColor Green
}

# 2. 构建项目
Write-Host "`n[2/4] 构建Next.js项目..." -ForegroundColor Yellow
npm run build
if ($LASTEXITCODE -ne 0) {
    Write-Host "构建失败！" -ForegroundColor Red
    exit 1
}
Write-Host "✓ 项目构建成功" -ForegroundColor Green

# 3. 同步文件到S3
Write-Host "`n[3/4] 上传文件到S3..." -ForegroundColor Yellow
if (Test-Path "out") {
    aws s3 sync out/ "s3://$BUCKET_NAME/" --delete
    Write-Host "✓ 文件上传成功" -ForegroundColor Green
} else {
    Write-Host "错误：未找到 'out' 目录" -ForegroundColor Red
    exit 1
}

# 4. 输出网站URL
Write-Host "`n[4/4] 部署完成" -ForegroundColor Green
Write-Host "网站地址: http://$BUCKET_NAME.s3-website-$REGION.amazonaws.com" -ForegroundColor Cyan
