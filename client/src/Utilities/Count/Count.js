import { useLocalStorage } from "../../Utilities/localStorage/localStorage"; // Local storage hook

function usePhotoCountHook() {
    const [photoCount, setPhotoCount] = useLocalStorage({count: 0}); // The profile image

    const changePhotoCount = () => {
        setPhotoCount({ count: photoCount.count + 1 })
    }

    return { photoCount, changePhotoCount };
}

export default usePhotoCountHook;