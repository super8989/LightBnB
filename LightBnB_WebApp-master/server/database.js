const { Pool } = require('pg');

const properties = require('./json/properties.json');
const users = require('./json/users.json');
const { query } = require('express');

const pool = new Pool({
	user: 'vagrant',
	password: '123',
	host: 'localhost',
	database: 'lightbnb',
});
/// Users

/**
 * Get a single user from the database given their email.
 * @param {String} email The email of the user.
 * @return {Promise<{}>} A promise to the user.
 */

const getUserWithEmail = function (email) {
	let queryString = `SELECT * FROM users WHERE email = $1;`;

	return pool
		.query(queryString, [email])
		.then((res) => res.rows[0])
		.catch((err) => console.error('query error', err.stack));
};
exports.getUserWithEmail = getUserWithEmail;

/**
 * Get a single user from the database given their id.
 * @param {string} id The id of the user.
 * @return {Promise<{}>} A promise to the user.
 */

const getUserWithId = function (id) {
	let queryString = `SELECT *FROM users WHERE id = $1;`;

	return pool
		.query(queryString, [id])
		.then((res) => res.rows[0])
		.catch((err) => console.error('query error', err.stack));
};

exports.getUserWithId = getUserWithId;

/**
 * Add a new user to the database.
 * @param {{name: string, password: string, email: string}} user
 * @return {Promise<{}>} A promise to the user.
 */
// const addUser = function (user) {
// 	const userId = Object.keys(users).length + 1;
// 	user.id = userId;
// 	users[userId] = user;
// 	return Promise.resolve(user);
// };

const addUser = function (user) {
	let queryString = `INSERT INTO users (name, email, password) VALUES ($1, $2, $3) RETURNING *;`;

	return pool
		.query(queryString, [user.name, user.email, user.password])
		.then((res) => res.rows[0])
		.catch((err) => console.error('query error', err.stack));
};

exports.addUser = addUser;

/// Reservations

/**
 * Get all reservations for a single user.
 * @param {string} guest_id The id of the user.
 * @return {Promise<[{}]>} A promise to the reservations.
 */
// const getAllReservations = function (guest_id, limit = 10) {
// 	return getAllProperties(null, 2);
// };

const getAllReservations = function (guest_id, limit = 10) {
	let queryString = `
		SELECT properties.*, reservations.*, AVG(rating) AS average_rating 
		FROM properties
		JOIN reservations ON reservations.property_id = properties.id
		JOIN property_reviews ON property_reviews.property_id = properties.id
		WHERE reservations.guest_id = $1 AND start_date != now()::date AND end_date != now()::date
		GROUP BY properties.id, reservations.id
		ORDER BY start_date
		LIMIT $2;
	`;
	return pool
		.query(queryString, [guest_id, limit])
		.then((res) => res.rows)
		.catch((err) => console.error('query error', err.stack));
};

exports.getAllReservations = getAllReservations;

/// Properties

/**
 * Get all properties.
 * @param {{}} options An object containing query options.
 * @param {*} limit The number of results to return.
 * @return {Promise<[{}]>}  A promise to the properties.
 */
const getAllProperties = function (options, limit = 10) {
	const queryParams = [];

	let queryString = `
		SELECT properties.*, AVG(property_reviews.rating) AS average_rating
		FROM properties 
		JOIN property_reviews ON properties.id = property_id
	`;

	if (options.city) {
		queryParams.push(`%${options.city}%`);
		queryString += `
		WHERE LOWER(city) LIKE LOWER($${queryParams.length})
		`;
	}

	if (options.owner_id) {
		queryParams.push(parseInt(options.owner_id));
		if (queryString.includes(`WHERE`)) queryString += `AND `;
		else queryString += `WHERE `;

		queryString += `
			owner_id = $${queryParams.length}
		`;
	}

	if (options.minimum_price_per_night) {
		const min = parseInt(options.minimum_price_per_night);
		queryParams.push(min);

		if (queryString.includes(`WHERE`)) queryString += `AND `;
		else queryString += `WHERE `;

		queryString += `
		cost_per_night/100 > $${queryParams.length}
		`;
	}

	if (options.maximum_price_per_night) {
		const max = parseInt(options.maximum_price_per_night);
		queryParams.push(max);

		if (queryString.includes(`WHERE`)) queryString += `AND `;
		else queryString += `WHERE `;

		queryString += `
		cost_per_night/100 < $${queryParams.length}
		`;
	}

	queryString += `
		GROUP BY properties.id
	`;

	if (options.minimum_rating) {
		queryParams.push(parseInt(options.minimum_rating));
		queryString += `
		HAVING AVG(property_reviews.rating) >= $${queryParams.length}
		`;
	}

	queryParams.push(limit);

	queryString += `
		ORDER BY cost_per_night
		LIMIT $${queryParams.length};
	`;

	console.log(queryString, queryParams);

	return pool
		.query(queryString, queryParams)
		.then((res) => res.rows)
		.catch((err) => console.error('query error', err.stack));
};

exports.getAllProperties = getAllProperties;

/**
 * Add a property to the database
 * @param {{}} property An object containing all of the property details.
 * @return {Promise<{}>} A promise to the property.
 */
const addProperty = function (property) {
	const propertyId = Object.keys(properties).length + 1;
	property.id = propertyId;
	properties[propertyId] = property;
	return Promise.resolve(property);
};
exports.addProperty = addProperty;
