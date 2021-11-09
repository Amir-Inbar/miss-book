import { bookService } from '../services/books.service.js';
import bookList from '../cmps/book-list.cmp.js';
import bookFilter from '../cmps/book-filter.cmp.js';

export default {
	props: [ '' ],
	template: `
    <section class="book-app main-layout">
        <book-filter @filtered="setFilter"></book-filter>
        <book-list :books="booksToShow"></book-list>
    </section>
    `,
	data() {
		return {
			books: null,
			filterBy: null
		};
	},
	created() {
		this.loadBooks();
	},
	methods: {
		loadBooks() {
			bookService.query().then((books) => (this.books = books));
		},
		setFilter(filterBy) {
			this.filterBy = filterBy;
		}
	},
	computed: {
		booksToShow() {
			if (!this.filterBy || !this.filterBy.toPrice || this.filterBy.toPrice === '0') return this.books;
			const { byName, fromPrice, toPrice } = this.filterBy;
			return this.books.filter((book) => {
				return (
					book.listPrice.amount > fromPrice &&
					book.listPrice.amount < toPrice &&
					book.title.toLowerCase().includes(byName.toLowerCase())
				);
			});
		}
	},
	components: {
		bookList,
		bookFilter
	}
};
