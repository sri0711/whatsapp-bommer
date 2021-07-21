const { ipcRenderer } = require('electron');
const $ = require('jquery');
const form = document.getElementById('form');

const wapp = document.getElementById('wapp');
const wbapp = document.getElementById('wbapp');

// actual programming is begins here

form.addEventListener('submit', (e) => {
	e.preventDefault();
	const count = document.getElementById('count').value;
	const msg = document.getElementById('text').value;
	let type_wApp;

	if (wapp.checked) {
		type_wApp = 0;
	}

	if (wbapp.checked) {
		type_wApp = 1;
	}

	if (count === '' || msg === '') {
		if (count === '')
			new Notification('Error', {
				body: 'Please enter the proper count '
			});

		if (msg === '')
			new Notification('Error', { body: 'Please fill the messages ' });
	} else {
		datas = {
			no: count,
			message: msg,
			twApp: type_wApp
		};
		const val = confirm(
			'confirm to send Bulk whatsapp messages to your whatsapp first contact in your whatsapp list'
		);
		if (val == true) ipcRenderer.send('data', datas);
	}
	form.reset();
});

const animeJquery = () => {
	$('.head').slideUp(0);
	$('.body').slideUp(0);
	$('.bottom').slideUp(0);
	$('.head').slideDown(3000);
	$('.body').slideDown(3000);
	$('.bottom').slideDown(3000);
};

animeJquery();
