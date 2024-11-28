const addPetForm = document.getElementById('addPetForm');
const registerCheckbox = document.getElementById('register');
const passwordFields = document.getElementById('passwordFields');
const confirmCheckbox = document.getElementById('confirm');
const messageDiv = document.getElementById('message');

registerCheckbox.addEventListener('change', () => {
  passwordFields.style.display = registerCheckbox.checked ? 'block' : 'none';
});


addPetForm.addEventListener('submit', async (event) => {
  event.preventDefault(); // Prevent default form submission

  const formData = new FormData(addPetForm);
  const data = {}; //For easier validation (optional, remove if prefer FormData directly)


  //Basic Data Extraction (replace with more robust extraction if needed)
  for (let pair of formData.entries()) {
    data[pair[0]] = pair[1];
  }


  const errors = validateForm(data);

  if (errors.length > 0) {
    displayErrors(errors);
  } else {
    try {
      const response = await fetch('/api/pets/new', { // Your API endpoint
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        const errorData = await response.json();
        if (errorData.error && errorData.error.errors) {
          displayErrors(Object.values(errorData.error.errors).flat()); //Handle nested server errors
        } else {
          displayMessage(`Error: ${response.statusText}`);
        }
      } else {
        displayMessage('Pet ad added successfully!');
      }
    } catch (error) {
      displayMessage(`Error: ${error.message}`);
    }
  }
});

function validateForm(data) {
  const errors = [];

  //Basic Input Validations
  if (!data.name || data.name.trim() === "") errors.push("Name is required");
  if (!data.phone || !/^\+\d+$/.test(data.phone)) errors.push("Invalid phone number (must start with '+')");
  if (!data.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) errors.push("Invalid email address");
  if (!data.ran || data.ran.trim() === "") errors.push("Район is required");
  if (registerCheckbox.checked) {
      if (!data.password || data.password.length < 7 || !/(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).*/.test(data.password)) {
          errors.push("Password must be at least 7 characters long and contain at least one digit, one lowercase letter, and one uppercase letter.");
      }
      if (data.password !== data.password_confirmation) errors.push("Passwords do not match");
  }
  if (!confirmCheckbox.checked) errors.push("You must agree to data processing");
  //Add more robust file validation for photo1, photo2, photo3 as needed

  return errors;
}

function displayErrors(errors) {
  messageDiv.innerHTML = '<ul class="alert alert-danger">' + errors.map(error => `<li>${error}</li>`).join('') + '</ul>';
}

function displayMessage(message) {
    messageDiv.innerHTML = `<p class="alert alert-success">${message}</p>`;
}