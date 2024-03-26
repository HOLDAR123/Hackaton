import {Bounce, toast, ToastOptions} from "react-toastify";
import Success from "@/icons/Success";
import Error from "@/icons/Error";
import React from "react";

class Toasts {
    private defaultSettings: ToastOptions = {
        position: "bottom-right",
        autoClose: 5000,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: "colored",
        transition: Bounce,
    }

    success(text: string) {
        toast.success(text, {
            ...this.defaultSettings,
            icon: <Success/>
        });
    }

    error(text: string) {
        toast.error(text, {
            ...this.defaultSettings,
            icon: <Error/>
        });
    }

    warn(text: string) {
        toast.warn(text, {
            ...this.defaultSettings,
            icon: <Error/>
        });
    }

    info(text: string) {
        toast.info(text, {
            ...this.defaultSettings,
            icon: undefined
        });
    }
}

export default new Toasts();