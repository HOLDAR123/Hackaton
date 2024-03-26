import React from "react";
import './i18n/config'

import {Provider} from "react-redux";

import store from "./store";
import Router from "./Router";

import LangInitializer from "@/components/helpers/LangInitializer";
import Close from "@/icons/Close";
import {ToastContainer} from "react-toastify";
import {QueryClient, QueryClientProvider} from "@tanstack/react-query";
import ModalProvider from "./providers/ModalProvider";
import ConfirmProvider from "@/providers/ConfirmProvider";

export const queryClient = new QueryClient()

function App() {
    return (
        <QueryClientProvider client={queryClient}>
            <Provider store={store}>
                <ConfirmProvider>
                    <LangInitializer/>
                    <ModalProvider>
                        <Router/>
                    </ModalProvider>
                    <ToastContainer
                        closeButton={(props) => (<div className="Toastify__close-button" {...props}><Close/></div>)}/>
                    {/*<ReactQueryDevtools/>*/}
                </ConfirmProvider>
            </Provider>
        </QueryClientProvider>
    );
}

export default App;
