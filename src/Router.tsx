import React from 'react';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import MainLayout from "@/layouts/MainLayout";
import HomePage from "@/pages/HomePage";
import Error404Page from "@/pages/Error404Page";
import SettingsPage from "@/pages/SettingsPage";
import TextEncryptionPage from "@/pages/TextEncryptionPage";
import PasswordGeneratorPage from "@/pages/PasswordGeneratorPage";
import InstructionPage from "@/pages/InstructionPage";
import LoginPage from "@/pages/LoginPage";
import SignUpPage from "@/pages/SignUpPage";
import {useAppSelector} from "@hooks/store";

export default function Router() {
    const isAuth = useAppSelector((state) => state.auth.isAuth)

    return (
        <BrowserRouter>
            <Routes>
                {isAuth ?
                    <Route path="/*" element={<MainLayout/>}>
                        <Route index element={<HomePage/>}/>
                        <Route path="settings" element={<SettingsPage/>}/>
                        <Route path="textencryptor" element={<TextEncryptionPage/>}/>
                        <Route path="settings" element={<SettingsPage/>}/>
                        <Route path="instruction" element={<InstructionPage/>}/>
                        <Route path="passwordgenerator" element={<PasswordGeneratorPage/>}/>
                        <Route path="*" element={<Error404Page/>}/>
                    </Route>
                    :
                    <>
                        <Route path="login" element={<LoginPage/>}/>
                        <Route path="/" element={<SignUpPage/>}/>   </>
                }
            </Routes>
        </BrowserRouter>
    );
}
