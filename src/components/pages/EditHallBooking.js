import React, { useState, useContext } from 'react';
import { AppContext } from '../context/AppContext';
import { useNavigate, useLocation } from "react-router-dom";

function EditHallBooking() {

  const location = useLocation();
  const context = useContext(AppContext);
  const { editBooking } = context;
  const navigate = useNavigate();

  const [eBooking, setEbooking] = useState(location.state);

  function handleUpdate(e) {
    setEbooking({ ...eBooking, [e.target.name]: e.target.value })
  }

  function handleEdits(booking, id) {
    editBooking(booking, id);
    navigate('/hallbookings');
  }

  return (
    <>
      <form onSubmit={() => handleEdits(eBooking, eBooking.id)}>
        <div className='px-9'>
          <div className='my-9'>
            <p className='text-[1.2rem] my-3'>कार्याचा प्रकार</p>
            <div >
              <select required value={eBooking.event} onChange={handleUpdate} name="event">
                <option disabled>Select</option>
                <option selected value="लग्न">लग्न</option>
                <option value="मुंज">मुंज</option>
                <option value="इतर सांस्कृतिक कार्यक्रम">इतर सांस्कृतिक कार्यक्रम</option>
                <option value="नृत्य">नृत्य</option>
                <option value="नाट्य">नाट्य</option>
                <option value="संगीत">संगीत</option>
                <option value="सभा">सभा</option>
                <option value="इतर">इतर</option>
              </select>
            </div>
          </div>
          <div className='flex flex-col my-2'>
            <label className="mr-3" for="bank">कार्याची थोडक्यात माहिती</label>
            <textarea required name="description" value={eBooking.description} className='w-[40%]' rows="4" col="50" onChange={handleUpdate} />
          </div>
          <div className='flex flex-row my-5'>
            <div className='flex flex-col mr-20'>
              <label className="mr-3" for="fullname">अर्जदाराचे नाव</label>
              <input required type="text" name="fullname" value={eBooking.fullname} className='w-[100%]' maxLength="100" onChange={handleUpdate} />
            </div>
            <div className='flex flex-col'>
              <label className="mr-3" for="address">पत्ता</label>
              <textarea required type="text" name="address" value={eBooking.address} className="w-[100%]" maxLength="500" onChange={handleUpdate} />
            </div>
          </div>

          <div className='flex flex-row my-5'>
            <div className='flex flex-col mr-20'>
              <label className="mr-3" for="memberno">संस्थेचा सभासद क्रमांक</label>
              <input required type="text" name="memberno" value={eBooking.memberno} className='w-[90%]' maxLength="10" onChange={handleUpdate} />
            </div>
            <div>
              <p className='mr-3'>सभासद वर्ग</p>
              <div>
                <select required value={eBooking.membership} onChange={handleUpdate} name="membership">
                  <option disabled>Select</option>
                  <option selected value="आश्रयदाते">आश्रयदाते</option>
                  <option value="हितचिंतक">हितचिंतक</option>
                  <option value="आजीव">आजीव</option>
                  <option value="सामान्य">सामान्य</option>
                </select>
              </div>
            </div>
          </div>
          <div className='flex flex-col my-5'>
            <label className="mr-3" for="address">संस्थेचे नाव व पत्ता</label>
            <textarea required type="text" name="orgaddress" value={eBooking.orgaddress} className="w-[19%]" maxLength="500" onChange={handleUpdate} />
          </div>
          <div className='my-14 border border-black w-[75%]'>
            <div className="grid grid-cols-5 text-center">
              <div className='border-b border-r border-black'></div>
              <div className='font-semibold border-b border-r border-black'>Hall No.1 or 2</div>
              <div className='font-semibold border-b border-r border-black'>Rent</div>
              <div className='font-semibold border-b border-r border-black'>Deposit</div>
              <div className='font-semibold border-b border-black'>Hall Capacity</div>
            </div>
            <div class="grid grid-cols-5 text-center">
              <div className='border-b border-r border-black'>A</div>
              <div className='border-b border-r border-black'>Full Day - 8 AM to 10PM</div>
              <div className='border-b border-r border-black'>20,000/-</div>
              <div className='border-r border-black'></div>
              <div></div>
            </div>
            <div class="grid grid-cols-5 text-center">
              <div className='border-b border-r border-black'>B</div>
              <div className='border-b border-r border-black'>Half Day Morning Session - 8AM to 3PM</div>
              <div className='border-b border-r border-black'>12,000/-</div>
              <div className='border-r border-black'></div>
              <div></div>
            </div>
            <div class="grid grid-cols-5 text-center">
              <div className='border-b border-r border-black'>C</div>
              <div className='border-b border-r border-black'>Half Day Evening Session 4PM to 10PM</div>
              <div className='border-b border-r border-black'>12,000/-</div>
              <div className='border-r border-black'>6,000/-</div>
              <div className='border-black'>80 persons</div>
            </div>
            <div class="grid grid-cols-5 text-center">
              <div className='border-r border-black'>D</div>
              <div className='border-r border-black'>Minimum 4 Hrs.(Only For Meeting, Condolence
                Meeting, Yoga Class, Sanskar Bharati, Rotary, Lion's)</div>
              <div className='border-r border-black'>6,000/-</div>
              <div className='border-r border-black'></div>
              <div></div>
            </div>
          </div>


          <div className='flex flex-row my-10 justify-between w-[90%]'>
            <div className='flex flex-col w-[10%]'>
              <label className='text-[1.2rem]'>बुकिंगचा प्रकार</label>
              <select required value={eBooking.bookingtype} onChange={handleUpdate} name="bookingtype">
                <option disabled>Select</option>
                <option selected value="अ">अ</option>
                <option value="ब">ब</option>
                <option value="क">क</option>
                <option value="ड">ड</option>
              </select>
            </div>
            <div className='flex flex-col w-[20%]'>
              <label className="text-[1.2rem]" for="dob">कार्यक्रम / समारंभाचा दिवस</label>
              <input required type="date" name="eventdate" value={eBooking.eventdate} className="w-[95%]" onChange={handleUpdate} />
            </div>
            <div className='flex flex-col'>
              <label className="text-[1.2rem]" >निमंत्रितांची अंदाजे संख्या</label>
              <input required type="text" name="guestno" value={eBooking.guestno} maxLength="10" className="w-[30%]" onChange={handleUpdate} />
            </div>
            <div className='flex flex-col w-[10%]'>
              <label className='text-[1.2rem]'>सभागृह</label>
              <select required value={eBooking.hallno} onChange={handleUpdate} name="hallno">
                <option disabled>Select</option>
                <option selected value="सभागृह 1">सभागृह 1</option>
                <option value="सभागृह 2">सभागृह 2</option>
                <option value="दोन्ही">दोन्ही</option>
              </select>
            </div>
          </div>

          <div className='flex flex-row my-10 justify-between w-[80%]'>
            <div className='flex flex-col w-[10%]'>
              <label className='text-[1.2rem]'>भाडे रुपये</label>
              <input required type="text" name="rent" value={eBooking.rent} onChange={handleUpdate} />
            </div>
            <div className='flex flex-col w-[10%]'>
              <label className="text-[1.2rem]">अनामत रुपये</label>
              <input required type="text" name="deposit" value={eBooking.deposit} onChange={handleUpdate} />
            </div>
            <div className='flex flex-col w-[10%]'>
              <label className="text-[1.2rem]">एकूण</label>
              <input required type="text" name="total" value={eBooking.total} onChange={handleUpdate} />
            </div>
            <div className='flex flex-col w-[25%]'>
              <label className='text-[1.2rem]'>संपूर्ण रक्कम (अक्षरी)</label>
              <input required type="text" name="totalwords" value={eBooking.totalwords} onChange={handleUpdate} />
            </div>
          </div>
          <div className="my-9">
            <p className='text-[1.2rem] my-3'>वर्गणी जमा पद्धत</p>
            <select required value={eBooking.paymentmode} onChange={handleUpdate} name="paymentmode">
              <option disabled>Select</option>
              <option selected value="Netbanking">Netbanking</option>
              <option value="धनादेश">धनादेश</option>
            </select>
          </div>
          {eBooking.paymentmode === 'धनादेश' && <>
            <div className="my-10">
              <p className='text-[1.2rem] my-3'>धनादेश तपशील</p>
              <div className='grid grid-cols-4'>
                <div className='flex flex-col my-2'>
                  <label className="mr-3" for="checkno">धनादेश क्र.</label>
                  <input type="text" name="checkno" value={eBooking.checkno} className='w-[60%]' maxLength="10" onChange={handleUpdate} />
                </div>
                <div className='flex flex-col my-2'>
                  <label className="mr-3">दिनांक</label>
                  <input type="date" name="checkdate" value={eBooking.checkdate} className='w-[65%]' onChange={handleUpdate} />
                </div>
                <div className='flex flex-col my-2'>
                  <label className="mr-3" for="bank">बँक</label>
                  <input type="text" name="bankname" value={eBooking.bankname} className='w-[60%]' onChange={handleUpdate} />
                </div>
                <div className='flex flex-col my-2'>
                  <label className="mr-3" for="bank">रक्कम रुपये</label>
                  <input required type="text" name="totalamount" value={eBooking.totalamount} className='w-[60%]' onChange={handleUpdate} />
                </div>
              </div>
            </div>
          </>}

          <div className='flex flex-row my-10 justify-between w-[80%]'>
            <div className='flex flex-col w-[10%]'>
              <label className='text-[1.2rem]'>पावती क्रमांक</label>
              <input required type="text" name="receiptno" value={eBooking.receiptno} onChange={handleUpdate} />
            </div>
            <div className='flex flex-col w-[20%]'>
              <label className="text-[1.2rem]">दिनांक</label>
              <input required type="date" name="receiptdate" value={eBooking.receiptdate} className='w-[65%]' onChange={handleUpdate} />
            </div>
            <div className='flex flex-col w-[25%]'>
              <label className="text-[1.2rem]">नोंदणीदाराचा कोड नंबर</label>
              <input required type="text" name="membercode" value={eBooking.membercode} onChange={handleUpdate} />
            </div>
          </div>
          <button type="submit" className="submitbtn">Update</button>
          <div className="my-10">
            <p className='text-[1.2rem] my-3'>संस्थेच्या बँक खात्याचा तपशील</p>
            <div>
              अपना सहकारी बँक लिमिटेड (Apna Sahakari Bank Ltd.)<br />
              मुलुंड (पूर्व), मुंबई ४०००८१<br />
              बचत खाते क्रमांक: ०२८०१११००००१८११ (S/b 028011100001811)<br />
              IFSC : ASBL0000028
            </div>
          </div>
        </div>
      </form>
    </>
  )
}

export default EditHallBooking
