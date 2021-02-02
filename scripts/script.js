import { getKittens, getKittenDetailsById } from '../backend/functions.js';

const loadKittens = document.querySelector('.load-kittens');
loadKittens.addEventListener("click", fetchKittens);
let pop = document.querySelector(".popUp");
let kittenInfo = document.querySelector(".kitten-info");
let kitenPopUp = document.querySelector(".bg-modal");
let close = document.querySelector('.close');
let bgModal = document.querySelector('.bg-modal');

function moreInfoForCat(event) {

	let cursorStyle = document.getElementById(event.target.id);
	cursorStyle.style.cursor = 'wait';

	getKittenDetailsById(event.target.id).then((oneCat) => {

		let moreInfo = `<a>
		<figure class="thumbnail">
    	<img id="${oneCat.id}" src=${oneCat.img} alt="meow">
    	</figure>
    	<div class="card-content">
    		<h2>${oneCat.name}</h2>
    		<p>${oneCat.discription}</p>
    		<p>the size is:${oneCat.additional_details.size}</p>
    		<p>The weight is:${oneCat.additional_details.weight}</p>
    		<p>Cuteness:${oneCat.additional_details.cuteness_level}</p>
    	</div>
    	<!-- .card-content -->
	</a>`
		kittenInfo.innerHTML = moreInfo;
		kitenPopUp.style.display = 'flex';
		cursorStyle.style.cursor = 'pointer';
	});
}

function hanleButtonState(disabled) {
	loadKittens.disabled = disabled;
	let buttonText = disabled ? 'Loading <span></span>' : 'Load kittens'
	loadKittens.innerHTML = buttonText;
}

bgModal.addEventListener('click', (event) => {
	if (event.target !== bgModal) {
		return
	}
	kitenPopUp.style.display = 'none';
})

close.addEventListener('click', () => {
	kitenPopUp.style.display = 'none';
});


pop.addEventListener('click', () => {
	pop.style.display = 'none';
	hanleButtonState(false);
});

function fetchKittens() {
	hanleButtonState(true);

	getKittens().then((cats) => {

		let sait = " ";
		for (let i = 0; i < cats.length; i++) {
			sait += populateHTMLwithCats(cats[i]);
		}
		document.querySelector(".cards").innerHTML = sait;
		let card = document.querySelectorAll(".card");
		card.forEach((el) => {
			el.style.cursor = "pointer"
			el.addEventListener("click", moreInfoForCat);
		});
	}).catch((error) => {
		console.log(error);
		pop.style.display = 'flex';
		pop.innerHTML = error;
	})
}

function populateHTMLwithCats(element) {

	return `<article id="${element.id}" class="card">
	<a>
		<figure class="thumbnail">
			<img  src=${element.img} alt="meow">
		</figure>
		<div class="card-content">
			<h2>${element.name}</h2>
			<p>${element.discription}</p>
		</div>
		<!-- .card-content -->
	</a>
</article>`
}
