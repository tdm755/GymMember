import React, { useState } from 'react'
import ProfileImage from '../../../public/assets/GymProfileImage.jpg'
import GymBackgroundImage from '../../../public/assets/GymBackgroundImage.jpg'

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

    }

    const [healthConditions, setHealthConditions] = useState({
        // 1. Cardiovascular health
        heartDisease: false,
        highBloodPressure: false,
        poorCirculation: false,
        // 2. Respiratory health
        asthma: false,
        chronicBronchitis: false,
        shortnessOfBreath: false,
        // 3. Musculoskeletal issues
        jointPainOrStiffness: false,
        backProblems: false,
        recentInjuriesOrSurgeries: false,
        // 4. Metabolic conditions
        diabetes: false,
        thyroidDisorders: false,
        // 5. Balance and coordination
        dizzinessOrVertigo: false,
        poorBalance: false,
        // 6. Fitness level
        allergiesAffectingExercise: false,
        heatSensitivity: false,
        coldSensitivity: false,
        // 7. General health factors
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
        <label className="flex items-center space-x-3 mb-3 cursor-pointer">
          <div className="relative">
            <input
              type="checkbox"
              className="hidden"
              checked={checked}
              onChange={onChange}
            />
            <div className={`border-2 rounded-md border-[#decfcf] w-6 h-6 flex flex-shrink-0 justify-center items-center mr-2 ${
              checked ? "bg-[#f4eded] border-none" : "bg-white"
            }`}>
              <svg className={`fill-current w-3 h-3 text-blue-500 pointer-events-none ${checked ? "" : "hidden"}`} viewBox="0 0 20 20">
                <path d="M0 11l2-2 5 5L18 3l2 2L7 18z" />
              </svg>
            </div>
          </div>
          <span className="text-gray-700 font-medium">{label}</span>
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



    return (
        <div className='pb-32'>

            <div className="relative h-40" style={{ backgroundImage: `url(${GymBackgroundImage})`, backgroundSize: 'contain' }}>
                <div className="h-36 w-36 rounded-full absolute -bottom-12 left-7" style={{ backgroundImage: `url(${ProfileImage})`, backgroundSize: 'cover' }}></div>
            </div>

            <div className="mt-32 w-full flex flex-wrap px-7 gap-4">
                <div className=" w-full md:w-[45%] lg:w-[32%] mb-4 pr-2">
                    <label htmlFor="name">Full Name : </label>
                    <input onChange={handleinnputchange} className='flex flex-col border outline-none p-2 w-full' type="text" id="name" name='fullname' />
                </div>
                <div className=" w-full md:w-[45%] lg:w-[32%] mb-4 px-2">
                    <label htmlFor="email">Email : </label>
                    <input onChange={handleinnputchange} className='flex flex-col border outline-none p-2 w-full' type="email" id="email" name='email' />
                </div>
                <div className=" w-full md:w-[45%] lg:w-[32%] mb-4 pl-2">
                    <label htmlFor="phone">Phone : </label>
                    <input className='flex flex-col border outline-none p-2 w-full' type="tel" id="phone" name='phone' />
                </div>
                <div className="w-full md:w-[45%] lg:w-[32%] mb-4 pr-2">
                    <label htmlFor="dob">Date of Birth : </label>
                    <input className='flex flex-col border outline-none p-2 w-full' type="date" id="dob" name='dob' />
                </div>
                <div className=" w-full md:w-[45%] lg:w-[32%] mb-4 px-2">
                    <label htmlFor="gender">Gender : </label>
                    <select className='flex flex-col border outline-none p-2 w-full' id="gender" name='gender'>
                        <option value="">Select Gender</option>
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                        <option value="other">Other</option>
                    </select>
                </div>
                <div className=" w-full md:w-[45%] lg:w-[32%] mb-4 pl-2">
                    <label htmlFor="weight">Weight (kg) : </label>
                    <input className='flex flex-col border outline-none p-2 w-full' type="number" id="weight" name='weight' />
                </div>
                <div className=" w-full md:w-[45%] lg:w-[32%] mb-4 pr-2">
                    <label htmlFor="height">Height (cm) : </label>
                    <input className='flex flex-col border outline-none p-2 w-full' type="number" id="height" name='height' />
                </div>
                <div className=" w-full md:w-[45%] lg:w-[32%] mb-4 px-2">
                    <label htmlFor="emergency-contact">Emergency Contact : </label>
                    <input className='flex flex-col border outline-none p-2 w-full' type="tel" id="emergency-contact" name='emergencycontact' />
                </div>
                <div className=" w-full md:w-[45%] lg:w-[32%] mb-4 ">
                    <label htmlFor="membership-type">Membership Type : </label>
                    <select className='flex flex-col border outline-none p-2 w-full' id="membership-type" name='membershipType'>
                        <option value="">Select Membership Type</option>
                        <option value="basic">Basic</option>
                        <option value="premium">Premium</option>
                        <option value="vip">VIP</option>
                    </select>
                </div>
                <div className=" w-full mb-4 pr-2">
                    <label htmlFor="address">Address : </label>
                    <textarea className='flex flex-col border outline-none p-2 w-full' type="text" id="address" name='address' />
                </div>



                <div className=" w-full md:w-[45%] lg:w-[32%] mb-4">
                    <label htmlFor="fitness-goals">Fitness Goals : </label>
                    <select className='flex flex-col border outline-none p-2 w-full' id="fitness-goals" name='fitnessGoal'>
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
                    <select className='flex flex-col border outline-none p-2 w-full' id="fitness-level" name='fitnessLevel'>
                        <option value="">Select Fitness Level</option>
                        <option value="beginner">Beginner</option>
                        <option value="intermediate">Intermediate</option>
                        <option value="advanced">Advanced</option>
                    </select>
                </div>
                {/* <div className=" w-full md:w-[45%] lg:w-[32%] mb-4 px-2">
                <label htmlFor="health-conditions">Health Conditions : </label>
                <textarea className='flex flex-col border outline-none p-2 w-full' id="health-conditions" rows="3" name='healthCondition'></textarea>
            </div> */}
                <div className='border border-[#decfcf] mt-7 py-7 w-full flex flex-col'>
                   <div className="flex flex-col items-center justify-center relative">
                    <h2 className='pb-6 relative bg-white z-10 px-4' style={{ fontSize: '1.5em', marginBottom: '20px', textAlign: 'center' }}>Health Considerations</h2>
                    <hr className='absolute top-7 z-0 border-1 w-[50%] border-[#dc2626]' />
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
                    <button className='border px-7 py-3 rounded-lg bg-[#dc2626] text-white'>Save Changes</button>
                </div>
            </div>



        </div>
    )
}

export default Profile
