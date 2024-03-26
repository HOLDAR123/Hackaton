import React, {ReactNode} from 'react';
import s from './SettingsSection.module.scss';

type SettingsSectionProps = {
    children: ReactNode,
    title: string
}
export default function SettingsSection({title, children}: SettingsSectionProps) {
    return (
        <div className={s.settingsSection}>
            <div className={s.settingsSection__title}>{title}</div>
            <div className={s.settingsSection__content}>
                {children}
            </div>
        </div>
    );
}
