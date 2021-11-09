import bookApp from './js/pages/book-app.cmp.js';
import headerApp from './js/cmps/app-nav.cmp.js';
import userMsg from './js/cmps/user-msg-cmp.js';
import { router } from '/routes.js';

const options = {
	el: '#app',
	router,
	template: `
	<section>
		<user-msg />
		<headerApp />
		<router-view /> 
	</section>
    `,
	components: {
		bookApp,
		headerApp,
		userMsg
	}
};

new Vue(options);
