import React from 'react';

import s from './UserCard.module.scss'
import Avatar from "@/components/UserCard/components/Avatar";

type UserCardProps = {
  name: string,
  pictureUrl?: string | null,
}

export default function UserCard({name, pictureUrl = null}: UserCardProps) {
  return (
    <div className={s.userCard}>
      <div className={s.userCard__picture}>
        <Avatar name={name} picture={pictureUrl}/>
      </div>
      <div className={s.userCard__name}>{name}</div>
    </div>
  )
}