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
  
  const initialLoading = document.getElementById('initial-loading');
  const joiningState = document.getElementById('joining-state');
  const browserJoinLink = document.getElementById('browser-join-link') as HTMLAnchorElement;

  if (initialLoading) initialLoading.classList.add('hidden');
  if (joiningState) joiningState.classList.remove('hidden');
  if (browserJoinLink) browserJoinLink.href = webUrl;

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
  const initialLoading = document.getElementById('initial-loading');
  const errorState = document.getElementById('error-state');

  if (initialLoading) initialLoading.classList.add('hidden');
  if (errorState) errorState.classList.remove('hidden');
  
  document.body.classList.add('error-page');
}

// Initialize when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initServerJoiner);
} else {
  initServerJoiner();
}

