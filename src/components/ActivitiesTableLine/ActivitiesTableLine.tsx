import React from 'react'
import TagRegime from '../TagRegime/TagRegime'
import CardEmpresaModal from '../../modals/CardEmpresaModal'
import SelectActive from '../SelectActive/SelectActive'
import { situacaoFinanceiro } from '../ActivitiesTable/ActivitiesTable'
interface props{
    idEmpresa: number
    name: string
    active: boolean
    situacaoFinanceiro: situacaoFinanceiro
    questorCode: number
    cnpj: string
    inscEstadual: string
    representante: string
    regime: string
}

const ActivitiesTableLine = (props: props) => {
    const [showCardModal, setShowCardModal] = React.useState(false)
    const [activeEmpresa, setActiveEmpresa] = React.useState(props.active)
    const lineRef = React.useRef(null)

    const handleCardModal = () => {
        setShowCardModal(!showCardModal)
    }
    // 72
    return (
        <>
            <td className='flex font-thin justify-between self-center w-[320px]'>
                <button ref={lineRef} className='flex-1 truncate text-left align-middle pl-5' onClick={handleCardModal}>{props.name}</button>
                {!props.situacaoFinanceiro.active && 
                    <p className='px-3 bg-red-600 text-white rounded'>
                        Bloqueada
                    </p>
                } 
            </td>
            {<CardEmpresaModal 
                lineRef={lineRef}
                showModal={showCardModal}
                setShowModal={setShowCardModal}
                name={props.name}
                questorCode={props.questorCode}
                cnpj={props.cnpj}
                inscEstadual={props.inscEstadual}
                representante={props.representante}
            />}
            
            <td>
                <div className='flex flex-row justify-between px-1'>
                    <TagRegime regime={props.regime} />
                </div>
            </td>
            <td className='text-center'>
                <SelectActive 
                    active={activeEmpresa} 
                    situacaoFinanceiro={props.situacaoFinanceiro}
                    setActive={setActiveEmpresa}
                    idEmpresa={props.idEmpresa}
                />
            </td>
        </>
    )
}

export default ActivitiesTableLine