import React from 'react'
import ActivitiesTableLine from '../ActivitiesTableLine/ActivitiesTableLine'
import empresas from '../../dados/empresas.json'
import tasks from '../../dados/tasks.json'
import TaskCheckbox from '../TaskCheckbox/TaskCheckbox'

const ActivitiesTable = () => {
  return (
    <div className='flex flex-row'>
      <table className='divide-y mb-3'>
        <thead>
          <tr>
            <th className='pl-5 text-left h-5'>Nome</th>
          </tr>
        </thead>
        <tbody className='divide-y [&>*:nth-child(odd)]:bg-blue-table'>
          {empresas.empresas.map((empresa)=>{
            return(
              <tr className='h-7 items-center'>
                <ActivitiesTableLine 
                  name={empresa.name}
                  active={empresa.active}
                  regime={empresa.regime}
                  questorCode={empresa.questorCode}
                  cnpj={empresa.cnpj}
                  inscMunicipal={empresa.inscMunicipal}
                  representante={empresa.representante}
                />
              </tr>
            )
          })}
        </tbody>
      </table>
      <div className='overflow-x-scroll scrollbar scrollbar-thin table-fixed flex-1'>
        <table className='divide-y w-full'>
          <thead>
            <tr className='h-5'>
              {tasks.tasks.map((task)=>{
                return(
                  <th className='text-center divide-x whitespace-nowrap px-5'>{task.name}</th>
                )
              })}
            </tr>
          </thead>
          <tbody className='divide-y [&>*:nth-child(odd)]:bg-blue-table'>
            {empresas.empresas.map((empresa)=>{
              const taskEmpresa = tasks.tasks.map((task)=>{
                return(
                    <td className='px-5 text-center'>
                      <TaskCheckbox 
                        name={task.name}
                        value={task.value}
                        cnpjEmpresa={empresa.cnpj}
                        regime={empresa.regime}
                      />
                    </td>
                )
              })
              return <tr className='h-7'>{taskEmpresa}</tr>
            })}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default ActivitiesTable