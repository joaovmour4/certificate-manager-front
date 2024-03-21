import api from "../services/api";

const Modal = (setShowModal: Function, owner: string, docOwner: string, file: File | null, setFile: Function, password: string, setPassword: Function, setResponse: Function, setShowResponseModal: Function) => {
    

    function handleChange(event: any) {
      setFile(event.target.files[0])
    }

    function handlePassword(event: any){
      setPassword(event.target.value)
    }

    function handleSubmit(event: any) {
        event.preventDefault()
        const formData = new FormData()
        formData.append('certFile', file!)
        formData.append('certPassword', password)

        const config = {
          headers: {
            'content-type': 'multipart/form-data',
          },
        };
        api.put(`/certificate/${docOwner}`, formData, config)
          .then((response) => {
            setResponse(response)
            setShowResponseModal(true)
            console.log(response.data.message)
            setShowModal(false)
          })
          .catch((error:any)=>{
            setResponse(error.response)
            setShowResponseModal(true)
            setShowModal(false)
          })
    
      }
    
    return (
        <>
          <div className="flex justify-center items-center overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
            <div className="absolute w-1/3 my-6 mx-auto max-w-3xl">
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                <div className="flex items-start justify-between p-5 border-b border-solid border-gray-300 rounded-t ">
                  <h3 className="text-3xl font=semibold">Editar Certificado</h3>
                </div>
                <div className="relative p-6 flex-auto">
                    <label className="block text-black text-sm font-bold mb-1">
                        {owner}
                    </label>
                  <form className="bg-gray-200 shadow-md rounded px-8 pt-6 pb-8 w-full">
                    <label className="block text-black text-start text-sm font-bold mb-1 pl-1">
                      Certificado
                    </label>
                    <input type="file" onChange={handleChange} className="shadow appearance-none border rounded w-full py-2 px-1 file:rounded file:bg-blue text-slate-500" />
                    <label className="block text-black text-start text-sm font-bold mb-1 pl-1">
                      Senha
                    </label>
                    <input onChange={handlePassword} type="password" className="shadow appearance-none border rounded w-full py-2 px-1 text-black" />
                  </form>
                </div>
                <div className="flex items-center justify-end p-6 border-t border-solid border-blueGray-200 rounded-b">
                  <button
                    className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1"
                    type="button"
                    onClick={() => setShowModal(false)}
                  >
                    Fechar
                  </button>
                    <button
                        className="bg-blue active:bg-blue-active font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1"
                        onClick={handleSubmit}
                    >
                        Upload
                    </button>
                </div>
              </div>
            </div>
          </div>
        </>
    );
};

export default Modal;