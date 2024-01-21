export const wardSpecialization = [
    "General Ward",
    "Emergency Ward",
    "Intensive Care Unit",
    "Cardiac Care Unit",
    "Nursery",
    "Burns Ward"
]

export const validateWardInput = (wardInput) => {
    const { wardNumber, capacity, specialization} = wardInput

    if( !wardNumber || !capacity || !specialization){
        return false
    }
    return true
}