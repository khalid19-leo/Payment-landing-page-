// Pricing Toggle Functionality
document.addEventListener('DOMContentLoaded', function() {
  // Mobile Menu Functionality
  const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
  const navMain = document.querySelector('.nav-main');
  const navItems = document.querySelectorAll('.nav-item.has-dropdown');
  
  // Toggle mobile menu
  mobileMenuBtn.addEventListener('click', function() {
    this.classList.toggle('active');
    navMain.classList.toggle('active');
    document.body.style.overflow = navMain.classList.contains('active') ? 'hidden' : '';
  });
  
  // Mobile dropdown functionality
  navItems.forEach(item => {
    const link = item.querySelector('.nav-link');
    
    link.addEventListener('click', function(e) {
      if (window.innerWidth <= 768) {
        e.preventDefault();
        item.classList.toggle('active');
        
        // Close other dropdowns
        navItems.forEach(otherItem => {
          if (otherItem !== item) {
            otherItem.classList.remove('active');
          }
        });
      }
    });
  });
  
  // Close mobile menu when clicking on links
  const navLinks = document.querySelectorAll('.nav-link:not(.has-dropdown > .nav-link)');
  navLinks.forEach(link => {
    link.addEventListener('click', function() {
      if (window.innerWidth <= 768) {
        mobileMenuBtn.classList.remove('active');
        navMain.classList.remove('active');
        document.body.style.overflow = '';
      }
    });
  });
  
  // Close menu when clicking outside
  document.addEventListener('click', function(e) {
    if (window.innerWidth <= 768 && navMain.classList.contains('active')) {
      if (!navMain.contains(e.target) && !mobileMenuBtn.contains(e.target)) {
        mobileMenuBtn.classList.remove('active');
        navMain.classList.remove('active');
        document.body.style.overflow = '';
      }
    }
  });

  // Pricing Toggle Functionality
  const toggleButtons = document.querySelectorAll('.toggle-btn');
  const monthlyPricing = document.querySelector('.monthly-pricing');
  const yearlyPricing = document.querySelector('.yearly-pricing');
  
  toggleButtons.forEach(button => {
    button.addEventListener('click', function() {
      const planType = this.getAttribute('data-plan');
      
      // Remove active class from all buttons
      toggleButtons.forEach(btn => {
        btn.classList.remove('active');
        btn.setAttribute('aria-pressed', 'false');
      });
      
      // Add active class to clicked button
      this.classList.add('active');
      this.setAttribute('aria-pressed', 'true');
      
      // Show/hide pricing sections with animation
      if (planType === 'monthly') {
        yearlyPricing.classList.remove('active');
        setTimeout(() => {
          monthlyPricing.classList.add('active');
        }, 150);
      } else {
        monthlyPricing.classList.remove('active');
        setTimeout(() => {
          yearlyPricing.classList.add('active');
        }, 150);
      }
    });
  });
  
  // FAQ Toggle Functionality
  const faqItems = document.querySelectorAll('.faq-item');
  
  faqItems.forEach(item => {
    const question = item.querySelector('.faq-question');
    const answer = item.querySelector('.faq-answer');
    
    question.addEventListener('click', function() {
      const isActive = item.classList.contains('active');
      
      // Close all other FAQ items
      faqItems.forEach(otherItem => {
        if (otherItem !== item) {
          otherItem.classList.remove('active');
          otherItem.querySelector('.faq-question').setAttribute('aria-expanded', 'false');
        }
      });
      
      // Toggle current item
      if (!isActive) {
        item.classList.add('active');
        question.setAttribute('aria-expanded', 'true');
        
        // Add animation class
        answer.style.animation = 'fadeIn 0.3s ease-out';
        setTimeout(() => {
          answer.style.animation = '';
        }, 300);
      } else {
        item.classList.remove('active');
        question.setAttribute('aria-expanded', 'false');
      }
    });
    
    // Keyboard support for FAQ
    question.addEventListener('keydown', function(e) {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        question.click();
      }
    });
  });
  
  // Pricing Card Button Handlers
  const pricingButtons = document.querySelectorAll('.btn-card');
  pricingButtons.forEach(button => {
    button.addEventListener('click', function() {
      const planType = document.querySelector('.toggle-btn.active').getAttribute('data-plan');
      const card = this.closest('.pricing-card');
      const planName = card.querySelector('.plan-name').textContent;
      const planPrice = card.querySelector('.plan-price').textContent;
      
      // Show custom alert with plan details
      showCustomAlert(
        `🚀 Start Your ${planName} Plan`,
        `You've selected the ${planName} plan at ${planPrice}/${planType === 'monthly' ? 'month' : 'year'}. Our team will contact you shortly to set up your account!`,
        'success'
      );
      
      // Add click animation
      this.style.transform = 'scale(0.95)';
      setTimeout(() => {
        this.style.transform = '';
      }, 150);
    });
  });
  
  // Auth Button Handlers
  const authButtons = document.querySelectorAll('.btn-login, .btn-signup');
  authButtons.forEach(button => {
    button.addEventListener('click', function(e) {
      e.preventDefault();
      const isLogin = this.classList.contains('btn-login');
      
      showCustomAlert(
        '🔧 Coming Soon!',
        `${isLogin ? 'Login' : 'Sign Up'} functionality will be available in our next update. Stay tuned for exciting new features!`,
        'info'
      );
      
      // Add click animation
      this.style.transform = 'scale(0.95)';
      setTimeout(() => {
        this.style.transform = '';
      }, 150);
    });
  });
  
  // Navigation Link Handlers
  const navigationLinks = document.querySelectorAll('.nav-link[href="#"]');
  navigationLinks.forEach(link => {
    link.addEventListener('click', function(e) {
      e.preventDefault();
      
      showCustomAlert(
        '📋 Navigation',
        'This section is currently under development. Check back soon for updates!',
        'info'
      );
    });
  });
  
  // Footer Link Handlers
  const footerLinks = document.querySelectorAll('.footer-links a[href="#"]');
  footerLinks.forEach(link => {
    link.addEventListener('click', function(e) {
      e.preventDefault();
      
      showCustomAlert(
        '🔗 Quick Link',
        'This link will be activated in the next update. Thank you for your patience!',
        'info'
      );
    });
  });
  
  // Header scroll effect
  let lastScrollY = window.scrollY;
  const header = document.querySelector('.header');
  
  window.addEventListener('scroll', function() {
    if (window.scrollY > 100) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
    
    lastScrollY = window.scrollY;
  });
  
  // Animation on scroll
  const animateOnScroll = function() {
    const elements = document.querySelectorAll('.fade-in, .slide-up, .scale-in');
    
    elements.forEach(element => {
      const elementTop = element.getBoundingClientRect().top;
      const elementVisible = 150;
      
      if (elementTop < window.innerHeight - elementVisible) {
        element.style.animationPlayState = 'running';
      }
    });
  };
  
  // Initial check
  animateOnScroll();
  window.addEventListener('scroll', animateOnScroll);
  
  // Custom Alert Function
  function showCustomAlert(title, message, type = 'info') {
    // Remove existing alert if any
    const existingAlert = document.querySelector('.custom-alert');
    if (existingAlert) {
      existingAlert.remove();
    }
    
    // Create alert element
    const alert = document.createElement('div');
    alert.className = `custom-alert custom-alert-${type}`;
    alert.innerHTML = `
      <div class="custom-alert-content">
        <div class="custom-alert-header">
          <h4>${title}</h4>
          <button class="custom-alert-close">&times;</button>
        </div>
        <div class="custom-alert-body">
          <p>${message}</p>
        </div>
        <div class="custom-alert-footer">
          <button class="custom-alert-ok">OK</button>
        </div>
      </div>
    `;
    
    // Add styles
    const styles = `
      .custom-alert {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.5);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 10000;
        animation: fadeIn 0.3s ease-out;
      }
      .custom-alert-content {
        background: white;
        border-radius: 20px;
        padding: 2rem;
        max-width: 400px;
        width: 90%;
        box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
        animation: scaleIn 0.3s ease-out;
      }
      .custom-alert-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 1rem;
      }
      .custom-alert-header h4 {
        color: #1e293b;
        font-size: 1.3rem;
        font-weight: 700;
        margin: 0;
      }
      .custom-alert-close {
        background: none;
        border: none;
        font-size: 1.5rem;
        cursor: pointer;
        color: #64748b;
        padding: 0.2rem;
        border-radius: 4px;
        transition: all 0.2s ease;
      }
      .custom-alert-close:hover {
        color: #1e293b;
        background: #f1f5f9;
      }
      .custom-alert-body {
        margin-bottom: 1.5rem;
      }
      .custom-alert-body p {
        color: #64748b;
        line-height: 1.6;
        margin: 0;
        font-size: 0.95rem;
      }
      .custom-alert-footer {
        text-align: right;
      }
      .custom-alert-ok {
        background: linear-gradient(135deg, #6366f1, #8b5cf6);
        color: white;
        border: none;
        padding: 0.7rem 1.5rem;
        border-radius: 8px;
        font-weight: 600;
        cursor: pointer;
        transition: all 0.3s ease;
      }
      .custom-alert-ok:hover {
        transform: translateY(-2px);
        box-shadow: 0 4px 15px rgba(99, 102, 241, 0.4);
      }
      .custom-alert-success .custom-alert-content {
        border-top: 4px solid #10b981;
      }
      .custom-alert-info .custom-alert-content {
        border-top: 4px solid #6366f1;
      }
    `;
    
    // Add styles if not already added
    if (!document.querySelector('#custom-alert-styles')) {
      const styleSheet = document.createElement('style');
      styleSheet.id = 'custom-alert-styles';
      styleSheet.textContent = styles;
      document.head.appendChild(styleSheet);
    }
    
    document.body.appendChild(alert);
    
    // Add event listeners
    const closeBtn = alert.querySelector('.custom-alert-close');
    const okBtn = alert.querySelector('.custom-alert-ok');
    
    const closeAlert = () => {
      alert.style.animation = 'fadeIn 0.3s ease-out reverse';
      setTimeout(() => {
        alert.remove();
      }, 300);
    };
    
    closeBtn.addEventListener('click', closeAlert);
    okBtn.addEventListener('click', closeAlert);
    
    // Close on background click
    alert.addEventListener('click', (e) => {
      if (e.target === alert) {
        closeAlert();
      }
    });
    
    // Close on Escape key
    const handleEscape = (e) => {
      if (e.key === 'Escape') {
        closeAlert();
        document.removeEventListener('keydown', handleEscape);
      }
    };
    document.addEventListener('keydown', handleEscape);
  }
  
  // Initialize first animation
  setTimeout(() => {
    document.body.classList.add('loaded');
  }, 100);
});

// Add loaded class for initial animations
document.documentElement.classList.add('js-enabled');

// Handle page load
window.addEventListener('load', function() {
  document.body.classList.add('page-loaded');
});