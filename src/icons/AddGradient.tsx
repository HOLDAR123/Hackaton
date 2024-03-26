import React from "react";

// eslint-disable-next-line react/require-default-props
export default function AddGradient(props: React.SVGProps<SVGSVGElement>) {
    return (
        <svg width="37" height="37" viewBox="0 0 37 37" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
            <path opacity="0.5"
                  d="M33.9167 18.4999C33.9167 27.0142 27.0144 33.9166 18.5 33.9166C9.98565 33.9166 3.08337 27.0142 3.08337 18.4999C3.08337 9.98552 9.98565 3.08325 18.5 3.08325C27.0144 3.08325 33.9167 9.98552 33.9167 18.4999Z"
                  fill="url(#paint0_linear_2_9028)" fill-opacity="0.6"/>
            <path
                d="M19.6562 13.875C19.6562 13.2364 19.1386 12.7188 18.5 12.7188C17.8614 12.7188 17.3438 13.2364 17.3438 13.875V17.3438H13.875C13.2364 17.3438 12.7188 17.8614 12.7188 18.5C12.7188 19.1386 13.2364 19.6562 13.875 19.6562H17.3438V23.125C17.3438 23.7636 17.8614 24.2812 18.5 24.2812C19.1386 24.2812 19.6562 23.7636 19.6562 23.125V19.6562H23.125C23.7636 19.6562 24.2812 19.1386 24.2812 18.5C24.2812 17.8614 23.7636 17.3438 23.125 17.3438H19.6562V13.875Z"
                fill="white"/>
            <defs>
                <linearGradient id="paint0_linear_2_9028" x1="3.08337" y1="3.08325" x2="33.4424" y2="34.3767"
                                gradientUnits="userSpaceOnUse">
                    <stop stop-color="#5E3FD9"/>
                    <stop offset="0.529392" stop-color="#3E3A7B"/>
                    <stop offset="1" stop-color="#3A3372"/>
                </linearGradient>
            </defs>
        </svg>


    );
}
