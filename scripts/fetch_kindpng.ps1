$urls = @{
    "tvs-apache" = "https://www.kindpng.com/imgv/iwhhwxJ_tvs-apache-rtr-160-4v-hd-png-download/"
    "honda-xr150l" = "https://www.kindpng.com/imgv/TThRiRh_xr-150l-moto-xr-150-honda-hd-png/"
    "yamaha-nmax" = "https://www.kindpng.com/imgv/iwmJmJ_yamaha-nmax-155-hd-png-download/"
    "ktm-200-duke" = "https://www.kindpng.com/imgv/hhmmwJ_ktm-200-duke-hd-png-download/"
    "pulsar-ns125" = "https://www.kindpng.com/imgv/iRxRJJR_pulsar-bike-png-bajaj-pulsar-125-neon-transparent/"
    "bajaj-ct125" = "https://www.kindpng.com/imgv/ibhJhT_bajaj-ct-125-hd-png-download/"
    "boxer-ct100" = "https://www.kindpng.com/imgv/ToJhJi_bajaj-boxer-ct-100-hd-png-download/"
    "hero-hunk" = "https://www.kindpng.com/imgv/wTJAhT_hero-hunk-125r-hd-png-download/"
    "honda-cb125f" = "https://www.kindpng.com/imgv/Thwmbo_honda-cb125f-hd-png-download/"
    "honda-cb190r" = "https://www.kindpng.com/imgv/mmRbJm_honda-cb190r-hd-png-download/"
    "honda-navi" = "https://www.kindpng.com/imgv/TRiJJo_honda-navi-hd-png-download/"
}

foreach ($name in $urls.Keys) {
    $url = $urls[$name]
    Write-Host "=== $name ==="
    $tempFile = [System.IO.Path]::GetTempFileName()
    try {
        $response = Invoke-WebRequest -Uri $url -Method Get -TimeoutSec 20 -UserAgent "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36" -OutFile $tempFile -ErrorAction Stop
        Write-Host "Page fetched OK ($($response.StatusCode))"
        # Look for full-size image URLs
        $content = Get-Content $tempFile -Raw
        # Find all PNG URLs in the page
        $pattern = 'https?://[^""'']+?\.png'
        $matches = [regex]::Matches($content, $pattern)
        foreach ($match in $matches) {
            $imgUrl = $match.Value
            if ($imgUrl -like "*picc/m/*" -or $imgUrl -like "*picc/original*" -or $imgUrl -like "*picc/large*") {
                Write-Host "  IMG: $imgUrl"
            } elseif ($imgUrl -notlike "*logo*" -and $imgUrl -notlike "*avatar*" -and $imgUrl -notlike "*icon*") {
                Write-Host "  PNG: $imgUrl"
            }
        }
    } catch {
        Write-Host "FAILED: $_"
    }
    Remove-Item $tempFile -Force -ErrorAction SilentlyContinue
    Write-Host ""
}
