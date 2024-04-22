
const ResponseModal = (setShowModal: Function, response: any, setShowAddModal: Function) => {    
    if(response){
        return (
            <>
              <div className="flex justify-center items-center overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
                <div className="absolute w-1/3 my-6 mx-auto max-w-3xl">
                  <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                    <div className="flex items-start justify-between p-5 border-b border-solid border-gray-300 rounded-t ">
                      <h3 className="text-3xl font=semibold">{response.status === 200 || response.status === 201 
                      ? 'Sucesso':'Falha'}</h3>
                    </div>
                    <div className="relative p-6 flex-auto">
                      <form className="bg-gray-200 shadow-md rounded px-8 pt-6 pb-8 w-full">
                        <label className="block text-black text-center text-sm font-bold mb-1 pl-1">
                          {response.data.message}
                        </label>
                      </form>
                    </div>
                    <div className="flex items-center justify-end p-6 border-t border-solid border-blueGray-200 rounded-b">
                      <button
                        className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1"
                        type="button"
                        onClick={() => {setShowModal(false); setShowAddModal(false);if(response.status === 200 || response.status === 201)
                          window.location.reload()}}
                      >
                        Fechar
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </>
        );
    }
};

export default ResponseModal;