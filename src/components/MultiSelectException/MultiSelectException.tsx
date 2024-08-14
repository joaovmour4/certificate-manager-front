import React from 'react'
import { Excecao, ObrigacaoExcecao } from '../../views/Obrigacoes'
import Item from './Item'
import api from '../../services/api'
import ResponseModalComponent from '../../modals/ResponseModalComponent'
import { AxiosResponseModal } from '../../modals/ConfirmModal'
interface props{
    excecoes: Array<Excecao>
    relacaoExcecoes?: ObrigacaoExcecao
}

const MultiSelectException = (props: props) => {
  const appRef = React.useRef<HTMLDivElement>(null)
  const buttonRef = React.useRef<HTMLButtonElement>(null)
  const [excecoesList, setExcecoesList] = React.useState<Array<Excecao>>(props?.excecoes)
  const [selectedItems, setSelectedItems] = React.useState<Array<Excecao>>(
    props.relacaoExcecoes ? props.relacaoExcecoes.Excecoes : []
  )
  const [showDropdown, setShowDropdown] = React.useState(false)
  const [response, setResponse] = React.useState<AxiosResponseModal>()
  const [showResponseModal, setShowResponseModal] = React.useState(false)

  const handleDropdown = () => {
    setShowDropdown(prevState => !prevState)
  }
  const handleRemove = (excecao: Excecao) => {
    api
      .delete(`/excecao?obrigacao=${props.relacaoExcecoes?.idObrigacao}&excecao=${excecao.idExcecao}`)
      .then(response=>{
        setResponse(response)
        setShowResponseModal(true)
      })
      .catch(err=>{
        setResponse(err.response)
        setShowResponseModal(true)
      })
  }
  const handleClick = (excecao: Excecao) => {
    api
      .post('/excecao', {
        idObrigacao: props.relacaoExcecoes?.idObrigacao,
        idExcecao: excecao.idExcecao
      })
      .then(response=>{
        setResponse(response)
        setShowResponseModal(true)
      })
      .catch(err=>{
        setResponse(err.response)
        setShowResponseModal(true)
      })

  }

  React.useEffect(()=>{
    props.relacaoExcecoes && setSelectedItems(props.relacaoExcecoes?.Excecoes)
    setExcecoesList(
      props.excecoes.filter(item => !selectedItems.find(stateItem=> item.idExcecao === stateItem.idExcecao))
    )
  }, [props, selectedItems])

  React.useEffect(()=>{
    const handleClickOutside = (event: Event) =>{
        if(appRef.current && buttonRef.current && !appRef.current.contains(event.target as Node) && !buttonRef.current.contains(event.target as Node))
            setShowDropdown(false)
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () =>{
        document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  return (
    <>
      <div className='bg-white border rounded-sm flex flex-row min-h-7 w-[300px] justify-between items-center px-1 divide-x'>
          <div className='flex flex-row justify-center gap-x-1'>
            {selectedItems && selectedItems.map(excecao=>{
                return <Item excecao={excecao} handleClick={handleRemove} />
            })}
          </div>
          <button ref={buttonRef} className='px-1' onClick={handleDropdown}>
              <img className='h-3 w-3' alt='' src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAv0lEQVR4nO3XSwqDMBRG4bOJG3T/O2lHfU3qoMtpETIQKSVqHjf0PyA48ML9zCiglFJKKaXUP3cC7kDAXwF4AOeUj6/AG5icYULcad7tkjJgwDMOvICx/I6bdxr2Do49Ijxh7CjCA8ZyIVpiLDeiBcZKIWpirDSiBqYaoiSmOqIEphkiJ6Y5IgfGDeIIxh1iD8YtYgvGPSIF0w3iF6Y7xLfb3LR693TrTGp5Ct2dxLr579/i091JKKWUUkophcs+GiV0FcyNP/cAAAAASUVORK5CYII="></img>
          </button>
      </div>
      {showDropdown &&
        <div ref={appRef} className='absolute text-start bg-white border shadow w-[300px]'>
          {excecoesList.map(excecao => {
            return (
              <p onClick={()=>handleClick(excecao)} className='pl-3 py-0.5 text-sm hover:bg-slate-200 cursor-pointer'>
                {excecao.excecaoName}
              </p>
            )
          })}
        </div>
      }
      {showResponseModal && response &&
        <ResponseModalComponent 
          response={response}
          setShowModal={setShowResponseModal}
        />
      }
    </>
  )
}

export default MultiSelectException