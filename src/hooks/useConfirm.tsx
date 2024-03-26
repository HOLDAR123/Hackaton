import {ReactNode, useContext} from 'react';
import {ConfirmContext} from "@/providers/ConfirmProvider";

let resolveCallback: (value: boolean) => void;

function useConfirm() {
    const {isActive, node, setNode, setIsActive} = useContext(ConfirmContext);

    const onConfirm = () => {
        closeConfirm();
        resolveCallback(true);
    };

    const onCancel = () => {
        closeConfirm();
        resolveCallback(false);
    };
    const confirm = (node: ReactNode): Promise<boolean> => {
        setIsActive(true)
        setNode(node)
        return new Promise((res, rej) => {
            resolveCallback = res;
        });
    };

    const closeConfirm = () => {
        setIsActive(false)
    };

    return {confirm, onConfirm, onCancel, isActive, node};
}

export default useConfirm;