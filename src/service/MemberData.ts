import axios from 'axios'
const baseUrl = "http://localhost:8086/booklib/api/v1/members";

const fetchToken = () =>{
  const token = localStorage.getItem("libToken")
  return "Bearer "+token
}

const AddMemberData = async(book :any) =>{
  try{
    const response = await axios.post(
      baseUrl,
        book,{
          headers:{
            Authorization: fetchToken()
          }
        }
      );
    console.log(response.data)
    return response.data;
    
  }catch(error){
      console.error("Failed to get the data",error);
      throw error
  }
   
}

const DeleteMember = async(bookId :string) =>{
  //  get the books
  try{
    const response  =  await axios.delete(
        `${baseUrl}?memberId=${bookId}`,{
          headers:{
            Authorization: fetchToken()
          }
        });
    console.log(response.data)
    return response.data;
    
  }catch(error){
      console.error("Failed to delete the data",error);
      throw error
  }
   
}

const GetMembers = async() =>{
  //  get the books
  try{
    const response  =  await axios.get(`${baseUrl}/getallmembers`,{
      headers:{
        Authorization: fetchToken()
      }
    });
    console.log(response.data)
    return response.data;
    
  }catch(error){
      console.error("Failed to get the data",error);
      throw error
  }
      
}
const UpdateMember = async(member :any) =>{
  //  get the books
  try{
    const response  =  await axios.patch(
        `${baseUrl}?memberId=${member.memberId}`,
        member,{
          headers:{
            Authorization: fetchToken()
          }
        }
        );
    console.log(response.data)
    return response.data;
    
  }catch(error){
      console.error("Failed to get the data",error);
      throw error
  }
     
}
export {AddMemberData, DeleteMember, GetMembers, UpdateMember}