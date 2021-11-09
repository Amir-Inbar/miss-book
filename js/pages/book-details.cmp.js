import { bookService } from '../services/books.service.js';
import longText from '../cmps/long-text.cmp.js';
import reviewAdd from '../cmps/review-add.cmp.js';
import { eventBus } from '../services/event-bus-service.js';

export default {
	template: `
	
		<div class="details-container main-layout">
		<article v-if="book" class="book-details flex">
		<div class="details-section"> 
			<h3><span>Title:</span>{{book.title}}</h3>
			<div><span>Sub-Title:</span>{{book.subtitle}}</div>
			<div><span>Authors:</span>
				<div v-for="author in book.authors">{{author}}</div>
			</div>
			<div><span>Categories:</span>
				<div v-for="category in book.categories">{{category}}</div>
			</div>
			<div><span>Lang:</span>{{book.language}}</div>
			<div><span>Pages:</span>{{book.pageCount}} {{calcPages}}</div>
			<div><span>Publish Date:</span>{{book.publishedDate}} {{calcPublishDate}}</div>
			<div :class="setClass"><span>Sale Price:</span>{{book.listPrice.amount}}{{showSymbol}} </div>
			<long-text v-bind:txt="book.description" />
			<router-link :to="'/book/'+book.id+'/review'" class="add-review">Add Review </router-link>
		</div>
		<img :src="book.thumbnail" class="details-img"/>
		</article>
		<article v-if="reviews" >
			<div v-for="review in reviews" class="display-review">
				<div @click="removeReview(review)" class="remove-review-btn">X</div>
				<div><span>Name:</span> {{review.review.fullName}}</div>
				<div><span>Date:</span> {{review.review.DatePicker}}</div>
				<div><span>Review Rate:</span> {{review.review.Rate}}</div>
				<div><span>Review:</span> {{review.review.Note}}</div>
			</div>
		</article>
	</div>
    `,
	data() {
		return {
			book: null,
			reviews: null,
			bookId: null
		};
	},
	created() {
		const { bookId } = this.$route.params;
		this.bookId = bookId;
		bookService.getById(bookId).then((book) => (this.book = book));
		this.addReviews();
		console.log(this.reviews);
	},
	methods: {
		addReviews() {
			const reviews = bookService.getReviews(this.bookId);
			console.log(reviews);
			this.reviews = reviews;
		},
		removeReview(review) {
			const reviews = this.reviews.findIndex((rev) => rev.id === review.id)[0];
			this.reviews.splice(reviews, 1);
			const msg = {
				txt: 'The review was delete',
				type: 'success'
			};
			eventBus.$emit('showMsg', msg);
		}
	},
	computed: {
		calcPages() {
			if (this.book.pageCount < 100) return 'Light reading';
			if (this.book.pageCount > 500) return 'Long reading';
			if (this.book.pageCount > 200) return 'Decent reading';
		},
		calcPublishDate() {
			if (new Date().getFullYear() - this.book.publishedDate > 10) return '(Veteran Book)';
			else if (new Date().getFullYear() - this.book.publishedDate < 1) return '(New!)';
		},
		showSymbol() {
			return bookService.getCurrSymbol(this.book.listPrice.currencyCode);
		},
		setClass() {
			if (this.book.listPrice.amount < 20) return { isgreen: true };
			if (this.book.listPrice.amount > 150) return { isred: true };
		}
	},
	components: {
		longText,
		reviewAdd
	}
};
