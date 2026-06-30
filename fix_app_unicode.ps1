$path = "c:\Users\user\Downloads\Website Creation\src\app\App.tsx"
$content = Get-Content -Path $path -Raw
$replacements = @{
    'â”€' = ''
    'â€”' = '—'
    'â€“' = '–'
    'â†’' = '→'
    'â¤' = '♥'
    'Â©' = '©'
    'Â·' = '·'
}
foreach ($old in $replacements.Keys) {
    $content = $content -replace [regex]::Escape($old), [regex]::Escape($replacements[$old])
}
Set-Content -Path $path -Value $content -Encoding UTF8
Write-Host 'ok'