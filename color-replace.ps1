# Bulk color replacement script for Jibhi website
# New palette: #1F3A36 (dark green) + #DCC7AA (warm beige)

$srcPath = "c:\Jibhi\jibhiWebApp\src"

# Get all CSS and JSX files
$files = Get-ChildItem -Path $srcPath -Recurse -Include "*.css","*.jsx" | Select-Object -ExpandProperty FullName

# Define color replacements (order matters - do specific first)
$replacements = @(
    @{ Old = '#a85d3a'; New = '#c4ad90' },    # accent hover
    @{ Old = '#c0704a'; New = '#DCC7AA' },     # accent warm
    @{ Old = '#fef6ee'; New = '#f7f2eb' },     # light cream bg
    @{ Old = '#f5f0eb'; New = '#ede6dc' },     # warm bg
    @{ Old = '#e8e2da'; New = '#d4c4ad' },     # borders
    @{ Old = '#8a7968'; New = '#7a8a86' },     # muted text
    @{ Old = '#4a4a4a'; New = '#3d4f4b' },     # body text
    @{ Old = '#2d2520'; New = '#162e2a' },     # dark gradient
    @{ Old = '#2d2d4e'; New = '#1a3330' },     # newsletter gradient
    @{ Old = '#1a1a1a'; New = '#1F3A36' },     # primary dark
    @{ Old = '#b0a090'; New = '#9aaa97' },     # placeholder text
    @{ Old = '#b0a599'; New = '#9aaa97' },     # strikethrough text
    @{ Old = '#f0ebe5'; New = '#e5ddd2' },     # light border
    @{ Old = '#f0ebe4'; New = '#e5ddd2' },     # light border variant
    @{ Old = '#faf7f4'; New = '#f0ebe3' },     # hover bg
    @{ Old = '#eef3fe'; New = '#e8f0ee' },     # active field bg
    @{ Old = '#ebe5dd'; New = '#ddd5c8' },     # hover bg variant
    @{ Old = '#ede8e1'; New = '#ddd5c8' },     # hover bg variant2
    @{ Old = '#fafaf9'; New = '#f5f0e8' },     # input bg
    @{ Old = '#e0d8d0'; New = '#c8bfab' },     # input border
    @{ Old = '#fff5ee'; New = '#eee8de' },     # icon bg
    @{ Old = '#f8f3ee'; New = '#ede6dc' },     # faq bg
    @{ Old = '#c8bfb4'; New = '#a8b5a4' },     # dot color
    @{ Old = '#6b5e52'; New = '#5a7a72' },     # mid text
    @{ Old = '#edfdf5'; New = '#e8f0ee' },     # success bg
    @{ Old = '#82c9a8'; New = '#8ab8a6' },     # success border
    @{ Old = '#1a5e3a'; New = '#1F3A36' },     # success text
    @{ Old = '#2d8f4e'; New = '#3a7a5e' },     # green accent
    @{ Old = '#e8f5e9'; New = '#e0efe4' },     # green bg
    @{ Old = 'rgba(192, 112, 74'; New = 'rgba(220, 199, 170' },  # accent rgba
    @{ Old = 'rgba(192,112,74';   New = 'rgba(220,199,170' }     # accent rgba no-space
)

$totalChanges = 0

foreach ($filePath in $files) {
    $content = Get-Content -Path $filePath -Raw -Encoding UTF8
    $originalContent = $content
    $fileChanges = 0

    foreach ($r in $replacements) {
        $count = ([regex]::Matches($content, [regex]::Escape($r.Old))).Count
        if ($count -gt 0) {
            $content = $content -replace [regex]::Escape($r.Old), $r.New
            $fileChanges += $count
        }
    }

    if ($fileChanges -gt 0) {
        Set-Content -Path $filePath -Value $content -Encoding UTF8 -NoNewline
        Write-Host "$fileChanges changes in: $($filePath -replace [regex]::Escape($srcPath), '')"
        $totalChanges += $fileChanges
    }
}

Write-Host "`nTotal: $totalChanges color replacements across $($files.Count) files"
