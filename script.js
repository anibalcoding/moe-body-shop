function openModal() {
  document.getElementById('estimateModal').classList.add('active');
  document.body.style.overflow = 'hidden';
}

function closeModal() {
  document.getElementById('estimateModal').classList.remove('active');
  document.body.style.overflow = '';
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
      card.offsetHeight; // force reflow
      card.style.animation = `fadeInUp 0.3s ease both`;
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

function submitForm(type) {
  if (type === 'modal') {
    document.getElementById('modalFormContent').style.display = 'none';
    document.getElementById('modalFormSuccess').style.display = 'block';
  } else {
    document.getElementById('contactFormContent').style.display = 'none';
    document.getElementById('contactFormSuccess').style.display = 'block';
  }
}
