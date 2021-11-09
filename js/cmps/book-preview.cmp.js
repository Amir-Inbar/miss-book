import { bookService } from '../services/books.service.js';

export default {
	props: [ 'book' ],
	template: `
				<div class="book-preview"> 
					<router-link :to="'/book/'+book.id">
						<img :src="book.thumbnail"/>
					</router-link>
						<div class="book-preview-details"> 
							<p><span>Title: </span>:{{book.title}} </p>
							<p><span>price: </span>{{book.listPrice.amount}} <span>{{showSymbol}} </span> </p>
						</div>
				</div>
			
    `,
	data() {
		return {
			currency: this.book.listPrice.currencyCode
		};
	},
	created() {},
	computed: {
		showSymbol() {
			return bookService.getCurrSymbol(this.currency);
		}
	},
	components: {
		bookService
	}
};
