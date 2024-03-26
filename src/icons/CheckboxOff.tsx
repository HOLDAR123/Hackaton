import React from "react";

export default function CheckboxOff({ ...props }: React.SVGProps<SVGSVGElement>) {
    return (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
            <path opacity="0.5" d="M11.9 22.8C6.94 22.8 4.46 22.8 2.73 21.07C1 19.34 1 16.86 1 11.9C1 6.94 1 4.46 2.73 2.73C4.46 1 6.94 1 11.9 1C16.86 1 19.34 1 21.07 2.73C22.8 4.46 22.8 6.95 22.8 11.9C22.8 16.85 22.8 19.34 21.07 21.07C19.34 22.8 16.85 22.8 11.9 22.8ZM11.9 2.8C7.44 2.8 5.2 2.8 4 4C2.8 5.2 2.8 7.44 2.8 11.9C2.8 16.36 2.8 18.6 4 19.8C5.2 21 7.44 21 11.9 21C16.36 21 18.6 21 19.8 19.8C21 18.6 21 16.36 21 11.9C21 7.44 21 5.2 19.8 4C18.6 2.8 16.36 2.8 11.9 2.8Z" fill="white" />
        </svg>
    );
}

