$(document).ready(function () {
	$('.slider-container').slick({
		dots: false,
		arrows: false,
		centerMode: true,
		infinite: true,
		speed: 300,
		fade: true,
		centerPadding: '60px',
		slidesToShow: 1,
		mobileFirst: true,
		responsive: [
			{
				breakpoint: 1280,
				settings: {
					arrows: true,
				},
			},
		],
	});
});
window.addEventListener('DOMContentLoaded', (e) => {
	const form = document.getElementById('mainForm');
	const submitButton = document.getElementById('submitBtn');
	const name = document.getElementById('name');
	const surname = document.getElementById('surname');
	const email = document.getElementById('email');
	const state = document.getElementById('state');
	const locality = document.getElementById('locality');
	const ciInput = document.getElementById('ci');
	const checkboxBases = document.getElementById('checkboxBases');
	var dptosLocs = {
		Artigas: ['Artigas', 'Bella Unión'],
		Canelones: ['Canelones', 'Santa Lucía'],
		Montevideo: ['Montevideo'],
		Salto: ['Salto', 'Daymán', 'Arapey'],
	};

	//Mensaje de alerta cuando hay error en algun input del form
	function warningText(element) {
		if (!element.parentNode.querySelector('.warning-text')) {
			let message = '';
			switch (element) {
				case name:
					message = 'Debe tener al menos dos caracteres';
					break;
				case surname:
					message = 'Debe tener al menos dos caracteres';
					break;
				case email:
					message = 'Formato xxx@xxxx.com';
					break;
				case state:
					message = 'Seleccione el Departamento';
					break;
				case locality:
					message = 'Seleccione la Localidad';
					break;
				case ciInput:
					message = 'Formato 1.111.111-1 o sin . ni -';
					break;
				default:
					message = 'Error, vuelva a ingresar los valores';
					break;
			}
			if (element !== checkboxBases) {
				const warning = document.createElement('span');
				warning.classList.add('warning-text');
				warning.innerHTML = message;
				element.parentNode.insertBefore(warning, element);
				return true;
			}
		}
		return false;
	}
	//Agrega borde rojo a los inputs del form cuando hay error
	function redBorder(element) {
		element.style.borderColor = 'red';
		warningText(element);
	}
	//Elimina borde rojo
	function removeRedBorder(element) {
		element.style.removeProperty('border');
	}
	//Validación de email
	function validateEmail(email) {
		const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
		//devuelve true o false
		return re.test(String(email).toLowerCase());
	}
	function validation(element) {
		const theEmail = email.value;
		if (element === checkboxBases && !element.checked) {
			redBorder(element);
			return false;
		} else {
			if (!validateEmail(theEmail) || !element.value || (element.value.length < 2 && element.value <= 0)) {
				redBorder(element);
				return false;
			} else {
				removeRedBorder(element);
				return true;
			}
		}
	}

	function checkForm() {
		if (!checkboxBases.checked) {
			// alert('Por favor acepta las bases y condiciones');
			checkboxBases.focus();
			return false;
		}
		return true;
	}

	/*************************************************************************************************************************/
	/********************** VALIDACION DADA PARA SER UTILIZADA ***************************************************************/
	/*************************************************************************************************************************/
	function validarCedula(ci) {
		//valido para formato (1.111.111-1)
		const checkRegEx = /^(\d).(\d{3}).(\d{3})-(\d)$/g;
		const check = checkRegEx.test(ci);
		//elimino . y -
		if (check) {
			ci = ci.replaceAll('.', '').replace('-', '');
		}
		//Inicializo los coefcientes en el orden correcto
		const arrCoefs = new Array(2, 9, 8, 7, 6, 3, 4, 1);
		let suma = 0;
		//Para el caso en el que la CI tiene menos de 8 digitos
		//calculo cuantos coeficientes no voy a usar
		const difCoef = parseInt(arrCoefs.length - ci.length);
		//recorro cada digito empezando por el de más a la derecha
		//o sea, el digito verificador, el que tiene indice mayor en el array
		for (let i = ci.length - 1; i > -1; i--) {
			//Obtengo el digito correspondiente de la ci recibida
			const dig = ci.substring(i, i + 1);
			//Lo tenía como caracter, lo transformo a int para poder operar
			const digInt = parseInt(dig);
			//Obtengo el coeficiente correspondiente al ésta posición del digito
			const coef = arrCoefs[i + difCoef];
			//Multiplico dígito por coeficiente y lo acumulo a la suma total
			suma = suma + digInt * coef;
		}
		let result = false;
		// si la suma es múltiplo de 10 es una ci válida
		if (suma % 10 === 0 && ci) {
			//Doy formato de cedula (1.111.111-1)
			const regEx = /^(\d)(\d{3})(\d{3})(\d)$/g;
			ci = ci.replace(regEx, '$1.$2.$3-$4');
			ciInput.value = ci;
			//Elimino borde inline
			removeRedBorder(ciInput);
			removeWarningText(ciInput);
			result = true;
		} else {
			redBorder(ciInput);

			result = false;
		}
		return result;
	}

	//Elimino Mensaje de error
	function removeWarningText(element) {
		//Selecciono el elemento con clase .warning-text
		let getSpan = element.parentNode.querySelector('.warning-text');
		if (getSpan) {
			getSpan.remove();
			result = true;
		} else {
			result = false;
		}
		return result;
	}
	function inFocus(element) {
		const hasFocus = element === document.activeElement;
		if (hasFocus) {
			removeRedBorder(element);
			removeWarningText(element);
		}
	}
	// function localityLoader(state) {
	// 	dptosLocs.state.forEach((e) => {
	// 		let createOption = document.createElement('option');
	// 		createOption.innerHTML += `
	// 			${e}`;
	// 		append.appendChild(createOption);
	// 	});
	// }
	function emptyFromDom(empty) {
		while (empty.firstChild) {
			empty.removeChild(empty.firstChild);
		}
	}
	function selectedState(append) {
		emptyFromDom(locality);
		let stateVal = state.value;
		switch (stateVal) {
			case '1':
				dptosLocs.Artigas.forEach((e) => {
					let createOption = document.createElement('option');
					createOption.innerHTML += `
						${e}`;
					append.appendChild(createOption);
				});
				break;
			case '2':
				dptosLocs.Canelones.forEach((e) => {
					let createOption = document.createElement('option');
					createOption.innerHTML += `
						${e}`;
					append.appendChild(createOption);
				});
				break;
			case '3':
				dptosLocs.Montevideo.forEach((e) => {
					let createOption = document.createElement('option');
					createOption.innerHTML += `
						${e}`;
					append.appendChild(createOption);
				});
				break;
			case '4':
				dptosLocs.Salto.forEach((e) => {
					let createOption = document.createElement('option');
					createOption.innerHTML += `
						${e}`;
					append.appendChild(createOption);
				});
				break;
			default:
				dptosLocs.Canelones.forEach((e) => {
					let createOption = document.createElement('option');
					createOption.innerHTML += `
						seleccione departamento`;

					append.appendChild(createOption);
				});
				break;
		}
	}
	function loadStates(append) {
		for (const prop in dptosLocs) {
			let i = parseInt(Object.keys(dptosLocs).indexOf(prop) + 1);
			let createOption = document.createElement('option');
			createOption.innerHTML += `
					${prop}`;
			append.appendChild(createOption);
			createOption.setAttribute('value', i);
		}
	}
	loadStates(state);
	form.addEventListener('click', (e) => {
		let element = e.target;
		// selectedState();
		if (element.id === 'locality') {
			console.log(element.id);
			selectedState(element);
		}
		if (element.type !== 'checkbox') {
			if (element.tagName == 'INPUT' || element.tagName == 'SELECT') {
				e.preventDefault();
				inFocus(element);
			}
		} else {
			inFocus(element);
		}
	});
	submitButton.addEventListener('click', (e) => {
		e.preventDefault();
		validation(name);
		validation(surname);
		validation(email);
		validation(state);
		validation(locality);
		validation(checkboxBases);
		checkForm();
		validarCedula(ci.value);
	});
});
