import React, { useEffect, useState } from 'react';
import Arrow from '../../../public/assets/ArrowDown.svg'

function SetMembersbodyMetrics() {
    const [selectedYear, setSelectedYear] = React.useState(new Date().getFullYear());
    const [bodyMetrics, setBodyMetrics] = React.useState([
        { month: 'Jan', weight: 0, smm: 0, pbf: 0, spo2: 0, bmi: 0, rhr: 0 },
        { month: 'Feb', weight: 0, smm: 0, pbf: 0, spo2: 0, bmi: 0, rhr: 0 },
        { month: 'Mar', weight: 0, smm: 0, pbf: 0, spo2: 0, bmi: 0, rhr: 0 },
        { month: 'Apr', weight: 0, smm: 0, pbf: 0, spo2: 0, bmi: 0, rhr: 0 },
        { month: 'May', weight: 0, smm: 0, pbf: 0, spo2: 0, bmi: 0, rhr: 0 },
        { month: 'Jun', weight: 0, smm: 0, pbf: 0, spo2: 0, bmi: 0, rhr: 0 },
        { month: 'Jul', weight: 0, smm: 0, pbf: 0, spo2: 0, bmi: 0, rhr: 0 },
        { month: 'Aug', weight: 0, smm: 0, pbf: 0, spo2: 0, bmi: 0, rhr: 0 },
        { month: 'Sep', weight: 0, smm: 0, pbf: 0, spo2: 0, bmi: 0, rhr: 0 },
        { month: 'Oct', weight: 0, smm: 0, pbf: 0, spo2: 0, bmi: 0, rhr: 0 },
        { month: 'Nov', weight: 0, smm: 0, pbf: 0, spo2: 0, bmi: 0, rhr: 0 },
        { month: 'Dec', weight: 0, smm: 0, pbf: 0, spo2: 0, bmi: 0, rhr: 0 },
    ]);

    const [yearToggle, setYearToggle] = useState(false);

    // Load data from localStorage when year changes
    useEffect(() => {
        const savedMetrics = localStorage.getItem(`bodyMetrics_${selectedYear}`);
        if (savedMetrics) {
            setBodyMetrics(JSON.parse(savedMetrics));
        } else {
            // Reset to default values if no data exists for selected year
            setBodyMetrics([
                { month: 'January', weight: 0, smm: 0, pbf: 0, spo2: 0, bmi: 0, rhr: 0 },
                { month: 'February', weight: 0, smm: 0, pbf: 0, spo2: 0, bmi: 0, rhr: 0 },
                { month: 'March', weight: 0, smm: 0, pbf: 0, spo2: 0, bmi: 0, rhr: 0 },
                { month: 'April', weight: 0, smm: 0, pbf: 0, spo2: 0, bmi: 0, rhr: 0 },
                { month: 'May', weight: 0, smm: 0, pbf: 0, spo2: 0, bmi: 0, rhr: 0 },
                { month: 'June', weight: 0, smm: 0, pbf: 0, spo2: 0, bmi: 0, rhr: 0 },
                { month: 'July', weight: 0, smm: 0, pbf: 0, spo2: 0, bmi: 0, rhr: 0 },
                { month: 'August', weight: 0, smm: 0, pbf: 0, spo2: 0, bmi: 0, rhr: 0 },
                { month: 'September', weight: 0, smm: 0, pbf: 0, spo2: 0, bmi: 0, rhr: 0 },
                { month: 'October', weight: 0, smm: 0, pbf: 0, spo2: 0, bmi: 0, rhr: 0 },
                { month: 'November', weight: 0, smm: 0, pbf: 0, spo2: 0, bmi: 0, rhr: 0 },
                { month: 'December', weight: 0, smm: 0, pbf: 0, spo2: 0, bmi: 0, rhr: 0 },
            ]);
        }
    }, [selectedYear]);

    const handleMetricChange = (index, metricType, value) => {
        const updatedMetrics = [...bodyMetrics];
        updatedMetrics[index][metricType] = value;
        setBodyMetrics(updatedMetrics);
        // Save to localStorage whenever data changes
        localStorage.setItem(`bodyMetrics_${selectedYear}`, JSON.stringify(updatedMetrics));
    };

    // Generate year options (5 years back and 5 years forward from current year)
    const currentYear = new Date().getFullYear();
    const currentMonth = new Date().getMonth(); // Get current month (0-11)
    const yearOptions = Array.from({length: 11}, (_, i) => currentYear - 5 + i);

    return (
       <div className="p-6 border border-[#decfcf] rounded-sm relative">
         <div className="flex flex-col justify-between items-center mb-4">
                 <div className="relative flex items-center justify-center w-full">
                        <h2 className='pb-6  bg-white z-10 px-4' style={{ fontSize: '1.5em', marginBottom: '20px', textAlign: 'center' }}>Body Metrics</h2>
                        <hr className='absolute top-6 z-0 border-1 w-[90%] md:w-[50%] border-[#dc2626]' />
                    </div>
            <div className="flex items-center absolute top-0 right-0">
                <img className={`absolute right-3 z-0 ${yearToggle && 'rotate-180'} translate-all duration-300 ease-in-out`} src={Arrow} alt="" />
                <select 
                    value={selectedYear}
                    onChange={(e) => setSelectedYear(Number(e.target.value))}
                    onFocus={()=>{setYearToggle(true)}}
                    onBlur={()=>{setYearToggle(false)}}
                    className={`border-b border-l relative z-10 bg-transparent rounded-bl-lg border-[#decfcf] appearance-none pr-12 py-2 px-4 focus:outline-none focus:ring-1 focus:ring-[#dc2626]`}
                >
                    {yearOptions.map(year => (
                        <option key={year} value={year}>{year}</option>
                    ))}
                </select>
            </div>
         </div>
         <table className='w-full bg-white rounded-sm overflow-hidden'>
            <thead className='bg-[#dc2626] text-white'>
                <tr>
                    <th className='border p-2'>Month</th>
                    <th className='border p-2'>Weight (kg)</th>
                    <th className='border p-2'>SMM (kg)</th>
                    <th className='border p-2'>PBF (%)</th>
                    <th className='border p-2'>SPO2 (%)</th>
                    <th className='border p-2'>BMI</th>
                    <th className='border p-2'>RHR (bpm)</th>
                </tr>
            </thead>
            <tbody>
                {bodyMetrics.map((metric, index) => (
                    <tr key={index} className='hover:bg-gray-50'>
                        <td className='border p-2 font-medium text-center'>{metric.month}</td>
                        <td className='border p-2'>
                            <input
                                type="number"
                                value={metric.weight}
                                onChange={(e) => handleMetricChange(index, 'weight', e.target.value)}
                                className='border p-1 w-full rounded focus:outline-none focus:ring-2 focus:ring-[#dc2626]'
                                disabled={selectedYear > currentYear || (selectedYear === currentYear && index > currentMonth)}
                            />
                        </td>
                        <td className='border p-2'>
                            <input
                                type="number"
                                value={metric.smm}
                                onChange={(e) => handleMetricChange(index, 'smm', e.target.value)}
                                className='border p-1 w-full rounded focus:outline-none focus:ring-2 focus:ring-[#dc2626]'
                                disabled={selectedYear > currentYear || (selectedYear === currentYear && index > currentMonth)}
                            />
                        </td>
                        <td className='border p-2'>
                            <input
                                type="number"
                                value={metric.pbf}
                                onChange={(e) => handleMetricChange(index, 'pbf', e.target.value)}
                                className='border p-1 w-full rounded focus:outline-none focus:ring-2 focus:ring-[#dc2626]'
                                disabled={selectedYear > currentYear || (selectedYear === currentYear && index > currentMonth)}
                            />
                        </td>
                        <td className='border p-2'>
                            <input
                                type="number"
                                value={metric.spo2}
                                onChange={(e) => handleMetricChange(index, 'spo2', e.target.value)}
                                className='border p-1 w-full rounded focus:outline-none focus:ring-2 focus:ring-[#dc2626]'
                                disabled={selectedYear > currentYear || (selectedYear === currentYear && index > currentMonth)}
                            />
                        </td>
                        <td className='border p-2'>
                            <input
                                type="number"
                                value={metric.bmi}
                                onChange={(e) => handleMetricChange(index, 'bmi', e.target.value)}
                                className='border p-1 w-full rounded focus:outline-none focus:ring-2 focus:ring-[#dc2626]'
                                disabled={selectedYear > currentYear || (selectedYear === currentYear && index > currentMonth)}
                            />
                        </td>
                        <td className='border p-2'>
                            <input
                                type="number"
                                value={metric.rhr}
                                onChange={(e) => handleMetricChange(index, 'rhr', e.target.value)}
                                className='border p-1 w-full rounded focus:outline-none focus:ring-2 focus:ring-[#dc2626]'
                                disabled={selectedYear > currentYear || (selectedYear === currentYear && index > currentMonth)}
                            />
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
       </div>
    );
}

export default SetMembersbodyMetrics;
