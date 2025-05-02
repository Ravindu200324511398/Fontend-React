import axios from 'axios'
const baseUrl = "http://localhost:8086/booklib/api/v1/staff";

const fetchToken = () =>{
  const token = localStorage.getItem("libToken")
  return "Bearer "+token
}

const AddStaffData = async(staff :any) =>{
  //  save a book
  try{
    const response = await axios.post(
      baseUrl,
        staff,{
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

const DeleteStaff = async(staffId :string) =>{
  //  get the books
  try{
    const response  =  await axios.delete(
        `${baseUrl}?staffId=${staffId}`,{
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

const GetStaff = async() =>{
  //  get the books
  try{
    const response  =  await axios.get(`${baseUrl}/getallstaff`,{
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
const UpdateStaff = async(staff :any) =>{
  //  get the books
  try{
    const response  =  await axios.patch(
        `${baseUrl}?staffId=${staff.staffId}`,
        staff,
        {
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
export {AddStaffData, DeleteStaff, GetStaff, UpdateStaff}