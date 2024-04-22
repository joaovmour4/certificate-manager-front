import React from "react";
import EmailTable from "../components/EmailTable/EmailTable";
import AddEmailModal from "../modals/AddEmail";
import SearchBarEmail from "../components/searchBar/SearchBarEmail";

function Emails(){
    const [showAddModal, setShowAddModal] = React.useState(false)
    const [search, setSearch] = React.useState('')

    return(
        <div className="flex flex-col justify-between h-full w-full px-20 py-10 font-thin">
            <h1 className="text-3xl font-thin">E-mails</h1>
            {SearchBarEmail(setSearch)}
            <button onClick={() => setShowAddModal(true)} className="text-white rounded bg-green-600 px-5 my-5 place-self-end hover:bg-green-500 active:bg-green-600 shadow hover:shadow-lg">
                Adicionar E-Mail
            </button>
            <EmailTable search={search} />
            {showAddModal ? <AddEmailModal setShowModal={setShowAddModal}/>:null}
        </div>
    )
}

export default Emails