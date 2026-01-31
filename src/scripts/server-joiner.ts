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
  const troubleshoot = document.getElementById('troubleshoot');
  const autoCloseContainer = document.getElementById('auto-close-container');
  const autoCloseCountdown = document.getElementById('auto-close-countdown');
  const cancelAutoClose = document.getElementById('cancel-auto-close');

  if (initialLoading) initialLoading.classList.add('hidden');
  if (joiningState) joiningState.classList.remove('hidden');
  if (browserJoinLink) browserJoinLink.href = webUrl;

  // Attempt the auto-launch immediately
  window.location.href = directUrl;

  const totalTime = 10;
  let timeLeft = totalTime;
  let progressStartTimestamp: number;
  let countdownInterval: number;
  let animationFrame: number;

  const progressBar = document.getElementById('progress-bar');
  const closeNow = document.getElementById('close-now');
  const fallbackMessage = document.getElementById('fallback-message');

  const updateUI = () => {
    if (autoCloseCountdown) {
      autoCloseCountdown.textContent = `Closing in ${timeLeft} seconds`;
    }
  };

  const tryClose = () => {
    try {
      // The "window.open trick" to allow closing windows not opened by script
      window.open('', '_self');
      window.close();
      
      // Fallback check if browser still blocked it
      setTimeout(() => {
        if (!window.closed && fallbackMessage) {
          fallbackMessage.classList.remove('hidden');
        }
      }, 500);
    } catch {
      if (fallbackMessage) fallbackMessage.classList.remove('hidden');
    }
  };

  const animateProgress = () => {
    const now = performance.now();
    const elapsed = (now - progressStartTimestamp) / 1000;
    const progress = Math.min(elapsed / totalTime, 1);
    
    if (progressBar) {
      progressBar.style.width = (progress * 100) + '%';
    }

    if (progress < 1) {
      animationFrame = requestAnimationFrame(animateProgress);
    }
  };

  const stopAutoClose = () => {
    clearInterval(countdownInterval);
    cancelAnimationFrame(animationFrame);
    if (autoCloseContainer) autoCloseContainer.classList.add('hidden');
  };

  // Start the logic
  progressStartTimestamp = performance.now();
  requestAnimationFrame(animateProgress);
  updateUI();

  countdownInterval = window.setInterval(() => {
    timeLeft--;
    updateUI();

    if (timeLeft <= 0) {
      clearInterval(countdownInterval);
      tryClose();
    }
  }, 1000);

  // Button listeners
  if (closeNow) {
    closeNow.addEventListener('click', () => {
      stopAutoClose();
      tryClose();
    });
  }

  if (cancelAutoClose) {
    cancelAutoClose.addEventListener('click', stopAutoClose);
  }

  if (browserJoinLink) {
    browserJoinLink.addEventListener('click', stopAutoClose);
  }

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

