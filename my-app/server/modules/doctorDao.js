const database = require("./database.js");

/**
 * Inserts the given doctor into the database.
 *
 * @param doctor the doctor to insert
 */
async function createdortor(doctor) {
    const db = await database;

    const result = await db.query(
        `insert into doctor (did, account, password, gender, age, office, career, description, picpath) 
            values(?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        [doctor.did, doctor.account, doctor.password, doctor.gender, doctor.age, doctor.office, doctor.career, docter.description, docter.picpath]);

/**
 * Gets the doctor with the given email from the database.
 * If there is no such doctor, undefined will be returned.
 *
 * @param {string} email the email of the doctor to get.
 */
async function retrievedoctorByEmail(email) {
    const db = await database;

    const doctor = await db.query(
        "select * from doctor where email = ?",
        [email]);

    return doctor[0];
}

/**
 * Gets all emails.
 */
async function retrieveAllEmail() {
    const db = await database;

    return await db.query(
        "select * from doctor ");
}


}module.exports = {
    createdortor,
    retrievedoctorByEmail,
    retrieveAllEmail,
    
};