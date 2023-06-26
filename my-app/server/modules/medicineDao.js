const database = require("./database.js");

/**
 * Inserts the given medicine into the database.
 *
 * @param medicine the medicine to insert
 */
async function createmedicine(medicine) {
    const db = await database;

    const result = await db.query(
        `insert into medicine (medicineID,	typeID,	medicineName) 
            values(?, ?, ?)`,
        [medicine.medicineID, medicine.typeID, medicine.medicineName]);

}

/**
 * Gets the medicine with the given medicineName from the database.
 * If there is no such medicine, undefined will be returned.
 *
 * @param {string} medicineName the medicineName of the medicine to get.
 */
async function retrievemedicineBymedicineName(medicineName) {
    const db = await database;

    const medicine = await db.query(
        "select * from medicine where medicinename = ?",
        [medicineName]);

    return medicine[0];
}

/**
 * Gets all emails.
 */
async function retrieveAllmedicineName() {
    const db = await database;

    return await db.query(
        "select * from medicine ");
}

module.exports = {
    createmedicine,
    retrievemedicineBymedicineName,
    retrieveAllmedicineName,
    /*retrieveTopTendoctor,*/

};