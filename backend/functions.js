import catsBox from './database.js';

const getKittens = () => {
	return new Promise((resolve, reject) => {
		setTimeout(function () {
			if (catsBox.length) {
				resolve(catsBox);
			} else {
				reject("Грешката ще се handle-не във фронтенд-а.");
			}
		}, 1000);
	});
};

const getKittenDetailsById = (id) => {
	return new Promise((resolve, reject) => {
		setTimeout(function () {
			let kittenDetails = catsBox.filter(kitten => { return kitten.id == id });
			resolve(kittenDetails[0]);
		}, 1000);
	});
};

export { getKittens, getKittenDetailsById };
