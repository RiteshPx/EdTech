import React from 'react';
import { Link } from 'react-router-dom';
import { FaArrowRightLong } from "react-icons/fa6";
import { Highlight } from '../components/core/homePage/Highlight';
import { CTAButton } from "../components/core/homePage/Button";
import Banner from "../assets/images/banner.webm";
import { CodeBlock } from '../components/core/homePage/CodeBlock';
import imagecode from '../assets/images/codeImage.jpeg';
import { ShowCourses } from '../components/core/homePage/ShowCourses';

export const Home = () => {
    return (
        <div className='relative w-screen min-h-screen bg-slate-700  mx-auto flex flex-col  items-center max-w-maxContent text-white justify-center '>

            {/* section-1 */}
            <Link to={"/signup"} >
                <div className=' group mt-16 p-1 mx-auto bg-slate-600 font-bold rounded-full transition-all duration-200 hover:scale-95 '>
                    <div className='flex justify-center items-center gap-2 transition-all group-[hover]:bg-white py-1 px-2'>
                        <p>Become a instructor</p>
                        <FaArrowRightLong />

                    </div>
                </div>
            </Link>

            <div className='text-4xl text-center font-semibold mt-4'>
                Empower your Future with <Highlight text="Coding Skills" />
            </div>
            <div className=''>
                <div className='w-[90%] mt-4 text-center'>
                    Inclusive learning environments, and practical hands-on projects. It emphasizes building confidence, creativity, and problem-solving skills, making coding an empowering tool for everyone
                </div>
            </div>

            <div className='flex gap-4 mt-4'>
                <CTAButton active={true} linkto={"/signup"}>Learn more</CTAButton>
                <CTAButton linkto={"/login"}>Book a demo</CTAButton>
            </div >

            {/* video banner */}
            <div className='shadow-blue-200 my-12 '>
                <video
                    muted
                    autoPlay
                    loop
                    src={Banner}>
                </video>
            </div>
            {/* code section 1.1 */}
            <div>
                <CodeBlock
                    position={"lg:flex-row"}
                    heading={
                        <div>
                            Unlock your
                            <Highlight text="coding potential" />
                        </div>
                    }
                    subheading={
                        "our course is designed and taught by ndustry exprerts who have year of exprience"
                    }
                    btn1={
                        {
                            btntext: "try it yourself",
                            linkto: "/signup",
                            active: true
                        }
                    }
                    btn2={
                        {
                            btntext: "Learn more",
                            linkto: "/login",
                            active: false
                        }
                    }
                    imagecode={imagecode}
                />

            </div>
            {/* section-2 */}
        

            {/* section-3 CourseCArd show*/}
            <ShowCourses />


            {/* section-4 */}
            <div>
                <CodeBlock
                    position={"lg:flex-row-reverse"}
                    heading={
                        <div>
                            Unlock your
                            <Highlight text="coding potential" />
                        </div>
                    }
                    subheading={
                        "our course is designed and taught by ndustry exprerts who have year of exprience"
                    }
                    btn1={
                        {
                            btntext: "try it yourself",
                            linkto: "/signup",
                            active: true
                        }
                    }
                    btn2={
                        {
                            btntext: "Learn more",
                            linkto: "/login",
                            active: false
                        }
                    }
                    imagecode={imagecode}
                />

            </div>
        </div >
    )
}
