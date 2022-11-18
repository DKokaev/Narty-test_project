import * as fs from 'fs';
// import { injectable } from 'inversify';

// @injectable()
// export class DirestoriesServise {
const diPath = '/home/buba/Рабочий стол/Narty/data'; //Путь к папку комиксов
const images: any = []; // Массив картинок комикса
const dirNames: any = []; // Массив папок комиксов - имя комикса в названии папки
const directories: any = []; // Массив с папками комиксов
const data = (): void => {
	// const dirNames = this.dirNames;
	// const diPath = this.diPath;
	// const directories = this.directories;
	// const images = this.images;

	//  Вывожу пути к папкам в директории с комиксами
	dirNames.push(fs.readdirSync(diPath));
	directories.push(fs.readdirSync(diPath).map((dir) => `${diPath}/${dir}`));
	console.log('вывод путей к папке', directories);

	// Добавляю пути к картинкам в массив с ними
	for (const i in directories[0]) {
		const dir = directories[0][i];
		console.log('Вывод пути к папке с комиксом - ', dir);
		images.push(fs.readdirSync(dir).map((fileName) => `${dir}/${fileName}`));
	}
	console.log('Вывод массива с картинками', images[0]);

	for (const i in images[0]) {
		const dir = images[i];
		// console.log('Вывод содержимого директории с комиксом из папки : ', dir);
		for (const i in dir) {
			const image = dir[i];
			console.log('Вывод отдельного пути к картинке : ' + image);
		}
	}
	return images;
};
export { data, diPath, images, directories, dirNames };
// }
