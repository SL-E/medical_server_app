const database = require("./database.js");

/**
 * Inserts the given pharmacy into the database.
 *
 * @param pharmacy the pharmacy to insert
 */
async function createpharmacy(pharmacy) {
    const db = await database;

    const result = await db.query(
        `insert into pharmacy (pharmacyID, pharmacyName, pharmacyAddress, phone) 
            values(?, ?, ?, ?)`,
        [pharmacy.pharmacyID, pharmacy.pharmacyName, pharmacy.pharmacyAddress, pharmacy.phone,]);

}

/**
 * Gets the pharmacy with the given pharmacyAddress from the database.
 * If there is no such pharmacy, undefined will be returned.
 *
 * @param {string} pharmacyID the pharmacyID of the pharmacy to get.
 */
async function retrievepharmacyBypharmacyID(pharmacyID) {
    const db = await database;

    const pharmacy = await db.query(
        "select * from pharmacy where pharmacyID = ?",
        [pharmacyID]);

    return pharmacy[0];
}

/**
 * Gets all emails.
 */
async function retrieveAllpharmacyID() {
    const db = await database;

    return await db.query(
        "select * from pharmacy ");
}


module.exports = {
    createpharmacy,
    retrievepharmacyBypharmacyID,
    retrieveAllpharmacyID,


};