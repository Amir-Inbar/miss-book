export default {
	props: [ 'txt' ],
	template: `
        <section class="book-desc-container">
                   <p class="book-desc"><span>Description:</span>{{txtLength}} <button v-if="txt.length > 100" class="desc-btn" @click="toggleBtn" >{{btnDisplay}}</button></p>
        </section>
    `,
	data() {
		return {
			short: true
		};
	},
	created() {},
	methods: {
		toggleBtn() {
			this.short = !this.short;
		}
	},
	computed: {
		txtLength() {
			if (this.short) return this.txt.substring(0, 100);
			else return this.txt;
		},
		btnDisplay() {
			if (!this.short) return 'read less';
			return 'read more...';
		}
	},
	components: {}
};
