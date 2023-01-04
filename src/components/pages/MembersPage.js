import React, { useContext, useEffect, useState } from 'react';
import { Link } from "react-router-dom";
import { AppContext } from '../context/AppContext';
import { useNavigate } from "react-router-dom";

function MembersPage() {

  const context = useContext(AppContext);

  const { members, getMembers, deleteMember, searchMember } = context;
  const navigate = useNavigate();

  const [search, setSearch] = useState("")

  useEffect(() => {
    if (search.length === 0) { 
      getMembers();
    }
    // eslint-disable-next-line
  }, [deleteMember, search]);

  function updateMemberDetails(memberData) {
    navigate('/editMembers', { state: memberData })
  }

  function handlesearchChange(e) {
    setSearch(e.target.value)
  }

  function handleSearch() {
    searchMember(search)
  }

  return (
    <>
      <div className='px-9'>
        <div className='bg-blue-500 p-3 my-5 text-white hover:bg-gray-400 cursor-pointer w-[9%]'>
          <Link to="/membersform">Add Member</Link>
        </div>
        <div className='flex flex-row'>
          <input type="text" name="checkno" value={search} className='w-[20%]' onChange={handlesearchChange} placeholder='Search' />
          <div className='bg-blue-500 px-4 text-white hover:bg-gray-400 cursor-pointer' onClick={handleSearch}>SEARCH</div>
        </div>
        <div className='grid grid-cols-5 mt-10 w-[85%]'>
          <div>संपूर्ण नांव</div>
          <div>दूरध्वनी</div>
          <div>भ्रमणध्वनी</div>
          <div>सभासद वर्ग</div>
          <div>जीवन परीस्थिती</div>
        </div>
        <hr />
        <div>
          <div className='my-5'></div>
          {members.map((member, index) => {
            return (
              <div className='flex flex-row my-5'>
                <div className='grid grid-cols-5 w-[85%]' key={index}>
                  <div>{member.fullname}</div>
                  <div>{member.landline === "" ? '-' : member.landline}</div>
                  <div>{member.mobile === "" ? '-' : member.mobile}</div>
                  <div>{member.membership}</div>
                  <div>{member.livingStatus}</div>
                </div>
                <div className='flex flex-row'>
                  <div className='bg-blue-500 px-4 mx-2 text-white hover:bg-gray-400 cursor-pointer' onClick={() => updateMemberDetails(member)}>EDIT</div>
                  <div className='bg-blue-500 px-4 mx-2 text-white hover:bg-gray-400 cursor-pointer' onClick={() => deleteMember(member.id)}>DELETE</div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </>
  )
}

export default MembersPage
