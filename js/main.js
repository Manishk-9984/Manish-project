/**
 * Manish Kumar - Portfolio Interactive Engine
 * High Performance Vanilla JavaScript
 */

document.addEventListener('DOMContentLoaded', () => {
  // ==========================================
  // 1. Theme Management (Dark / Light Mode)
  // ==========================================
  const htmlRoot = document.documentElement;
  const themeToggleBtn = document.getElementById('themeToggleBtn');
  const themeIcon = document.getElementById('themeIcon');

  // Load saved theme from localStorage or default to dark
  const savedTheme = localStorage.getItem('manish_theme') || 'dark';
  htmlRoot.setAttribute('data-theme', savedTheme);
  updateThemeIcon(savedTheme);

  themeToggleBtn.addEventListener('click', () => {
    const currentTheme = htmlRoot.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    htmlRoot.setAttribute('data-theme', newTheme);
    localStorage.setItem('manish_theme', newTheme);
    updateThemeIcon(newTheme);
    showToast(`Switched to ${newTheme} mode`);
  });

  function updateThemeIcon(theme) {
    if (theme === 'light') {
      themeIcon.className = 'fa-solid fa-sun';
      themeIcon.style.color = '#f59e0b';
    } else {
      themeIcon.className = 'fa-solid fa-moon';
      themeIcon.style.color = '';
    }
  }

  // ==========================================
  // 2. Mobile Navigation Toggle
  // ==========================================
  const menuToggleBtn = document.getElementById('menuToggleBtn');
  const navLinks = document.getElementById('navLinks');
  const navLinkItems = document.querySelectorAll('.nav-link');

  menuToggleBtn.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    const icon = menuToggleBtn.querySelector('i');
    if (navLinks.classList.contains('active')) {
      icon.className = 'fa-solid fa-xmark';
    } else {
      icon.className = 'fa-solid fa-bars';
    }
  });

  navLinkItems.forEach(link => {
    link.addEventListener('click', () => {
      navLinks.classList.remove('active');
      const icon = menuToggleBtn.querySelector('i');
      if (icon) icon.className = 'fa-solid fa-bars';
    });
  });

  // ==========================================
  // 3. Navbar Scroll Shadow & Active State
  // ==========================================
  const navbar = document.getElementById('navbar');
  const sections = document.querySelectorAll('section');

  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      navbar.style.boxShadow = '0 8px 24px rgba(0, 0, 0, 0.3)';
    } else {
      navbar.style.boxShadow = 'none';
    }

    // Update active nav link
    let currentSection = '';
    sections.forEach(section => {
      const sectionTop = section.offsetTop - 120;
      const sectionHeight = section.offsetHeight;
      if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
        currentSection = section.getAttribute('id');
      }
    });

    navLinkItems.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${currentSection}`) {
        link.classList.add('active');
      }
    });

    // Back to top button visibility
    const backToTopBtn = document.getElementById('backToTopBtn');
    if (window.scrollY > 450) {
      backToTopBtn.classList.add('visible');
    } else {
      backToTopBtn.classList.remove('visible');
    }
  });

  // Back to top smooth scroll
  document.getElementById('backToTopBtn').addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  // ==========================================
  // 4. Typewriter Animation in Hero
  // ==========================================
  const typewriterElement = document.getElementById('typewriterText');
  const titles = [
    'Hardware & Network Engineer',
    'Currently at IKM Invester Pvt. Ltd.',
    'IT Support Specialist (HP Experience)',
    'Cloud Computing Professional (Jetking)',
    'Enterprise Systems & Network Technician',
    'Outlook & Mail Configuration Expert'
  ];

  let titleIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  let typingSpeed = 90;

  function typeText() {
    const currentTitle = titles[titleIndex];
    if (isDeleting) {
      typewriterElement.textContent = currentTitle.substring(0, charIndex - 1);
      charIndex--;
      typingSpeed = 45;
    } else {
      typewriterElement.textContent = currentTitle.substring(0, charIndex + 1);
      charIndex++;
      typingSpeed = 95;
    }

    if (!isDeleting && charIndex === currentTitle.length) {
      typingSpeed = 1800; // Pause at end of text
      isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      titleIndex = (titleIndex + 1) % titles.length;
      typingSpeed = 400; // Pause before typing next word
    }

    setTimeout(typeText, typingSpeed);
  }

  typeText();

  // ==========================================
  // 5. Skills Category Filter
  // ==========================================
  const filterBtns = document.querySelectorAll('.filter-btn');
  const skillCards = document.querySelectorAll('.skill-card');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filterValue = btn.getAttribute('data-filter');

      skillCards.forEach(card => {
        if (filterValue === 'all' || card.getAttribute('data-category') === filterValue) {
          card.style.display = 'block';
          card.style.opacity = '0';
          setTimeout(() => {
            card.style.transition = 'opacity 0.3s ease';
            card.style.opacity = '1';
          }, 40);
        } else {
          card.style.display = 'none';
        }
      });
    });
  });

  // ==========================================
  // 6. Interactive IT Terminal Simulation
  // ==========================================
  const terminalForm = document.getElementById('terminalForm');
  const terminalInput = document.getElementById('terminalInput');
  const terminalOutput = document.getElementById('terminalOutput');
  const cmdButtons = document.querySelectorAll('.cmd-btn');

  const commandResponses = {
    help: `
<div style="color: #38bdf8; font-weight: bold; margin-bottom: 6px;">Available IT Shell Commands:</div>
<div style="color: #94a3b8; line-height: 1.6;">
  - <strong style="color: #10b981;">skills</strong>: Summary of technical hardware, networking & cloud skills<br>
  - <strong style="color: #10b981;">hardware</strong>: Hardware assembling, disassembling & OS diagnostics<br>
  - <strong style="color: #10b981;">networking</strong>: LAN punching, TCP/IP, OSI model, router & switch<br>
  - <strong style="color: #10b981;">cloud</strong>: Jetking Diploma in Cloud Computing details (2025)<br>
  - <strong style="color: #10b981;">outlook</strong>: Microsoft Outlook, PST/OST recovery, SMTP/IMAP<br>
  - <strong style="color: #10b981;">experience</strong>: Work history (IKM Invester Pvt. Ltd. & HP Centre)<br>
  - <strong style="color: #10b981;">ikm</strong>: Details on current role at IKM Invester Pvt. Ltd.<br>
  - <strong style="color: #10b981;">education</strong>: Degree & academic credentials<br>
  - <strong style="color: #10b981;">contact</strong>: Phone, Email, Address & WhatsApp details<br>
  - <strong style="color: #10b981;">ping 8.8.8.8</strong>: Run network latency diagnostic test<br>
  - <strong style="color: #10b981;">ipconfig</strong>: View simulated network adapter settings<br>
  - <strong style="color: #10b981;">clear</strong>: Clear terminal screen
</div>`,

    skills: `
<div style="color: #38bdf8; font-weight: bold;">[MANISH_SKILLS_MANIFEST]</div>
<div style="color: #e2e8f0; margin-top: 4px;">
  • <strong>Hardware & OS:</strong> PC/Laptop Assembling & Disassembling, Motherboard Diagnostic, Windows 10/11 Deployment, Drivers, Printers/Scanners.<br>
  • <strong>Networking:</strong> TCP/IP & OSI 7-Layer Model, LAN Punching & Crimping (T568B), Router & Switch Setup.<br>
  • <strong>Cloud Computing:</strong> Cloud Architecture, Virtualization, Jetking Diploma (2025).<br>
  • <strong>Email Systems:</strong> MS Outlook Configuration, PST/OST Backup/Recovery, SMTP, IMAP, POP3.
</div>`,

    hardware: `
<div style="color: #38bdf8; font-weight: bold;">[HARDWARE & OS REPAIR PROFILE]</div>
<div style="color: #e2e8f0; margin-top: 4px;">
  ✔ Precision teardown & reassembly of HP laptops, ultrabooks & desktop towers.<br>
  ✔ Motherboard testing, RAM & NVMe SSD upgrades, screen replacements.<br>
  ✔ BIOS/UEFI updating, MBR/GPT partitioning, Windows 10/11 clean deployments.<br>
  ✔ Peripheral support: LaserJet, DeskJet, thermal printers & flatbed scanners.
</div>`,

    networking: `
<div style="color: #38bdf8; font-weight: bold;">[NETWORKING INFRASTRUCTURE]</div>
<div style="color: #e2e8f0; margin-top: 4px;">
  ✔ Deep understanding of OSI 7-layer model & TCP/IP stack.<br>
  ✔ Structured cabling: Cat6 LAN cable pulling, patch panel punch downs, RJ-45 crimping with T568A/T568B color coding.<br>
  ✔ SOHO / enterprise Wi-Fi router setup, DHCP scope, DNS assignment, subnetting.
</div>`,

    cloud: `
<div style="color: #38bdf8; font-weight: bold;">[CLOUD CERTIFICATION]</div>
<div style="color: #e2e8f0; margin-top: 4px;">
  🎓 <strong>Diploma in Cloud Computing (2025)</strong><br>
  Institute: Jetking, Lucknow<br>
  Modules: Cloud Architecture, Virtualization (Hyper-V / VMware), Server Management, Cloud Storage, and Hybrid Network Deployments.
</div>`,

    outlook: `
<div style="color: #38bdf8; font-weight: bold;">[MICROSOFT OUTLOOK & EMAIL]</div>
<div style="color: #e2e8f0; margin-top: 4px;">
  ✔ Corporate Outlook mail profile provisioning & synchronization.<br>
  ✔ Repair of damaged .PST files using SCANPST and offline .OST data recovery.<br>
  ✔ Configuration of secure mail transport: SMTP (587/465), IMAP (993), POP3 (995).
</div>`,

    experience: `
<div style="color: #38bdf8; font-weight: bold;">[PROFESSIONAL WORK EXPERIENCE]</div>
<div style="color: #e2e8f0; margin-top: 6px;">
  🏢 <strong style="color: #10b981;">1. IKM Invester Private Limited</strong> — Hardware & Network Engineer<br>
  &nbsp;&nbsp;&nbsp;&nbsp;Status: <span style="color: #10b981; font-weight: bold;">Joined: 24/06/2026 – Present (Currently Working)</span><br>
  &nbsp;&nbsp;&nbsp;&nbsp;Focus: Corporate hardware, desktop/laptop maintenance, network switches & routers, Cat6 LAN, Outlook mail, end-user IT support.<br><br>
  🏢 <strong style="color: #38bdf8;">2. H.P. Service Centre</strong> — Hardware & Desktop Support Engineer<br>
  &nbsp;&nbsp;&nbsp;&nbsp;Tenure: 1 Year hands-on technical experience.<br>
  &nbsp;&nbsp;&nbsp;&nbsp;Focus: Laptop teardown, component diagnostics, genuine Windows deployments, printer/scanner troubleshooting.
</div>`,

    ikm: `
<div style="color: #38bdf8; font-weight: bold;">[CURRENT COMPANY: IKM INVESTER PRIVATE LIMITED]</div>
<div style="color: #e2e8f0; margin-top: 4px;">
  Role: <strong>Hardware & Network Engineer</strong> (Joined: 24/06/2026 – Present)<br>
  Key Responsibilities:<br>
  - Assembling, configuring & maintaining enterprise workstations and laptop fleets.<br>
  - Managing office network infrastructure, LAN cabling, switches, and internet gateways.<br>
  - Enterprise Windows 10/11 OS setup, driver troubleshooting, and endpoint protection.<br>
  - Microsoft Outlook profile management, PST/OST backups, and corporate mail recovery.
</div>`,

    education: `
<div style="color: #38bdf8; font-weight: bold;">[ACADEMIC BACKGROUND]</div>
<div style="color: #e2e8f0; margin-top: 4px;">
  1. <strong>Graduation (Bachelor's Degree):</strong> Dr. Ram Manohar Lohia Avadh University, Ayodhya.<br>
  2. <strong>Diploma in Cloud Computing (2025):</strong> Jetking, Lucknow.<br>
  3. <strong>Intermediate (12th - 2022):</strong> U.P. Board.<br>
  4. <strong>High School (10th - 2020):</strong> U.P. Board.
</div>`,

    contact: `
<div style="color: #38bdf8; font-weight: bold;">[CONTACT DIRECTORY]</div>
<div style="color: #e2e8f0; margin-top: 4px;">
  📱 <strong>Mobile:</strong> +91 9984458490<br>
  ✉ <strong>Email:</strong> mk.nishad8445@gmail.com<br>
  📍 <strong>Current Location:</strong> New Ashok Nagar, New Delhi<br>
  🏡 <strong>Permanent Hometown:</strong> Ichharui, Ayodhya (Uttar Pradesh)<br>
  💬 <strong>WhatsApp:</strong> +91 9984458490
</div>`,

    'ping 8.8.8.8': `
<div style="color: #e2e8f0; font-family: monospace;">
  Pinging 8.8.8.8 with 32 bytes of data:<br>
  <span style="color: #10b981;">Reply from 8.8.8.8: bytes=32 time=14ms TTL=117</span><br>
  <span style="color: #10b981;">Reply from 8.8.8.8: bytes=32 time=12ms TTL=117</span><br>
  <span style="color: #10b981;">Reply from 8.8.8.8: bytes=32 time=15ms TTL=117</span><br>
  <span style="color: #10b981;">Reply from 8.8.8.8: bytes=32 time=13ms TTL=117</span><br>
  <span style="color: #38bdf8;">Ping statistics for 8.8.8.8:</span><br>
  &nbsp;&nbsp;&nbsp;&nbsp;Packets: Sent = 4, Received = 4, Lost = 0 (0% loss)<br>
  Approximate round trip times in milli-seconds:<br>
  &nbsp;&nbsp;&nbsp;&nbsp;Minimum = 12ms, Maximum = 15ms, Average = 13.5ms
</div>`,

    ipconfig: `
<div style="color: #e2e8f0; font-family: monospace;">
  Windows IP Configuration<br><br>
  Ethernet adapter Local Area Connection:<br>
  &nbsp;&nbsp;&nbsp;Connection-specific DNS Suffix . : it.manish.local<br>
  &nbsp;&nbsp;&nbsp;IPv4 Address. . . . . . . . . . . : 192.168.1.105<br>
  &nbsp;&nbsp;&nbsp;Subnet Mask . . . . . . . . . . . : 255.255.255.0<br>
  &nbsp;&nbsp;&nbsp;Default Gateway . . . . . . . . . : 192.168.1.1<br>
  &nbsp;&nbsp;&nbsp;Primary DNS Server. . . . . . . . : 8.8.8.8<br>
  &nbsp;&nbsp;&nbsp;Secondary DNS Server. . . . . . . : 1.1.1.1<br>
  &nbsp;&nbsp;&nbsp;Status. . . . . . . . . . . . . . : <span style="color: #10b981;">Connected (HP Gigabit Adapter)</span>
</div>`
  };

  function executeTerminalCommand(cmdRaw) {
    const cmd = cmdRaw.trim().toLowerCase();
    
    // Command line echo
    const echoDiv = document.createElement('div');
    echoDiv.style.marginTop = '12px';
    echoDiv.innerHTML = `<span style="color: #10b981; font-weight: bold;">manish@sys:~$</span> <span style="color: #f8fafc;">${escapeHtml(cmdRaw)}</span>`;
    terminalOutput.appendChild(echoDiv);

    if (cmd === 'clear' || cmd === 'cls') {
      terminalOutput.innerHTML = `
        <div style="color: #38bdf8;">Terminal cleared. System ready. Type 'help' for options.</div>
      `;
      return;
    }

    const resultDiv = document.createElement('div');
    resultDiv.style.marginTop = '6px';
    resultDiv.style.marginBottom = '12px';

    if (commandResponses[cmd]) {
      resultDiv.innerHTML = commandResponses[cmd];
    } else if (cmd === '') {
      resultDiv.innerHTML = '';
    } else {
      resultDiv.innerHTML = `
        <div style="color: #ef4444;">command not found: "${escapeHtml(cmdRaw)}".</div>
        <div style="color: #64748b;">Type <strong style="color: #10b981;">help</strong> to see the list of valid commands.</div>
      `;
    }

    terminalOutput.appendChild(resultDiv);
    terminalOutput.scrollTop = terminalOutput.scrollHeight;
  }

  terminalForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const val = terminalInput.value;
    executeTerminalCommand(val);
    terminalInput.value = '';
  });

  cmdButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const cmd = btn.getAttribute('data-cmd');
      executeTerminalCommand(cmd);
    });
  });

  function escapeHtml(str) {
    return str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
  }

  // ==========================================
  // 7. Resume Modal (Open, Close, Print)
  // ==========================================
  const resumeModal = document.getElementById('resumeModal');
  const openResumeBtnNav = document.getElementById('openResumeBtnNav');
  const heroResumeBtn = document.getElementById('heroResumeBtn');
  const closeResumeModalBtn = document.getElementById('closeResumeModalBtn');
  const printResumeBtn = document.getElementById('printResumeBtn');

  function openResume() {
    resumeModal.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function closeResume() {
    resumeModal.classList.remove('active');
    document.body.style.overflow = 'auto';
  }

  if (openResumeBtnNav) openResumeBtnNav.addEventListener('click', openResume);
  if (heroResumeBtn) heroResumeBtn.addEventListener('click', openResume);
  if (closeResumeModalBtn) closeResumeModalBtn.addEventListener('click', closeResume);

  // Close on outside click
  resumeModal.addEventListener('click', (e) => {
    if (e.target === resumeModal) {
      closeResume();
    }
  });

  // Close on ESC key
  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && resumeModal.classList.contains('active')) {
      closeResume();
    }
  });

  // Print / Save as PDF
  printResumeBtn.addEventListener('click', () => {
    window.print();
  });

  // ==========================================
  // 8. Clipboard Copy Functionality
  // ==========================================
  const copyButtons = document.querySelectorAll('.copy-btn');
  copyButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const textToCopy = btn.getAttribute('data-copy');
      navigator.clipboard.writeText(textToCopy).then(() => {
        showToast(`Copied "${textToCopy}" to clipboard!`);
        const icon = btn.querySelector('i');
        icon.className = 'fa-solid fa-check';
        icon.style.color = '#10b981';
        setTimeout(() => {
          icon.className = 'fa-regular fa-copy';
          icon.style.color = '';
        }, 2000);
      }).catch(err => {
        showToast('Failed to copy. Please copy manually.');
      });
    });
  });

  // Toast Notification Trigger
  const toastBox = document.getElementById('toastBox');
  const toastMsg = document.getElementById('toastMsg');
  let toastTimer;

  function showToast(message) {
    clearTimeout(toastTimer);
    toastMsg.textContent = message;
    toastBox.classList.add('show');
    toastTimer = setTimeout(() => {
      toastBox.classList.remove('show');
    }, 3200);
  }

  // ==========================================
  // 9. Contact Form Handling
  // ==========================================
  const contactForm = document.getElementById('contactForm');
  const sendViaWhatsAppBtn = document.getElementById('sendViaWhatsAppBtn');

  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = document.getElementById('senderName').value.trim();
    const email = document.getElementById('senderEmail').value.trim();
    const phone = document.getElementById('senderPhone').value.trim();
    const subject = document.getElementById('senderSubject').value.trim();
    const message = document.getElementById('senderMessage').value.trim();

    // Prepare direct mailto
    const mailtoBody = `Name: ${name}%0D%0APhone: ${phone}%0D%0AEmail: ${email}%0D%0A%0D%0AMessage:%0D%0A${encodeURIComponent(message)}`;
    const mailtoLink = `mailto:mk.nishad8445@gmail.com?subject=${encodeURIComponent(subject)}&body=${mailtoBody}`;

    showToast(`Thank you, ${name}! Opening email client...`);
    setTimeout(() => {
      window.location.href = mailtoLink;
      contactForm.reset();
    }, 1000);
  });

  sendViaWhatsAppBtn.addEventListener('click', () => {
    const name = document.getElementById('senderName').value.trim() || 'Recruiter / Client';
    const subject = document.getElementById('senderSubject').value.trim() || 'Job Discussion / Inquiries';
    const message = document.getElementById('senderMessage').value.trim() || 'Hello Manish, I saw your portfolio and would like to talk regarding an IT opportunity.';

    const text = `Hi Manish, my name is ${name}.%0A*Subject:* ${subject}%0A*Message:* ${message}`;
    const waUrl = `https://wa.me/919984458490?text=${text}`;
    window.open(waUrl, '_blank');
  });

  // ==========================================
  // 10. Animated Counters on Scroll
  // ==========================================
  const counters = document.querySelectorAll('.counter');
  let countersAnimated = false;

  function runCounters() {
    counters.forEach(counter => {
      const target = +counter.getAttribute('data-target');
      const suffix = target === 1 ? '+' : target === 500 ? '+' : '%';
      let count = 0;
      const step = Math.max(1, Math.ceil(target / 40));

      const timer = setInterval(() => {
        count += step;
        if (count >= target) {
          counter.textContent = target + suffix;
          clearInterval(timer);
        } else {
          counter.textContent = count + suffix;
        }
      }, 35);
    });
  }

  // Trigger counters when hero section is in view
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && !countersAnimated) {
        countersAnimated = true;
        runCounters();
      }
    });
  }, { threshold: 0.5 });

  const heroSection = document.getElementById('home');
  if (heroSection) observer.observe(heroSection);

  // Canva Profile Shape Switcher
  const shapeButtons = document.querySelectorAll('.shape-pill-btn');
  const canvaShowcase = document.getElementById('canvaShowcase');

  if (shapeButtons.length && canvaShowcase) {
    shapeButtons.forEach(btn => {
      btn.addEventListener('click', () => {
        const shape = btn.getAttribute('data-shape');
        
        // Remove existing shape classes
        canvaShowcase.classList.remove('shape-arch', 'shape-blob', 'shape-hexagon', 'shape-squircle');
        canvaShowcase.classList.add(`shape-${shape}`);
        
        // Update active button state
        shapeButtons.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
      });
    });
  }
});
