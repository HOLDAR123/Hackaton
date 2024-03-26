import React, {createContext, ReactNode, useState} from "react";
import Confirm from "@/components/Confirm/Confirm";

export type ConfirmContextType = {
    isActive: boolean,
    setIsActive: (val: boolean) => void,
    node: ReactNode
    setNode: (val: ReactNode) => void
};

export const ConfirmContext = createContext<ConfirmContextType>({
    isActive: false,
    node: undefined,
    setIsActive: () => {
    },
    setNode: () => {
    },
});

type ModalProviderProps = {
    children: ReactNode;
}

const ConfirmProvider = ({children}: ModalProviderProps) => {
    const [isActive, setIsActive] = useState<boolean>(false);
    const [node, setNode] = useState<ReactNode>(undefined);

    return (
        <ConfirmContext.Provider value={{isActive, setIsActive, node, setNode}}>
            {children}
            <Confirm/>
        </ConfirmContext.Provider>
    )
}

export default ConfirmProvider;