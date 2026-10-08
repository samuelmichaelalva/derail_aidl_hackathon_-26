// DERAIL — Demonstration Scenarios & Grounded Evidence Database
// Controlled demonstration data for Round-1 prototype presentation

const DEMO_CASES = [
  {
    id: "whatsapp-500",
    modality: "whatsapp",
    modalityLabel: "WhatsApp Forward",
    icon: "💬",
    title: "₹500 Currency Demonetization Rumor",
    sender: "+91 98450 XXXXX (Forwarded many times)",
    timestamp: "Today at 08:42 AM",
    rawContent: "🚨 URGENT NOTICE: From next Monday, all ₹500 currency notes with the green security thread next to Gandhi's portrait are declared INVALID by RBI. Only new ₹1000 notes will be accepted. Forward to all groups immediately! 🚨",
    mediaPreview: null,
    overallVerdict: "FALSE",
    overallSummary: "The forwarded message contains completely fabricated claims regarding currency demonetization and new currency re-issuance. No official RBI notification supports these statements.",
    claims: [
      {
        id: "c1",
        number: "01",
        claimText: "All ₹500 currency notes with green stripe are declared invalid from next Monday.",
        verdict: "FALSE",
        verdictClass: "false",
        badge: "FALSE",
        derailed: true,
        why: "The Reserve Bank of India (RBI) has issued no such circular. All existing ₹500 notes in circulation remain legal tender.",
        evidence: {
          source: "Reserve Bank of India (RBI) Press Release",
          sourceType: "Official Central Bank Gazette",
          sourceDate: "March 2026",
          sourceUrl: "https://rbi.org.in/press-releases",
          confidence: "99.8%",
          excerpt: "\"The Reserve Bank clarifies that no demonetization or withdrawal of ₹500 denomination banknotes has been initiated. Reports circulating on social messaging platforms are fake and baseless.\"",
          relation: "CONTRADICTS"
        }
      },
      {
        id: "c2",
        number: "02",
        claimText: "The Reserve Bank of India (RBI) officially announced this currency withdrawal.",
        verdict: "FALSE",
        verdictClass: "false",
        badge: "FALSE",
        derailed: true,
        why: "PIB Fact Check and official RBI notification logs confirm that no official announcement or press advisory exists.",
        evidence: {
          source: "PIB Fact Check Unit (Govt of India)",
          sourceType: "Official Government Fact Registry",
          sourceDate: "Current Week",
          sourceUrl: "https://factcheck.pib.gov.in",
          confidence: "99.4%",
          excerpt: "\"Claim: RBI has banned old ₹500 notes. Fact: This claim is completely FAKE. No such announcement was made by RBI or Ministry of Finance.\"",
          relation: "CONTRADICTS"
        }
      },
      {
        id: "c3",
        number: "03",
        claimText: "New ₹1000 denomination notes are launching to replace the ₹500 notes.",
        verdict: "OUTDATED",
        verdictClass: "outdated",
        badge: "OUTDATED / UNFOUNDED",
        derailed: true,
        why: "₹1000 notes were demonetized in 2016 and no policy proposal to reintroduce ₹1000 denomination banknotes is under active consideration.",
        evidence: {
          source: "Ministry of Finance Parliamentary Bulletin",
          sourceType: "Official Parliamentary Record",
          sourceDate: "Monsoon Session Record",
          sourceUrl: "https://finmin.nic.in",
          confidence: "98.7%",
          excerpt: "\"The Government has stated on record in Parliament that there is currently no proposal under consideration to introduce new ₹1000 denomination notes.\"",
          relation: "CONTRADICTS"
        }
      }
    ]
  },
  {
    id: "screenshot-cyclone",
    modality: "screenshot",
    modalityLabel: "Screenshot / Image",
    icon: "🖼️",
    title: "Viral Weather Emergency & Train Shutdown",
    sender: "Forwarded via Twitter/X Screenshot",
    timestamp: "Yesterday at 11:15 PM",
    rawContent: "⚡ WEATHER FLASH: IMD declares Red Alert for Eastern Coastal Corridor due to Severe Cyclone ' Sagarika '. Indian Railways cancels ALL passenger trains statewide for 5 consecutive days starting midnight.",
    mediaPreview: {
      type: "image",
      title: "Viral Notification Screenshot",
      subtext: "Circulating circular with IMD & Railway logo watermarks"
    },
    overallVerdict: "PARTIALLY SUPPORTED",
    overallSummary: "The meteorological red alert for coastal belts is authentic and active; however, the claim of a blanket 5-day state-wide rail shutdown is exaggerated and false.",
    claims: [
      {
        id: "c1",
        number: "01",
        claimText: "IMD has declared a Red Alert for the Eastern Coastal Corridor.",
        verdict: "VERIFIED",
        verdictClass: "verified",
        badge: "VERIFIED",
        derailed: false,
        why: "Official IMD bulletin confirms Cyclone 'Sagarika' trajectory and active red alert warnings for coastal districts.",
        evidence: {
          source: "India Meteorological Department (IMD) National Weather Bulletin",
          sourceType: "Official National Meteorological Agency",
          sourceDate: "12 Hours Ago",
          sourceUrl: "https://mausam.imd.gov.in",
          confidence: "99.6%",
          excerpt: "\"Red Alert issued for coastal sectors: High wind speeds of 90-110 km/h and extremely heavy rainfall expected over the next 48 hours.\"",
          relation: "SUPPORTS"
        }
      },
      {
        id: "c2",
        number: "02",
        claimText: "Indian Railways has cancelled all passenger trains statewide for 5 consecutive days.",
        verdict: "FALSE",
        verdictClass: "false",
        badge: "FALSE",
        derailed: true,
        why: "Eastern Railway issued precautionary speed restrictions and regulated only 8 specific coastal trains for 24 hours, not a blanket 5-day statewide shutdown.",
        evidence: {
          source: "Ministry of Railways Press Information Bureau",
          sourceType: "Official Rail Safety Advisory",
          sourceDate: "8 Hours Ago",
          sourceUrl: "https://indianrailways.gov.in",
          confidence: "99.1%",
          excerpt: "\"Precautionary advisory: Only 8 express trains on the low-lying coastal branch line are regulated for 24 hours. Mainline passenger trains operate under normal weather protocol with pilot engines.\"",
          relation: "CONTRADICTS"
        }
      }
    ]
  },
  {
    id: "voice-vandebharat",
    modality: "voice",
    modalityLabel: "Voice Note / Audio",
    icon: "🎙️",
    title: "Audio Memo on Train Timetable Shift",
    sender: "Audio Voice Note (0:48) via Transit Group",
    timestamp: "Today at 06:20 AM",
    rawContent: "Transcribed Audio: 'Listen everyone, station master just told my uncle that the 20607 Vande Bharat Express timetable is moved 45 minutes earlier starting 15th, and ticket prices are being doubled due to dynamic surge surcharge.'",
    mediaPreview: {
      type: "audio",
      duration: "0:48",
      waveform: [35, 60, 80, 45, 90, 75, 50, 65, 85, 40, 95, 70, 60, 80, 45, 30]
    },
    overallVerdict: "PARTIALLY SUPPORTED",
    overallSummary: "The timetable revision is officially published in the new zonal schedule, but the claim of ticket fares doubling is untrue and violates fixed fare capping rules.",
    claims: [
      {
        id: "c1",
        number: "01",
        claimText: "Train 20607 Vande Bharat departure timing is revised 45 minutes earlier from the 15th.",
        verdict: "VERIFIED",
        verdictClass: "verified",
        badge: "VERIFIED",
        derailed: false,
        why: "Southern Railway timetable gazette confirms revised sectional speed and earlier slot allotment.",
        evidence: {
          source: "Southern Railway Zonal Time Table Bulletin #26",
          sourceType: "Official Railway Operations Gazette",
          sourceDate: "Published 3 Days Ago",
          sourceUrl: "https://sr.indianrailways.gov.in",
          confidence: "99.5%",
          excerpt: "\"Effective 15th: Train No. 20607 departure rescheduled to 05:15 hrs (advancing 45 mins) to optimize sectional throughput.\"",
          relation: "SUPPORTS"
        }
      },
      {
        id: "c2",
        number: "02",
        claimText: "Vande Bharat ticket fares are being doubled with a dynamic surge surcharge.",
        verdict: "FALSE",
        verdictClass: "false",
        badge: "FALSE",
        derailed: true,
        why: "Vande Bharat Chair Car and Executive fares are fixed base rates; dynamic surge pricing is capped and does not permit 100% fare hikes.",
        evidence: {
          source: "IRCTC Passenger Tariff & Fare Policy",
          sourceType: "Official Fare Regulatory Board",
          sourceDate: "Current Tariff Card",
          sourceUrl: "https://irctc.co.in",
          confidence: "98.9%",
          excerpt: "\"Tariff Structure: Vande Bharat services operate under fixed sector fares. No tariff revision has been authorized.\"",
          relation: "CONTRADICTS"
        }
      }
    ]
  },
  {
    id: "pdf-recruitment",
    modality: "pdf",
    modalityLabel: "PDF Document",
    icon: "📄",
    title: "RRB 50,000 Vacancy Employment Circular",
    sender: "Shared PDF file: 'RRB_CEN_2026_Direct_Recruitment.pdf'",
    timestamp: "Yesterday at 04:30 PM",
    rawContent: "PDF Text: 'CENTRAL EMPLOYMENT NOTICE (CEN) 09/2026: Railway Recruitment Boards announce 50,000 spot vacancies for Assistant Loco Pilots and Station Masters. Registration fee ₹500 via non-standard UPI gateway.'",
    mediaPreview: {
      type: "pdf",
      filename: "RRB_CEN_2026_Direct_Recruitment.pdf",
      pages: 4,
      fileSize: "1.8 MB"
    },
    overallVerdict: "FALSE",
    overallSummary: "This document is an unauthorized fraudulent circular mimicking Railway Recruitment Board typography to solicit phishing registration fees.",
    claims: [
      {
        id: "c1",
        number: "01",
        claimText: "RRB has published CEN 09/2026 for 50,000 direct spot recruitment vacancies.",
        verdict: "FALSE",
        verdictClass: "false",
        badge: "FALSE / FRAUDULENT",
        derailed: true,
        why: "Railway Recruitment Control Board confirms that CEN 09/2026 does not exist and official recruitments are only announced on official zonal domains.",
        evidence: {
          source: "Railway Recruitment Control Board (RRCB) Alert",
          sourceType: "Official Recruitment Regulatory Body",
          sourceDate: "Notice #42/2026",
          sourceUrl: "https://rrcb.gov.in/notices",
          confidence: "99.9%",
          excerpt: "\"Caution Notice: A fabricated notice titled CEN 09/2026 is circulating. RRB never conducts recruitment through third-party forms or private UPI addresses.\"",
          relation: "CONTRADICTS"
        }
      },
      {
        id: "c2",
        number: "02",
        claimText: "National examination for this vacancy is scheduled in November.",
        verdict: "CANNOT CONFIRM",
        verdictClass: "unconfirmed",
        badge: "CANNOT CONFIRM",
        derailed: true,
        why: "Since the root vacancy notification is entirely fake, any associated exam dates are unverified and fictional.",
        evidence: {
          source: "Ministry of Railways Examination Calendar 2026",
          sourceType: "Official Examination Schedule",
          sourceDate: "Annual Calendar 2026",
          sourceUrl: "https://indianrailways.gov.in/exam-calendar",
          confidence: "98.5%",
          excerpt: "\"No exam session titled CEN 09 is scheduled or registered on the RRCB calendar for the current fiscal year.\"",
          relation: "UNVERIFIED"
        }
      }
    ]
  },
  {
    id: "url-refund",
    modality: "url",
    modalityLabel: "URL / Web Article",
    icon: "🔗",
    title: "Viral Blog on Instant Train Delay Refunds",
    sender: "Shared Link: 'https://fast-rail-news.today/delay-refund-policy'",
    timestamp: "2 Days ago",
    rawContent: "Article Excerpt: 'New Rule: If any Indian train is delayed by more than 60 minutes, passengers receive an instant 100% automated refund credited to UPI without filing TDR.'",
    mediaPreview: {
      type: "url",
      domain: "fast-rail-news.today",
      headline: "IRCTC Announces Automatic 1-Hour Delay Full Refund Policy"
    },
    overallVerdict: "PARTIALLY SUPPORTED",
    overallSummary: "Full refunds are permitted when trains are delayed by more than 3 hours, but claims of automated 1-hour refunds without TDR filing are inaccurate clickbait.",
    claims: [
      {
        id: "c1",
        number: "01",
        claimText: "Passengers can claim a full refund if a train is heavily delayed.",
        verdict: "VERIFIED",
        verdictClass: "verified",
        badge: "VERIFIED",
        derailed: false,
        why: "Indian Railways Refund Rules permit 100% refund without cancellation deduction if the train runs late by more than 3 hours and passenger does not travel.",
        evidence: {
          source: "Railway Passengers (Cancellation of Ticket and Refund of Fare) Rules",
          sourceType: "Official Gazette of India Statutory Rules",
          sourceDate: "Current Rulebook Gazette",
          sourceUrl: "https://indianrailways.gov.in/refund-rules",
          confidence: "99.4%",
          excerpt: "\"Rule 6: Full refund of fare shall be granted on confirmed tickets if the train is delayed by more than three hours at the passenger's journey commencing station.\"",
          relation: "SUPPORTS"
        }
      },
      {
        id: "c2",
        number: "02",
        claimText: "Refunds are processed automatically in 60 minutes without requiring TDR filing.",
        verdict: "FALSE",
        verdictClass: "false",
        badge: "FALSE",
        derailed: true,
        why: "Online ticket refunds for late trains require filing an e-TDR (Ticket Deposit Receipt) before actual departure.",
        evidence: {
          source: "IRCTC e-Ticketing Refund Guidelines",
          sourceType: "Official Ticketing Operational Portal",
          sourceDate: "Updated Terms 2026",
          sourceUrl: "https://irctc.co.in/eticketing/tdr-rules",
          confidence: "99.2%",
          excerpt: "\"For trains running late by more than 3 hours, passengers must file an online TDR before the actual departure of the train to obtain a refund. Automatic refunds are not triggered at 1 hour.\"",
          relation: "CONTRADICTS"
        }
      }
    ]
  }
];

if (typeof module !== 'undefined' && module.exports) {
  module.exports = { DEMO_CASES };
}
