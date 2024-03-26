import React, {useEffect} from 'react'
import s from './Ripple.module.scss';

interface IRipple {
    y: number,
    x: number,
    size: number,
}

export default function Ripple({duration = 850, color = '#ffffff'}) {
    const [rippleArray, setRippleArray] = React.useState<IRipple[]>([]);

    const addRipple = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        // Координаты контейнера
        const rippleContainer = event.currentTarget.getBoundingClientRect();

        // Выбираем самую длинную сторону
        const size =
            rippleContainer.width > rippleContainer.height
                ? rippleContainer.width
                : rippleContainer.height;

        // Координаты щелчка мыши
        const x = event.pageX - rippleContainer.left - size / 2;
        const y = event.pageY - rippleContainer.top - size / 2;

        // Новая рябь
        const newRipple: IRipple = {
            x,
            y,
            size
        };

        setRippleArray([...rippleArray, newRipple]);
    };

    useEffect(() => {
        let bounce: number | undefined;

        if (rippleArray.length > 0) {
            window.clearTimeout(bounce);

            bounce = window.setTimeout(() => {
                setRippleArray([]);
                window.clearTimeout(bounce);
            }, duration * 4);
        }

        return () => window.clearTimeout(bounce);
    }, [rippleArray.length, duration]);

    return (
        <div onMouseDown={addRipple} className={s.rippleContainer}>
            {(rippleArray && rippleArray.length > 0) &&
                rippleArray.map((ripple, index) => {
                    return (
                        <span
                            key={"span" + index}
                            style={{
                                top: ripple.y,
                                left: ripple.x,
                                width: ripple.size,
                                height: ripple.size,
                                animationDuration: duration + 'ms',
                                background: color
                            }}
                        />
                    );
                })}
        </div>
    )
}