import React from 'react';
// import { Highlight } from './Highlight';
import { CTAButton } from './Button';

export const CodeBlock = ({ position, heading, subheading, btn1, btn2, backgroundgradient, imagecode }) => {
    return (
        <div className={`flex ${position} my-20 justify-between gap-7 flex-col md:flex-row`}>

            {/* section:1 */}
            <div className='w-full md:w-[50%] flex flex-col gap-8 text-2xl'>
                {heading}
                <div className='bold'>
                    {subheading}
                </div>

                <div className='flex gap-5 mt-3'>
                    <CTAButton
                        linkto={btn1.linkto}
                        active={btn1.active}
                    >
                        {btn1.btntext}
                    </CTAButton>

                    <CTAButton
                        linkto={btn2.linkto}
                        active={btn2.active}
                    >
                        {btn2.btntext}
                    </CTAButton>
                </div>
            </div>

            <div className='w-full md:w-auto'></div>
            <div >
                <img src={imagecode} alt='code' className='w-66 h-66'></img>
            </div>
        </div>
    )
}
