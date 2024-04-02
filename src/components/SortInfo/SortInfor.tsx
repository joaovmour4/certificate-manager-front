import downArrow from '../../img/down-arrow.png'
import upArrow from '../../img/up-arrow.png'
interface Properties{
    key: string
    direction: string
}
function SortInfo(props: Properties, location: string){
    if(props.key === location)
        return(
            <img className='h-3' src={props.direction === 'ascending' ? downArrow:upArrow} alt="" />
        )
}

export default SortInfo