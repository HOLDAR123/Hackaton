import {createContext, ReactNode, useCallback, useEffect, useState} from "react";

export type ModalContextType = {
    modals: ModalsActiveType[],
    open: (val: ModalsActiveType) => void,
    close: (val: ModalsActiveType) => void,
    closeAll: () => void,
};

export type ModalsActiveType = {
    key: string
    link?: string
}

export const ModalContext = createContext<ModalContextType>({
    modals: [],
    open: () => {
    },
    close: () => {
    },
    closeAll: () => {
    }
});

type ModalProviderProps = {
    children: ReactNode;
}

const ModalProvider = ({children}: ModalProviderProps) => {
    const [modals, setModals] = useState<ModalsActiveType[]>([]);

    const open = useCallback((modal: ModalsActiveType) => {
        const modalIndex = modals.findIndex(m => m.key === modal.key);
        if (modalIndex === -1) {
            if (modals.length <= 0 || modals.find(m => m.key === modal.link)) {
                if (modal.link) {
                    if (modals.find(m => m.key === modal.link)) {
                        setModals((prevState) => {
                            return [...prevState, modal]
                        })
                    }
                } else {
                    setModals((prevState) => {
                        return [...prevState, modal]
                    })
                }
            } else {
                if (!modal.link) {
                    setModals(() => {
                        return [modal]
                    })
                }
            }
        }
    }, [modals])

    const close = (modal: ModalsActiveType) => {
        const modalIndex = modals.findIndex(m => m.key === modal.key);
        if (modalIndex !== -1) {
            const newModals: ModalsActiveType[] = [...modals]

            for (let i = 0; i < modals.length; i++) {
                const linkModal = modals[i]
                if (linkModal.link === modal.key) {
                    newModals.splice(i, 1)
                }
            }

            newModals.splice(modalIndex, 1)
            setModals(() => (newModals))
        }
    }

    const closeAll = () => {
        setModals([])
    }

    useEffect(() => {
        console.log("modals", modals)
    }, [modals])

    return (
        <ModalContext.Provider value={{modals, open, close, closeAll}}>
            {children}
        </ModalContext.Provider>
    )
}

export default ModalProvider;