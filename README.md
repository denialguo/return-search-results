<div align="center">
  <img src="icon128.png" width="96" alt="Return Search Results icon">
  <h1>Return Search Results</h1>
  <p>Restores Google's search-result count and keeps it visible as the page updates.</p>

  <a href="https://chromewebstore.google.com/detail/return-search-results/cnbhbbkeobbddeggknbjomnjijbklbah"><img src="https://img.shields.io/badge/Chrome_Web_Store-Install-4285F4?logo=googlechrome&logoColor=white" alt="Install from Chrome Web Store"></a>
  <img src="https://img.shields.io/badge/Manifest-V3-34A853" alt="Manifest V3">
</div>

## What it does

Google still exposes an approximate result count, but it is not always surfaced consistently in the normal search UI. This extension detects that count and renders it back into the page in a stable, selectable location.

## Implementation details

- Reads Google's native `#result-stats` value when it becomes available.
- Caches the last valid count so temporary `0 results` states do not overwrite a good value.
- If Google has not populated the count yet, briefly toggles the **Tools** menu invisibly to trigger it.
- Uses a `MutationObserver` plus `requestAnimationFrame` to keep the injected display synchronized with dynamic page updates.
- Falls back to multiple mount points so the count can still render if Google changes part of the surrounding layout.

The extension is intentionally small: one Manifest V3 content script and no backend.

## Install locally

1. Clone this repository.
2. Open `chrome://extensions`.
3. Enable **Developer mode**.
4. Choose **Load unpacked** and select the repository folder.

Or install the published version from the [Chrome Web Store](https://chromewebstore.google.com/detail/return-search-results/cnbhbbkeobbddeggknbjomnjijbklbah).

---

Part of [**Daniel's QOL**](https://github.com/denialguo/Daniel-s-QOL), a collection of 9 published Chrome extensions.