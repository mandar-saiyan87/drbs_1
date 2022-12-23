import React from 'react'

export default function MembersForm() {
  return (
    <>
      <div className='p-9'>
        <p className='text-lg'>सभासद वर्ग व त्यांची वर्गणी</p>
        <div className='my-5'>
          <form action="">
            <div >
              <input type="checkbox" id="membership1" name="membership1" value="आश्रयदाते ३००१" className='w-6' />
              <label className="mr-3" for="membership1">आश्रयदाते रु.३००१/-</label>
              <input type="checkbox" id="membership2" name="membership2" value="हितचिंतक १५०१" className='w-6' />
              <label className="mr-3" for="membership2">हितचिंतक रु.१५०१/-</label>
              <input type="checkbox" id="membership3" name="membership3" value="आजीव ३०१" className='w-6' />
              <label className="mr-3" for="membership3">आजीव रु.३०१/-</label>
            </div>
            <div className="my-5">
              <p className='text-lg my-3'>वर्गणी जमा पद्धत</p>
              <input type="checkbox" id="paymentmode1" name="paymentmode" value="रोख" className='w-6' />
              <label className="mr-3" for="paymentmode1">रोख</label>
              <input type="checkbox" id="paymentmode2" name="paymentmode" value="धनादेश" className='w-6' />
              <label className="mr-3" for="paymentmode2">धनादेश</label>
            </div>
            <div className="my-5">
              <p className='text-lg my-3'>धनादेश तपशील</p>
              <div className='flex flex-col my-2'>
                <label className="mr-3" for="checkno">धनादेश क्र.</label>
                <input type="text" id="checkno" name="checkno" value="" className='w-[20%]' maxLength="10" />
              </div>
              <div className='flex flex-col my-2'>
                <label className="mr-3" for="paymentmode1">दिनांक</label>
                <input type="date" id="date" name="date" value="" className='w-[15%]' />
              </div>
              <div className='flex flex-col my-2'>
                <label className="mr-3" for="bank">बँक</label>
                <input type="text" id="bank" name="bank" value="" className='w-[20%]' />
              </div>
            </div>
          </form>
        </div>
      </div>

    </>
  )
}
