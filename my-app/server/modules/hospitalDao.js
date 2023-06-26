const database = require("./database.js");

/**
 * Inserts the given hospitalclinic into the database.
 *
 * @param hospitalclinic the hospitalclinic to insert
 */
async function createhospitalclinic(hospitalclinic) {
    const db = await database;

    const result = await db.query(
        `insert into hospitalclinic (hospitalID, hospitalName, hospitalAddress, dean, phone) 
            values(?, ?, ?, ?, ?)`,
        [hospitalclinic.hospitalID, hospitalclinic.hospitalName, hospitalclinic.hospitalAddress, hospitalclinic.dean, hospitalclinic.phone,]);

}

/**
 * Gets the hospitalclinic with the given hospitalAddress from the database.
 * If there is no such hospitalclinic, undefined will be returned.
 *
 * @param {string} hospitalID the hospitalID of the hospitalclinic to get.
 */
async function retrievehospitalclinicByhospitalID(hospitalID) {
    const db = await database;

    const hospitalclinic = await db.query(
        "select * from hospitalclinic where hospitalID = ?",
        [hospitalID]);

    return hospitalclinic[0];
}

/**
 * Gets all emails.
 */
async function retrieveAllhospitalID() {
    const db = await database;

    return await db.query(
        "select * from hospitalclinic ");
}


module.exports = {
    createhospitalclinic,
    retrievehospitalclinicByhospitalID,
    retrieveAllhospitalID,
    /*retrieveTopTendoctor,*/

};