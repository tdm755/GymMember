import React, { useEffect, useRef, useState } from 'react'
import ProfileImage from '../../public/assets/GymProfileImage.jpg'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser, faEnvelope, faPhone, faBirthdayCake, faVenusMars, faHome, faAmbulance, faIdCard, faCalendarAlt, faMoneyBillWave, faNotesMedical, faDumbbell, faBriefcase, faCertificate, faBook, faMoneyCheckAlt, faBalanceScale, faDollarSign } from '@fortawesome/free-solid-svg-icons'
import Calendar from '../Utils/Calendar'

function MemberDetail() {
    const [formData, setFormData] = useState({
        firstName: 'Arpit',
        lastName: 'Tiwari',
        email: 'tdm75513@gmail.com',
        phone: '+ 91 8090426994',
        dateOfBirth: '16/12/2344',
        gender: 'Male',
        address: `Flat No. 503, Shivaji Park
                  Dr. Ketkar Marg, Opposite Portuguese Church
                  Dadar West, Mumbai - 400028
                  Maharashtra, India`,
        emergencyContact: 'same',
        membershipType: 'Premium',
        startDate: '12/12/2323',
        endDate: '12/12/1212',
        paymentStatus: 'Paid',
        medicalConditions: '',
        fitnessGoals: 'Weight Gain',
        experience: '',
        salary: '2389472',
        Certifications: '',
        BriefBio: '',
        paidamount: 3000,
        balance: 0,
        totalAmount: 0,
    })

    const [showDetail, setShowDetail] = useState(false);
    const [showHistory, setShowHistory] = useState(false);

    const iconMap = {
        firstName: faUser,
        lastName: faUser,
        email: faEnvelope,
        phone: faPhone,
        dateOfBirth: faBirthdayCake,
        gender: faVenusMars,
        address: faHome,
        emergencyContact: faAmbulance,
        membershipType: faIdCard,
        startDate: faCalendarAlt,
        endDate: faCalendarAlt,
        paymentStatus: faMoneyBillWave,
        medicalConditions: faNotesMedical,
        fitnessGoals: faDumbbell,
        experience: faBriefcase,
        salary: faDollarSign,
        Certifications: faCertificate,
        BriefBio: faBook,
        paidamount: faMoneyCheckAlt,
        balance: faBalanceScale,
        totalAmount: faDollarSign,
    }

    const HistoryRef = useRef();
    const [heightOfMemberHistory, setHeightOfMemberHistory] = useState(0);
    
    useEffect(()=>{
        setHeightOfMemberHistory(HistoryRef.current.offsetHeight)
    },[showHistory])

    return (
        <div className='flex flex-col relative items-center justify-center '>
            <div className="bg-white flex flex-col items-center justify-center rounded-lg overflow-hidden p-16 ">
                <div className="flex  items-center justify-center">
                    <div className="flex flex-col items-center justify-center">
                        <div className="border-4 border-white h-32 w-32 rounded-full overflow-hidden shadow-lg" style={{backgroundImage: `url(${ProfileImage})`, backgroundSize: 'cover', backgroundPosition: 'center'}}></div>
                        <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">{formData.firstName} {formData.lastName}</h2>
                        <div className="flex gap-7">
                        <button className='text-[#db3c3c] hover:scale-105' onClick={()=>{setShowDetail(!showDetail); setShowHistory(false)}}>
                            {!showDetail ? (
                                <>                            
                                    <FontAwesomeIcon icon={faUser} className="mr-2" />
                                    View Details
                                </>
                            ) : (
                                <>
                                    <FontAwesomeIcon icon={faUser} className="mr-2" />
                                    Hide Details
                                </>
                            )}
                        </button>
                        <button className='text-[#db3c3c] hover:scale-105' onClick={()=>{setShowHistory(!showHistory); setShowDetail(false)}}>
                            {!showHistory ? (
                                <>                            
                                    <FontAwesomeIcon icon={faUser} className="mr-2" />
                                    History
                                </>
                            ) : (
                                <>
                                    <FontAwesomeIcon icon={faUser} className="mr-2" />
                                    History
                                </>
                            )}
                        </button>
                        </div>
                    </div>
                </div>
                <div className={`mt-16 overflow-hidden border-[#db3c3c] transition-all duration-1000 ease-in-out ${showDetail ? 'w-full h-[900px]' : 'w-0 h-0'}`} id='detail'>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {Object.entries(formData).map(([key, value]) => (
                            <div key={key} className="border border-[#decfcf] p-4 rounded-lg shadow-sm">
                                <span className="text-[#db3c3c] capitalize block mb-1">
                                    <FontAwesomeIcon icon={iconMap[key]} className="mr-2" />
                                    {key.replace(/([A-Z])/g, ' $1').trim()}
                                </span>
                                <span className="text-gray-700">{value.toString()}</span>
                            </div>
                        ))}
                    </div>
                    
                </div>

                <div ref={HistoryRef} className={`Members absolute top-72 flex  z-40 overflow-hidden border-[#db3c3c] transition-all duration-1000 ease-in-out ${showHistory ? ' mt-16' : 'h-0 mt-0'}`} id='detail'>
                    
                    <table>
                        <thead>
                            <tr>
                            <th>sr.no</th>
                            <th>Start Date</th>
                            <th>End Date</th>                            
                            <th>Amount</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>1</td>
                                <td>12/6/2024</td>
                                <td>17/6/2024</td>
                                <td>3,000</td>                                
                            </tr>
                            <tr>
                                <td>1</td>
                                <td>12/6/2024</td>
                                <td>17/6/2024</td>
                                <td>3,000</td>                                
                            </tr>
                            <tr>
                                <td>1</td>
                                <td>12/6/2024</td>
                                <td>17/6/2024</td>
                                <td>3,000</td>                                
                            </tr>
                            <tr>
                                <td>1</td>
                                <td>12/6/2024</td>
                                <td>17/6/2024</td>
                                <td>3,000</td>                                
                            </tr>
                            <tr>
                                <td>1</td>
                                <td>12/6/2024</td>
                                <td>17/6/2024</td>
                                <td>3,000</td>                                
                            </tr>
                        </tbody>
                    </table>
                    
                </div>

            </div>
                <div className={`w-full transition-all duration-500 ease-in-out mb-16 ${showHistory && `mt-[284px]`}`} style={{marginTop : `${heightOfMemberHistory}px`}}>
                   <Calendar />
                </div>
        </div>
    )
}

export default MemberDetail
