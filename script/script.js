let nameCard = document.querySelector(".card__details-name");
let nameInput = document.querySelector("#cardholder");
let nameErrorDiv = document.querySelector(".form__cardholder-error");
let numberCard = document.querySelector(".card__number");
let numberInput = document.querySelector("#cardNumber");
let numberErrorDiv = document.querySelector('.form__inputnumber--error');
let monthCard = document.querySelector(".card__month");
let monthInput = document.querySelector("#cardMonth");
let monthError = document.querySelector('.form__input-mm--error');
let yearCard = document.querySelector(".card__year");
let yearInput = document.querySelector("#cardYear");
let yearError = document.querySelector('.form__input-yy--error');
let cvcCard = document.querySelector(".card-back__cvc");
let cvcInput = document.querySelector("#cardCvc");
let cvcError = document.querySelector('.form__input-cvc--error');

nameInput.addEventListener("input", () => {
	if (nameInput.value == '') {
		nameCard.innerText = 'JANE APPLESEED';
	} else {
		nameCard.innerText = nameInput.value;
	}
});

numberInput.addEventListener("input", e => {
	let inputValue = e.target.value;
	let regExp = /[A-z]/g;
	if (regExp.test(numberInput.value)) {
		showError(numberInput, numberErrorDiv, 'Wrong format, numbers only')
	} else {
		numberInput.value = inputValue.replace(/\s/g, "").replace(/([0-9]{4})/g, '$1 ').trim();
		hiddeError(numberInput, numberErrorDiv);
	}
	if (numberInput.value == '') {
		numberCard.innerText = '0000 0000 0000 0000';
	} else {
		numberCard.innerText = numberInput.value;
	}

});

monthInput.addEventListener('input', () => {
	monthCard.innerText = monthInput.value;
});

yearInput.addEventListener('input', () => {
	yearCard.innerText = yearInput.value;
});

cvcInput.addEventListener('input', () => {
	cvcCard.innerText = cvcInput.value;
	validateLetters(cvcInput, cvcError);
});

let confirmBtn = document.querySelector('.form__submit');
let nameValidation = false;
let numberValidation = false;
let monthValidation = false;
let yearValidation = false;
let cvcValidation = false;
let formSection = document.querySelector('.form');
let thanksSection = document.querySelector('.thanks-section');

confirmBtn.addEventListener('click', e => {
	e.preventDefault();

	if (verifyIsDilled(nameInput, nameErrorDiv)) {
		nameValidation = true;
	} else {
		nameValidation = false;
	}

	if (verifyIsDilled(numberInput, numberErrorDiv) == true) {
		if (numberInput.value.length == 19) {
			hiddeError(numberInput, numberErrorDiv);
			numberValidation = true;
		} else {
			showError(numberInput, numberErrorDiv, 'Wrong number');
			numberValidation = false;
		}
	}

	verifyIsDilled(monthInput, monthError);
	if (monthInput.value > 0 && monthInput.value <= 12) {
		monthCard.innerText = monthInput.value;
		hiddeError(monthInput, monthError);
		monthValidation = true;

	} else {
		showError(monthInput, monthError, "Can't be blak");
		monthValidation = false;
	}

	if (verifyIsDilled(yearInput, yearError)) {
		if (parseInt(yearInput.value) > 21 && parseInt(yearInput.value) < 28) {
			hiddeError(numberInput, numberErrorDiv);
			yearValidation = true;
		} else {
			showError(yearInput, yearError, 'Wrong Year');
			yearValidation = false;
		}
	}

	if (verifyIsDilled(cvcInput, cvcError)) {
		if (cvcInput.value.length == 3) {
			hiddeError(cvcInput, cvcError);
			cvcValidation = true;
		} else {
			showError(cvcInput, cvcError, 'Wrong cvc');
			cvcValidation = false;
		}
	}

	if (nameValidation == true && numberValidation == true && monthValidation == true && yearValidation == true && cvcValidation == true) {
		formSection.style.display = 'none';
		thanksSection.style.display = 'block';
	}
});

function showError(inputError, divError, msgError) {
	divError.innerText = msgError;
	inputError.style.borderColor = '#FF0000';
}

function hiddeError(inputError, divError) {
	divError.innerText = '';
	inputError.style.borderColor = 'hsl(270, 3%, 87%)';
}

function verifyIsDilled(divInput, divError) {
	if (divInput.value.length > 0) {
		hiddeError(divInput, divError);
		return true;
	} else {
		showError(divInput, divError, "Can't be blank");
		return false;
	}
}

function validateLetters(input, error) {
	let regExp = /[A-z]/g;
	if (regExp.test(input.value)) {
		showError(input, error, 'Wrong format, numbers only')
	} else {
		hiddeError(input, error);
	}
}


