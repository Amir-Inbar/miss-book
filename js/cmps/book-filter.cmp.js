export default {
	template: `

    <form @submit.prevent="filter" class="book-filter">
        <label name="filter-pricefrom"> From price:</label>
        <input type="text"  v-model.number="filterBy.fromPrice" id="filter-pricefrom"/>
        
        <label name="filter-priceto"> to Price</label>
        <input type="text"  v-model.nubmer="filterBy.toPrice" id="filter-priceto"/>
        
        <label name="filter-name">By Name</label>
        <input type="text"  v-model="filterBy.byName" id="filter-name"/>

        <button class="filter-btn">Search</button>
        
</form>
    `,
	data() {
		return {
			filterBy: { byName: '', fromPrice: '', toPrice: '' }
		};
	},
	created() {},
	methods: {
		filter() {
			this.$emit('filtered', { ...this.filterBy });
		}
	},
	computed: {},
	components: {}
};
