import React, { useContext, useEffect, useState } from 'react';
import { Link } from "react-router-dom";
import { AppContext } from '../context/AppContext';
import { useNavigate } from "react-router-dom";
import exportFromJSON from 'export-from-json';

function MembersPage() {

  const context = useContext(AppContext);

  const { members, getMembers, deleteMember, searchMember } = context;
  const navigate = useNavigate();

  const [search, setSearch] = useState("")

  const data = members;
  const filename = 'download';
  const exportType = exportFromJSON.types.csv;

  function ExporttoExcel() {
    exportFromJSON({ data, filename, exportType })
  }

  useEffect(() => {
    if (search.length === 0 && members.length === 0) {
      getMembers();
    }
    // eslint-disable-next-line
  }, [deleteMember, search, members]);

  function updateMemberDetails(memberData) {
    navigate('/editMembers', { state: memberData })
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
        <div className='bg-blue-500 p-3 my-5 text-white hover:bg-gray-400 cursor-pointer w-[5%]' onClick={ExporttoExcel}>Export</div>
        <div className='flex flex-row'>
          <input type="text" value={search} className='w-[20%]' onChange={(e) => setSearch(e.target.value)} placeholder='Search' />
          <div className='bg-blue-500 px-4 text-white hover:bg-gray-400 cursor-pointer' onClick={handleSearch}>SEARCH</div>
        </div>
        <div className='grid grid-cols-5 mt-10 w-[85%]'>
          <div>सभासद क्र.</div>
          <div>संपूर्ण नांव</div>
          <div>भ्रमणध्वनी</div>
          <div>सभासद वर्ग</div>
          <div>लाईफ स्टेटस</div>
        </div>
        <hr />
        <div>
          <div className='my-5'></div>
          {members.sort((a, b) => a.memberno > b.memberno ? 1 : -1).map((member) => {
            return (
              <div className='flex flex-row my-5'>
                <div className='grid grid-cols-5 w-[85%]' key={member}>
                  <div className='flex items-center justify-center'>
                    <p>{member.memberno}</p>
                  </div>
                  <div className='flex items-center justify-center'><p>{member.fullname}</p></div>
                  <div className='flex items-center justify-center'><p>{member.mobile === "" ? '-' : member.mobile}</p></div>
                  <div className='flex items-center justify-center'><p>{member.membership}</p></div>
                  <div className='flex items-center justify-center'><p>{member.livingStatus}</p></div>
                </div>
                <div className='flex flex-row items-center justify-center'>
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
