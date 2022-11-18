// import { inject, injectable } from 'inversify';
import mysql from 'mysql';
// import { TYPES } from '../types';
// import { DirestoriesServise } from './directories_service';
import { data, diPath, images, directories, dirNames } from './directories_service';

// @injectable()
// export class DatabaseConnection {
// constructor(@inject(TYPES.DirestoriesServise) private directoriesService: DirestoriesServise) {}
export function DbConnections(): void {
	const connection = mysql.createConnection({
		host: 'localhost',
		user: 'root',
		password: '',
		database: 'Narty',
	});
	// this.directoriesService.data();
	// const image = this.directoriesService.data();
	data();
	const Connect = connection.connect(function (error: Error) {
		if (error) {
			return console.error(error.message);
		} else {
			console.log('YES');
			// create();
			// add();
			// comics();
			// addAdminUser();
			addComicsDir();
		}
	});

	const actions_dict = {
		users:
			'CREATE TABLE Narty (id INT AUTO_INCREMENT PRIMARY KEY, name VARCHAR (255) ,email  VARCHAR (255))',
		comics: `CREATE TABLE Comics (id INT AUTO_INCREMENT PRIMARY KEY, ComicsName VARCHAR (255), ComicsDir VARCHAR (255),Pages  VARCHAR(255))`,
		// add: ` INSERT INTO Comics (data) VALUE ("${image}")`,
	};

	const create = async (): Promise<void> => {
		const sql = actions_dict.users;
		connection.query(sql, function (err, result) {
			if (err) {
				console.log(err.message);
			}
			console.log('YES TABLE');
		});
	};

	const comics = (): void => {
		connection.query(actions_dict.comics, function (err, result) {
			if (err) {
				console.log(err.message);
			}
			console.log('YES TABLE');
		});
	};

	const admin = {
		user: 'root',
		email: 'sksksksks',
	};

	const addAdminUser = (): void => {
		connection.query(
			`INSERT INTO Narty (name, email) VALUES ("${admin.user}", "${admin.email}")`,
			function (err, result) {
				if (err) {
					console.log(err.message);
				}
				console.log('YES Admin');
			},
		);
	};

	const addComicsDir = (): void => {
		for (const i in dirNames[0]) {
			console.log(dirNames[0][i], i);
			// connection.query(
			// `INSERT INTO Comics (ComicsName) VALUE ("${dirNames[0][i]}")`,
			connection.query('DROP TABLE Comics', function (err, result) {
				if (err) {
					console.log(err.message);
				}
				// console.log('YES Admin');
			});
		}
	};

	// const add = (): void => {
	// console.log('images :', images);
	// const add = ` INSERT INTO Comics (data) VALUE ("${dir[i]}")`;
	// connection.query(add);
	// };
	// const add = ` INSERT INTO Comics (data) VALUE ("${image}")`;
	// connection.query(add, function (err, result) {
	// 	if (err) {
	// 		console.log(err.message);
	// 	}
	// console.log('YES TABLE');
	// });
}
// }
