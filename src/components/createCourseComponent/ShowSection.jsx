import React, { useState } from 'react'
import { CreateSubSection } from './CreateSubSection';


export const ShowSection = ({ data, index }) => {
    const [subSectionModal, setSubSectionModal] = useState(false);
    const [subSection, setSubSection] = useState(data.subSection || [])

    return (
        <div className="w-full max-w-3xl bg-gray-100 p-8 rounded-lg shadow-2xl m-2">
            <div key={index}>
                <div className="mb-4">
                    <h2 className="text-xl font-semibold text-gray-800">
                        Section: {index + 1}
                    </h2>
                    <p className="text-xl font-semibold text-gray-800">{data.sectionName}</p>
                </div>

                {subSection?.length ? (
                    <div className="space-y-4">
                        {subSection.map((data, index) => (
                            <div
                                key={index}
                                className="w-full bg-gray-50 p-6 rounded-lg shadow-md"
                            >
                                <p className="text-md font-medium text-gray-700">
                                    Subsection {index + 1}: {data.title}
                                </p>


                                <div className="mt-4 shadow-md border border-gray-300 rounded-lg overflow-hidden">
                                    <video
                                        className="w-full h-auto"
                                        loop
                                        src={data.videoUrl}
                                        controls
                                    ></video>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <p className="text-gray-500">No subsections available.</p>
                )}

                {!subSectionModal && 
                <div className="flex justify-end mt-4">
                    <button
                        className="bg-blue-500 text-white m-2 rounded-lg px-4 py-2 hover:bg-blue-600"
                        onClick={() => setSubSectionModal(true)}
                    >
                        Create Subsection
                    </button>
                </div>
                }
            </div>

            {subSectionModal && (
                <CreateSubSection
                    setSubSectionModal={setSubSectionModal}
                    sectionId={data._id}
                    setSubSection={setSubSection}
                />
            )}
        </div>
    )

}
