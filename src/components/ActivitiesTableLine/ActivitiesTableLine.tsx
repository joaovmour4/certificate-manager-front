import React from 'react'
import TagRegime from '../TagRegime/TagRegime'
import CardEmpresaModal from '../../modals/CardEmpresaModal'
import SelectActive from '../SelectActive/SelectActive'
interface props{
    name: string
    active: boolean
    questorCode: number
    cnpj: string
    inscMunicipal: string
    representante: string
    regime: string
}

const ActivitiesTableLine = (props: props) => {
    const [showCardModal, setShowCardModal] = React.useState(false)

    const handleCardModal = () => {
        setShowCardModal(!showCardModal)
    }
    // 72
    return (
        <>
            <td className='flex font-thin justify-between self-center'>
                <button className='truncate text-left align-middle pl-5 max-w-sm' onClick={handleCardModal}>{props.name}</button>
                <div className='flex flex-row justify-between px-1'>
                    <TagRegime regime={props.regime} />
                    <SelectActive active={props.active} />
                </div>
            </td>
            {showCardModal && <CardEmpresaModal 
                name={props.name}
                questorCode={props.questorCode}
                cnpj={props.cnpj}
                inscMunicipal={props.inscMunicipal}
                representante={props.representante}
            />}
        </>
    )
}

export default ActivitiesTableLine