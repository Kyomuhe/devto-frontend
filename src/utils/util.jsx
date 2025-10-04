import axios from "axios"
import { serverUrl } from "../config/config"


export const makeRequest = async (endpoint, data, method) => {
    console.log(method)
    let response
    try {
        let url = serverUrl + endpoint
        console.log(url)
        
        // Check if data is FormData
        const isFormData = data instanceof FormData;
        
        // Don't stringify FormData, and don't set Content-Type for FormData
        const requestData = isFormData ? data : JSON.stringify(data);
        
        let config = {
            timeout: 4000
        }
        
        // Only set Content-Type for JSON requests
        if (!isFormData) {
            config.headers = { 'Content-Type': 'application/json' };
        }
        
        console.log('Is FormData:', isFormData); 
        console.log('Request data:', requestData); 
        
        switch(method) {
            case "Post": 
                response = await axios.post(url, requestData, config)
                break;
            case "Get":
                response = await axios.get(url, config)
                break;
            case "Put":
                response = await axios.put(url, requestData, config)
                break;
            case "Delete":
                response = await axios.delete(url, config)
                break;
            case "Patch":
                response = await axios.patch(url, requestData, config)
                break;
            default: 
                throw new Error("bad request")
        }
        
        console.log('Response:', response) 
        return response.data
    } catch (e) {
        console.error('Request error:', e); 
        if (e.response) {
            throw e;
        } else {
            throw new Error(e.message)
        }
    }
}
//export const a = 4;
// export const showModal = (title, message, isOpen = false, afterOpenModal, closeModal) => {
//   return (
//     <Modal
//       isOpen={isOpen}
//       onAfterOpen={afterOpenModal}
//       onRequestClose={closeModal}
//      // contentLabel="displaying modal test"
//       className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white rounded-lg shadow-lg p-6 max-w-sm w-full mx-4 outline-none"
//       overlayClassName="fixed inset-0  bg-black/60 backdrop-blur-sm bg-opacity-30"
//     >
//       <div className="relative">
//         <button 
//           onClick={closeModal}
//           className="absolute -top-2 -right-2 text-gray-400 hover:text-gray-600 transition-colors"
//         >
//           <X className="w-5 h-5" />
//         </button>
        
//         <h2 className="text-lg font-semibold text-gray-900 mb-2 pr-6">{title}</h2>
//         <p className="text-sm text-gray-600">{message}</p>
//       </div>
//     </Modal>
//   );
// };