import React, { useContext, useEffect, useState } from 'react';
import { Link } from "react-router-dom";
import { AppContext } from '../context/AppContext';
import { useNavigate } from "react-router-dom";
import MembersModal from '../widget/MembersModal';

function MembersPage() {

  const context = useContext(AppContext);

  const { members, getMembers, deleteMember, searchMember } = context;
  const navigate = useNavigate();

  const [search, setSearch] = useState("")

  const [isModal, setModal] = useState(false)

  // const sortedMembers = [...members].sort((a, b) => a.memberno - b.memberno)

  // const data = members;
  // const filename = 'download';
  // const exportType = exportFromJSON.types.csv;

  // function ExporttoExcel() {
  //   exportFromJSON({ data, filename, exportType })
  // }

  useEffect(() => {
    if (search.trim() === "")
      getMembers();
    // eslint-disable-next-line
  }, [search]);


  function updateMemberDetails(memberData) {
    navigate('/editMembers', { state: memberData })
  }


  function handleSearch() {
    searchMember(search)
  }

  return (
    <>
      <div className='w-full px-9 relative m-auto pb-3'>
        <div className='max-w-max'>
          <Link to="/membersform">
            <div className='bg-blue-500 p-3 my-5 text-white hover:bg-gray-400 cursor-pointer max-w-max'>Add Member</div>
          </Link>
        </div>
        <div className='bg-blue-500 p-3 my-5 text-white hover:bg-gray-400 cursor-pointer max-w-max' onClick={() => setModal(true)}>Export</div>
        <div className='flex flex-row'>
          <input type="text" value={search} className='w-[20%]' onChange={(e) => setSearch(e.target.value)} placeholder='Search' />
          <div className='bg-blue-500 px-4 text-white hover:bg-gray-400 cursor-pointer' onClick={handleSearch}>SEARCH</div>
        </div>
        <div className='grid grid-cols-5 mt-10 w-[85%]'>
          <div className='flex text-left'>सभासद क्र.</div>
          <div className='flex text-left'>संपूर्ण नांव</div>
          <div className='flex text-left'>भ्रमणध्वनी</div>
          <div className='flex text-left'>सभासद वर्ग</div>
          <div className='flex text-left'>लाईफ स्टेटस</div>
        </div>
        <hr />
        <div>
          <div className='my-5'></div>
          {members.sort((a, b) => a.memberno - b.memberno).map((member) => {
            return (
              <div className='flex flex-row my-5' key={member._id}>
                <div className='grid grid-cols-5 w-[85%]'>
                  <div className='flex items-center justify-start'>
                    <p>{member.memberno}</p>
                  </div>
                  <div className='flex items-center justify-start'><p>{member.fullname}</p></div>
                  <div className='flex items-center justify-start'><p>{member.mobile === "" ? '-' : member.mobile}</p></div>
                  <div className='flex items-center justify-start'><p>{member.membership}</p></div>
                  <div className='flex items-center justify-start'><p>{member.livingStatus}</p></div>
                </div>
                <div className='flex flex-row items-center justify-center'>
                  <div className='bg-blue-500 px-4 mx-2 text-white hover:bg-gray-400 cursor-pointer' onClick={() => updateMemberDetails(member)}>EDIT</div>
                  <div className='bg-blue-500 px-4 mx-2 text-white hover:bg-gray-400 cursor-pointer' onClick={() => deleteMember(member._id)}>DELETE</div>
                </div>
              </div>
            )
          })}
        </div>
        {
          isModal && <MembersModal modalClose={setModal} />
        }

      </div>
    </>
  )
}

export default MembersPage


// {
//   members.sort((a, b) => a.memberno > b.memberno ? b : a).map((member) => {
//     return (
//       <div className='flex flex-row my-5'>
//         <div className='grid grid-cols-5 w-[85%]' key={member}>
//           <div className='flex items-center justify-start'>
//             <p>{member.memberno}</p>
//           </div>
//           <div className='flex items-center justify-start'><p>{member.fullname}</p></div>
//           <div className='flex items-center justify-start'><p>{member.mobile === "" ? '-' : member.mobile}</p></div>
//           <div className='flex items-center justify-start'><p>{member.membership}</p></div>
//           <div className='flex items-center justify-start'><p>{member.livingStatus}</p></div>
//         </div>
//         <div className='flex flex-row items-center justify-center'>
//           <div className='bg-blue-500 px-4 mx-2 text-white hover:bg-gray-400 cursor-pointer' onClick={() => updateMemberDetails(member)}>EDIT</div>
//           <div className='bg-blue-500 px-4 mx-2 text-white hover:bg-gray-400 cursor-pointer' onClick={() => deleteMember(member.id)}>DELETE</div>
//         </div>
//       </div>
//     )
//   })
// }
