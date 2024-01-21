export const validatePatientInput = (patientDetails) => {
    const { name, age, gender, medicalHistory, contactInformation, wardNumber } = patientDetails
    console.log(patientDetails)
    if( !name || !age || !gender || !medicalHistory || !contactInformation  || !wardNumber){
        return false
    }
    return true

}