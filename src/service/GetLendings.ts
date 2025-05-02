import axios from 'axios';

const baseUrl = "http://localhost:8086/booklib/api/v1/lendings";
const fetchToken = () =>{
  const token = localStorage.getItem("libToken")
  return "Bearer "+token
}
 const GetLendings = async () => {
  try {
    const response = await axios.get(`${baseUrl}/getalllendings`,
      {
        headers:{
          Authorization: fetchToken()
        }
      }
    );
    return response.data;
  } catch (err) {
    console.error("GetLendings error:", err);
  }
};

 const DeleteLendings = async (lendingId: string) => {
  try {
    await axios.delete(`${baseUrl}?lendingId=${lendingId}`,
      {
        headers:{
          Authorization: fetchToken()
        }
      }
    );
  } catch (err) {
    console.error("DeleteLendings error:", err);
  }
};

const UpdateLendings = async (lending: any) => {
  try {
    const response = await axios.patch(
      `${baseUrl}?lendingId=${lending.lendingId}`,
      lending,{
        headers:{
          Authorization: fetchToken()
        }
      }
    );
    return response.data;
  } catch (err) {
    console.error("UpdateLendings error:", err);
  }
};

const AddLendingData = async (lending:any) =>{
  try{
      console.log(lending)
      const response = await axios.post(
          baseUrl,
          lending,{
            headers:{
              Authorization: fetchToken()
            }
          }
      );
    
      return response.data
  }catch(err){
      console.error(err)
      throw err
  }
 
}
export {GetLendings,DeleteLendings,UpdateLendings,AddLendingData}

