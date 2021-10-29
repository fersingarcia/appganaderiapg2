import firestore from '@react-native-firebase/firestore';

export const createDocumentDB = (collection, data) => {
    var doc = firestore().collection(collection).add(data)
    return doc;
}

export const updateDocumentDb = (colletion, newData, uid) => {
    var doc = firestore().collection(colletion).doc(uid).update({ ...newData })
    return doc;
}