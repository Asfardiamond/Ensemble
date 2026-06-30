$path = "src/app/App.tsx"
$lines = Get-Content -LiteralPath $path
for ($i = 0; $i -lt $lines.Length; $i++) {
  if ($lines[$i] -match '^[ \t]*//.*\b(Logo|Animated Counter|Section Wrapper|Navbar|Hero|Trusted By|Services|Why Choose|Process|Tech Stack|Portfolio|Testimonials|Pricing|FAQ|Contact|Footer|App)\b') {
    $lines[$i] = "// --- $($matches[1]) ---"
  }
}
$lines | Set-Content -LiteralPath $path -Encoding UTF8
Write-Output "Replaced headers in $path"