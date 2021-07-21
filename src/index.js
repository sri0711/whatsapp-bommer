const path = require('path');
const { app, BrowserWindow, ipcMain, Menu } = require('electron');
const puppeteer = require('puppeteer');

process.env['ELECTRON_DISABLE_SECURITY_WARNINGS'] = 'true';

const wa_attack = async (props) => {
	const nofMesg = props.no;
	const mesg = props.msg;
	const type_wApp = props.type;
	console.log(type_wApp);
	const targetuser = [
		'#pane-side > div:nth-child(1) > div > div > div:nth-child(11) > div > div > div._3OvU8 > div._3vPI2 > div.zoWT4 > span',
		`#pane-side > div:nth-child(1) > div > div > div:nth-child(11) > div > div > div > div._3OvU8 > div._3vPI2 > div.zoWT4 > span`
	];
	const inputFiled =
		'#main > footer > div._2BU3P.tm2tP.copyable-area > div._1SEwr > div > div.p3_M1 > div > div._13NKt.copyable-text.selectable-text';

	// actual programs is begining
	const browser = await puppeteer.launch({ headless: false });
	const page = await browser.newPage();
	await page.goto('https://web.whatsapp.com');
	await page.waitForSelector(`${targetuser[type_wApp]}`);
	const target = await page.$(`${targetuser[type_wApp]}`);
	await target.click();
	await page.waitForSelector(`${inputFiled}`);
	const inp = await page.$(`${inputFiled}`);
	for (let i = 1; i <= nofMesg; i++) {
		await inp.type(`                 ${mesg}`);
		await page.keyboard.press('Enter');
	}
	setTimeout(() => {
		page.close();
		browser.close();
	}, 5000);
};

// initializing the app

const createMainWindow = () => {
	const mainWindow = new BrowserWindow({
		minHeight: 600,
		maxHeight: 600,
		minWidth: 800,
		maxWidth: 800,
		title: 'WhatsApp Bommer',
		minimizable: 0,
		webPreferences: {
			nodeIntegration: true,
			contextIsolation: false
		}
	});

	// mainWindow.webContents.openDevTools();

	// main window file location settings

	mainWindow.loadFile(path.join(__dirname, '../assets/main/index.html'));

	const mainMenu = new Menu();
	Menu.setApplicationMenu(mainMenu);
};

ipcMain.on('data', (e, arg) => {
	const no = arg['no'];
	const msg = arg['message'];
	const type = arg['twApp'];
	inputData = {
		no: no,
		msg: msg,
		type: type
	};
	if (no !== '' || msg !== '') wa_attack(inputData);
});

app.on('ready', createMainWindow);

app.on('window-all-closed', () => {
	if (process.platform === 'darwin') app.quit();
});
