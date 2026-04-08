function openModal() {
  document.getElementById('modalFormContent').style.display = 'block';
  document.getElementById('modalFinanceContent').style.display = 'none';
  document.getElementById('estimateModal').classList.add('active');
  document.body.style.overflow = 'hidden';
}

function openFinanceModal(type) {
  document.getElementById('modalFormContent').style.display = 'none';
  document.getElementById('modalFinanceContent').style.display = 'block';
  document.getElementById('modalFormSuccess').style.display = 'none';
  const select = document.querySelector('#modalFinanceContent select[name="financing"]');
  select.value = type;
  document.getElementById('estimateModal').classList.add('active');
  document.body.style.overflow = 'hidden';
}

function closeModal() {
  document.getElementById('estimateModal').classList.remove('active');
  document.body.style.overflow = '';
  // Reset both forms for next open
  document.getElementById('modalFormContent').style.display = 'block';
  document.getElementById('modalFinanceContent').style.display = 'none';
  document.getElementById('modalFormSuccess').style.display = 'none';
}

function closeModalOutside(e) {
  if (e.target === document.getElementById('estimateModal')) closeModal();
}

function toggleServices() {
  const extras = document.querySelectorAll('.service-card--extra');
  const btn = document.querySelector('.btn-show-more');
  const expanded = extras[0].classList.contains('visible');

  if (!expanded) {
    extras.forEach((card, i) => {
      card.classList.add('visible');
      card.style.animation = 'none';
      card.offsetHeight;
      card.style.animation = 'fadeInUp 0.3s ease both';
      card.style.animationDelay = `${i * 50}ms`;
    });
    btn.textContent = 'Show Less ▴';
  } else {
    extras.forEach(card => {
      card.classList.remove('visible');
      card.style.animation = 'none';
      card.style.animationDelay = '0ms';
    });
    btn.textContent = 'Show All Services ▾';
  }
}

function collectFormData(container) {
  const data = new FormData();
  container.querySelectorAll('input, select, textarea').forEach(el => {
    if (el.name) data.append(el.name, el.value);
  });
  return data;
}

function submitContactForm() {
  const content = document.getElementById('contactFormContent');
  const errorEl = document.getElementById('contactFormError');
  const btn = content.querySelector('.btn-submit');
  errorEl.textContent = '';

  const data = collectFormData(content);
  btn.disabled = true;
  btn.textContent = 'Sending...';

  fetch('send.php', { method: 'POST', body: data })
    .then(r => r.json())
    .then(res => {
      if (res.success) {
        content.style.display = 'none';
        document.getElementById('contactFormSuccess').style.display = 'block';
      } else {
        errorEl.textContent = res.message || 'Something went wrong. Please try again.';
        btn.disabled = false;
        btn.textContent = 'Send Message — Free Estimate';
      }
    })
    .catch(() => {
      errorEl.textContent = 'Could not send message. Please call us directly.';
      btn.disabled = false;
      btn.textContent = 'Send Message — Free Estimate';
    });
}

function submitFinanceForm() {
  const content = document.getElementById('modalFinanceContent');
  const errorEl = document.getElementById('financeFormError');
  const btn = content.querySelector('.btn-submit');
  errorEl.textContent = '';

  const data = collectFormData(content);
  btn.disabled = true;
  btn.textContent = 'Sending...';

  fetch('send.php', { method: 'POST', body: data })
    .then(r => r.json())
    .then(res => {
      if (res.success) {
        content.style.display = 'none';
        document.getElementById('modalFormSuccess').style.display = 'block';
      } else {
        errorEl.textContent = res.message || 'Something went wrong. Please try again.';
        btn.disabled = false;
        btn.textContent = 'Submit — Apply Now';
      }
    })
    .catch(() => {
      errorEl.textContent = 'Could not send. Please call us directly.';
      btn.disabled = false;
      btn.textContent = 'Submit — Apply Now';
    });
}

function submitModalForm() {
  const content = document.getElementById('modalFormContent');
  const errorEl = document.getElementById('modalFormError');
  const btn = content.querySelector('.btn-submit');
  errorEl.textContent = '';

  const data = collectFormData(content);
  btn.disabled = true;
  btn.textContent = 'Sending...';

  fetch('send.php', { method: 'POST', body: data })
    .then(r => r.json())
    .then(res => {
      if (res.success) {
        content.style.display = 'none';
        document.getElementById('modalFormSuccess').style.display = 'block';
      } else {
        errorEl.textContent = res.message || 'Something went wrong. Please try again.';
        btn.disabled = false;
        btn.textContent = 'Send — Get My Free Estimate';
      }
    })
    .catch(() => {
      errorEl.textContent = 'Could not send message. Please call us directly.';
      btn.disabled = false;
      btn.textContent = 'Send — Get My Free Estimate';
    });
}
