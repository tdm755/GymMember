import React, { useState, useRef, useCallback, useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import Webcam from 'react-webcam'
import weightLiftingBanner from '../../../public/assets/weightLiftingBanner-min.jpg'
import CameraIcon from '../../../public/assets/CameraIcon.svg'
import Arrow from '../../../public/assets/ArrowDown.svg'
import BodyBuilderIcon from '../../../public/assets/BodyBuilderIcon.png'


function AddMemberPage() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '+ 91',
    dateOfBirth: '',
    gender: '',
    address: '',
    emergencyContact: '',
    membershipType: '',
    startDate: '',
    endDate: '',
    paymentStatus: '',
    medicalConditions: '',
    fitnessGoals: '',
    experience : '',
    salary : '',
    Certifications : '',
    BriefBio : '',
    paidamount : 0,
    balance : 0,
    totalAmount :0,
  })

  const [capturedImage, setCapturedImage] = useState(null)
  const [showWebcam, setShowWebcam] = useState(false)
  const [webcamError, setWebcamError] = useState(null)

  const location = useLocation()
  const isTrainer = location.pathname.includes('addtrainer')
  const webcamRef = useRef(null)

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    // Handle form submission here
    console.log(formData)
  }

  const captureImage = useCallback(() => {
    if (webcamRef.current) {
      const imageSrc = webcamRef.current.getScreenshot()
      if (imageSrc) {
        setCapturedImage(imageSrc)
        setShowWebcam(false)
      } else {
        setWebcamError("Failed to capture image. Please try again.")
      }
    } else {
      setWebcamError("Webcam is not initialized. Please try again.")
    }
  }, [webcamRef])

  useEffect(() => {
    if (showWebcam) {
      setWebcamError(null)
    }
  }, [showWebcam])


  const SelectArrowRef = useRef();
  const paymentStatusRef = useRef()
  const MemberShipTypeRef = useRef()
  const GenderRef = useRef()
  

  function handleSelectTrainerClick(refOf) {
    refOf.current.style.transform = 'rotate(180deg)';    
  }

  function handleRemoverSelectClick(refOf) {       
    refOf.current.style.transform = 'rotate(0deg)';    
  }
  

  return (
    <div className="p-6 bg-gray-100">
      <div className="GymBannerImage flex relative items-center justify-center rounded-2xl overflow-hidden h-36 border mb-10 " style={{backgroundImage : `url(${weightLiftingBanner})`, backgroundPosition : 'center bottom -27px'}}>
        <div className="absolute top-0 right-0 bottom-0 left-0 bg-[#db3c3c3e]"></div>
        <h2 className="text-5xl relative z-20 text-white font-bold mb-4">
          {isTrainer ? 'Add Trainer' : 'Add Member'}
        </h2>
      </div>
      <form onSubmit={handleSubmit} className="space-y-4 bg-white p-6 rounded-2xl ">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-1">First Name</label>
            <input
              type="text"
              id="firstName"
              name="firstName"
              placeholder="First Name"
              value={formData.firstName}
              onChange={handleChange}
              className="w-full border border-[#decfcf] p-2 rounded focus:border-[#db3c3c] focus:outline-none"
              required
            />
          </div>
          <div>
            <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-1">Last Name</label>
            <input
              type="text"
              id="lastName"
              name="lastName"
              placeholder="Last Name"
              value={formData.lastName}
              onChange={handleChange}
              className="w-full border border-[#decfcf] p-2 rounded focus:border-[#db3c3c] focus:outline-none"
              required
            />
          </div>
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              className="w-full border border-[#decfcf] p-2 rounded focus:border-[#db3c3c] focus:outline-none"
              required
            />
          </div>
          <div>
            <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
            <input
              type="tel"
              id="phone"
              name="phone"
              placeholder="Phone"
              value={formData.phone}
              onChange={handleChange}
              className="w-full border border-[#decfcf] p-2 rounded focus:border-[#db3c3c] focus:outline-none"
              required
            />
          </div>
          <div>
            <label htmlFor="dateOfBirth" className="block text-sm font-medium text-gray-700 mb-1">Date of Birth</label>
            <div className="relative">
              <input
                type="date"
                id="dateOfBirth"
                name="dateOfBirth"
                placeholder="Date of Birth"
                value={formData.dateOfBirth}
                onChange={handleChange}
                className="w-full border border-[#decfcf] p-2 rounded focus:border-[#db3c3c] focus:outline-none appearance-none"
                required                
              />
            </div>
          </div>
          <div>
            <label htmlFor="emergencyContact" className="block text-sm font-medium text-gray-700 mb-1">Emergency Contact</label>
            <input
              type="text"
              id="emergencyContact"
              name="emergencyContact"
              placeholder="Emergency Contact"
              value={formData.emergencyContact}
              onChange={handleChange}
              className="w-full border border-[#decfcf] p-2 rounded focus:border-[#db3c3c] focus:outline-none"
              required
            />
          </div>
          <div className='col-span-2 relative'>
            <label htmlFor="gender" className="block text-sm font-medium text-gray-700 mb-1">Gender</label>
            <select
              onMouseLeave={()=>handleRemoverSelectClick(GenderRef)} onMouseDownCapture={()=>handleSelectTrainerClick(GenderRef)}

              id="gender"
              name="gender"
              value={formData.gender}
              onChange={handleChange}
              className="w-full border bg-transparent relative z-20 border-[#decfcf] p-2 rounded focus:border-[#db3c3c] focus:outline-none appearance-none"
              required
            >
              <option value="">Select Gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>
            <span ref={GenderRef} className='absolute z-10 right-2 top-8 transition-all duration-300 ease-in-out'><img src={Arrow} alt="" /></span>
          </div>
          <div className="md:col-span-4 mb-12">
            <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-1">Address</label>
            <textarea
              id="address"
              name="address"
              placeholder="Address"
              value={formData.address}
              onChange={handleChange}
              className="w-full border border-[#decfcf] p-2 rounded focus:border-[#db3c3c] focus:outline-none"
              required
            ></textarea>
          </div>
          
          {!isTrainer && (
            <>
              <div className='relative'>
                <label htmlFor="membershipType" className="block text-sm font-medium text-gray-700 mb-1">Membership Type</label>
                <select
                  onMouseLeave={()=>handleRemoverSelectClick(MemberShipTypeRef)} onMouseDownCapture={()=>handleSelectTrainerClick(MemberShipTypeRef)}

                  id="membershipType"
                  name="membershipType"
                  value={formData.membershipType}
                  onChange={handleChange}
                  className="w-full border relative z-20 bg-transparent border-[#decfcf] p-2 rounded focus:border-[#db3c3c] focus:outline-none appearance-none"
                  required
                >
                  <option value="">Select Membership Type</option>
                  <option value="basic">Basic</option>
                  <option value="premium">Premium</option>
                  <option value="vip">VIP</option>
                </select>
                <span ref={MemberShipTypeRef} className='absolute z-10 right-2 top-8 transition-all duration-300 ease-in-out'><img src={Arrow} alt="" /></span>
              </div>
              
              <div className='relative'>
                <label htmlFor="paymentStatus" className="block text-sm font-medium text-gray-700 mb-1">Payment Status</label>
                <select
                  onMouseLeave={()=>handleRemoverSelectClick(paymentStatusRef)} onMouseDownCapture={()=>handleSelectTrainerClick(paymentStatusRef)}
                  
                  id="paymentStatus"
                  name="paymentStatus"
                  value={formData.paymentStatus}
                  onChange={handleChange}
                  className="w-full relative z-20 bg-transparent border border-[#decfcf] p-2 rounded focus:border-[#db3c3c] focus:outline-none appearance-none"
                  required
                >
                  <option value="">Select Payment Status</option>
                  <option value="paid">Paid</option>
                  <option value="pending">Pending</option>
                </select>
                <span ref={paymentStatusRef} className='absolute z-10 right-2 top-8 transition-all duration-300 ease-in-out'><img src={Arrow} alt="" /></span>
              </div>
            </>
          )}
              <div>
                <label htmlFor="startDate" className="block text-sm font-medium text-gray-700 mb-1">Start Date</label>
                <div className="relative">
                  <input
                    type="date"
                    id="startDate"
                    name="startDate"
                    placeholder="Start Date"
                    value={formData.startDate}
                    onChange={handleChange}
                    className="w-full border border-[#decfcf] p-2 rounded focus:border-[#db3c3c] focus:outline-none appearance-none"
                    required
                  />
                </div>
              </div>
              <div>
                <label htmlFor="endDate" className="block text-sm font-medium text-gray-700 mb-1">End Date</label>
                <div className="relative">
                  <input
                    type="date"
                    id="endDate"
                    name="endDate"
                    placeholder="End Date"
                    value={formData.endDate}
                    onChange={handleChange}
                    className="w-full border border-[#decfcf] p-2 rounded focus:border-[#db3c3c] focus:outline-none appearance-none"
                    required
                  />
                </div>
              </div>
              {isTrainer && <div className="col-span-2">
            <label htmlFor="experience" className="block text-sm font-medium text-gray-700 mb-1">Experience</label>
            <input
              type='number'
              id="experience"
              name="experience"
              placeholder="experience"
              value={formData.experience}
              onChange={handleChange}
              className="w-full border border-[#decfcf] p-2 rounded focus:border-[#db3c3c] focus:outline-none"
            />
          </div>}
          {isTrainer && <div className="col-span-1">
            <label htmlFor="salary" className="block text-sm font-medium text-gray-700 mb-1">Salary</label>
            <input
              type='number'
              id="salary"
              name="salary"
              placeholder="salary"
              value={formData.salary}
              onChange={handleChange}
              className="w-full border border-[#decfcf] p-2 rounded focus:border-[#db3c3c] focus:outline-none"
            />
          </div>}
         <div className="w-full col-span-4 flex gap-4 mb-12">
         <div className="w-1/2">
            <label htmlFor="medicalConditions" className="block text-sm font-medium text-gray-700 mb-1">Medical Conditions (if any)</label>
            <textarea
              id="medicalConditions"
              name="medicalConditions"
              placeholder="Medical Conditions (if any)"
              value={formData.medicalConditions}
              onChange={handleChange}
              className="w-full border border-[#decfcf] p-2 rounded focus:border-[#db3c3c] focus:outline-none"
            ></textarea>
          </div>


          {isTrainer && <div className="w-1/2">
            <label htmlFor="fitnessGoals" className="block text-sm font-medium text-gray-700 mb-1">Certifications</label>
            <textarea
              id="Certifications"
              name="Certifications"
              placeholder="Certifications"
              value={formData.Certifications}
              onChange={handleChange}
              className="w-full border border-[#decfcf] p-2 rounded focus:border-[#db3c3c] focus:outline-none"
            ></textarea>
          </div>}
          <div className="w-1/2">
            <label htmlFor="fitnessGoals" className="block text-sm font-medium text-gray-700 mb-1">Brief Bio</label>
            <textarea
              id="BriefBio"
              name="BriefBio"
              placeholder="BriefBio"
              value={formData.BriefBio}
              onChange={handleChange}
              className="w-full border border-[#decfcf] p-2 rounded focus:border-[#db3c3c] focus:outline-none"
            ></textarea>
          </div>
         
          
          
          {!isTrainer && <div className="w-1/2">
            <label htmlFor="fitnessGoals" className="block text-sm font-medium text-gray-700 mb-1">Fitness Goals</label>
            <textarea
              id="fitnessGoals"
              name="fitnessGoals"
              placeholder="Fitness Goals"
              value={formData.fitnessGoals}
              onChange={handleChange}
              className="w-full border border-[#decfcf] p-2 rounded focus:border-[#db3c3c] focus:outline-none"
            ></textarea>
          </div>}
         </div>
             {!isTrainer && <> <div>
                <label htmlFor="paidamount" className="block text-sm font-medium text-gray-700 mb-1">Paid Amount</label>
                <div className="relative">
                  <input
                    type="number"
                    id="paidamount"
                    name="paidamount"
                    placeholder="Paid Amount"
                    value={formData.paidamount}
                    onChange={handleChange}
                    className="w-full border border-[#decfcf] p-2 pl-8 rounded focus:border-[#db3c3c] focus:outline-none appearance-none"
                    required
                  />
                  <span className='absolute top-[6px] left-3 text-lg font-semibold text-[#db3c3c]'>₹</span>
                </div>
              </div>
              <div>
                <label htmlFor="balance" className="block text-sm font-medium text-gray-700 mb-1">Balance Amount</label>
                <div className="relative">
                  <input
                    type="number"
                    id="balance"
                    name="balance"
                    placeholder="Balance Amount"
                    value={formData.balance}
                    onChange={handleChange}
                    className="w-full border border-[#decfcf] p-2 pl-8 rounded focus:border-[#db3c3c] focus:outline-none appearance-none"
                    required
                  />
                  <span className='absolute top-[6px] left-3 text-lg font-semibold text-[#db3c3c]'>₹</span>
                </div>
              </div>
              <div className='col-span-2'>
                <label htmlFor="totalAmount" className="block text-sm font-medium text-gray-700 mb-1">Total Amount</label>
                <div className="relative">
                  <input
                    type="number"
                    id="totalAmount"
                    name="totalAmount"
                    placeholder="Total Amount"
                    value={parseInt(formData.paidamount) + parseInt(formData.balance)}
                    onChange={handleChange}
                    className="w-full border border-[#decfcf] p-2 pl-8 rounded focus:border-[#db3c3c] focus:outline-none appearance-none"
                    required
                  />
                  <span className='absolute top-[6px] left-3 text-lg font-semibold text-[#db3c3c]'>₹</span>
                </div>
              </div> </>}

              {!isTrainer && <div className="flex flex-col relative">
                <label htmlFor="SelectTrainer" className="block text-sm font-medium text-gray-700 mb-1">SelectTrainer</label>
                  <img className='absolute left-0 top-[35px] w-5' src={BodyBuilderIcon} alt="" />
                  <select onMouseLeave={()=>handleRemoverSelectClick(SelectArrowRef)} onMouseDownCapture={()=>handleSelectTrainerClick(SelectArrowRef)}  className="w-full relative z-20 border bg-transparent border-[#decfcf] p-2 px-8 rounded focus:border-[#db3c3c] focus:outline-none appearance-none" name="" id="SelectTrainer">
                    <option value="">Ayush</option>
                    <option value="">Arun</option>
                    <option value="">Aditya</option>
                    <option value="">Vaibhav</option>
                  </select>
                  <span ref={SelectArrowRef} className='absolute z-10 right-2 top-8 transition-all duration-300 ease-in-out'><img src={Arrow} alt="" /></span>
              </div>}
         

          <div className="col-span-4 h-32 flex items-center justify-center gap-7 mt-7">
            <div className="border h-32 w-32 rounded-lg flex flex-col items-center justify-center overflow-hidden">
              {capturedImage ? (
                <img src={capturedImage} alt="Receiver" className="h-full w-full object-cover" />
              ) : (
                <>
                  <img src={CameraIcon} alt="" />
                  <span className='text-gray-300 text-sm text-center'>Receiver's <br /> Image</span>
                </>
              )}
            </div>
            <div className="flex flex-col gap-5 justify-between">
             <div className="flex flex-col ">
              <label htmlFor="recievername">Receiver Name</label>
                <input
                className="w-full border border-[#decfcf] p-2 rounded focus:border-[#db3c3c] focus:outline-none"
                type="text" 
                />
             </div>
             <button
            type="button"
            className="border border-[#decfcf] text-[#db3c3c] px-5 py-2 text-md rounded hover:border-[#db3c3c] hover:text-[17px] hover:py-[7px] transition duration-300 ease-in-out"
            onClick={() => setShowWebcam(true)}
          >
            Capture Image
          </button>
            </div>
          </div>
        </div>
       <div className="flex items-center justify-center">
        <button
            type="submit"
            className="bg-[#db3c3c] my-7 text-white px-5 py-2 text-md rounded hover:bg-[#c53535] transition duration-300"
          >
            {isTrainer ? 'Add Trainer' : 'Add Member'}
          </button>
       </div>
      </form>
      {showWebcam && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-4 rounded-lg">
            <Webcam
              audio={false}
              ref={webcamRef}
              screenshotFormat="image/jpeg"
              className="mb-4"
              onUserMediaError={(error) => {
                console.error("Webcam error:", error);
                setWebcamError("Failed to access webcam. Please check your camera permissions.");
              }}
            />
            {webcamError && (
              <p className="text-red-500 mb-2">{webcamError}</p>
            )}
            <div className="flex justify-between">
              <button
                onClick={captureImage}
                className="bg-[#db3c3c] text-white px-4 py-2 rounded"
              >
                Capture
              </button>
              <button
                onClick={() => {
                  setShowWebcam(false);
                  setWebcamError(null);
                }}
                className="bg-gray-300 text-black px-4 py-2 rounded"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default AddMemberPage
