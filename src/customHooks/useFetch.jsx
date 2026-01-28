import { useEffect, useState } from "react";

function useFetch(url)
{
    let[data, setData]=useState(null)
    async function fetchData()
    {
        let response=await fetch(url);
        let responseData=await response.json()
        setData(responseData)
    }

    useEffect(()=>{fetchData()}, [url])

    return {data}
}

export default useFetch;