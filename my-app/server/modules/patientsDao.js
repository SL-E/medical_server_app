const database = require("./database.js");

/**
 * Inserts the given patient into the database.
 *
 * @param patient the patient to insert
 */
async function createPatient(patient) {
    const db = await database;

    const result = await db.query(
        `insert into patient (pid, account, email, phone, password, gender, age, firstname, lastname) 
            values(?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        [patient.pid, patient.account, patient.email, patient.phone, patient.password, patient.gender, patient.age, patient.firstname, patient.lastname]);

}

/**
 * Gets the patient with the given email from the database.
 * If there is no such patient, undefined will be returned.
 *
 * @param {string} email the email of the patient to get.
 */
async function retrievePatientByEmail(email) {
    const db = await database;

    const patient = await db.query(
        "select * from patient where email = ?",
        [email]);

    return patient[0];
}

/**
 * Gets all emails.
 */
async function retrieveAllEmail() {
    const db = await database;

    return await db.query(
        "select * from patient ");
}

/**
 * Gets all doctor with the given doctor from the database.
 *
 * @param {string} hospitalclinic the hospitalclinic to get.
 */
async function retrieveAlldoctorByHospitalclinic(hospitalclinic) {
    const db = await database;

    const doctor = await db.query(
        "select * from doctor where hospitalclinic = ?",
        [hospitalclinic]);

    return doctor;
}

/**
 * Gets top ten doctor order by the stars  from the database.


async function retrieveTopTendoctor() {
    const db = await database;
    const doctor = await db.query(
        "select * from doctor order by stars desc"
    );
    console.log(doctor.slice(0, 10));
    return doctor.slice(0, 10);
}

*/

module.exports = {
    createPatient,
    retrievePatientByEmail,
    retrieveAllEmail,
    retrieveAlldoctorByHospitalclinic,
    /*retrieveTopTendoctor,*/

};