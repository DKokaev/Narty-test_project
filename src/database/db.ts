import mysql from 'mysql';

// Подключаюсь к базе даннных
// ---------------------------------------------
export const connection = mysql.createConnection({
	host: '127.0.0.1',
	user: 'newuser',
	database: 'mydb',
});

const Connect = connection.connect(function (error: Error) {
	if (error) {
		return console.error(error.message);
	} else {
		console.log('YES');
		// getallcomics();
		// comics_for_id();
	}
});

const sql_1 = ' SELECT id, ComicsName, comics.lang, description, ico FROM comics';

export function get_comics(): any {
	return new Promise((resolve, reject) => {
		connection.query(sql_1, async function (err, result) {
			if (err) {
				console.log(err.message);
				reject(err.message);
			}
			// console.log(result);
			return resolve(result);
		});
	});
}

export function get_pages(id: any): any {
	return new Promise((resolve, reject) => {
		const sql_2 = `SELECT DISTINCT pages.id, PageNumber, pages.Lang, imageUrl FROM pages, rel_table INNER JOIN comics ON rel_table.comics_id = ${id} WHERE rel_table.page_id = pages.id`;
		connection.query(sql_2, (err, result) => {
			if (err) {
				console.log(err.message);
				return reject(err);
			}
			// console.log(result);
			// return result;
			return resolve(result);
		});
	});
}

export function get_languages(): Promise<any> {
	return new Promise((resolve, reject) => {
		const sql = `SELECT DISTINCT * FROM languages`;
		connection.query(sql, function (err, result) {
			if (err) {
				console.log(err.message);
				return reject(err);
			}
			// console.log(result);
			return resolve(result);
		});
	});
}

export function get_allPages(): Promise<void> {
	// const lang = 'ru';
	return new Promise((resolve, reject) => {
		const sql = `SELECT * FROM mydb.pages`;
		connection.query(sql, function (err, result) {
			if (err) {
				console.log(err.message);
				return reject(err);
			}
			// console.log(result);
			return resolve(result);
		});
	});
}

export function insert_into_comm(body: any, image: string, dir: string): any {
	return new Promise((resolve, reject) => {
		const sql = `INSERT INTO mydb.comics (id, ComicsName, lang, description, ico) VALUES ("${body.id}", "${body.name}", "${body.lang}", "${body.description}", "${dir}/${image}")`;
		connection.query(sql, function (err, result) {
			if (err) {
				console.log(err.message);
				return reject(err);
			}
			// console.log(result);
			return resolve(result);
		});
		// console.log(body.id);
	});
}

export function insert_into_page(body: any, name: string): any {
	return new Promise((resolve, reject) => {
		// console.log(body);
		const sql = `
		INSERT INTO mydb.pages (pages.id, PageNumber, pages.Lang, imageUrl) VALUES ("${body.id}", "${body.number}", "${body.lang}", "${name}")`;
		connection.query(sql, function (err, result) {
			if (err) {
				console.log(err.message);
				return reject(err);
			}
			// console.log(result);
			connection.query(
				`INSERT INTO mydb.rel_table (id, page_id, comics_id) VALUES ("${body.id}", "${body.id}", "${body.comics_id}")`,
				function (err, result) {
					return resolve(result);
				},
			);
		});
		// console.log(sql);
	});
}

export function dropComics_row(name: any): any {
	console.log(name);
	return new Promise((resolve, reject) => {
		const sql = `DELETE FROM mydb.comics WHERE comics.id = '${name}'`;
		connection.query(sql, function (err, result) {
			if (err) {
				console.log(err.message);
				return reject(err);
			}
			// console.log(result);
			connection.query(
				`DELETE FROM rel_table WHERE rel_table.comics_id = null`,
				function (err, result) {
					if (err) {
						console.log(err.message);
						return reject(err);
					}
					// console.log(result);
					return resolve(result);
				},
			);
		});
	});
}

export function get_comicsForId(id: any): Promise<any> {
	return new Promise((resolve, reject) => {
		const sql = `SELECT * FROM mydb.comics WHERE comics.id = ${id} `;
		connection.query(sql, function (err, result) {
			if (err) {
				console.log(err.message);
				return reject(err.message);
			} else {
				console.log(result);
				return resolve(result);
			}
		});
	});
}
