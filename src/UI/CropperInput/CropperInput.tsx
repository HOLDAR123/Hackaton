import React, { ChangeEvent, createRef, useEffect, useRef, useState } from "react";
import { Cropper, ReactCropperElement } from "react-cropper";
import classNames from "classnames";
import { useTranslation } from "react-i18next";

import s from './CropperInput.module.scss'
import Button from "../Button";
import Close from "@/icons/Close";
import Toasts from "@/utils/Toasts";


type CropperInputProps = {
    image?: string,
    setImage: (value: Blob | undefined) => void,
    maxFileSize?: number,
    acceptFileTypes?: string[]
};

const defaultSrc =
    "https://raw.githubusercontent.com/roadmanfong/react-cropper/master/example/img/child.jpg"

const defaultAcceptFileTypes = ['image/png', 'image/jpeg', 'image/jpg',]

export const CropperInput = ({ image, setImage, maxFileSize = 5, acceptFileTypes = defaultAcceptFileTypes }: CropperInputProps) => {

    const [inputImage, setInputImage] = useState();
    const [cropData, setCropData] = useState<string>();

    const cropperRef = createRef<ReactCropperElement>();

    const refInput = useRef<HTMLInputElement>(null)

    const { t } = useTranslation()

    const onChange = (e: ChangeEvent<HTMLInputElement>) => {
        e.preventDefault();
        if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0];
            if (file && acceptFileTypes.indexOf(file.type) !== -1) {
                const reader = new FileReader();
                reader.onload = () => {
                    setInputImage(reader.result as any);
                };
                reader.readAsDataURL(file);
            } else {
                Toasts.error(t('cropper.error.type', {types: acceptFileTypes.join(', ')}))
            }
        }
    };

    const getCropData = () => {
        if (typeof cropperRef.current?.cropper !== "undefined") {
            const croppedCanva = cropperRef.current?.cropper.getCroppedCanvas()
            croppedCanva.toBlob((blob) => {
                if (blob && (blob.size / (1024 * 1024) < maxFileSize)) {
                    setImage(blob)
                    setCropData(croppedCanva.toDataURL());
                    setInputImage(undefined)
                    if (refInput.current) {
                        refInput.current.value = ''
                    }
                }
                else Toasts.error(t('cropper.error.size', { size: maxFileSize }))
            })

        }
    };

    const resetInput = () => {
        if (refInput.current) {
            refInput.current.value = ''
            setImage(undefined)
        }
    }

    return (
        <div className={s.cropper}>
            {(inputImage || cropData) && (
                <button className={s.cropper__close} onClick={() => { setCropData(undefined); setInputImage(undefined); resetInput() }}><Close /></button>
            )}
            <input ref={refInput} style={{ display: inputImage ? 'none' : 'block' }} className={s.cropper__input} type="file" accept={acceptFileTypes.toString()} onChange={onChange} />
            {((image || cropData) && !inputImage) && (
                <img className={s.cropper__img} src={cropData ?? image} alt={cropData ? 'Profile img' : 'After crop img'} />
            )}
            {(!inputImage) && (
                <p className={s.cropper__placeholder}>{t('cropper.placeholder')}</p>
            )}
            {inputImage && (
                <Cropper
                    className={s.cropper__crop}
                    ref={cropperRef}
                    style={{ height: '100%', width: "100%" }}
                    initialAspectRatio={1}
                    src={inputImage}
                    viewMode={2}
                    aspectRatio={1}
                    minCropBoxHeight={100}
                    minCropBoxWidth={100}
                    background={true}
                    responsive={true}
                    autoCropArea={1}
                    checkOrientation={false}
                    guides={false}
                />
            )}
            {inputImage && <Button onClick={getCropData} className={s.cropper__save}>{t('cropper.button')}</Button>}
        </div>
    );
};
