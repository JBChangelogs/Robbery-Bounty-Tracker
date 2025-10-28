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
  const robloxUrl = `roblox://experiences/start?placeId=${PLACE_ID}&gameInstanceId=${jobId}`;
  
  statusElement.innerHTML = 'Launching Roblox...';
  statusElement.className = 'info';
  window.location.href = robloxUrl;

  setTimeout(() => {
    if (statusElement) {
      statusElement.innerHTML = 'Successfully launched Roblox!';
      statusElement.className = 'success';
      setTimeout(() => window.close(), 1000);
    }
  }, 2000);
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

