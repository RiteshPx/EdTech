import React from 'react'
import { Link } from 'react-router-dom'

export const CTAButton = ({ linkto, children, active }) => {
    return (
        <Link to={linkto}>

            <div className={`text-center text-[13px] px-6 py-3 transition-all rounded-full font-bold hover:scale-95 duration-200 ${active ? "bg-yellow-400 text-black":"bg-slate-600"}`}>
                {children}
            </div>

        </Link>
    )
}
