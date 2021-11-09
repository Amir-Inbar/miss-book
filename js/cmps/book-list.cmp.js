import bookPreview from './book-preview.cmp.js';

export default {
	props: [ 'books' ],
	template: `
    <section > 
        <ul class="book-list">
            <li v-for="book in books">
                <book-preview :book="book" @click.native="select(book.id)" />
            </li>
        </ul>
    </section>
    `,
	data() {
		return {};
	},
	created() {},
	methods: {
		select(bookId) {
			this.$emit('selected', bookId);
		}
	},
	computed: {},
	components: {
		bookPreview
	}
};
