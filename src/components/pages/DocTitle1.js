import React, { useState} from 'react'
import useDocumentTitle from '../../hooks/useDocumentTitle'

const DocTitle1 = () => {

    const [count, setCount] = useState(0)

    useDocumentTitle(count);
   
    return (
        <div>
            <button onClick={() => setCount(count +1)}>Tæl op ... {count}</button>
        </div>
    )
}

export default DocTitle1
