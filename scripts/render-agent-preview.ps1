Add-Type -AssemblyName System.Drawing

$outPath = Join-Path (Get-Location) 'public\agent-preview.png'
$width = 1200
$height = 760

$bmp = New-Object System.Drawing.Bitmap $width, $height
$g = [System.Drawing.Graphics]::FromImage($bmp)
$g.SmoothingMode = [System.Drawing.Drawing2D.SmoothingMode]::AntiAlias
$g.TextRenderingHint = [System.Drawing.Text.TextRenderingHint]::ClearTypeGridFit
$g.Clear([System.Drawing.ColorTranslator]::FromHtml('#EEF5F8'))

function New-Brush($hex) {
  New-Object System.Drawing.SolidBrush ([System.Drawing.ColorTranslator]::FromHtml($hex))
}

function New-Pen($hex, $width = 1) {
  New-Object System.Drawing.Pen ([System.Drawing.ColorTranslator]::FromHtml($hex)), $width
}

function New-Font($size, $style = 'Regular') {
  New-Object System.Drawing.Font('Malgun Gothic', $size, [System.Drawing.FontStyle]::$style, [System.Drawing.GraphicsUnit]::Pixel)
}

function New-RoundedPath($x, $y, $w, $h, $r) {
  $path = New-Object System.Drawing.Drawing2D.GraphicsPath
  $d = $r * 2
  $path.AddArc($x, $y, $d, $d, 180, 90)
  $path.AddArc($x + $w - $d, $y, $d, $d, 270, 90)
  $path.AddArc($x + $w - $d, $y + $h - $d, $d, $d, 0, 90)
  $path.AddArc($x, $y + $h - $d, $d, $d, 90, 90)
  $path.CloseFigure()
  return $path
}

function Fill-Round($x, $y, $w, $h, $r, $hex) {
  $path = New-RoundedPath $x $y $w $h $r
  $brush = New-Brush $hex
  $g.FillPath($brush, $path)
  $brush.Dispose()
  $path.Dispose()
}

function Draw-Text($text, $x, $y, $size, $hex, $style = 'Regular') {
  $font = New-Font $size $style
  $brush = New-Brush $hex
  $g.DrawString($text, $font, $brush, [float]$x, [float]$y)
  $font.Dispose()
  $brush.Dispose()
}

function Draw-Lines($lines, $x, $y, $size, $lineHeight, $hex, $style = 'Regular') {
  for ($i = 0; $i -lt $lines.Count; $i++) {
    Draw-Text $lines[$i] $x ($y + $i * $lineHeight) $size $hex $style
  }
}

function Draw-Chip($text, $x, $y, $w, $hex, $textHex = '#0E4274') {
  Fill-Round $x $y $w 38 19 '#EDF6FB'
  Draw-Text $text ($x + 18) ($y + 7) 19 $textHex 'Bold'
  $dotBrush = New-Brush $hex
  $g.FillEllipse($dotBrush, [float]($x + $w - 31), [float]($y + 13), 12, 12)
  $dotBrush.Dispose()
}

# Main browser surface
Fill-Round 88 74 1028 612 30 '#CBD5DB'
Fill-Round 72 58 1028 612 30 '#FFFFFF'

# Header band
$headerPath = New-RoundedPath 72 58 1028 94 30
$headerBrush = New-Brush '#E7EEF4'
$g.FillPath($headerBrush, $headerPath)
$headerBrush.Dispose()
$headerPath.Dispose()
$whiteBrush = New-Brush '#FFFFFF'
$g.FillRectangle($whiteBrush, 72, 126, 1028, 28)
$whiteBrush.Dispose()

foreach ($dot in @(@(110, 92, '#C74F45'), @(132, 92, '#C89612'), @(155, 92, '#168B7B'))) {
  $brush = New-Brush $dot[2]
  $g.FillEllipse($brush, [float]$dot[0] - 8, [float]$dot[1] - 8, 16, 16)
  $brush.Dispose()
}
Draw-Text '# 엔지니어링-릴리스' 184 79 27 '#031023' 'Bold'

# Left analysis panel
Fill-Round 110 174 610 396 22 '#F6FAFD'
Draw-Text '릴리스 영향 분석' 148 207 23 '#0E4274' 'Bold'
Draw-Lines @(
  '결제 마이그레이션의 영향을 받는',
  '서비스는 무엇인가요?'
) 148 250 31 42 '#07111D'

Fill-Round 142 352 544 160 16 '#E7F2FA'
Draw-Text 'Reliever' 174 382 21 '#0E4274' 'Bold'
Draw-Text '영향 범위' 174 421 20 '#38516D' 'Bold'
Draw-Text 'invoice-api, plans-worker, ledger-sync' 286 421 20 '#07111D'
Draw-Text '주요 위험' 174 462 20 '#38516D' 'Bold'
Draw-Text '/billing/rates 세금 로직' 286 462 20 '#07111D'

Draw-Chip '출처 14개' 142 535 146 '#0E5A91'
Draw-Chip '코드 오너 5명' 304 535 184 '#168B7B'
Draw-Chip '신뢰도 92%' 504 535 166 '#C58B0E'

# Right metrics column
Fill-Round 756 174 292 162 22 '#111B24'
Draw-Text '인덱싱된 레포' 786 207 22 '#79D7CD' 'Bold'
Draw-Text '217' 786 254 46 '#FFFFFF' 'Bold'
Draw-Text '최근 동기화 완료' 885 276 16 '#DCE8F2'

Fill-Round 756 360 292 210 22 '#F6FAFD'
Draw-Text '레포지토리 그래프' 786 393 22 '#0E4274' 'Bold'

$edgePen = New-Pen '#557694' 2
$edges = @(
  @(806, 520, 835, 462),
  @(806, 520, 888, 515),
  @(835, 462, 906, 452),
  @(888, 515, 906, 452),
  @(888, 515, 976, 484),
  @(906, 452, 976, 484)
)
foreach ($edge in $edges) {
  $g.DrawLine($edgePen, $edge[0], $edge[1], $edge[2], $edge[3])
}
$edgePen.Dispose()

$nodes = @(
  @(806, 520, '#DDECF8', 17),
  @(835, 462, '#DDECF8', 16),
  @(888, 515, '#DDECF8', 16),
  @(906, 452, '#7FD3C8', 16),
  @(976, 484, '#DDECF8', 16)
)
foreach ($node in $nodes) {
  $brush = New-Brush $node[2]
  $r = $node[3]
  $g.FillEllipse($brush, [float]$node[0] - $r, [float]$node[1] - $r, $r * 2, $r * 2)
  $brush.Dispose()
}

Fill-Round 756 594 292 42 21 '#EDF6FB'
Draw-Text '운영 리스크 요약 준비 완료' 786 602 20 '#0E4274' 'Bold'

$bmp.Save($outPath, [System.Drawing.Imaging.ImageFormat]::Png)
$g.Dispose()
$bmp.Dispose()
