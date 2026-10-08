// DERAIL — Master Application Controller & State Machine
// Modular, clean, and zero external dependencies

(function() {
  'use strict';

  // Application State
  const state = {
    currentStage: 1,
    selectedCaseIndex: 0,
    isAutoPlay: false,
    autoPlayTimer: null,
    totalStages: 6
  };

  // DOM Element Selectors
  const dom = {
    progressFill: document.getElementById('progress-indicator'),
    stageNodes: document.querySelectorAll('.stage-node'),
    sections: document.querySelectorAll('.stage-section'),
    modalityPills: document.getElementById('modality-pills'),
    
    // Stage 1
    forwardIcon: document.getElementById('forward-icon'),
    forwardSender: document.getElementById('forward-sender'),
    forwardMeta: document.getElementById('forward-meta'),
    forwardContentBox: document.getElementById('forward-content-box'),
    btnStart: document.getElementById('btn-start-investigation'),

    // Stage 2
    extractionRawText: document.getElementById('extraction-raw-text'),
    claimCountBadge: document.getElementById('claim-count-badge'),
    extractedClaimsList: document.getElementById('extracted-claims-list'),
    btnToTrack: document.getElementById('btn-to-track'),

    // Stage 3
    trackClaimsContainer: document.getElementById('track-claims-container'),
    btnToEvidence: document.getElementById('btn-to-evidence'),

    // Stage 4
    evidenceGrid: document.getElementById('evidence-cards-container'),
    btnToDerail: document.getElementById('btn-to-derail'),

    // Stage 5
    activeDerailBox: document.getElementById('active-derail-card-area'),
    btnToVerdict: document.getElementById('btn-to-verdict'),

    // Stage 6
    overallVerdictTitle: document.getElementById('overall-verdict-title'),
    overallVerdictSummary: document.getElementById('overall-verdict-summary-text'),
    claimsTallyChips: document.getElementById('claims-tally-chips'),
    finalReportsGrid: document.getElementById('final-claims-report-grid'),
    btnTestAnother: document.getElementById('btn-test-another'),

    // Nav & Controls
    btnPrev: document.getElementById('btn-prev-stage'),
    btnNext: document.getElementById('btn-next-stage'),
    btnRestart: document.getElementById('btn-restart'),
    modeAuto: document.getElementById('mode-auto'),
    modeStep: document.getElementById('mode-step'),

    // Modal
    modal: document.getElementById('evidence-modal'),
    modalClaimTag: document.getElementById('modal-claim-number'),
    modalTitle: document.getElementById('modal-title'),
    modalBody: document.getElementById('modal-body'),
    btnCloseModal: document.getElementById('btn-close-modal')
  };

  // Helper to get active case
  function getActiveCase() {
    return DEMO_CASES[state.selectedCaseIndex];
  }

  // Initialize Application
  function init() {
    renderModalityPills();
    loadCase(0);
    bindEvents();
    goToStage(1);
  }

  // Render Modality Selection Buttons
  function renderModalityPills() {
    dom.modalityPills.innerHTML = DEMO_CASES.map((c, idx) => `
      <button class="modality-btn ${idx === state.selectedCaseIndex ? 'active' : ''}" data-case-index="${idx}">
        <span>${c.icon}</span>
        <span>${c.modalityLabel}</span>
      </button>
    `).join('');

    dom.modalityPills.querySelectorAll('.modality-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        stopAutoPlay();
        const idx = parseInt(btn.dataset.caseIndex, 10);
        loadCase(idx);
        goToStage(1);
      });
    });
  }

  // Load Demonstration Scenario into Stage 1
  function loadCase(index) {
    state.selectedCaseIndex = index;
    const current = getActiveCase();

    // Update Modality Buttons Active State
    dom.modalityPills.querySelectorAll('.modality-btn').forEach((b, i) => {
      b.classList.toggle('active', i === index);
    });

    // Populate Stage 1 Header & Content
    dom.forwardIcon.textContent = current.icon;
    dom.forwardSender.textContent = current.sender;
    dom.forwardMeta.textContent = `${current.modalityLabel} • ${current.timestamp}`;

    let mediaHTML = '';
    if (current.mediaPreview) {
      if (current.mediaPreview.type === 'audio') {
        const bars = current.mediaPreview.waveform.map(h => `<div class="wave-bar" style="height: ${h}%"></div>`).join('');
        mediaHTML = `
          <div class="media-preview-box">
            <span style="font-size:1.2rem">🎙️</span>
            <div class="audio-waveform-bars">${bars}</div>
            <span style="font-size:0.78rem; color: var(--text-dim);">${current.mediaPreview.duration} Audio Voice Note</span>
          </div>
        `;
      } else if (current.mediaPreview.type === 'pdf') {
        mediaHTML = `
          <div class="media-preview-box">
            <span style="font-size:1.2rem">📄</span>
            <div>
              <div style="font-weight:600; font-size:0.85rem;">${current.mediaPreview.filename}</div>
              <div style="font-size:0.75rem; color: var(--text-dim);">${current.mediaPreview.pages} Pages • ${current.mediaPreview.fileSize}</div>
            </div>
          </div>
        `;
      } else if (current.mediaPreview.type === 'url') {
        mediaHTML = `
          <div class="media-preview-box">
            <span style="font-size:1.2rem">🔗</span>
            <div>
              <div style="font-size:0.75rem; color: var(--accent-cyan);">${current.mediaPreview.domain}</div>
              <div style="font-weight:600; font-size:0.85rem;">${current.mediaPreview.headline}</div>
            </div>
          </div>
        `;
      } else if (current.mediaPreview.type === 'image') {
        mediaHTML = `
          <div class="media-preview-box">
            <span style="font-size:1.2rem">🖼️</span>
            <div>
              <div style="font-weight:600; font-size:0.85rem;">${current.mediaPreview.title}</div>
              <div style="font-size:0.75rem; color: var(--text-dim);">${current.mediaPreview.subtext}</div>
            </div>
          </div>
        `;
      }
    }

    dom.forwardContentBox.innerHTML = `
      <p>${current.rawContent}</p>
      ${mediaHTML}
    `;
  }

  // Stage Transition Manager
  function goToStage(stageNum) {
    if (stageNum < 1 || stageNum > state.totalStages) return;
    state.currentStage = stageNum;

    // Update Progress Rail
    const progressPercent = ((stageNum - 1) / (state.totalStages - 1)) * 100;
    dom.progressFill.style.width = `${progressPercent}%`;

    dom.stageNodes.forEach((node, idx) => {
      const nStage = idx + 1;
      node.classList.toggle('active', nStage === stageNum);
      node.classList.toggle('completed', nStage < stageNum);
    });

    // Toggle Stage Views
    dom.sections.forEach((sec, idx) => {
      sec.classList.toggle('active', idx + 1 === stageNum);
    });

    // Update Nav Buttons
    dom.btnPrev.disabled = stageNum === 1;
    dom.btnNext.disabled = stageNum === state.totalStages;

    // Trigger Stage-Specific Renders
    if (stageNum === 2) renderStage2();
    if (stageNum === 3) renderStage3();
    if (stageNum === 4) renderStage4();
    if (stageNum === 5) renderStage5();
    if (stageNum === 6) renderStage6();

    // Handle Auto-Play Progression
    if (state.isAutoPlay) {
      scheduleNextAutoPlay(stageNum);
    }
  }

  // Schedule Next Step in Presentation Mode
  function scheduleNextAutoPlay(currentStage) {
    clearTimeout(state.autoPlayTimer);
    if (currentStage >= state.totalStages) {
      stopAutoPlay();
      return;
    }

    const delays = { 1: 4000, 2: 4500, 3: 4000, 4: 5500, 5: 6000 };
    const delay = delays[currentStage] || 4500;

    state.autoPlayTimer = setTimeout(() => {
      if (state.isAutoPlay && state.currentStage === currentStage) {
        goToStage(currentStage + 1);
      }
    }, delay);
  }

  function startAutoPlay() {
    state.isAutoPlay = true;
    dom.modeAuto.classList.add('active');
    dom.modeStep.classList.remove('active');
    scheduleNextAutoPlay(state.currentStage);
  }

  function stopAutoPlay() {
    state.isAutoPlay = false;
    clearTimeout(state.autoPlayTimer);
    dom.modeAuto.classList.remove('active');
    dom.modeStep.classList.add('active');
  }

  // ==========================================
  // STAGE 2: CLAIM EXTRACTION (CARRIAGES)
  // ==========================================
  function renderStage2() {
    const current = getActiveCase();
    dom.extractionRawText.innerHTML = `<span>${current.rawContent}</span>`;
    dom.claimCountBadge.textContent = `${current.claims.length} ATOMIC CLAIMS`;

    dom.extractedClaimsList.innerHTML = current.claims.map((claim, idx) => `
      <div class="claim-carriage-card" style="animation: fadeInStage 0.4s ease forwards ${idx * 0.15}s; opacity:0;">
        <div class="carriage-header">
          <span class="carriage-id-tag">CARRIAGE // CLAIM ${claim.number}</span>
          <span class="pill pill-subtle">INDEPENDENT ASSERTION</span>
        </div>
        <p class="carriage-text">"${claim.claimText}"</p>
      </div>
    `).join('');
  }

  // ==========================================
  // STAGE 3: INVESTIGATION TRACK
  // ==========================================
  function renderStage3() {
    const current = getActiveCase();
    dom.trackClaimsContainer.innerHTML = current.claims.map((claim) => `
      <div class="track-carriage-mini">
        <span class="wheel-dot"></span>
        <span>CLAIM ${claim.number}: "${claim.claimText.slice(0, 32)}..."</span>
        <span class="wheel-dot"></span>
      </div>
    `).join('');
  }

  // ==========================================
  // STAGE 4: EVIDENCE STATION
  // ==========================================
  function renderStage4() {
    const current = getActiveCase();
    dom.evidenceGrid.innerHTML = current.claims.map((claim) => {
      const relClass = claim.evidence.relation === 'SUPPORTS' ? 'relation-supports' :
                       claim.evidence.relation === 'CONTRADICTS' ? 'relation-contradicts' : 'relation-unverified';
      return `
        <div class="evidence-card">
          <div class="evidence-claim-context">
            <strong style="color:var(--accent-cyan)">CLAIM ${claim.number}:</strong> "${claim.claimText}"
          </div>
          <div class="evidence-source-header">
            <div>
              <div class="source-title">${claim.evidence.source}</div>
              <div class="source-type">${claim.evidence.sourceType} • ${claim.evidence.sourceDate}</div>
            </div>
            <span class="confidence-chip">${claim.evidence.confidence} Match</span>
          </div>
          <div class="evidence-quote-box">
            ${claim.evidence.excerpt}
          </div>
          <div style="display:flex; justify-content:space-between; align-items:center;">
            <span class="evidence-relation-tag ${relClass}">
              ${claim.evidence.relation === 'SUPPORTS' ? '✓ SUPPORTS CLAIM' : '✕ CONTRADICTS CLAIM'}
            </span>
            <button class="btn btn-ghost" style="padding:0.25rem 0.6rem; font-size:0.75rem;" onclick="window.derailApp.openModal('${claim.id}')">
              Inspect Citation ↗
            </button>
          </div>
        </div>
      `;
    }).join('');
  }

  // ==========================================
  // STAGE 5: THE DERAIL MOMENT (SWITCH & JUNCTION)
  // ==========================================
  function renderStage5() {
    const current = getActiveCase();
    dom.activeDerailBox.innerHTML = current.claims.map((claim, idx) => {
      const isDerailed = claim.derailed;
      return `
        <div class="derail-interactive-card ${isDerailed ? 'derailed-active' : 'verified-active'}" style="animation-delay: ${idx * 0.2}s;">
          ${isDerailed ? '<div class="derail-spark-burst">⚡ 💥</div>' : '<div class="derail-spark-burst">🟢 ✓</div>'}
          <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:0.4rem;">
            <span class="carriage-id-tag">CLAIM ${claim.number}</span>
            <span class="pill ${isDerailed ? 'pill-subtle' : 'pill-accent'}">${claim.verdict}</span>
          </div>
          <p style="font-size:0.92rem; color:#f1f5f9; margin-bottom:0.5rem;">"${claim.claimText}"</p>
          <div style="font-size:0.8rem; color:var(--text-muted); line-height:1.5;">${claim.why}</div>
          <div class="derail-action-banner">
            <span style="font-size:0.75rem; font-family:var(--font-mono); color:var(--text-dim);">
              SWITCH ACTION: ${isDerailed ? 'TRACK SIDING DERAILED' : 'MAINLINE CLEARED'}
            </span>
            <span class="derail-outcome-badge ${isDerailed ? 'outcome-derailed' : 'outcome-cleared'}">
              ${isDerailed ? '✕ DERAIL' : '✓ PROCEED'}
            </span>
          </div>
        </div>
      `;
    }).join('');
  }

  // ==========================================
  // STAGE 6: FINAL VERDICT & PLAIN EXPLANATION
  // ==========================================
  function renderStage6() {
    const current = getActiveCase();

    // Verdict Badge styling
    dom.overallVerdictTitle.textContent = current.overallVerdict;
    dom.overallVerdictTitle.className = 'overall-verdict-badge';
    if (current.overallVerdict === 'FALSE') dom.overallVerdictTitle.classList.add('badge-false');
    else if (current.overallVerdict === 'PARTIALLY SUPPORTED') dom.overallVerdictTitle.classList.add('badge-partially-supported');
    else dom.overallVerdictTitle.classList.add('badge-verified');

    dom.overallVerdictSummary.textContent = current.overallSummary;

    // Tallies
    const verifiedCount = current.claims.filter(c => !c.derailed).length;
    const derailedCount = current.claims.filter(c => c.derailed).length;

    dom.claimsTallyChips.innerHTML = `
      <span class="tally-chip tally-verified">✓ ${verifiedCount} Verified</span>
      <span class="tally-chip tally-false">✕ ${derailedCount} Derailed</span>
    `;

    // Claim Breakdown List
    dom.finalReportsGrid.innerHTML = current.claims.map(claim => {
      const vClass = claim.verdictClass === 'verified' ? 'tally-verified' : 'tally-false';
      return `
        <div class="final-claim-card">
          <div class="claim-num-pill">CLAIM ${claim.number}</div>
          <div class="claim-details-col">
            <div class="claim-quote-text">"${claim.claimText}"</div>
            <div class="claim-why-box">
              <strong style="color:#fff;">Explanation:</strong> ${claim.why}
            </div>
            <div class="claim-source-ref">
              <span>🏛️ <strong>Source:</strong> ${claim.evidence.source}</span>
              <span>•</span>
              <span>📅 ${claim.evidence.sourceDate}</span>
            </div>
          </div>
          <div class="claim-verdict-col">
            <span class="final-verdict-badge ${vClass}">${claim.badge}</span>
            <button class="btn btn-ghost" style="padding:0.25rem 0.6rem; font-size:0.75rem;" onclick="window.derailApp.openModal('${claim.id}')">
              Evidence Trail ↗
            </button>
          </div>
        </div>
      `;
    }).join('');
  }

  // Open Evidence Detail Modal
  function openEvidenceModal(claimId) {
    const current = getActiveCase();
    const claim = current.claims.find(c => c.id === claimId);
    if (!claim) return;

    dom.modalClaimTag.textContent = `CLAIM ${claim.number} EVIDENCE TRAIL`;
    dom.modalTitle.textContent = claim.evidence.source;

    dom.modalBody.innerHTML = `
      <div style="display:flex; flex-direction:column; gap:1rem;">
        <div style="background:rgba(0,0,0,0.3); padding:0.85rem; border-radius:var(--radius-sm); border-left:3px solid var(--accent-cyan);">
          <div style="font-size:0.75rem; color:var(--text-dim); margin-bottom:0.2rem;">INVESTIGATED ASSERTION</div>
          <div style="font-size:0.95rem; color:#fff;">"${claim.claimText}"</div>
        </div>
        <div>
          <div style="font-size:0.75rem; color:var(--text-dim); margin-bottom:0.25rem;">SOURCE METADATA</div>
          <div style="font-size:0.85rem; color:#e2e8f0;">
            • <strong>Registry:</strong> ${claim.evidence.sourceType}<br>
            • <strong>Published:</strong> ${claim.evidence.sourceDate}<br>
            • <strong>Corroboration Confidence:</strong> ${claim.evidence.confidence}
          </div>
        </div>
        <div>
          <div style="font-size:0.75rem; color:var(--text-dim); margin-bottom:0.25rem;">VERBATIM REGISTRY EXCERPT</div>
          <div style="background:rgba(255,255,255,0.04); padding:1rem; border-radius:var(--radius-sm); font-style:italic; line-height:1.6; color:#cbd5e1;">
            ${claim.evidence.excerpt}
          </div>
        </div>
        <div style="background:${claim.derailed ? 'rgba(239,68,68,0.15)' : 'rgba(16,185,129,0.15)'}; border:1px solid ${claim.derailed ? 'var(--accent-crimson)' : 'var(--accent-emerald)'}; padding:0.75rem; border-radius:var(--radius-sm);">
          <strong style="color:#fff;">Verdict Conclusion:</strong> ${claim.why}
        </div>
      </div>
    `;

    dom.modal.classList.add('active');
  }

  function closeModal() {
    dom.modal.classList.remove('active');
  }

  // Bind All Event Handlers
  function bindEvents() {
    // Stage Forward Buttons
    dom.btnStart.addEventListener('click', () => goToStage(2));
    dom.btnToTrack.addEventListener('click', () => goToStage(3));
    dom.btnToEvidence.addEventListener('click', () => goToStage(4));
    dom.btnToDerail.addEventListener('click', () => goToStage(5));
    dom.btnToVerdict.addEventListener('click', () => goToStage(6));

    // Reset / Test Another
    dom.btnTestAnother.addEventListener('click', () => {
      stopAutoPlay();
      const nextCase = (state.selectedCaseIndex + 1) % DEMO_CASES.length;
      loadCase(nextCase);
      goToStage(1);
    });

    dom.btnRestart.addEventListener('click', () => {
      stopAutoPlay();
      goToStage(1);
    });

    // Navigation Bar Stage Jumps
    dom.stageNodes.forEach(node => {
      node.addEventListener('click', () => {
        stopAutoPlay();
        const s = parseInt(node.dataset.stage, 10);
        goToStage(s);
      });
    });

    // Footer Next / Prev
    dom.btnPrev.addEventListener('click', () => {
      stopAutoPlay();
      goToStage(state.currentStage - 1);
    });

    dom.btnNext.addEventListener('click', () => {
      stopAutoPlay();
      goToStage(state.currentStage + 1);
    });

    // Mode Toggle
    dom.modeAuto.addEventListener('click', startAutoPlay);
    dom.modeStep.addEventListener('click', stopAutoPlay);

    // Modal Close
    dom.btnCloseModal.addEventListener('click', closeModal);
    dom.modal.addEventListener('click', (e) => {
      if (e.target === dom.modal) closeModal();
    });
  }

  // Expose Modal Opener for inline handlers
  window.derailApp = {
    openModal: openEvidenceModal
  };

  // Launch
  document.addEventListener('DOMContentLoaded', init);
})();
