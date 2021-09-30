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
	const ciInput = document.getElementById('ci');
	const checkboxBases = document.getElementById('checkboxBases');
	function validation(element) {
		if (!element.value || element.value.length < 2 || !element.checked) {
			element.style.borderColor = 'red';
		} else {
			element.style.removeProperty('border');
		}
	}

	function checkForm() {
		if (!checkboxBases.checked) {
			alert('Por favor acepta las bases y condiciones');
			checkboxBases.focus();
			return false;
		}
		return true;
	}
	function validarCedula(ci) {
		//valido para formato (1.111.111-1)
		const checkRegEx = /^(\d).(\d{3}).(\d{3})-(\d)$/g;
		const check = checkRegEx.test(ci);
		//elimino . y -
		if (check) {
			ci = ci.replaceAll('.', '').replace('-', '');
		}

		//Inicializo los coefcientes en el orden correcto
		var arrCoefs = new Array(2, 9, 8, 7, 6, 3, 4, 1);
		var suma = 0;
		//Para el caso en el que la CI tiene menos de 8 digitos
		//calculo cuantos coeficientes no voy a usar
		var difCoef = parseInt(arrCoefs.length - ci.length);
		//recorro cada digito empezando por el de más a la derecha
		//o sea, el digito verificador, el que tiene indice mayor en el array
		for (var i = ci.length - 1; i > -1; i--) {
			//Obtengo el digito correspondiente de la ci recibida
			var dig = ci.substring(i, i + 1);
			//Lo tenía como caracter, lo transformo a int para poder operar
			var digInt = parseInt(dig);
			//Obtengo el coeficiente correspondiente al ésta posición del digito
			var coef = arrCoefs[i + difCoef];
			//Multiplico dígito por coeficiente y lo acumulo a la suma total
			suma = suma + digInt * coef;
		}
		var result = false;
		// si la suma es múltiplo de 10 es una ci válida
		if (suma % 10 === 0 && ci) {
			//Doy formato de cedula (1.111.111-1)
			const regEx = /^(\d)(\d{3})(\d{3})(\d)$/g;
			ci = ci.replace(regEx, '$1.$2.$3-$4');
			ciInput.value = ci;
			//Elimino borde inline
			ciInput.style.removeProperty('border');
			result = true;
		} else {
			ciInput.style.borderColor = 'red';
		}

		return result;
	}

	function inFocus(element) {
		const hasFocus = element === document.activeElement;
		if (hasFocus) {
			element.style.removeProperty('border');
		}
	}
	form.addEventListener('click', (e) => {
		let element = e.target;

		if (element.tagName == 'INPUT' && element.type !== 'checkbox') {
			e.preventDefault();
			inFocus(element);
		}
	});
	submitButton.addEventListener('click', (e) => {
		e.preventDefault();
		validation(name);
		validation(surname);
		validation(email);
		validation(checkboxBases);
		checkForm();
		validarCedula(ci.value);
	});
});
