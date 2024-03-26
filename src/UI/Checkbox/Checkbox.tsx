import React from "react";

import CheckboxOn from "@/icons/CheckboxOn";
import CheckboxOff from "@/icons/CheckboxOff";

import s from './Checkbox.module.scss'
import classNames from "classnames";

interface CheckboxProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    checked: boolean,
    className?: string,
    width?: string,
    height?: string,
};

const Checkbox = ({ checked, onChange, className, width='15px', height='15px', ...props }: CheckboxProps) => {

    return (
        <button className={classNames(s.checkbox, className)} {...props} type="button">
            {checked? (
                <CheckboxOn width={width} height={height}/>
            ) : (
                <CheckboxOff width={width} height={height}/>
            )}
        </button>
    );
}

export default Checkbox;
