// Jailbreak place ID 
const PLACE_ID = '606849621';

/**
 * Handles the Roblox server joining logic
 */
export function initServerJoiner() {
  const statusElement = document.getElementById('status');
  const urlParams = new URLSearchParams(window.location.search);
  const jobId = urlParams.get('jobid');

  if (jobId && statusElement) {
    handleServerJoin(jobId, statusElement);
  } else {
    showErrorPage();
  }
}

/**
 * Handles joining a Roblox server with the given job ID
 */
function handleServerJoin(jobId: string, statusElement: HTMLElement) {
  // Primary method: Direct Deep Link
  const directUrl = `roblox://experiences/start?placeId=${PLACE_ID}&gameInstanceId=${jobId}`;
  
  // Secondary method: Web Redirector (more robust as it triggers updates if Roblox is outdated)
  const webUrl = `https://www.roblox.com/games/start?placeId=${PLACE_ID}&gameInstanceId=${jobId}`;
  
  statusElement.className = '';
  statusElement.innerHTML = `
    <div class="flex flex-col items-center">
      <h1 class="text-xl">Joining Jailbreak</h1>
      <p>Launching the game instance...</p>
      
      <div class="spinner-container">
        <div class="spinner"></div>
      </div>

      <div id="troubleshoot" class="opacity-0 transition-opacity flex flex-col items-center">
        <a href="${webUrl}" target="_blank" class="secondary-link">
          App unsupported? Try Browser
        </a>
      </div>

      <a href="https://jailbreakchangelogs.xyz/" target="_blank" class="footer-brand">
        <span>Powered by Jailbreak Changelogs</span>
      </a>
    </div>
  `;

  // Attempt the auto-launch immediately
  window.location.href = directUrl;

  // If they are still here after 3 seconds, show troubleshooting
  setTimeout(() => {
    const troubleshoot = document.getElementById('troubleshoot');
    if (troubleshoot) {
      troubleshoot.classList.remove('opacity-0');
      troubleshoot.classList.add('opacity-100');
    }
  }, 3000);
}

/**
 * Shows the error page when no job ID is provided
 */
function showErrorPage() {
  document.body.classList.add('error-page');
  document.body.style.setProperty('background-image', 'url(https://assets.jailbreakchangelogs.xyz/assets/backgrounds/png/background16.png)', 'important');
  const container = document.querySelector('.container');

  if (container) {
    container.innerHTML = `
      <div class="mb-8">
        <div class="error-code">404</div>
        <h1 class="error-title">Connection Error</h1>
        <p class="error-message">
          Unable to connect to the server. The jobid parameter is missing from the URL.
        </p>
      </div>
      <div class="error-actions">
        <button onclick="window.close()" class="primary-button">Close Tab</button>
        <button onclick="window.history.back()" class="secondary-button">Go Back</button>
      </div>
    `;
  }
}

// Initialize when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initServerJoiner);
} else {
  initServerJoiner();
}

