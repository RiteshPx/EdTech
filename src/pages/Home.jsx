import React from 'react';
import { Link } from 'react-router-dom';
import { FaArrowRightLong } from "react-icons/fa6";
import { Highlight } from '../components/core/homePage/Highlight';
import { CTAButton } from "../components/core/homePage/Button";
import Banner from "../assets/images/banner.webm";
import { CodeBlock } from '../components/core/homePage/CodeBlock';
import imagecode from '../assets/images/codeImage.jpeg';
import { ShowCourses } from '../components/core/homePage/ShowCourses';
import home from '../assets/images/home.avif';

export const Home = () => {
    return (

        <div className=' bg-primay'>
            <div className='relative w-11/12  min-h-screen  mx-auto flex flex-col  items-center max-w-maxContent text-white justify-center '>

                {/* section-1 */}
                <div className="flex flex-col md:flex-row items-center justify-center w-full min-h-2.5 m-20  p-6 gap-8">
                    {/* Left Content */}
                    <div className="flex flex-col justify-center items-center  p-8 rounded-lg  w-full md:w-1/2">
                        

                        {/* Heading */}
                        <div className="text-3xl text-center font-semibold mt-6 leading-tight">
                            Empower your Future with <Highlight text="Coding Skills" />
                        </div>

                        {/* Description */}
                        <p className="mt-4 text-center text-base leading-relaxed text-white w-[80%]">
                            Inclusive learning environments, and practical hands-on projects. It
                            emphasizes building confidence, creativity, and problem-solving skills,
                            making coding an empowering tool for everyone.
                        </p>

                        {/* Call-to-Action Buttons */}
                        <div className="flex justify-center gap-6 mt-6">
                            <CTAButton active={true} linkto={"/signup"}>
                                Learn More
                            </CTAButton>
                            <CTAButton linkto={"/login"}>Book a Demo</CTAButton>
                        </div>

                    {/* Become an Instructor Button */}
                    <Link to={"/signup"}>
                            <div className="group mt-8 mx-auto  bg-secondary text-textColor font-bold rounded-full transition-transform transform hover:scale-95">
                                <div className="flex justify-center items-center gap-2 group-hover:bg-white py-2 px-4 text-center">
                                    <p>Become an Instructor</p>
                                    <FaArrowRightLong />
                                </div>
                            </div>
                        </Link>
                        </div>

                    {/* Right Content */}
                    <div className="flex justify-center items-center  p-6 rounded-lg  w-full md:w-1/2">
                        <img
                            src={home}
                            className="max-h-[800px] w-full max-w-80 "
                            alt="homePhoto"
                        />
                    </div>
                </div>


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
        </div>
    )
}
