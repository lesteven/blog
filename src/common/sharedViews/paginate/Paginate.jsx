import React from 'react';
import { Link } from 'react-router-dom';
import style from './paginate.css';

/*
* Paginate 
* - needs paginate object boolean (whether new page
*   and old page exist)
* - path (current path of component)
* - modelId (ids of the new element and old element)
*/
function Paginate({ page, modelID, path}){
    let paginate = modelID();
    // console.log(paginate)
    return(
        <div className='paginate'>
          <span>
            {page.new?
                <Link to = {`${path}?new=${paginate.new}`}>Newer</Link>
                :<a></a>}
          </span>
          <span>
            {page.old?
                <Link to = {`${path}?old=${paginate.old}`}>Older</Link>
                :<a></a>}
          </span>
       </div>
    )
}


export default Paginate
