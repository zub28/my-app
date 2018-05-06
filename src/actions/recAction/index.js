function addRec(key, text) {
    return {
        type: 'ADD_REC',
        payload: text,
        key
    }
}

export default addRec
