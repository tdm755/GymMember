import React from 'react';
import {
    User, Mail, Phone, Calendar,
    Users, Star, Briefcase, Award, X
} from 'lucide-react';
import ProfileImage from '../../../public/assets/ProfileImage.png'

const ViewProfile = ({ setViewProfileModal }) => {
    const profileData = {
        fullName: "Trainer Shailesh",
        email: "trainer@example.com",
        phone: "+1234567890",
        dateOfBirth: "mm/dd/yyyy",
        gender: "Select Gender",
        specialization: "Fitness, Weight Loss",
        experience: "5",
        certifications: "CPT, Nutrition"
    };

    const profileItems = [
        { icon: Mail, label: "Email", value: profileData.email },
        { icon: Phone, label: "Phone", value: profileData.phone },
        { icon: Calendar, label: "Date of Birth", value: profileData.dateOfBirth },
        { icon: Users, label: "Gender", value: profileData.gender },
        { icon: Star, label: "Specialization", value: profileData.specialization },
        // { icon: Briefcase, label: "Experience (years)", value: profileData.experience },
        { icon: Award, label: "Certifications", value: profileData.certifications }
    ];

    return (
        <div className="fixed inset-0 bg-[#00000046] flex items-center justify-center p-4 z-50 ">
            <div className="absolute flex items-center justify-center top-4 left-1 right-1 overflow-y-auto bottom-4">
                <div className="w-full max-w-3xl bg-white shadow-2xl rounded- relative overflow-hidden mt-20 md:mt-0">
                    {/* Header */}
                    <div className="bg-gradient-to-r from-red-600 to-red-700 px-8 py-6 text-white">
                        <button
                            className="absolute right-4 top-4 p-2 rounded-full hover:bg-white/20 transition-colors duration-200"
                            onClick={() => setViewProfileModal(false)}
                        >
                            <X className="h-5 w-5 text-white" />
                        </button>
                        <h2 className="text-2xl font-bold">Trainer Profile</h2>
                    </div>

                    {/* Profile Section */}
                    <div className="p-8">
                        <div className="flex flex-col md:flex-row items-center gap-8 mb-8">
                            <div className="relative">
                                <img
                                    src={ProfileImage}
                                    alt="Trainer"
                                    className="w-32 h-32 rounded-full border-4 border-white shadow-lg"
                                />
                                <div className="absolute -bottom-2 -right-2 bg-red-600 text-white p-2 rounded-full">
                                    <User className="w-4 h-4" />
                                </div>
                            </div>
                            <div className="text-center md:text-left">
                                <h3 className="text-2xl font-bold text-gray-800">{profileData.fullName}</h3>
                                <p className="text-gray-500 mt-1">Professional Fitness Trainer</p>
                                <div className="mt-3 flex gap-2">
                                    <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-red-100 text-red-700">
                                        {profileData.experience} Years Experience
                                    </span>
                                    <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-gray-100 text-gray-700">
                                        Certified Trainer
                                    </span>
                                </div>
                            </div>
                        </div>

                        {/* Profile Details Grid */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {profileItems.map((item, index) => (
                                <div
                                    key={index}
                                    className="group p-4 rounded-xl border border-gray-200 hover:border-red-200 hover:bg-red-50/50 transition-all duration-200"
                                >
                                    <div className="flex items-center gap-4">
                                        <div className="flex-shrink-0 p-2 bg-[#f4eded] rounded-lg group-hover:bg-red-100 transition-colors">
                                            <item.icon className="w-5 h-5 text-red-600" />
                                        </div>
                                        <div>
                                            <p className="text-sm font-medium text-gray-500">{item.label}</p>
                                            <p className="mt-1 font-medium text-gray-900">{item.value}</p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ViewProfile;