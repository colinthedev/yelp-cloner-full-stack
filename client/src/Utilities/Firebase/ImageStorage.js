import { ref, getStorage, list } from "firebase/storage";

async function ImageStorage() {
    // Create a reference under which you want to list
    const imageStorage = getStorage();
    const imageRef = ref(imageStorage, 'images/');

    // Fetch the first page of 100.
    const firstPage = await list(imageRef, { maxResults: 100 });
    console.log(firstPage.items)

    // Fetch the second page if there are more elements.
    if (firstPage.nextPageToken) {
        const secondPage = await list(imageRef, {
            maxResults: 100,
            pageToken: firstPage.nextPageToken,
        });
        // processItems(secondPage.items)
        // processPrefixes(secondPage.prefixes)
    }
}

export default ImageStorage;

// // Find all the prefixes and items.
// const testList = () => {
//     listAll(storageRef).then(res => {
//         res.prefixes.forEach(folderRef => {
//             // All the prefixes under storageRef.
//             // You may call listAll() recursively on them.
//             console.log(folderRef)
//             console.log(res, res.prefixes)
//         });
//         res.items.forEach(itemRef => {
//             // All the items under storageRef.
//             console.log(itemRef)
//             console.log(res, res.items)
//         });
//     }).catch(error => console.log(error));

// }
// testList();