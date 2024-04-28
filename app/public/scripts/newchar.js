const newCharacterForm = document.getElementById('add-character-form');

newCharacterForm.addEventListener('submit', function(event) {
    event.preventDefault();

    const formData = new FormData(newCharacterForm);
    for (const [key, value] of formData.entries()) {
        console.log(`${key}: ${value}`);
    }
    
    window.location.replace('/allchar');
});