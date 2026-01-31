# tools\make_gallery_manifests.ps1
$root = "images\projects"

Get-ChildItem -Path $root -Directory | ForEach-Object {
  $folder = $_.FullName
  $files = Get-ChildItem -Path $folder -File |
    Where-Object { $_.Extension -match '(\.png|\.jpg|\.jpeg|\.webp|\.gif)$' } |
    Sort-Object Name
  if ($files.Count -gt 0) {
    $thumb = ($files | Where-Object { $_.BaseName -match '^(thumb|cover|dashboard)' } | Select-Object -First 1)
    if (-not $thumb) { $thumb = $files[0] }

    $json = [ordered]@{
      images = $files.Name
      thumb  = $thumb.Name
    } | ConvertTo-Json -Depth 3

    $out = Join-Path $folder "gallery.json"
    $json | Out-File -FilePath $out -Encoding utf8
    Write-Host "Wrote $out"
  }
}
