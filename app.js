// DERAIL — Minimalist, User-Friendly Forward Verification Engine

(function() {
  'use strict';

  // State
  let currentCaseId = 'whatsapp-500';
  let activeTab = 'whatsapp';
  let isPlayingVoice = false;

  // Cache DOM
  const tabButtons = document.querySelectorAll('.tab-btn');
  const tabPanels = document.querySelectorAll('.tab-panel');
  const inputText = document.getElementById('input-text');
  const btnClearText = document.getElementById('btn-clear-text');
  const btnVerify = document.getElementById('btn-verify');
  
  const scannerSection = document.getElementById('scanner-section');
  const scanStep1 = document.getElementById('scan-step-1');
  const scanStep2 = document.getElementById('scan-step-2');
  const scanStep3 = document.getElementById('scan-step-3');

  const resultsSection = document.getElementById('results-section');
  const overallBadge = document.getElementById('overall-badge');
  const resultModalityTag = document.getElementById('result-modality-tag');
  const overallHeadline = document.getElementById('overall-headline');
  const overallSummary = document.getElementById('overall-summary');
  const originalQuoteText = document.getElementById('original-quote-text');
  const claimsCountPill = document.getElementById('claims-count-pill');
  const claimsGrid = document.getElementById('claims-grid');
  
  const btnCopyDebunk = document.getElementById('btn-copy-debunk');
  const btnCheckAnother = document.getElementById('btn-check-another');
  const toast = document.getElementById('toast');

  const btnVoiceToggle = document.getElementById('btn-voice-toggle');
  const waveformContainer = document.getElementById('waveform-bars');

  // Initialize
  function init() {
    setupTabs();
    setupExamples();
    setupWaveform();
    setupActions();
    setupAuth();
    loadCase(currentCaseId);
  }

  // Setup tabs
  function setupTabs() {
    tabButtons.forEach(btn => {
      btn.addEventListener('click', () => {
        const targetTab = btn.getAttribute('data-tab');
        setActiveTab(targetTab);
      });
    });

    btnClearText.addEventListener('click', () => {
      inputText.value = '';
      inputText.focus();
    });
  }

  function setActiveTab(tab) {
    activeTab = tab;
    tabButtons.forEach(b => {
      const isMatch = b.getAttribute('data-tab') === tab;
      b.classList.toggle('active', isMatch);
      b.setAttribute('aria-selected', isMatch ? 'true' : 'false');
    });

    tabPanels.forEach(p => {
      p.classList.toggle('active', p.id === `tab-panel-${tab}`);
    });

    // Auto load matched case for that tab
    const matchedCase = DEMO_CASES.find(c => c.modality === tab);
    if (matchedCase) {
      loadCase(matchedCase.id, false);
    }
  }

  // Setup sample chips
  function setupExamples() {
    document.querySelectorAll('[data-case]').forEach(btn => {
      btn.addEventListener('click', () => {
        const caseId = btn.getAttribute('data-case');
        const targetCase = DEMO_CASES.find(c => c.id === caseId);
        if (targetCase) {
          setActiveTab(targetCase.modality);
          loadCase(caseId, true);
        }
      });
    });
  }

  // Waveform visualization
  function setupWaveform() {
    if (!waveformContainer) return;
    waveformContainer.innerHTML = '';
    const heights = [35, 60, 80, 45, 90, 75, 50, 65, 85, 40, 95, 70, 60, 80, 45, 30, 65, 40, 85, 55];
    heights.forEach(h => {
      const bar = document.createElement('div');
      bar.className = 'waveform-bar';
      bar.style.height = `${h}%`;
      waveformContainer.appendChild(bar);
    });

    if (btnVoiceToggle) {
      btnVoiceToggle.addEventListener('click', () => {
        isPlayingVoice = !isPlayingVoice;
        btnVoiceToggle.textContent = isPlayingVoice ? '⏸' : '▶';
        document.querySelectorAll('.waveform-bar').forEach((b, i) => {
          b.classList.toggle('playing', isPlayingVoice);
        });
      });
    }
  }

  // Load a case into inputs
  function loadCase(caseId, shouldScroll = false) {
    const data = DEMO_CASES.find(c => c.id === caseId);
    if (!data) return;

    currentCaseId = caseId;

    if (data.modality === 'whatsapp' && inputText) {
      inputText.value = data.rawContent;
    }

    if (shouldScroll) {
      document.querySelector('.input-card').scrollIntoView({ behavior: 'smooth' });
    }
  }

  // Setup actions
  function setupActions() {
    btnVerify.addEventListener('click', runVerification);

    btnCheckAnother.addEventListener('click', () => {
      resultsSection.classList.add('hidden');
      document.querySelector('.input-card').scrollIntoView({ behavior: 'smooth' });
      if (activeTab === 'whatsapp') {
        inputText.focus();
      }
    });

    btnCopyDebunk.addEventListener('click', copyDebunkCard);
  }

  // Trigger verification flow
  function runVerification() {
    const data = DEMO_CASES.find(c => c.id === currentCaseId) || DEMO_CASES[0];

    // Show scanner, hide results
    resultsSection.classList.add('hidden');
    scannerSection.classList.remove('hidden');
    scannerSection.scrollIntoView({ behavior: 'smooth' });

    // Step 1
    scanStep1.className = 'step-item step-active';
    scanStep2.className = 'step-item';
    scanStep3.className = 'step-item';

    setTimeout(() => {
      // Step 2
      scanStep1.className = 'step-item step-done';
      scanStep2.className = 'step-item step-active';
    }, 400);

    setTimeout(() => {
      // Step 3
      scanStep2.className = 'step-item step-done';
      scanStep3.className = 'step-item step-active';
    }, 800);

    setTimeout(() => {
      scanStep3.className = 'step-item step-done';
      scannerSection.classList.add('hidden');
      renderResults(data);
      resultsSection.classList.remove('hidden');
      resultsSection.scrollIntoView({ behavior: 'smooth' });
    }, 1200);
  }

  // Render results
  function renderResults(data) {
    // Overall verdict
    overallBadge.textContent = data.overallVerdict;
    overallBadge.className = 'verdict-tag ' + getVerdictClass(data.overallVerdict);

    resultModalityTag.textContent = `${data.icon} ${data.modalityLabel}`;
    overallHeadline.textContent = data.title;
    overallSummary.textContent = data.overallSummary;
    originalQuoteText.textContent = data.rawContent;

    claimsCountPill.textContent = `${data.claims.length} Claims Extracted`;

    // Render claims grid
    claimsGrid.innerHTML = '';
    data.claims.forEach((claim, idx) => {
      const card = document.createElement('div');
      card.className = 'claim-card';

      const vClass = getVerdictClass(claim.verdict);

      card.innerHTML = `
        <div class="claim-header">
          <span class="claim-number">CLAIM #${claim.number || (idx + 1)}</span>
          <span class="claim-badge ${vClass}">${claim.badge || claim.verdict}</span>
        </div>
        <div class="claim-statement">"${escapeHtml(claim.claimText)}"</div>
        <div class="claim-why"><strong>Why:</strong> ${escapeHtml(claim.why)}</div>
        <div class="evidence-box">
          <div class="evidence-header">
            <span class="evidence-source">🏛️ ${escapeHtml(claim.evidence.source)}</span>
            <span class="evidence-confidence">Confidence: ${claim.evidence.confidence}</span>
          </div>
          <div class="evidence-excerpt">${escapeHtml(claim.evidence.excerpt)}</div>
        </div>
      `;
      claimsGrid.appendChild(card);
    });
  }

  function getVerdictClass(verdict) {
    const v = (verdict || '').toUpperCase();
    if (v.includes('FALSE')) return 'verdict-false';
    if (v.includes('PARTIAL')) return 'verdict-partially';
    if (v.includes('VERIFIED')) return 'verdict-verified';
    if (v.includes('OUTDATED')) return 'verdict-outdated';
    return 'verdict-unconfirmed';
  }

  // Copy debunk message to clipboard
  function copyDebunkCard() {
    const data = DEMO_CASES.find(c => c.id === currentCaseId) || DEMO_CASES[0];
    
    let text = `🚨 *FACT CHECK ALERT* 🚨\n\n`;
    text += `Regarding the forward: "${data.title}"\n`;
    text += `Verdict: *${data.overallVerdict}*\n\n`;
    text += `*The Truth:*\n${data.overallSummary}\n\n`;
    text += `*Official Sources Checked:*\n`;
    data.claims.forEach(c => {
      text += `• ${c.evidence.source} (${c.evidence.sourceUrl})\n`;
    });
    text += `\n_Verified by DERAIL — Hack on Track 2026_`;

    navigator.clipboard.writeText(text).then(() => {
      showToast('Copied debunk summary! Ready to paste in WhatsApp.');
    }).catch(() => {
      showToast('Text copied!');
    });
  }

  function showToast(msg) {
    if (!toast) return;
    toast.textContent = msg;
    toast.classList.remove('hidden');
    setTimeout(() => {
      toast.classList.add('hidden');
    }, 2800);
  }

  function escapeHtml(str) {
    if (!str) return '';
    return str.replace(/[&<>"']/g, function(m) {
      return {
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        '"': '&quot;',
        "'": '&#039;'
      }[m];
    });
  }

  // ==========================================================================
  // Professional Authentication Module (Google & Amazon Grade)
  // ==========================================================================
  function setupAuth() {
    const btnOpenAuth = document.getElementById('btn-open-auth');
    const authModal = document.getElementById('auth-modal');
    const btnCloseAuth = document.getElementById('btn-close-auth');
    const tabSignIn = document.getElementById('auth-tab-signin');
    const tabRegister = document.getElementById('auth-tab-register');
    const formSignIn = document.getElementById('form-signin');
    const formRegister = document.getElementById('form-register');
    const btnGoogleSSO = document.getElementById('btn-google-sso');
    const btnAmazonSSO = document.getElementById('btn-amazon-sso');
    const userProfileBadge = document.getElementById('user-profile-badge');
    const btnSignOut = document.getElementById('btn-sign-out');
    const userNameDisplay = document.getElementById('user-name');
    const userAvatarDisplay = document.getElementById('user-avatar');
    const registerPasswordInput = document.getElementById('register-password');

    if (!authModal) return;

    // Open Modal
    if (btnOpenAuth) {
      btnOpenAuth.addEventListener('click', () => {
        authModal.classList.remove('hidden');
      });
    }

    // Close Modal
    if (btnCloseAuth) {
      btnCloseAuth.addEventListener('click', () => {
        authModal.classList.add('hidden');
      });
    }

    // Click outside to close
    authModal.addEventListener('click', (e) => {
      if (e.target === authModal) {
        authModal.classList.add('hidden');
      }
    });

    // Escape key to close
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && !authModal.classList.contains('hidden')) {
        authModal.classList.add('hidden');
      }
    });

    // Switch between Sign In and Register tabs
    function switchAuthTab(target) {
      const isSignIn = target === 'signin';
      tabSignIn.classList.toggle('active', isSignIn);
      tabSignIn.setAttribute('aria-selected', isSignIn ? 'true' : 'false');
      tabRegister.classList.toggle('active', !isSignIn);
      tabRegister.setAttribute('aria-selected', !isSignIn ? 'true' : 'false');

      formSignIn.classList.toggle('hidden', !isSignIn);
      formRegister.classList.toggle('hidden', isSignIn);
    }

    if (tabSignIn && tabRegister) {
      tabSignIn.addEventListener('click', () => switchAuthTab('signin'));
      tabRegister.addEventListener('click', () => switchAuthTab('register'));
    }

    // Password visibility toggles
    document.querySelectorAll('.btn-toggle-eye').forEach(btn => {
      btn.addEventListener('click', () => {
        const targetId = btn.getAttribute('data-target');
        const targetInput = document.getElementById(targetId);
        if (targetInput) {
          const isPassword = targetInput.type === 'password';
          targetInput.type = isPassword ? 'text' : 'password';
          btn.textContent = isPassword ? '🙈' : '👁️';
        }
      });
    });

    // Live Password Strength Meter
    if (registerPasswordInput) {
      registerPasswordInput.addEventListener('input', (e) => {
        updatePasswordStrength(e.target.value);
      });
    }

    function updatePasswordStrength(val) {
      const seg1 = document.getElementById('strength-seg-1');
      const seg2 = document.getElementById('strength-seg-2');
      const seg3 = document.getElementById('strength-seg-3');
      const seg4 = document.getElementById('strength-seg-4');
      const statusText = document.getElementById('strength-status-text');

      // Reset
      [seg1, seg2, seg3, seg4].forEach(s => {
        s.className = 'strength-segment';
      });

      if (!val || val.length === 0) {
        statusText.textContent = 'Enter password';
        statusText.style.color = 'var(--text-muted)';
        return;
      }

      let score = 0;
      if (val.length >= 8) score++;
      if (/[A-Z]/.test(val) && /[a-z]/.test(val)) score++;
      if (/[0-9]/.test(val)) score++;
      if (/[^A-Za-z0-9]/.test(val)) score++;

      if (score === 1 || val.length < 8) {
        seg1.classList.add('active-weak');
        statusText.textContent = 'Weak';
        statusText.style.color = 'var(--accent-rose)';
      } else if (score === 2) {
        seg1.classList.add('active-fair');
        seg2.classList.add('active-fair');
        statusText.textContent = 'Moderate';
        statusText.style.color = 'var(--accent-amber)';
      } else if (score === 3) {
        seg1.classList.add('active-good');
        seg2.classList.add('active-good');
        seg3.classList.add('active-good');
        statusText.textContent = 'Strong';
        statusText.style.color = 'var(--accent-cyan)';
      } else {
        seg1.classList.add('active-strong');
        seg2.classList.add('active-strong');
        seg3.classList.add('active-strong');
        seg4.classList.add('active-strong');
        statusText.textContent = 'Excellent';
        statusText.style.color = 'var(--accent-emerald)';
      }
    }

    // Login Action Helper
    function completeAuthentication(name, email, provider) {
      authModal.classList.add('hidden');
      if (btnOpenAuth) btnOpenAuth.classList.add('hidden');
      if (userProfileBadge) {
        userProfileBadge.classList.remove('hidden');
        if (userNameDisplay) userNameDisplay.textContent = name;
        if (userAvatarDisplay) {
          const initials = name.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase();
          userAvatarDisplay.textContent = initials || 'U';
        }
      }
      showToast(`Welcome ${name}! Signed in via ${provider || 'DERAIL Secure ID'}.`);
    }

    // Google SSO Click
    if (btnGoogleSSO) {
      btnGoogleSSO.addEventListener('click', () => {
        btnGoogleSSO.innerHTML = `<span>Connecting to Google Identity...</span>`;
        setTimeout(() => {
          btnGoogleSSO.innerHTML = `
            <svg class="sso-icon" viewBox="0 0 24 24" width="18" height="18">
              <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
              <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
              <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"/>
              <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"/>
            </svg>
            <span>Continue with Google</span>
          `;
          completeAuthentication('Samuel Alva', 'samuelalva2006@gmail.com', 'Google SSO');
        }, 700);
      });
    }

    // Amazon SSO Click
    if (btnAmazonSSO) {
      btnAmazonSSO.addEventListener('click', () => {
        btnAmazonSSO.innerHTML = `<span>Connecting to Amazon Auth...</span>`;
        setTimeout(() => {
          btnAmazonSSO.innerHTML = `
            <svg class="sso-icon" viewBox="0 0 24 24" width="18" height="18" fill="currentColor">
              <path d="M13.9 14.3c-2.4 1.8-5.9 2.7-8.9 2.7-4.2 0-8-1.6-10.9-4.2-.3-.2-.3-.6 0-.8.4-.3.9-.3 1.2 0 2.6 2.3 6.1 3.7 9.8 3.7 2.6 0 5.6-.8 7.7-2.2.4-.3.9-.1 1.1.3.2.4.1.9 0 1.2zm1.6-1.7c-.3-.4-1.8-.2-2.8.3-.3.2-.4.5-.2.8.2.3.5.4.8.2 1-.5 2.2-.6 2.5-.3.3.3.1 1.3-.7 2.1-.2.2-.2.5 0 .8.2.2.5.2.8 0 1.1-1.1 1.4-2.5 1-3.1-.4-.6-1.1-.8-1.6-.8z"/>
            </svg>
            <span>Continue with Amazon</span>
          `;
          completeAuthentication('Samuel Alva', 'samuelalva2006@gmail.com', 'Amazon Identity');
        }, 700);
      });
    }

    // Form Sign In Submit
    if (formSignIn) {
      formSignIn.addEventListener('submit', (e) => {
        e.preventDefault();
        const email = document.getElementById('signin-email').value || 'samuelalva2006@gmail.com';
        const name = email.split('@')[0];
        completeAuthentication(name, email, 'Email');
      });
    }

    // Form Register Submit
    if (formRegister) {
      formRegister.addEventListener('submit', (e) => {
        e.preventDefault();
        const name = document.getElementById('register-name').value || 'New User';
        const email = document.getElementById('register-email').value || 'user@example.com';
        completeAuthentication(name, email, 'Email');
      });
    }

    // Sign Out
    if (btnSignOut) {
      btnSignOut.addEventListener('click', () => {
        if (userProfileBadge) userProfileBadge.classList.add('hidden');
        if (btnOpenAuth) btnOpenAuth.classList.remove('hidden');
        showToast('Signed out of DERAIL session.');
      });
    }
  }

  // Run on DOM ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

})();
