$projectPath = $PSScriptRoot

Set-Location $projectPath

$watcher = New-Object System.IO.FileSystemWatcher
$watcher.Path = $projectPath
$watcher.Filter = "*.*"
$watcher.IncludeSubdirectories = $true
$watcher.EnableRaisingEvents = $true

$action = {
    $path = $Event.SourceEventArgs.FullPath

    if (
        $path -notlike "*\.git\*" -and
        $path -notlike "*\.vscode\*" -and
        $path -notlike "*\auto-push.ps1"
    ) {
        Start-Sleep -Seconds 3

        git add .

        $status = git status --porcelain

        if ($status) {
            git commit -m "Otomatik site güncellemesi"
            git push origin main

            Write-Host ""
            Write-Host "Site GitHub'a gönderildi -> Vercel deploy başlatildi." -ForegroundColor Green
            Write-Host ""
        }
    }
}

Register-ObjectEvent $watcher "Changed" -Action $action | Out-Null
Register-ObjectEvent $watcher "Created" -Action $action | Out-Null
Register-ObjectEvent $watcher "Deleted" -Action $action | Out-Null
Register-ObjectEvent $watcher "Renamed" -Action $action | Out-Null

Write-Host "========================================="
Write-Host " Sınav Canbazı OTOMATİK YAYIN SISTEMI"
Write-Host "========================================="
Write-Host ""
Write-Host "VS Code'da dosyayı kaydet."
Write-Host "Sistem otomatik olarak GitHub'a push edecek."
Write-Host "Vercel de otomatik deploy edecek."
Write-Host ""
Write-Host "Durdurmak için CTRL + C"
Write-Host ""

while ($true) {
    Start-Sleep -Seconds 1
}