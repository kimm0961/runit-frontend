import {useEffect} from 'react'

// custom hook som modtager parameteren "count" som er et tal (som tæller op i useEffecten)
const useDocumentTitle = (count) => {
    useEffect(() => {
        document.title = "Tæl op "+ count;
     }, [count])
}

export default useDocumentTitle
