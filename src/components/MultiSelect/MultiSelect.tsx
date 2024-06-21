import React from 'react'
import { Setor } from '../../App'
import SelectedOption from './SelectedOption'
import { Empresa } from '../ActivitiesTable/ActivitiesTable'
import ConfirmSetorEmpresaModal from '../../modals/ConfirmSetorEmpresa'
import { useAuth } from '../../contexts/auth'
interface props{
    options: Array<Setor>
    empresa: Empresa
}
interface ConfirmModal{
    show: boolean,
    type: string
}

const MultiSelect = (props: props) => {
    const Auth = useAuth()
    const [showDropdown, setShowDropdown] = React.useState(false)
    const [showConfirmModal, setShowConfirmModal] = React.useState<ConfirmModal>({
        show: false,
        type: ''
    })
    const [selectedItems, setSelectedItems] = React.useState<Array<Setor>>([])
    const [selectedOpt, setSelectedOpt] = React.useState<Setor>()
    
    const handleDropdown = ()=>{
        if(Auth.user?.cargo !== 'operador')
            setShowDropdown(prevState => !prevState)
    }
    React.useEffect(()=>{
        props.empresa.Setors && setSelectedItems(props.empresa.Setors)
    }, [props.empresa.Setors])
    
    React.useEffect(()=>{
        if(props.options.length === selectedItems.length)
            setShowDropdown(false)
    }, [props.options, selectedItems])
    
    return (
        <td className='w-[280px]'>
            <div className='flex justify-between items-center divide-x min-h-8 select-none bg-white px-3 py-1 border shadow'>
                <div className='flex flex-row flex-wrap jutify-start items-center'>
                    {selectedItems.map(selectedItem=>{
                        if(selectedItem.setorName === 'Financeiro')
                            return null
                        return(
                            <SelectedOption 
                                item={selectedItem}
                                setSelectedItems={setSelectedItems}
                                setSelectedOpt={setSelectedOpt}
                                setShowConfirmModal={setShowConfirmModal}
                            />
                        )
                    })}
                </div>
                <button className='pl-1' disabled={Auth.user?.cargo === 'operador'} onClick={handleDropdown}>
                    <img className='h-3 w-3' alt='' src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAv0lEQVR4nO3XSwqDMBRG4bOJG3T/O2lHfU3qoMtpETIQKSVqHjf0PyA48ML9zCiglFJKKaXUP3cC7kDAXwF4AOeUj6/AG5icYULcad7tkjJgwDMOvICx/I6bdxr2Do49Ijxh7CjCA8ZyIVpiLDeiBcZKIWpirDSiBqYaoiSmOqIEphkiJ6Y5IgfGDeIIxh1iD8YtYgvGPSIF0w3iF6Y7xLfb3LR693TrTGp5Ct2dxLr579/i091JKKWUUkophcs+GiV0FcyNP/cAAAAASUVORK5CYII="></img>
                </button>
            </div>
            {showDropdown && 
                <ul className='w-[280px] absolute z-10 py-1 bg-white rounded shadow-xl border'>
                    {props.options.map(opt=>{
                        if(selectedItems.find(item => item.idSetor === opt.idSetor) || opt.setorName === 'Financeiro')
                            return null
                        return (
                            <li className='px-5 hover:bg-blue-table cursor-pointer' 
                                onClick={()=>{
                                    setSelectedOpt(opt)
                                    setShowConfirmModal({show: true, type: 'create'})
                                }}
                            >
                                {opt.setorName}
                            </li>
                        )
                    })}
                </ul>
            }
            {showConfirmModal.show && selectedOpt &&
                <ConfirmSetorEmpresaModal 
                    type={showConfirmModal.type}
                    idEmpresa={props.empresa.idEmpresa}
                    nameEmpresa={props.empresa.nameEmpresa}
                    option={selectedOpt}
                    setSelectedItems={setSelectedItems}
                    setShowModal={setShowConfirmModal}
                />
            }
        </td>
    )
}

export default MultiSelect