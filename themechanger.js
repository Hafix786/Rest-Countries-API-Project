function themeFunctionality(body, changeTheme) {
    // Apply theme on page load
    if (localStorage.getItem('mode') === 'dark') {
        body.classList.add('dark-mode');
        changeTheme.innerHTML = `<i class="fa-regular fa-sun"></i><span>&nbsp;&nbsp;Light Mode</span>`;
    } else {
        body.classList.remove('dark-mode');
        changeTheme.innerHTML = `<i class="fa-regular fa-moon"></i><span>&nbsp;&nbsp;Dark Mode</span>`;
    }

    // Toggle theme on click
    changeTheme.addEventListener('click', () => {
        body.classList.toggle('dark-mode');
        if (body.classList.contains('dark-mode')) {
            changeTheme.innerHTML = `<i class="fa-regular fa-sun"></i><span>&nbsp;&nbsp;Light Mode</span>`;
            localStorage.setItem('mode', 'dark');
        } else {
            changeTheme.innerHTML = `<i class="fa-regular fa-moon"></i><span>&nbsp;&nbsp;Dark Mode</span>`;
            localStorage.setItem('mode', 'light');
        }
    });
}

export { themeFunctionality };