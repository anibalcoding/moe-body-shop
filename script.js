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

function submitForm(type) {
  if (type === 'modal') {
    document.getElementById('modalFormContent').style.display = 'none';
    document.getElementById('modalFormSuccess').style.display = 'block';
  } else {
    document.getElementById('contactFormContent').style.display = 'none';
    document.getElementById('contactFormSuccess').style.display = 'block';
  }
}
