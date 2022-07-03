const mysql = require('mysql');
const { NULL } = require('mysql/lib/protocol/constants/types');
const pool = require('../db/dbConnection');


/*
|----------------------------------------------------------------------
| Home - Display all quotes randomly - index.ejs
|----------------------------------------------------------------------
*/

const resultsPerPageIndex = 20;

exports.index = (req, res) => {
    
try {

	pool.getConnection((err, connection) => {
		
		//if (err) throw err;
		if (err) { console.log(err); }

		let sql = 'SELECT * FROM quotes;';

			connection.query(sql, (err, result) => {
				// if(err) throw err;
				if (err) { console.log(err); }
				//console.log('Connected as ID: ' + connection.threadId);
				const numOfResults = result.length;
				const numberOfPages = Math.ceil(numOfResults / resultsPerPageIndex);
				let page = req.query.page ? Number(req.query.page) : 1;
				if (page > numberOfPages) {
					res.redirect('/?page='+encodeURIComponent(numberOfPages));
				} else if (page < 1) {
					res.redirect('/?page='+encodeURIComponent('1'));
				}

		const startingLimit = (page - 1) * resultsPerPageIndex;
		
		let sql = `SELECT quotes.id, quotes.added, quotes.votes, authors.author_id, authors.image, authors.fname, authors.lname, teams.name, quotes.summary, quotes.quote, quotes.votes FROM quotes INNER JOIN teams ON quotes.team_id=teams.id INNER JOIN authors ON quotes.author_id=authors.author_id ORDER BY RAND() DESC LIMIT ${startingLimit},${resultsPerPageIndex}`;
			
			connection.query(sql, (err, result) => {
				// if(err) throw err;
				if (err) { console.log(err); }
				//console.log('Connected as ID2: ' + connection.threadId);
				let iterator = (page - 5) < 1 ? 1 : page - 5;
				let endingLink = (iterator + 9) <= numberOfPages ? (iterator + 9) : page + (numberOfPages - page);
				if (endingLink < (page + 4)) {
					//iterator -= (page + 4) - numberOfPages;
					iterator -= (page) - numberOfPages;
				}
				connection.release(); // Release connection?
				res.render('index', { data: result, page, iterator, endingLink, numberOfPages });
			});
    	});
	});

} catch (err) {
	console.log(err);
}

};

/*
|----------------------------------------------------------------------
| New - Display all quotes by newest- new.ejs
|----------------------------------------------------------------------
*/

const resultsPerPageNew = 20;

exports.new = (req, res) => {
    
try {

	pool.getConnection((err, connection) => {
		
		//if (err) throw err;
		if (err) { console.log(err); }

		let sql = 'SELECT * FROM quotes;';

			connection.query(sql, (err, result) => {
				// if(err) throw err;
				if (err) { console.log(err); }
				//console.log('Connected as ID: ' + connection.threadId);
				const numOfResults = result.length;
				const numberOfPages = Math.ceil(numOfResults / resultsPerPageNew);
				let page = req.query.page ? Number(req.query.page) : 1;
				if (page > numberOfPages) {
					res.redirect('/?page='+encodeURIComponent(numberOfPages));
				} else if (page < 1) {
					res.redirect('/?page='+encodeURIComponent('1'));
				}

		const startingLimit = (page - 1) * resultsPerPageIndex;
		
		let sql = `SELECT quotes.id, quotes.added, quotes.votes, authors.author_id, authors.image, authors.fname, authors.lname, teams.name, quotes.summary, quotes.quote, quotes.votes FROM quotes INNER JOIN teams ON quotes.team_id=teams.id INNER JOIN authors ON quotes.author_id=authors.author_id ORDER BY quotes.added DESC LIMIT ${startingLimit},${resultsPerPageNew}`;

			connection.query(sql, (err, result) => {
				// if(err) throw err;
				if (err) { console.log(err); }
				//console.log('Connected as ID2: ' + connection.threadId);
				let iterator = (page - 5) < 1 ? 1 : page - 5;
				let endingLink = (iterator + 9) <= numberOfPages ? (iterator + 9) : page + (numberOfPages - page);
				if (endingLink < (page + 4)) {
					//iterator -= (page + 4) - numberOfPages;
					iterator -= (page) - numberOfPages;
				}
				connection.release(); // Release connection?
				res.render('new', { data: result, page, iterator, endingLink, numberOfPages });
			});
    	});
	});

} catch (err) {
	console.log(err);
}

};

/*
|----------------------------------------------------------------------
| Display all authors - authors.ejs
|----------------------------------------------------------------------
*/

exports.authors = (req, res) => {
	pool.getConnection((err, connection) => {
		if (err) throw err;
		//console.log('connected as id ' + connection.threadId);
		const sql = 'SELECT * FROM authors ORDER BY lname ASC;';
		connection.query(sql, (err, rows) => {
			connection.release();
			if (!err) {
				res.render('authors', { data: rows, title: 'Authors' });
			} else {
				res.render('error', { err: err, sql: sql, title: 'Error' });
			}
		});
	});
};

/*
|----------------------------------------------------------------------
| Author By ID - author.ejs
|----------------------------------------------------------------------
*/

exports.author = (req, res) => {
	pool.getConnection((err, connection) => {
		if (err) throw err;
		//console.log('connected as id ' + connection.threadId);
		const sql = 'SELECT quotes.quote, authors.author_id, authors.fname, authors.lname, authors.image FROM quotes INNER JOIN authors ON quotes.author_id=authors.author_id WHERE quotes.author_id = ?;';
		connection.query(sql, [req.params.id], (err, rows) => {
			connection.release();
			if (!err) {
				res.render('author', { data: rows, title: 'Author' });
			} else {
				res.render('error', { err: err, sql: sql, title: 'Error' });
			}
		});
	});
};

/*
|----------------------------------------------------------------------
| Display all teams - teams.ejs
|----------------------------------------------------------------------
*/

exports.teams = (req, res) => {
	pool.getConnection((err, connection) => {
		if (err) throw err;
		//console.log('connected as id ' + connection.threadId);
		const sql = 'SELECT * FROM teams ORDER BY name ASC;';
		connection.query(sql, (err, rows) => {
			connection.release();
			if (!err) {
				res.render('teams', { data: rows, title: 'Teams' });
			} else {
				res.render('error', { err: err, sql: sql, title: 'Error' });
			}
		});
	});
};

/*
|----------------------------------------------------------------------
| Team By ID - team.ejs
|----------------------------------------------------------------------
*/

exports.team = (req, res) => {
	pool.getConnection((err, connection) => {
		if (err) throw err;
		//console.log('connected as id ' + connection.threadId);
		const sql =
			'SELECT quotes.quote, quotes.team_id, teams.id, teams.name, authors.author_id, authors.fname, authors.lname, authors.image FROM quotes INNER JOIN teams ON quotes.team_id = teams.id INNER JOIN authors ON quotes.author_id = authors.author_id WHERE teams.id = ?;';
		connection.query(sql, [req.params.id], (err, rows) => {
			connection.release();
			if (!err) {
				res.render('team', { data: rows, title: 'Team' });
			} else {
				res.render('error', { err: err, sql: sql, title: 'Error' });
			}
		});
	});
};

/*
|----------------------------------------------------------------------
| Error
|----------------------------------------------------------------------
*/
exports.error = (req, res) => {
	res.render('error', { errors: errors, title: 'Error' });
};
