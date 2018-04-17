import React from 'react';
import { Link } from 'react-router-dom';
import style from './paginate.css';


function Paginate({ page, modelID, path}){
    let paginate = modelID();
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
