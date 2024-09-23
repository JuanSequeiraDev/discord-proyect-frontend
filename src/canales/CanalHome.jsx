import React, { useEffect, useState } from 'react'
import Sidenav from '../assets/Sidenav'
import { useParams } from 'react-router-dom'
import { getUser } from '../../fetching'

const CanalHome = () => {
    const {canalId}= useParams()


    return (
        <Sidenav/>
    )
}

export default CanalHome