import React, { useState } from 'react'
import ProfileImage from '../../../public/assets/GymProfileImage.jpg'
import GymBackgroundImage from '../../../public/assets/GymBackgroundImage.jpg'
import toast, { Toaster } from 'react-hot-toast';
import CustomToast from '../../Utils/ToastMessage';

function Profile() {

    const [ProfileData, setProfileData] = useState({
        name: '',
        email: '',
        phone: '',
        dob: '',
        address: '',
        gender: '',
        weight: '',
        height: '',
        emergencycontact: '',
        membershipType: '',
        fitnessGoal: '',
        fitnessLevel: '',
        healthCondition: '',
    });

    const handleinnputchange = () => {
        // Handle input changes here
    }

    const [healthConditions, setHealthConditions] = useState({
        heartDisease: false,
        highBloodPressure: false,
        poorCirculation: false,
        asthma: false,
        chronicBronchitis: false,
        shortnessOfBreath: false,
        jointPainOrStiffness: false,
        backProblems: false,
        recentInjuriesOrSurgeries: false,
        diabetes: false,
        thyroidDisorders: false,
        dizzinessOrVertigo: false,
        poorBalance: false,
        allergiesAffectingExercise: false,
        heatSensitivity: false,
        coldSensitivity: false,
        currentSmoker: false,
        recentQuitter: false,
        pregnantOrPostpartum: false,
        chronicFatigue: false,
        medicationsAffectingExercise: false,
    });

    const handleCheckboxChange = (condition) => {
        setHealthConditions(prev => ({ ...prev, [condition]: !prev[condition] }));
    };

    const CustomCheckbox = ({ label, checked, onChange }) => (
        <label className="flex items-center space-x-3 mb-3 cursor-not-allowed">
            <div className="relative">
                <input
                    type="checkbox"
                    className="hidden"
                    checked={checked}
                    onChange={onChange}
                    disabled
                />
                <div className={`border-2 rounded-md border-[#decfcf] w-6 h-6 flex flex-shrink-0 justify-center items-center mr-2 ${checked ? "bg-[#f4eded] border-none" : "bg-gray-200"
                    }`}>
                    <svg className={`fill-current w-3 h-3 text-blue-500 pointer-events-none ${checked ? "" : "hidden"}`} viewBox="0 0 20 20">
                        <path d="M0 11l2-2 5 5L18 3l2 2L7 18z" />
                    </svg>
                </div>
            </div>
            <span className="text-gray-500 font-medium">{label}</span>
        </label>
    );

    const renderCheckboxGroup = (title, conditions) => (
        <div className='' style={{ marginBottom: '20px' }}>
            <h3 className='font-medium' style={{ fontSize: '1.2em', marginBottom: '10px' }}>{title}</h3>
            {conditions.map(({ key, label }) => (
                <CustomCheckbox
                    key={key}
                    label={label}
                    checked={healthConditions[key]}
                    onChange={() => handleCheckboxChange(key)}
                />
            ))}
        </div>
    );

    // State for weight, SMM, PBF, SPO2, BMI, and RHR data
    const [bodyMetrics, setBodyMetrics] = useState([
        { month: 'January', weight: '75', smm: '30', pbf: '15', spo2: '0', bmi: '0', rhr: '0' }, // Added SPO2, BMI, RHR
        { month: 'February', weight: '74', smm: '31', pbf: '14', spo2: '0', bmi: '0', rhr: '0' },
        { month: 'March', weight: '73', smm: '32', pbf: '13', spo2: '0', bmi: '0', rhr: '0' },
        { month: 'April', weight: '72', smm: '33', pbf: '12', spo2: '0', bmi: '0', rhr: '0' },
        { month: 'May', weight: '71', smm: '34', pbf: '11', spo2: '0', bmi: '0', rhr: '0' },
        { month: 'June', weight: '70', smm: '35', pbf: '10', spo2: '0', bmi: '0', rhr: '0' },
        { month: 'July', weight: '69', smm: '36', pbf: '9', spo2: '0', bmi: '0', rhr: '0' },
        { month: 'August', weight: '68', smm: '37', pbf: '8', spo2: '0', bmi: '0', rhr: '0' },
        { month: 'September', weight: '67', smm: '38', pbf: '7', spo2: '0', bmi: '0', rhr: '0' },
        { month: 'October', weight: '66', smm: '39', pbf: '6', spo2: '0', bmi: '0', rhr: '0' },
        { month: 'November', weight: '65', smm: '40', pbf: '5', spo2: '0', bmi: '0', rhr: '0' },
        { month: 'December', weight: '0', smm: '0', pbf: '0', spo2: '0', bmi: '0', rhr: '0' },
    ]);

    const handleMetricChange = (index, field, value) => {
        const updatedMetrics = [...bodyMetrics];
        updatedMetrics[index][field] = value;
        setBodyMetrics(updatedMetrics);
    };

    function HandleDataSave() {
        // Success notification
        const { showToast } = CustomToast({
            title: "Profile Saved",
            message: "Your profile has been saved successfully",
            type: "success"
        });

        showToast();
    }



    return (
        <div className='pb-[110px]'>

            <div className="relative h-40" style={{ backgroundImage: `url(${GymBackgroundImage})`, backgroundSize: 'contain' }}>
                <div className="h-36 w-36 rounded-full absolute -bottom-12 left-7" style={{ backgroundImage: `url(${ProfileImage})`, backgroundSize: 'cover' }}></div>
            </div>

            <div className="flex flex-col gap-16 p-2 md:p-6">
                {/* personal Details */}
                <div className="flex flex-col w-full mt-32 border border-[#decfcf] px-4 py-7 md:p-7">
                    <div className="relative flex items-center justify-center">
                        <h2 className='pb-6  bg-white z-10 px-4' style={{ fontSize: '1.5em', marginBottom: '20px', textAlign: 'center' }}>Personal Details</h2>
                        <hr className='absolute top-6 z-0 border-1 w-[90%] md:w-[50%] border-[#dc2626]' />
                    </div>
                    <div className="flex flex-wrap gap-4 w-full">
                        <div className=" w-full md:w-[45%] lg:w-[32%] mb-4 pr-2">
                            <label htmlFor="name">Full Name : </label>
                            <input onChange={handleinnputchange} className='flex flex-col border outline-none p-2 w-full bg-gray-200 cursor-not-allowed' type="text" id="name" name='fullname' readOnly />
                        </div>
                        <div className=" w-full md:w-[45%] lg:w-[32%] mb-4 px-2">
                            <label htmlFor="email">Email : </label>
                            <input onChange={handleinnputchange} className='flex flex-col border outline-none p-2 w-full' type="email" id="email" name='email' />
                        </div>
                        <div className=" w-full md:w-[45%] lg:w-[32%] mb-4 pl-2">
                            <label htmlFor="phone">Phone : </label>
                            <input className='flex flex-col border outline-none p-2 w-full bg-gray-200 cursor-not-allowed' type="tel" id="phone" name='phone' readOnly />
                        </div>
                        <div className="w-full md:w-[45%] lg:w-[32%] mb-4 pr-2">
                            <label htmlFor="dob">Date of Birth : </label>
                            <input className='flex flex-col border outline-none p-2 w-full bg-gray-200 cursor-not-allowed' type="date" id="dob" name='dob' readOnly />
                        </div>
                        <div className=" w-full md:w-[45%] lg:w-[32%] mb-4 px-2">
                            <label htmlFor="gender">Gender : </label>
                            <select className='flex flex-col border outline-none p-2 w-full bg-gray-200 cursor-not-allowed' id="gender" name='gender' disabled>
                                <option value="">Select Gender</option>
                                <option value="male">Male</option>
                                <option value="female">Female</option>
                                <option value="other">Other</option>
                            </select>
                        </div>
                        <div className=" w-full md:w-[45%] lg:w-[32%] mb-4 pr-2">
                            <label htmlFor="weight">Weight (kg) : </label>
                            <input className='flex flex-col border outline-none p-2 w-full bg-gray-200 cursor-not-allowed' type="number" id="weight" name='weight' readOnly />
                        </div>
                        <div className=" w-full md:w-[45%] lg:w-[32%] mb-4 pr-2">
                            <label htmlFor="height">Height (cm) : </label>
                            <input className='flex flex-col border outline-none p-2 w-full bg-gray-200 cursor-not-allowed' type="number" id="height" name='height' readOnly />
                        </div>
                        <div className=" w-full md:w-[45%] lg:w-[32%] mb-4 px-2">
                            <label htmlFor="emergency-contact">Emergency Contact : </label>
                            <input className='flex flex-col border outline-none p-2 w-full' type="tel" id="emergency-contact" name='emergencycontact' />
                        </div>
                        <div className=" w-full mb-4 pr-2">
                            <label htmlFor="address">Address : </label>
                            <textarea className='flex flex-col border outline-none p-2 w-full' type="text" id="address" name='address' />
                        </div>

                        <div className=" w-full md:w-[45%] lg:w-[32%] mb-4">
                            <label htmlFor="fitness-goals">Fitness Goals : </label>
                            <select className='flex flex-col border outline-none p-2 w-full bg-gray-200 cursor-not-allowed' id="fitness-goals" name='fitnessGoal' disabled>
                                <option value="">Select Fitness Goal</option>
                                <option value="weight-loss">Weight Loss</option>
                                <option value="muscle-gain">Muscle Gain</option>
                                <option value="endurance">Improve Endurance</option>
                                <option value="flexibility">Increase Flexibility</option>
                                <option value="overall-health">Overall Health Improvement</option>
                            </select>
                        </div>
                        <div className="address w-full md:w-[45%] lg:w-[32%] mb-4">
                            <label htmlFor="fitness-level">Current Fitness Level : </label>
                            <select className='flex flex-col border outline-none p-2 w-full bg-gray-200 cursor-not-allowed' id="fitness-level" name='fitnessLevel' disabled>
                                <option value="">Select Fitness Level</option>
                                <option value="beginner">Beginner</option>
                                <option value="intermediate">Intermediate</option>
                                <option value="advanced">Advanced</option>
                            </select>
                        </div>
                    </div>
                </div>

                {/* body metrics */}
                <div className="w-full mt-8 border border-[#decfcf] p-2 pt-14 md:p-7 relative">
                    <div className="flex flex-col items-center justify-center relative">
                        <h2 className='pb-6 relative bg-white z-10 px-4' style={{ fontSize: '1.5em', marginBottom: '20px', textAlign: 'center' }}>Monthly Body Metrics</h2>
                        <hr className='absolute top-6 z-0 border-1 w-[90%] md:w-[50%] border-[#dc2626]' />
                    </div>
                    <div className="absolute top-2 right-0">
                        <span className={`border-b border-l rounded-bl-lg border-[#decfcf]  py-2 px-4 `}>2024</span>
                    </div>
                    <table className='w-full border-collapse'>
                        <thead className='bg-[#dc2626] text-white'>
                            <tr>
                                <th className='border p-2'>Month</th>
                                <th className='border p-2'>Weight (kg)</th>
                                <th className='border p-2'>SMM (kg)</th>
                                <th className='border p-2'>PBF (%)</th>
                                <th className='border p-2'>SPO2 (%)</th> {/* Added SPO2 header */}
                                <th className='border p-2'>BMI</th> {/* Added BMI header */}
                                <th className='border p-2'>RHR (bpm)</th> {/* Added RHR header */}
                            </tr>
                        </thead>
                        <tbody>
                            {bodyMetrics.map((metric, index) => (
                                <tr key={index} className=''>
                                    <td className=' border p-2'>{metric.month}</td>
                                    <td className='border p-2'>
                                        <span className='flex items-center justify-center border p-1 w-full bg-gray-200 cursor-not-allowed'>{metric.weight}</span>
                                    </td>
                                    <td className='border p-2'>
                                        <span className='flex items-center justify-center border p-1 w-full bg-gray-200 cursor-not-allowed'>{metric.smm}</span>
                                    </td>
                                    <td className='border p-2'>
                                        <span className='flex items-center justify-center border p-1 w-full bg-gray-200 cursor-not-allowed'>{metric.pbf}</span>
                                    </td>
                                    <td className='border p-2'>
                                        <span className='flex items-center justify-center border p-1 w-full bg-gray-200 cursor-not-allowed'>{metric.spo2}</span>
                                    </td>
                                    <td className='border p-2'>
                                        <span className='flex items-center justify-center border p-1 w-full bg-gray-200 cursor-not-allowed'>{metric.bmi}</span>
                                    </td>
                                    <td className='border p-2'>
                                        <span className='flex items-center justify-center border p-1 w-full bg-gray-200 cursor-not-allowed'>{metric.rhr}</span>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {/* health considerations */}
                <div className='border border-[#decfcf] mt-7 py-7 w-full flex flex-col'>
                    <div className="flex flex-col items-center justify-center relative">
                        <h2 className='pb-6 relative bg-white z-10 px-4' style={{ fontSize: '1.5em', marginBottom: '20px', textAlign: 'center' }}>Health Considerations</h2>
                        <hr className='absolute top-6 z-0 border-1 w-[90%] md:w-[50%] border-[#dc2626]' />
                    </div>

                    <div className="w-full p-5 rounded-md grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                        {renderCheckboxGroup("1. Cardiovascular health:", [
                            { key: 'heartDisease', label: 'History of heart disease' },
                            { key: 'highBloodPressure', label: 'High blood pressure' },
                            { key: 'poorCirculation', label: 'Poor circulation' },
                        ])}

                        {renderCheckboxGroup("2. Respiratory health:", [
                            { key: 'asthma', label: 'Asthma' },
                            { key: 'chronicBronchitis', label: 'Chronic bronchitis' },
                            { key: 'shortnessOfBreath', label: 'Shortness of breath' },
                        ])}

                        {renderCheckboxGroup("3. Musculoskeletal issues:", [
                            { key: 'jointPainOrStiffness', label: 'Joint pain or stiffness' },
                            { key: 'backProblems', label: 'Back problems' },
                            { key: 'recentInjuriesOrSurgeries', label: 'Recent injuries or surgeries' },
                        ])}

                        {renderCheckboxGroup("4. Metabolic conditions:", [
                            { key: 'diabetes', label: 'Diabetes' },
                            { key: 'thyroidDisorders', label: 'Thyroid disorders' },
                        ])}

                        {renderCheckboxGroup("5. Balance and coordination:", [
                            { key: 'dizzinessOrVertigo', label: 'Dizziness or vertigo' },
                            { key: 'poorBalance', label: 'Poor balance' },
                        ])}

                        {renderCheckboxGroup("6. Other considerations:", [
                            { key: 'allergiesAffectingExercise', label: 'Allergies that may affect exercise' },
                            { key: 'heatSensitivity', label: 'Heat sensitivity' },
                            { key: 'coldSensitivity', label: 'Cold sensitivity' },
                        ])}

                        {renderCheckboxGroup("7. General health factors:", [
                            { key: 'currentSmoker', label: 'Current smoker' },
                            { key: 'recentQuitter', label: 'Recent quitter (within last 12 months)' },
                            { key: 'pregnantOrPostpartum', label: 'Pregnant or postpartum' },
                            { key: 'chronicFatigue', label: 'Chronic fatigue' },
                            { key: 'medicationsAffectingExercise', label: 'Medications that affect exercise capacity' },
                        ])}

                    </div>
                </div>

                <div className="w-full flex items-center justify-end">
                    <button onClick={HandleDataSave} className='border px-7 py-3 rounded-lg bg-[#dc2626] text-white'>Save Changes</button>
                </div>
            </div>

            <Toaster
                position="top-right"
                reverseOrder={false}
            />

        </div>
    )
}

export default Profile
