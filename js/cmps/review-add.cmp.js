import { bookService } from '../services/books.service.js';
import { eventBus } from '../services/event-bus-service.js';

// export default {
// 	props: [ 'book' ],
// 	template: `
//         <section class="review-add main-layout">

//         <form @submit.prevent="save" class="review-form flex">
//         <div class="fullname-container space-between">
//         <label name="full-name"> Write Your Full Name</label>
//         <input ref="fnInput" type="text"  v-model="reviewAdd.fullName" id="full-name" placeHolder="Write Your Name"/>
//         </div>
//         <div class="stars-container space-between">Rate this book
//         <select v-model.number="reviewAdd.rate">
//             <option value="default" disabled selected>--Rate Your Book--</option>
//             <option value="1">⭐</option>
//             <option value="2">⭐⭐</option>
//             <option value="3">⭐⭐⭐</option>
//             <option value="4">⭐⭐⭐⭐</option>
//             <option value="5">⭐⭐⭐⭐⭐</option>
//         </select>
//         </div>
//         <div class="space-between">
//             Share your thoughts here
//             <textarea  v-model="reviewAdd.notes" class="form-textarea"></textarea>
//         </div>
//         <button>Submit Review</button>

// </form>
//         </section>
//     `,
// 	data() {
// 		return {
// 			reviewAdd: {
// 				fullName: '',
// 				rate: '',
// 				datePicker: new Date().toISOString().split('T')[0],
// 				notes: ''
// 			}
// 		};
// 	},
// 	methods: {
// 		save() {
// 			const { bookId } = this.$route.params;
// 			bookService.addReview(bookId, this.reviewAdd);
// 			this.$router.push('/book/' + bookId);

// 			const msg = {
// 				txt: 'You just add a review!,click below to return to our store',
// 				type: 'success',
// 				link: '/book/'
// 			};
// 			eventBus.$emit('showMsg', msg);
// 		}
// 	},
// 	created() {},
// 	mounted() {
// 		this.$refs.fnInput.focus();
// 	},
// 	computed: {},
// 	components: {
// 		bookService
// 	}
// };

const textBox = {
	props: [ 'data' ],
	template: `
        <div class="row">
            <label>
				Full Name
                <input ref="fnInput" type="text" v-model="text" @blur="reportVal" />
            </label>
        </div>
    `,
	data() {
		return {
			text: ''
		};
	},
	methods: {
		reportVal() {
			this.$emit('setInput', this.text);
		}
	},
	mounted() {
		this.$refs.fnInput.focus();
	}
};
const reviewNote = {
	props: [ 'data' ],
	template: `
        <div class="row">
            <label>
                {{data.label}}
				<textarea v-model="note" class="form-textarea" @blur="reportVal"></textarea>
            </label>
        </div>
    `,
	data() {
		return {
			note: ''
		};
	},
	methods: {
		reportVal() {
			this.$emit('setInput', this.note);
		}
	}
};
const reviewRate = {
	props: [ 'data' ],
	template: `
        <div class="row">
            <label>
                {{data.label}}
				<span v-for="num in 5" class="fa fa-star" :class="{checked:num<=Rate}" @click="changeColor(num)"></span>
            </label>
        </div>
    `,
	data() {
		return {
			Rate: ''
		};
	},
	methods: {
		reportVal() {
			this.$emit('setInput', this.Rate);
		},
		changeColor(num) {
			this.Rate = num;
			this.reportVal();
		}
	}
};

export default {
	template: `
    <section class="review-add main-layout">
        <h1 class="review-header">Review</h1>


        <form @submit.prevent="save" class="review-form flex">
            <component v-for="(currCmp, idx) in cmps " 
                        :is="currCmp.type" 
                        :data="currCmp.data" 
						:key="idx"
                        @setInput="setInput($event, currCmp.data.label)">
            </component>
            <button type="submit">Save</button>
        </form>

    </section> 
    `,
	data() {
		return {
			cmps: [
				{
					type: 'textBox',
					data: {
						label: 'fullName'
					}
				},
				{
					type: 'reviewRate',
					data: {
						label: 'Rate'
					}
				},
				{
					type: 'reviewNote',
					data: {
						label: 'Note'
					}
				}
			],
			reviewAdd: {
				fullName: '',
				Rate: '',
				DatePicker: new Date().toISOString().split('T')[0],
				Note: ''
			}
		};
	},
	methods: {
		setInput(val, key) {
			console.log(key);
			this.reviewAdd[key] = val;
		},
		save() {
			const { bookId } = this.$route.params;
			console.log(this.reviewAdd);
			bookService.addReview(bookId, this.reviewAdd);
			this.$router.push('/book/' + bookId);

			const msg = {
				txt: 'You just add a review!,click below to return to our store',
				type: 'success',
				link: '/book/'
			};
			eventBus.$emit('showMsg', msg);
		}
	},
	created() {},
	computed: {},
	watch: {},
	components: {
		reviewNote,
		textBox,
		reviewRate
	}
};
