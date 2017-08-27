Vue.component('heartbeat', {
  template: '#heartbeat-template',
	computed: {
		calcY: function() {
			return 100 - this.height
		}
	},
	props: {
		width: {
			type: String,
			default: '10'
		},
		height: {
			type: Number,
			required: true
		},
		x: {
			type: Number,
			required: true
		}
	}
})

Vue.component('heartbeats-svg', {
  template: '#heartbeats-svg-template',
	props: {
		small: {
			type: Boolean,
			required: true
		}
	},
	data: function() {
		return {
			beats: [],
			svgHeight: 0,
			svgWidth: 0,
			x: 0
		}
	},
	computed: {
		viewboxMetrics: function() {
			return `${this.x > this.svgWidth ? this.x - this.svgWidth : 0} 0 ${this.svgWidth} ${this.svgHeight}`
		}
	},
	mounted: function() {
		this.addBeat(0)
		this.updateSvgSizes()
		window.addEventListener('resize', () => {
			this.updateSvgSizes()
		})
	},
	methods: {
		addBeat: function() {
			const oldX = this.x
			const height = parseInt(40*Math.random()+60);

			this.beats.push({
				x: oldX,
				y: height,
				height: height
			})

			setTimeout(() => {
						this.x = oldX + 15
            this.addBeat()
        }, 1000);
		},
		updateSvgSizes: function() {
			console.log('resize');
			this.svgWidth = this.$el.clientWidth
			this.svgHeight = this.$el.clientHeight

			console.log('ww', this.$el.clientWidth);
			console.log('www', this.svgWidth);
		}
	},
	watch: {
		small: function(newSmallView) {
			this.updateSvgSizes()
		}
	}
})

Vue.component('heartbeats', {
  template: '#heartbeats-container-template',
	data: function() {
		return {
			isSmall: false
		}
	},
	methods: {
		toggleSize: function() {
			this.isSmall = !this.isSmall
		}
	}
})

new Vue({
  el: '#app-main'
})
