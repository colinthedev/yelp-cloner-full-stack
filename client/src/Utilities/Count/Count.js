import { useLocalStorage } from "../../Utilities/localStorage/localStorage"; // Local storage hook

function useOrderCountHook() {
    const [orderCount, setOrderCount] = useLocalStorage({count: 0}); // The profile image

    const changeOrderCount = () => {
        setOrderCount({ count: orderCount.count + 1 })
    }
    return { orderCount, changeOrderCount };
}

export default useOrderCountHook;