export default {
	template: `
        <header class="app-nav main-layout">
            <div class="logo">
                <h3>BookStore</h3>
            </div>
            <nav class="navbar-container">
                <router-link to="/">Home</router-link> |
                <router-link to="/book">Books</router-link> |
                <router-link to="/about">About</router-link>
            </nav>
        </header>
    `
};
