class SmoothAnimation {
	constructor() {
		this.frames = 0;
		this.xTarget = 0;
		this.xRate = 0;
		this.yTarget = 0;
		this.yRate = 0;
		this.zTarget = 0;
		this.zRate = 0;

		this.hasMovedMenuItems = false;
		this.newLocations = [];
	}

	smoothAnimations() {
		this.frames--;
		if (this.xTarget) {
			perspective.x -= this.xRate;
		}
		if (this.yTarget) {
			perspective.y -= this.yRate;
		}
		if (this.zTarget) {
			perspective.z -= this.zRate;
		}

		if (!this.hasMovedMenuItems) {
			this.hasMovedMenuItems = true;
			this.moveMenuItems();
		}

		if (this.newLocations.length) {
		}
	}

	moveMenuItems() {
		menuItems.forEach((item) => {
			item.getNextLocation();
		});
	}
}
