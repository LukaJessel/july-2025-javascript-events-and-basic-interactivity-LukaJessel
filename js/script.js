// ----------------------
// Part 1: Event Handling
// ----------------------

const eventBtn = document.getElementById('event-btn');
const eventMsg = document.getElementById('event-msg');

eventBtn.addEventListener('click', () => {
  eventMsg.textContent = 'Button clicked! 🎉';
  eventMsg.classList.remove('hidden');
});

eventBtn.addEventListener('mouseover', () => {
  eventMsg.textContent = 'Mouse over the button! 👀';
  eventMsg.classList.remove('hidden');
});

eventBtn.addEventListener('mouseout', () => {
  eventMsg.classList.add('hidden');
});

// ----------------------
// Part 2: Interactive Features
// ----------------------

// 1. Light/Dark Mode Toggle
const toggleThemeBtn = document.getElementById('toggle-theme-btn');
toggleThemeBtn.addEventListener('click', () => {
  document.body.classList.toggle('dark-mode');

  // Change button text depending on theme
  if (document.body.classList.contains('dark-mode')) {
    toggleThemeBtn.textContent = 'Toggle Light Mode';
  } else {
    toggleThemeBtn.textContent = 'Toggle Dark Mode';
  }
});

// 2. Counter / Button Game
const counterValueSpan = document.getElementById('counter-value');
let counter = 0;

document.getElementById('increment-btn').addEventListener('click', () => {
  counter++;
  updateCounterDisplay();
});

document.getElementById('decrement-btn').addEventListener('click', () => {
  counter--;
  updateCounterDisplay();
});

document.getElementById('reset-counter-btn').addEventListener('click', () => {
  counter = 0;
  updateCounterDisplay();
});

function updateCounterDisplay() {
  counterValueSpan.textContent = counter;
  if (counter > 10) {
    counterValueSpan.style.color = 'green';
  } else if (counter < -10) {
    counterValueSpan.style.color = 'red';
  } else {
    counterValueSpan.style.color = '';
  }
}

// 3. Collapsible FAQ Section
const faqQuestions = document.querySelectorAll('.faq-question');
faqQuestions.forEach(btn => {
  btn.addEventListener('click', () => {
    const answer = btn.nextElementSibling;
    if (answer.classList.contains('hidden')) {
      answer.classList.remove('hidden');
      btn.setAttribute('aria-expanded', 'true');
    } else {
      answer.classList.add('hidden');
      btn.setAttribute('aria-expanded', 'false');
    }
  });
});

// 4. Simple Dropdown Menu
const dropdownToggle = document.getElementById('dropdown-toggle');
const dropdownOptions = document.getElementById('dropdown-options');
const selectedOptionSpan = document.getElementById('selected-option');

dropdownToggle.addEventListener('click', () => {
  dropdownOptions.classList.toggle('hidden');
});

dropdownOptions.addEventListener('click', (e) => {
  if (e.target.tagName === 'LI') {
    selectedOptionSpan.textContent = e.target.textContent;
    dropdownOptions.classList.add('hidden');
    dropdownToggle.textContent = `${e.target.textContent} ▼`;
  }
});

// Close dropdown if clicked outside
document.addEventListener('click', (e) => {
  if (!dropdownToggle.contains(e.target) && !dropdownOptions.contains(e.target)) {
    dropdownOptions.classList.add('hidden');
  }
});

// Keyboard accessibility for dropdown options
dropdownOptions.querySelectorAll('li').forEach(item => {
  item.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      selectedOptionSpan.textContent = item.textContent;
      dropdownOptions.classList.add('hidden');
      dropdownToggle.textContent = `${item.textContent} ▼`;
      dropdownToggle.focus();
    }
  });
});

// 5. Tabbed Interface
const tabs = document.querySelectorAll('.tab-btn');
const tabContents = document.querySelectorAll('.tab-content');

tabs.forEach(tab => {
  tab.addEventListener('click', () => {
    const target = tab.dataset.tab;

    // Remove active classes
    tabs.forEach(t => t.classList.remove('active'));
    tabContents.forEach(tc => tc.classList.remove('active'));

    // Add active class to clicked tab and content
    tab.classList.add('active');
    document.getElementById(target).classList.add('active');
  });
});

// ----------------------
// Part 3: Custom Form Validation
// ----------------------

const form = document.getElementById('signup-form');
const nameInput = document.getElementById('name');
const emailInput = document.getElementById('email');
const passwordInput = document.getElementById('password');
const confirmPasswordInput = document.getElementById('confirm-password');
const formFeedback = document.getElementById('form-feedback');

form.addEventListener('submit', (e) => {
  e.preventDefault();

  clearErrors();
  formFeedback.textContent = '';

  const nameValid = validateName();
  const emailValid = validateEmail();
  const passwordValid = validatePassword();
  const confirmPasswordValid = validateConfirmPassword();

  if (nameValid && emailValid && passwordValid && confirmPasswordValid) {
    formFeedback.style.color = 'green';
    formFeedback.textContent = 'Form submitted successfully! 🎉';
    form.reset();
  } else {
    formFeedback.style.color = '#d9534f';
    formFeedback.textContent = 'Please fix the errors above and try again.';
  }
});

// Clear previous error messages
function clearErrors() {
  form.querySelectorAll('.error-msg').forEach(msg => {
    msg.textContent = '';
  });
  formFeedback.textContent = '';
}

// Validate Name: must not be empty and only letters + spaces
function validateName() {
  const value = nameInput.value.trim();
  const errorMsg = nameInput.nextElementSibling;
  if (value === '') {
    errorMsg.textContent = 'Name is required.';
    return false;
  }
  if (!/^[A-Za-z\s]+$/.test(value)) {
    errorMsg.textContent = 'Name can only contain letters and spaces.';
    return false;
  }
  return true;
}

// Validate Email: basic email regex
function validateEmail() {
  const value = emailInput.value.trim();
  const errorMsg = emailInput.nextElementSibling;
  if (value === '') {
    errorMsg.textContent = 'Email is required.';
    return false;
  }
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(value)) {
    errorMsg.textContent = 'Please enter a valid email address.';
    return false;
  }
  return true;
}

// Validate Password: min 6 chars, at least one letter and one number
function validatePassword() {
  const value = passwordInput.value;
  const errorMsg = passwordInput.nextElementSibling;
  if (value === '') {
    errorMsg.textContent = 'Password is required.';
    return false;
  }
  if (value.length < 6) {
    errorMsg.textContent = 'Password must be at least 6 characters.';
    return false;
  }
  if (!/[A-Za-z]/.test(value) || !/[0-9]/.test(value)) {
    errorMsg.textContent = 'Password must contain letters and numbers.';
    return false;
  }
  return true;
}

// Validate Confirm Password: must match password
function validateConfirmPassword() {
  const value = confirmPasswordInput.value;
  const errorMsg = confirmPasswordInput.nextElementSibling;
  if (value === '') {
    errorMsg.textContent = 'Please confirm your password.';
    return false;
  }
  if (value !== passwordInput.value) {
    errorMsg.textContent = 'Passwords do not match.';
    return false;
  }
  return true;
}

// Optional: Real-time validation as user types
[nameInput, emailInput, passwordInput, confirmPasswordInput].forEach(input => {
  input.addEventListener('input', () => {
    clearErrors();
    formFeedback.textContent = '';
  });
});
