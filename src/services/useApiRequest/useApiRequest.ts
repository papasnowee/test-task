import { useState } from 'react'
/**
 *
 * @param D - data that is returned by the method
 * @param P - params for the method
 * @returns
 */
export function useApiRequest<D, P>(method: (...args: any[]) => Promise<D>) {
    const [loading, setLoading] = useState(false)
    const [loaded, setLoaded] = useState<D | false>(false)
    const [error, setError] = useState(null)

    async function sendRequest(...params: Parameters<typeof method>) {
        setLoading(true)
        method(...params)
            .then((data: D) => {
                setLoaded(data)
                setError(null)
                setLoading(false)
            })
            .catch((err) => {
                setError(err)
                setLoading(false)
            })
    }

    return { loading, loaded, error, sendRequest }
}
