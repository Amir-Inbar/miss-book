import bookApp from './js/pages/book-app.cmp.js';
import homePage from './js/pages/home-page.cmp.js';
import aboutPage from './js/pages/about-page.cmp.js';
import bookDetails from './js/pages/book-details.cmp.js';
import reviewAdd from './js/cmps/review-add.cmp.js';

const routes = [
	{
		path: '/',
		component: homePage
	},
	{
		path: '/about',
		component: aboutPage
	},
	{
		path: '/book',
		component: bookApp
	},
	{
		path: '/book/:bookId',
		component: bookDetails
	},
	{
		path: '/book/:bookId/review',
		component: reviewAdd
	}
];

export const router = new VueRouter({ routes });
