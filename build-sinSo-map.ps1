$SinSoContentFileNames = Get-ChildItem -Path '.\src\assets\sinSo-content' -Name 'sin*' -File
$SinSoContentArrayMap = @($SinSoContentFileNames | % { $i = 0 } {
  @{
    id = $i
    content = $_.ToString()
  }; $i++ })
$SinSoContentArrayMap
$SinSoContentMap = @{
  sinSo = $SinSoContentArrayMap
}
$SinSoContent = ($SinSoContentMap | ConvertTo-Json)

New-Item -Path '.\src\assets\sinSo-map.json' -ItemType 'file' -Value $SinSoContent -Force

Write-Host $SinSoContent