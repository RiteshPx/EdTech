import React, { useContext, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaArrowRightLong } from "react-icons/fa6";
import { Highlight } from '../components/core/homePage/Highlight';
import { CTAButton } from "../components/core/homePage/Button";
import Banner from "../assets/images/banner.mp4";
import { CodeBlock } from '../components/core/homePage/CodeBlock';
import imagecode from '../assets/images/codeImage.jpeg';
import { ShowCourses } from '../components/core/homePage/ShowCourses';
import home from '../assets/images/home.avif';
import AuthContext from '../Context/AuthContext';

export const Home = () => {
    const { isAuthenticated, user, loading } = useContext(AuthContext);
    const navigate = useNavigate();

    useEffect(() => {
        if (isAuthenticated) {
            return navigate(`/${user.accountType}`)
        }
    }, [loading]);

    return (
        <div className='bg-primay'>
            <div className='relative w-10/12 min-h-screen mx-auto flex flex-col items-center max-w-maxContent text-white justify-center'>

                {/* section-1 */}
                <div className="flex flex-col md:flex-row items-center justify-center w-full min-h-2.5 md:m-20 p-6 gap-8">
                    {/* Left Content */}
                    <div className="flex flex-col justify-center items-center p-2 md:p-8 rounded-lg w-full md:w-1/2">

                        {/* Heading */}
                        <div className="text-3xl text-center font-semibold  md:mt-6  leading-tight">
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
                            <div className="group mt-8 mx-auto bg-secondary text-textColor font-bold rounded-full transition-transform transform hover:scale-95">
                                <div className="flex justify-center items-center gap-2 group-hover:bg-white py-2 px-4 text-center">
                                    <p>Become an Instructor</p>
                                    <FaArrowRightLong />
                                </div>
                            </div>
                        </Link>
                    </div>

                    {/* Right Content */}
                    <div className="flex justify-center items-center p-6 rounded-lg w-full md:w-1/2">
                        <img
                            src={home}
                            className="max-h-[800px] w-full max-w-80"
                            alt="homePhoto"
                        />
                    </div>
                </div>

                {/* video banner */}
                <div className='shadow-blue-200 my-12 w-10/12'>
                    <video
                        className="w-full"
                        muted
                        autoPlay
                        loop
                        src={Banner}>
                    </video>
                </div>

                {/* code section 1.1 */}
                <div className="w-10/12">
                    {/* <CodeBlock
                        position={"lg:flex-row"}
                        heading={
                            <div>
                                Unlock your
                                <Highlight text="coding potential" />
                            </div>
                        }
                        subheading={
                            "our course is designed and taught by industry experts who have years of experience"
                        }
                        btn1={{
                            btntext: "try it yourself",
                            linkto: "/signup",
                            active: true
                        }}
                        btn2={{
                            btntext: "Learn more",
                            linkto: "/login",
                            active: false
                        }}
                        imagecode={imagecode}
                    />*/}
                    <CodeBlock 
            position={"lg:flex-row-reverse"}
            heading={
              <div className="text-4xl font-semibold">
                Start
                <Highlight text={" Coding in seconds"} />
              </div>
            }
            subheading={
              <p >
                Go ahead, give it a try. Our hands-on learning environment means
                you'll be writing real code from your very first lesson.
              </p>
            }
            ctabtn1={{
              btnText: "Continue Lesson",
              linkto: "/signup",
              active: true,
            }}
            ctabtn2={{
              btnText: "Learn More",
              linkto: "/login",
              active: false,
            }}
            codeblock={`<!DOCTYPE html>
<html>
head><title>Example</title><linkrel="stylesheet"href="styles.css">
/head>
body>
h1><ahref="/">Header</a>
/h1>
nav><ahref="one/">One</a><ahref="two/">Two</a><ahref="three/">Three</a>
/nav>`}
            codeColor={"text-[#ff4500]"}
            backgroundGradient={<div className="codeblock2 absolute"></div>}
          />
                </div>

                {/* section-3 CourseCard show */}
                <ShowCourses />

                {/* section-4 */}
                <div className="w-10/12">
                <CodeBlock 
            position={"lg:flex-row"}
            heading={
              <div className="text-4xl font-semibold">
                Start
                <Highlight text={" Coding in seconds"} />
              </div>
            }
            subheading={
              <p >
                Go ahead, give it a try. Our hands-on learning environment means
                you'll be writing real code from your very first lesson.
              </p>
            }
            ctabtn1={{
              btnText: "Continue Lesson",
              linkto: "/signup",
              active: true,
            }}
            ctabtn2={{
              btnText: "Learn More",
              linkto: "/login",
              active: false,
            }}
            codeblock={`<!DOCTYPE html>
<html>
head><title>Example</title><linkrel="stylesheet"href="styles.css">
/head>
body>
h1><ahref="/">Header</a>
/h1>
nav><ahref="one/">One</a><ahref="two/">Two</a><ahref="three/">Three</a>
/nav>`}
            codeColor={"text-[#ff4500]"}
            backgroundGradient={<div className="codeblock2 absolute"></div>}
          />
                    </div>

             
            </div>
        </div>
    )
}
