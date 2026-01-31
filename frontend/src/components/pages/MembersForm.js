import React, { useState, useContext } from 'react';
import { AppContext } from '../context/AppContext';
import { useNavigate } from "react-router-dom";
export default function MembersForm() {

  const context = useContext(AppContext);


  const { addMember } = context;
  const navigate = useNavigate();

  const [memberDetails, setMemberDetails] = useState({
    membership: "आश्रयदाते",
    paymentmode: "रोख",
    checkno: "",
    checkdate: "",
    bankname: "",
    fullname: "",
    memberno: "",
    address: "",
    dob: "",
    landline: "",
    mobile: "",
    bloodgroup: "",
    education: "",
    gotra: "",
    occupation: "",
    reference: "",
    livingStatus: "हयात"
  })

  function handleChange(e) {
    setMemberDetails({ ...memberDetails, [e.target.name]: e.target.value })
  }

  function handleSubmit() {
    // console.log(memberDetails)
    addMember(memberDetails);
    setMemberDetails({
      membership: "आश्रयदाते",
      paymentmode: "रोख",
      checkno: "",
      checkdate: "",
      bankname: "",
      fullname: "",
      memberno: "",
      address: "",
      dob: "",
      landline: "",
      mobile: "",
      bloodgroup: "",
      education: "",
      gotra: "",
      occupation: "",
      reference: "",
      livingStatus: "हयात"
    })
    navigate('/');
  }

  return (
    <>
      <form onSubmit={handleSubmit}>
        <div className='px-9'>
          <div className='my-9'>
            <p className='text-[1.2rem] my-3'>सभासद वर्ग व त्यांची वर्गणी</p>
            <div >
              <select value={memberDetails.membership} onChange={handleChange} name="membership">
                <option disabled>Select</option>
                <option value="आश्रयदाते" selected>आश्रयदाते</option>
                <option value="हितचिंतक">हितचिंतक</option>
                <option value="आजीव">आजीव</option>
              </select>
            </div>
          </div>

          <div className="my-9">
            <p className='text-[1.2rem] my-3'>वर्गणी जमा पद्धत</p>
            <select value={memberDetails.paymentmode} onChange={handleChange} name="paymentmode" >
              <option disabled>Select</option>
              <option value="रोख" selected>रोख</option>
              <option value="धनादेश">धनादेश</option>
            </select>
          </div>
          {memberDetails.paymentmode === 'धनादेश' && <>
            <div className="my-9">
              <p className='text-[1.2rem] my-3'>धनादेश तपशील</p>
              <div className='grid grid-cols-3 gap-4'>
                <div className='flex flex-col my-2'>
                  <label className="mr-3" htmlFor="checkno">धनादेश क्र.</label>
                  <input type="text" name="checkno" value={memberDetails.checkno} className='w-[60%]' maxLength="10" onChange={handleChange} />
                </div>
                <div className='flex flex-col my-2'>
                  <label className="mr-3" >दिनांक</label>
                  <input type="date" name="checkdate" value={memberDetails.checkdate} className='w-[65%]' onChange={handleChange} />
                </div>
                <div className='flex flex-col my-2'>
                  <label className="mr-3" htmlFor="bank">बँक</label>
                  <input type="text" name="bankname" value={memberDetails.bankname} className='w-[60%]' onChange={handleChange} />
                </div>
              </div>
            </div>
          </>}
          <div className="my-9">
            <p className='text-[1.2rem] my-3'>सभासदाची आवश्यक माहिती</p>
            <div className='flex flex-col my-2'>
              <label className="mr-3" htmlFor="fullname">संपूर्ण नांव</label>
              <input type="text" name="fullname" value={memberDetails.fullname} className='w-[20%]' maxLength="100" onChange={handleChange} />
            </div>
            <div className='flex flex-col my-2'>
              <label className="mr-3" htmlFor="fullname">सभासद क्र.</label>
              <input type="text" name="memberno" value={memberDetails.memberno} className='w-[10%]' maxLength="100" onChange={handleChange} />
            </div>
            <div className='flex flex-col my-2'>
              <label className="mr-3" htmlFor="address">पत्ता</label>
              <textarea type="text" name="address" value={memberDetails.address} className="w-[20%]" maxLength="500" onChange={handleChange} />
            </div>
            <div className='grid grid-cols-3 gap-4'>
              <div className='flex flex-col my-2'>
                <label className="mr-3" htmlFor="dob">जन्म दिनांक</label>
                <input type="date" name="dob" value={memberDetails.dob} className="w-[60%]" onChange={handleChange} />
              </div>
              <div className='flex flex-col my-2'>
                <label className="mr-3" htmlFor="landline">दूरध्वनी</label>
                <input type="text" name="landline" value={memberDetails.landline} maxLength="10" className="w-[70%]" onChange={handleChange} />
              </div>
              <div className='flex flex-col my-2'>
                <label className="mr-3" htmlFor="mobile">भ्रमणध्वनी</label>
                <input type="text" name="mobile" value={memberDetails.mobile} maxLength="10" className="w-[70%]" onChange={handleChange} />
              </div>
              <div className='flex flex-col my-2'>
                <label className="mr-3" htmlFor="bloodgroup">रक्तगट</label>
                <input type="text" name="bloodgroup" value={memberDetails.bloodgroup} className='w-[20%]' maxLength="5" onChange={handleChange} />
              </div>
              <div className='flex flex-col my-2'>
                <label className="mr-3" htmlFor="education">शिक्षण</label>
                <input type="text" name="education" value={memberDetails.education} maxLength="100" className="w-[70%]" onChange={handleChange} />
              </div>
              <div className='flex flex-col my-2'>
                <label className="mr-3" htmlFor="gotra">गोत्र</label>
                <input type="text" name="gotra" value={memberDetails.gotra} maxLength="100" className="w-[70%]" onChange={handleChange} />
              </div>
              <div className='flex flex-col my-2'>
                <label className="mr-3" htmlFor="occupation">नौकरी/व्यवसाय</label>
                <input type="text" name="occupation" value={memberDetails.occupation} maxLength="200" className="w-[70%]" onChange={handleChange} />
              </div>
              <div className='flex flex-col my-2'>
                <label className="mr-3" htmlFor="reference">शिफारस</label>
                <input type="text" name="reference" value={memberDetails.reference} maxLength="200" className="w-[70%]" onChange={handleChange} />
              </div>
              <div className='flex flex-col my-2'>
                <label htmlFor="cars">लाईफ स्टेटस</label>
                <select value={memberDetails.livingStatus} onChange={handleChange} name="livingStatus">
                  <option disabled>Select</option>
                  <option value="हयात" selected>हयात</option>
                  <option value="मृत">मृत</option>
                </select>
              </div>
            </div>
          </div>
          {/* </form> */}
          <button type="submit" className="submitbtn">Submit</button>
        </div>
      </form>
    </>
  )
}



  // const [membership, setMembership] = useState();
  // const [paymentmode, setPaymentMode] = useState();
  // const [checkno, setCheckNo] = useState()
  // const [checkdate, setCheckDate] = useState()
  // const [bankname, setBankName] = useState('')
  // const [fullname, setFullname] = useState('')
  // const [address, setAddress] = useState('')
  // const [dob, setDob] = useState()
  // const [landlline, setLandlline] = useState('')
  // const [mobile, setMobile] = useState('')
  // const [bloodgroup, setBloodgroup] = useState('')
  // const [education, setEducation] = useState('')
  // const [gotra, setGotra] = useState('')
  // const [occupation, setOccupation] = useState('')
  // const [reference, setReference] = useState('')
  // const [livingStatus, setlivingStatus] = useState()
