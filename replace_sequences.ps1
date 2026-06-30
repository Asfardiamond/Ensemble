$path = "src/app/App.tsx"
$text = Get-Content -Raw -LiteralPath $path
$replacements = @(
  @{old='â€”'; new='—'},
  @{old='â€“'; new='–'},
  @{old='â†’'; new='→'},
  @{old='â¤'; new='❤'},
  @{old='Â©'; new='©'},
  @{old='Â·'; new='·'},
  @{old='Ã¢â‚¬â€'; new='—'},
  @{old='Ã¢â‚¬â€œ'; new='–'},
  @{old='Ã¢â‚¬â„¢'; new="'"}
)
foreach ($r in $replacements) {
  $pattern = [regex]::Escape($r.old)
  $text = [regex]::Replace($text, $pattern, [System.Text.RegularExpressions.RegexOptions]::None, [System.Text.RegularExpressions.MatchEvaluator]{ param($m) return $r.new })
}
Set-Content -LiteralPath $path -Value $text -Encoding UTF8
Write-Output "Applied text replacements in $path"