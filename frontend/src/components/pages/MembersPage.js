import React, { useContext, useEffect, useState } from 'react';
import { Link } from "react-router-dom";
import { AppContext } from '../context/AppContext';
import { useNavigate } from "react-router-dom";
import MembersModal from '../widget/MembersModal';
import { ScaleLoader } from 'react-spinners'

function MembersPage() {

  const context = useContext(AppContext);

  const { members, getMembers, deleteMember, searchMember, searchedMember, setSearchedMember, notFound,
    setNotFound } = context;
  const navigate = useNavigate();

  const [search, setSearch] = useState("")
  const [loading, setLoading] = useState(false)
  const [isModal, setModal] = useState(false)

  // const sortedMembers = [...members].sort((a, b) => a.memberno - b.memberno)

  // const data = members;
  // const filename = 'download';
  // const exportType = exportFromJSON.types.csv;

  // function ExporttoExcel() {
  //   exportFromJSON({ data, filename, exportType })
  // }

  useEffect(() => {
    async function fetchMembers() {
      setLoading(true)
      await getMembers();
      setLoading(false)
    }
    fetchMembers()
    // eslint-disable-next-line
  }, []);


  function updateMemberDetails(memberData) {
    navigate('/editMembers', { state: memberData })
  }


  async function handleSearch() {
    setLoading(true)>
    await searchMember(search)
    setLoading(false)
  }

  useEffect(() => {
    if (search.trim() === "") {
      setSearchedMember([])
      setNotFound(false)
    }
  }, [search])


  return (
    <>
      <div className='w-full px-9 relative m-auto pb-3'>
        <div className='max-w-max'>
          <Link to="/membersform">
            <div className='bg-blue-500 py-3 px-4 my-6 text-white hover:bg-gray-400 cursor-pointer max-w-max rounded-md'>Add Member</div>
          </Link>
        </div>
        <div className='bg-blue-500 py-3 px-4 my-6 text-white hover:bg-gray-400 cursor-pointer max-w-max rounded-md' onClick={() => setModal(true)}>Export</div>
        <div className='flex flex-row'>
          <input type="text" value={search} className='w-[20%] p-2 rounded-tl-md rounded-bl-md' onChange={(e) => setSearch(e.target.value)} placeholder='Search'/>
          <div className='bg-blue-500 px-4 text-white flex items-center justify-center hover:bg-gray-400 cursor-pointer rounded-tr-md rounded-br-md' onClick={handleSearch}>SEARCH</div>
        </div>
        <div className='grid grid-cols-5 mt-10 w-[85%]'>
          <div className='flex text-left'>सभासद क्र.</div>
          <div className='flex text-left'>संपूर्ण नांव</div>
          <div className='flex text-left'>भ्रमणध्वनी</div>
          <div className='flex text-left'>सभासद वर्ग</div>
          <div className='flex text-left'>लाईफ स्टेटस</div>
        </div>
        <hr className='my-5 border-2 border-gray-400' />
        {loading &&
          <div className="w-full flex items-center justify-center my-10">
            <ScaleLoader color='#4988C4' loading={loading} />
          </div>
        }
        <div>
          <div className='my-9'></div>
          {/* {members?.length === 0 && <div className='text-center text-2xl font-bold text-gray-400'>No Members Found</div>} */}

          {search.trim() !== '' && notFound && (
            <div className="text-center text-2xl font-bold text-gray-400">
              No Members Found
            </div>
          )}

          {search.trim() === '' && members?.length !== 0 && (
            members.sort((a, b) => a.memberno - b.memberno).map((member) =>
            (
              <div className='flex flex-row my-9' key={member._id}>
                <div className='grid grid-cols-5 w-full'>
                  <div className=' flex items-center justify-start'>
                    <p>{member.memberno}</p>
                  </div>
                  <div className='flex items-center justify-start'><p>{member.fullname}</p></div>
                  <div className='flex items-center justify-start'><p>{member.mobile === "" ? '-' : member.mobile}</p></div>
                  <div className='flex items-center justify-start'><p>{member.membership}</p></div>
                  <div className='flex items-center justify-start'><p>{member.livingStatus}</p></div>
                </div>
                <div className='flex flex-row items-center justify-center'>
                  <div className='bg-blue-500 py-1 px-4 mx-2 text-white hover:bg-gray-400 cursor-pointer rounded-md' onClick={() => updateMemberDetails(member)}>EDIT</div>
                  <div className='bg-blue-500 py-1 px-4 mx-2 text-white hover:bg-gray-400 cursor-pointer rounded-md' onClick={() => deleteMember(member._id)}>DELETE</div>
                </div>
              </div>
            ))
          )}

          {search.trim() !== '' && !notFound &&
            (searchedMember.map((member) => (
              <div className='flex flex-row my-9' key={member._id}>
                <div className='grid grid-cols-5 w-full'>
                  <div className=' flex items-center justify-start'>
                    <p>{member.memberno}</p>
                  </div>
                  <div className='flex items-center justify-start'><p>{member.fullname}</p></div>
                  <div className='flex items-center justify-start'><p>{member.mobile === "" ? '-' : member.mobile}</p></div>
                  <div className='flex items-center justify-start'><p>{member.membership}</p></div>
                  <div className='flex items-center justify-start'><p>{member.livingStatus}</p></div>
                </div>
                <div className='flex flex-row items-center justify-center'>
                  <div className='bg-blue-500 py-1 px-4 mx-2 text-white hover:bg-gray-400 cursor-pointer rounded-md' onClick={() => updateMemberDetails(member)}>EDIT</div>
                  <div className='bg-blue-500 py-1 px-4 mx-2 text-white hover:bg-gray-400 cursor-pointer rounded-md' onClick={() => deleteMember(member._id)}>DELETE</div>
                </div>
              </div>
            )))
          }

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
