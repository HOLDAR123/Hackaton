import ImageLoader from 'react-imageloader';
import React from "react";
import {Loader} from "@/UI/Loader/Loader";
import s from "./Image.module.scss";
import ErrorImage from "@/icons/ErrorImage";

type Props = {
    url: string
};

export const Image = ({url}: Props) => {
    return (
        <ImageLoader className={s.image} src={url} preloader={() => (<Loader/>)}>
            <div className={s.error}>
                <ErrorImage/>
            </div>
        </ImageLoader>
    );
}

