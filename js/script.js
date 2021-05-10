new Vue({
	el: "#birds",
	data() {
		return {
			birds: [],
			touchActive: false,
			birdsTimer: null
		}
	},
	methods: {
		random(min, max) {
			return Math.random() * (max - min) + min;
		},
		flyBirds(evt) {
			const size = this.random(9, 1);
			const distX = this.random(-40, 40);
			const distY = this.random(-40, 40);
			const angle = this.random(-55, 55);
			const index = this.birds.length;
			
			this.birds.push({
				style: {
					"--left": `${evt.clientX - (size * 2)}px`,
					"--top": `${evt.clientY - (size * 2)}px`,
					"--width": `${size}vmin`,
					"--height": `${size / 2}vmin`,
					"--dist-x": `${distX}vmin`,
					"--dist-y": `${distY}vmin`,
					"--angle": `${angle}deg`,
					"--size": `${size}vmin`,
				},
				"active": false
			});
			
			setTimeout(() => {
				this.birds[index].active = true;
			}, 1);
			
			clearTimeout(this.birdsTimer);
			
			this.birdsTimer = setTimeout(() => {
				this.birds = [];
			}, 5000);
		},
		touchstartEvent(evt) {
			this.touchActive = true;
		},
		touchendEvent(evt) {
			this.touchActive = false;
		},
		touchmoveEvent(evt) {
			if (this.touchActive === false) {
				return;
			}

			for (const touch of evt.touches) {
				this.flyBirds(touch);
			}
		},
		touchcancelEvent(evt) {
			this.touchActive = false;
		}
	}
});