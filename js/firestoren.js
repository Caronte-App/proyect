const firebaseConfig = {
    apiKey: "AIzaSyBRprg12utVKf2sknJ24-QyTIA4zqSM3Cs",
    authDomain: "caronte-news-53eaa.firebaseapp.com",
    projectId: "caronte-news-53eaa",
    storageBucket: "caronte-news-53eaa.appspot.com",
    messagingSenderId: "871640650537",
    appId: "1:871640650537:web:ce39a209104965ec115d38",
    measurementId: "G-DND9XXFN0X"
  };

firebase.initializeApp(firebaseConfig);

const db = firebase.firestore();


export async function insert(item) {
    try {
      const response = await db.collection("notas").add(item);
      return response;
    } catch (error) {
      throw new Error(error);
    }
  }



export async function getItems(uid) {
    try {
      let items = [];
      const response = await db
        .collection("notas")
        .where("userid", "==", uid)
        .get();
  
      response.forEach(function (item) {
        items.push(item.data());
      });
  
      return items;
    } catch (error) {
      throw new Error(error);
    }
  }
  
  
  export async function update(id, completed) {
    try {
      let docId;
      const doc = await db.collection("notas").where("id", "==", id).get();
      doc.forEach((i) => {
        docId = i.id;
      });
  
      await db.collection("notas").doc(docId).update({ completed: completed });
    } catch (error) {
      throw new Error(error);
    }
  }
  
  
  export { db };
  
