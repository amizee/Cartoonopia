document.getElementById('search-form').addEventListener('submit', async function(event) {
    event.preventDefault();
    const searchValue = document.getElementById('search-input').value; // Get the search query from the input field
    const response = await axios.get('http://localhost:3000/users', {
        params: {
            value: searchValue // Pass the search query as a query parameter
        }
    });
    console.log(response.data);
});