import React, { useState, useContext } from 'react';
import { AppContext } from '../context/AppContext';
import { useNavigate, useLocation } from "react-router-dom";

export default function EditMembers() {

  const location = useLocation();
  const context = useContext(AppContext);
  const { editMember } = context;
  const navigate = useNavigate();

  const [eMember, setEmember] = useState(location.state);

  function handleUpdate(e) {
    setEmember({ ...eMember, [e.target.name]: e.target.value })
  }

  function handleEdits(member, id) {
    delete member._id
    editMember(member, id);
    navigate('/');
  }

  return (
    <>
      <form onSubmit={() => handleEdits(eMember, eMember._id)}>
        <div className='px-9'>
          <div className='my-9'>
            <p className='text-[1.2rem] my-3'>सभासद वर्ग व त्यांची वर्गणी</p>
            <div >
              <select value={eMember.membership} onChange={handleUpdate} name="membership">
                <option disabled>Select</option>
                <option value="आश्रयदाते">आश्रयदाते</option>
                <option value="हितचिंतक">हितचिंतक</option>
                <option value="आजीव">आजीव</option>
              </select>
            </div>
          </div>

          <div className="my-9">
            <p className='text-[1.2rem] my-3'>वर्गणी जमा पद्धत</p>
            <select value={eMember.paymentmode} onChange={handleUpdate} name="paymentmode">
              <option disabled>Select</option>
              <option value="रोख">रोख</option>
              <option value="धनादेश">धनादेश</option>
            </select>
          </div>
          {eMember.paymentmode === 'धनादेश' ? <>
            <div className="my-9">
              <p className='text-[1.2rem] my-3'>धनादेश तपशील</p>
              <div className='grid grid-cols-3 gap-4'>
                <div className='flex flex-col my-2'>
                  <label className="mr-3" for="checkno">धनादेश क्र.</label>
                  <input type="text" name="checkno" value={eMember.checkno} className='w-[60%]' maxLength="10" onChange={handleUpdate} />
                </div>
                <div className='flex flex-col my-2'>
                  <label className="mr-3" for="paymentmode1">दिनांक</label>
                  <input type="date" name="checkdate" value={eMember.checkdate} className='w-[65%]' onChange={handleUpdate} />
                </div>
                <div className='flex flex-col my-2'>
                  <label className="mr-3" for="bank">बँक</label>
                  <input type="text" name="bankname" value={eMember.bankname} className='w-[60%]' onChange={handleUpdate} />
                </div>
              </div>
            </div>
          </> : null}
          <div className="my-9">
            <p className='text-[1.2rem] my-3'>सभासदाची आवश्यक माहिती</p>
            <div className='flex flex-col my-2'>
              <label className="mr-3" for="fullname">संपूर्ण नांव</label>
              <input type="text" name="fullname" value={eMember.fullname} className='w-[20%]' maxLength="100" onChange={handleUpdate} />
            </div>
            <div className='flex flex-col my-2'>
              <label className="mr-3" for="fullname">सभासद क्र.</label>
              <input type="text" name="memberno" value={eMember.memberno} className='w-[10%]' maxLength="100" onChange={handleUpdate} />
            </div>
            <div className='flex flex-col my-2'>
              <label className="mr-3" for="address">पत्ता</label>
              <textarea type="text" name="address" value={eMember.address} className="w-[20%]" maxLength="500" onChange={handleUpdate} />
            </div>
            <div className='grid grid-cols-3 gap-4'>
              <div className='flex flex-col my-2'>
                <label className="mr-3" for="dob">जन्म दिनांक</label>
                <input type="date" name="dob" value={eMember.dob} className="w-[60%]" onChange={handleUpdate} />
              </div>
              <div className='flex flex-col my-2'>
                <label className="mr-3" for="landline">दूरध्वनी</label>
                <input type="text" name="landline" value={eMember.landline} maxLength="10" className="w-[70%]" onChange={handleUpdate} />
              </div>
              <div className='flex flex-col my-2'>
                <label className="mr-3" for="mobile">भ्रमणध्वनी</label>
                <input type="text" name="mobile" value={eMember.mobile} maxLength="10" className="w-[70%]" onChange={handleUpdate} />
              </div>
              <div className='flex flex-col my-2'>
                <label className="mr-3" for="bloodgroup">रक्तगट</label>
                <input type="text" name="bloodgroup" value={eMember.bloodgroup} className='w-[20%]' maxLength="5" onChange={handleUpdate} />
              </div>
              <div className='flex flex-col my-2'>
                <label className="mr-3" for="education">शिक्षण</label>
                <input type="text" name="education" value={eMember.education} maxLength="100" className="w-[70%]" onChange={handleUpdate} />
              </div>
              <div className='flex flex-col my-2'>
                <label className="mr-3" for="gotra">गोत्र</label>
                <input type="text" name="gotra" value={eMember.gotra} maxLength="100" className="w-[70%]" onChange={handleUpdate} />
              </div>
              <div className='flex flex-col my-2'>
                <label className="mr-3" for="occupation">नौकरी/व्यवसाय</label>
                <input type="text" name="occupation" value={eMember.occupation} maxLength="200" className="w-[70%]" onChange={handleUpdate} />
              </div>
              <div className='flex flex-col my-2'>
                <label className="mr-3" for="reference">शिफारस</label>
                <input type="text" name="reference" value={eMember.reference} maxLength="200" className="w-[70%]" onChange={handleUpdate} />
              </div>
              <div className='flex flex-col my-2'>
                <label for="cars">लाईफ स्टेटस</label>
                <select value={eMember.livingStatus} onChange={handleUpdate} name="livingStatus">
                  <option disabled>Select</option>
                  <option selected value="हयात">हयात</option>
                  <option value="मृत">मृत</option>
                </select>
              </div>
            </div>
          </div>
          {/* </form> */}
          <button type="submit" className="submitbtn">Update</button>
        </div>
      </form>
    </>
  )
}

