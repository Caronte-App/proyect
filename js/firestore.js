let firebaseConfig = {
  apiKey: "AIzaSyBRprg12utVKf2sknJ24-QyTIA4zqSM3Cs",
  authDomain: "caronte-news-53eaa.firebaseapp.com",
  projectId: "caronte-news-53eaa",
  storageBucket: "caronte-news-53eaa.appspot.com",
  messagingSenderId: "871640650537",
  appId: "1:871640650537:web:c1abaa2269aa7b94115d38",
  measurementId: "G-H3MVF5CYJL",
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const db = firebase.firestore();

export async function insert(item) {
  try {
    const response = await db.collection("blogs").add(item);
    return response;
  } catch (error) {
    throw new Error(error);
  }
}

export async function getItems(uid) {
  try {
    let items = [];
    const response = await db
      .collection("blogs")
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
    const doc = await db.collection("blogs").where("id", "==", id).get();
    doc.forEach((i) => {
      docId = i.id;
    });

    await db.collection("blogs").doc(docId).update({ completed: completed });
  } catch (error) {
    throw new Error(error);
  }
}


export { db };
