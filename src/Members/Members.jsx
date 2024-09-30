import React, { useState } from 'react'
import weightLiftingBanner from '../../public/assets/weightLiftingBanner.jpg'
import './Members.css';
import { useLocation, useNavigate } from 'react-router-dom';

function Members() {
  const Mpin = 7777;
  const [MPinCheck, setMpinCheck] = useState(0);
  const [enteredMpin, setEnteredMpin] = useState('');

  const location = useLocation();
  const { pathname } = location;
  const isTrainer = pathname.includes('trainers');


  const [errorOf, setError] = useState('');


  function handleMpinChange(e, index) {
    const value = e.target.value;
    if (value && !isNaN(value)) {
      const newEnteredMpin = enteredMpin.slice(0, index) + value + enteredMpin.slice(index + 1);
      setEnteredMpin(newEnteredMpin);

      const inputs = e.target.parentNode.parentNode.querySelectorAll('input');
      if (index < 3) {
        inputs[index + 1].focus();
      } else {
        // Check if MPIN is correct
        if (newEnteredMpin === Mpin.toString()) {
          setMpinCheck(parseInt(newEnteredMpin));
          setError('Access granted');
        } else {
          setError('Incorrect MPIN');
          // Reset the entered MPIN
          setEnteredMpin('');
          inputs.forEach(input => input.value = '');
          inputs[0].focus();
        }
      }
    }
  }

  function handleKeyDownMpin(e, index) {
    if (e.key === 'Backspace' && !e.target.value) {
      const inputs = e.target.parentNode.parentNode.querySelectorAll('input');
      if (index > 0) {
        inputs[index - 1].focus();
      }
      const newEnteredMpin = enteredMpin.slice(0, index - 1) + enteredMpin.slice(index);
      setEnteredMpin(newEnteredMpin);
    }
  }


  const navigate = useNavigate();

  function handleNavigate() {
    navigate('memberdetail')
  }

  return (
    <>
      {Mpin === MPinCheck ? <div className='p-6 bg-gray-100'>
        <div className="flex relative items-center justify-center rounded-2xl overflow-hidden h-36 border mb-10" style={{ backgroundImage: `url(${weightLiftingBanner})`, backgroundSize: 'cover', backgroundPosition: 'center bottom -27px' }}>
          <div className="absolute top-0 right-0 bottom-0 left-0 bg-[#db3c3c3e]"></div>
          <h2 className="text-5xl relative z-20 text-white font-bold mb-4">
            {isTrainer ? 'Trainers' : 'Members'}
          </h2>
        </div>

        <div className="Members overflow-x-auto">
          <table>
            <thead>
              <tr>
                <th>Trainer</th>
                <th>Name</th>
                <th>Email</th>
                <th>Phone</th>
                <th>DOB</th>
                <th>Gender</th>
                <th>Address</th>
                <th>Membership Type</th>
                <th>Start Date</th>
                <th>End Date</th>
                <th>Fitness Goal</th>
                <th>Payment Status</th>
                <th>Paid</th>
                <th>Balance</th>
                <th>Total</th>
                <th>Admitted By</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Denesh Kartik</td>
                <td>Arpit</td>
                <td>tdm75513@gmail.com</td>
                <td>+91 8090426993</td>
                <td>16/10/2003</td>
                <td>Male</td>
                <td>
                  Flat No. 503, Shivaji Park View
                  Dr. Ketkar Marg, Opposite Portuguese Church
                  Dadar West, Mumbai - 400028
                  Maharashtra, India
                </td>
                <td>Premium</td>
                <td>34/34/3434</td>
                <td>23/23/2332</td>
                <td>Weight Gain</td>
                <td>Paid</td>
                <td>3,000</td>
                <td>0</td>
                <td>3,000</td>
                <td>Dinesh Kartik</td>
                <td onClick={handleNavigate}>View</td>
              </tr>
              <tr>
                <td>Denesh Kartik</td>
                <td>Arpit</td>
                <td>tdm75513@gmail.com</td>
                <td>+91 8090426993</td>
                <td>16/10/2003</td>
                <td>Male</td>
                <td>
                  Flat No. 503, Shivaji Park View
                  Dr. Ketkar Marg, Opposite Portuguese Church
                  Dadar West, Mumbai - 400028
                  Maharashtra, India
                </td>
                <td>Premium</td>
                <td>34/34/3434</td>
                <td>23/23/2332</td>
                <td>Weight Gain</td>
                <td>Paid</td>
                <td>3,000</td>
                <td>0</td>
                <td>3,000</td>
                <td>Dinesh Kartik</td>
                <td>View</td>
              </tr>
              <tr>
                <td>Denesh Kartik</td>
                <td>Arpit</td>
                <td>tdm75513@gmail.com</td>
                <td>+91 8090426993</td>
                <td>16/10/2003</td>
                <td>Male</td>
                <td>
                  Flat No. 503, Shivaji Park View
                  Dr. Ketkar Marg, Opposite Portuguese Church
                  Dadar West, Mumbai - 400028
                  Maharashtra, India
                </td>
                <td>Premium</td>
                <td>34/34/3434</td>
                <td>23/23/2332</td>
                <td>Weight Gain</td>
                <td>Paid</td>
                <td>3,000</td>
                <td>0</td>
                <td>3,000</td>
                <td>Dinesh Kartik</td>
                <td>View</td>
              </tr>
              <tr>
                <td>Denesh Kartik</td>
                <td>Arpit</td>
                <td>tdm75513@gmail.com</td>
                <td>+91 8090426993</td>
                <td>16/10/2003</td>
                <td>Male</td>
                <td>
                  Flat No. 503, Shivaji Park View
                  Dr. Ketkar Marg, Opposite Portuguese Church
                  Dadar West, Mumbai - 400028
                  Maharashtra, India
                </td>
                <td>Premium</td>
                <td>34/34/3434</td>
                <td>23/23/2332</td>
                <td>Weight Gain</td>
                <td>Paid</td>
                <td>3,000</td>
                <td>0</td>
                <td>3,000</td>
                <td>Dinesh Kartik</td>
                <td>View</td>

              </tr>
            </tbody>
          </table>
        </div>
      </div>
        : <div className='flex items-center justify-center h-[400px]'>
          <div className="border w-96 h-48 flex flex-col gap-4 justify-center items-center shadow-md rounded-lg border-[#dc2626]">
            <span className='text-16'>Enter Mpin to View Member Details</span>
            <div className="flex gap-4">
              {[0, 1, 2, 3].map((index) => (
                <div key={index} className="border w-12 h-12 flex items-center justify-center">
                  <input
                    className='w-10 outline-none text-center text-[#dc2626]'
                    type="text"
                    maxLength={1}
                    pattern="\d*"
                    inputMode="numeric"
                    onChange={(e) => handleMpinChange(e, index)}
                    onKeyDown={(e) => handleKeyDownMpin(e, index)}
                    value={enteredMpin[index] || ''}
                  />
                </div>
              ))}
            </div>
            <span className='text-[#db3c3c]'>{errorOf}</span>
            <span className='text-gray-500 text-xs'>Enter the 4-digit MPIN to access member information</span>
          </div>
        </div>}
    </>
  )
}

export default Members
