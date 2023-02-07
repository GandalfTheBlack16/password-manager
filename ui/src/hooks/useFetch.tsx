import { useEffect, useState } from "react";

function useFetch({
    url,
    method = "GET",
    headers = {}
}: {url: string, method?: string, headers?: any}) {

    const [ data, setData ] = useState(null);
    const [ error, setError ] = useState(null);
    const [ loading, setLoading ] = useState(false);

    useEffect(() => {
        (
            async function(){
                try{
                    setLoading(true)
                    const response = await fetch(url, { method, headers});
                    const jsonData = await response.json();
                    setData(jsonData)
                }catch(err: any){
                    setError(err)
                }finally{
                    setLoading(false)
                }
            }
        )();
    }, [ url ]);

    return { data, error, loading }
}

export default useFetch;