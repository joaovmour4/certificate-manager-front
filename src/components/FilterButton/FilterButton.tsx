import React from 'react'
import FilterModal from '../FilterModal/FilterModal'

const FilterButton = () => {
    const [showFilterModal, setShowFilterModal] = React.useState<boolean>(false)

    const handleFilterModal = () => {
        setShowFilterModal(prevState => !prevState)
    }

  return (
    <div className='flex relative'>
        <button onClick={handleFilterModal} className='flex gap-x-1 items-center px-3 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded font-thin'>
            <img className='h-6' src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAAACXBIWXMAAAsTAAALEwEAmpwYAAAB/klEQVR4nO2ZO0gcURSGv3U3ImGbbUQFxRQKSWHANBF8FDEQbGKjVWySTgsxVdAmpZ2pTBULsbMSC7GICBJioY1VwBQRhYiCaIwvfNwwcCbcRnd2d2b2jNwPplnu+c/591xm7z0LDt0sASYhz8pdRkzCnlvJu0AJJqiRHHrJBTHyTRZ8B7LoIyu1eTWu37WwGvghC78CVeihEliQ2jaB2nwB9cAvCZgDHlB+0sCs1LQNNAYNbAJ+S+AMUEH5SAFTUsse8LhQgRbgQASmRDBuUsBnqeEQaC1W6DlwLEKfiJ9xyX0CdJQq9gI4E8FR4mNMcl4Ar8ISfQ1civB7omdIcl0BfWGLvwGugRvgHdExYOV5G1WSQeub6o9Av9fq/AgRM2rt3Z4QdbuBc9H+QMxvk1OgMwS9NuvtOEHM7/dJSXwEPCtB66n1ezVJGfDMfJEC9oEnRWg0A7saThBp6wy0AzwqILYB2LLOdBkUnUp/AnUBYtSesh/KHbrQq+qqxntPrggjam+iJuCdX/1swDgjyjCuI8owriPKMK4jyjCuI8owriPKMK4jyjD3rSPtAdepZVkK9Mad00BNUo1kgGGZdXmF/gU+yoAiUUZ8aqQjN1KwNzF5mUQjPt44dcMqfF7+o0ycEX+7jVjb7U9Sjdy23RJrxKcLWAMW/3/iuIf8A6CVNVOPYxZnAAAAAElFTkSuQmCC" alt="filter--v1"></img>
            Filtros
        </button>
        {showFilterModal &&
            <FilterModal />
        }
    </div>
  )
}

export default FilterButton