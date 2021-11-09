export default {
	template: `
        <section class="about-page main-layout">
            <h3>about page...</h3>
            
        </section>
    `,
	created() {
		const interval = setTimeout(() => {
			console.log('created');
		});
	},
	destroyed() {
		console.log('destroyed');
		clearInterval(this.interval);
	}
};
