document.getElementById('search-form').addEventListener('submit', async function(event) {
    event.preventDefault();
    const searchValue = document.getElementById('search-input').value; // Get the search query from the input field
    const response = await axios.get('http://localhost:3000/users', {
        params: {
            value: searchValue // Pass the search query as a query parameter
        }
    });
    const data = response.data.results;
    console.log(data);
    const profilesDiv = document.getElementById('profiles');

    while (profilesDiv.hasChildNodes()) {
        profilesDiv.removeChild(profilesDiv.firstChild);
    }

    for (var i = 0; i < data.length; i++) {
        const line = document.createElement('p');
        const anchorLink = document.createElement('a');
        anchorLink.href = `/users/${data[i]._id}`;
        anchorLink.textContent = data[i].firstname + " " + data[i].lastname;
        line.append(anchorLink);
        profilesDiv.appendChild(line);
    }
});