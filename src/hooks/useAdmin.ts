import useSwr from 'swr'
import {API_Fetcher} from '../hooks/fetcher'

interface GetAdmin {
    createdAt: Date;
    updatedAt: Date;
    image: string;
    name: string;
    percentWin: number;
    _id:number;
    code: string
}

export const useAdmin = () => {
    const {data, error} = useSwr<GetAdmin[]>('/api/admins', API_Fetcher);

    return {
        data,
        isLoading: !error && !data,
        isError: error
    }
}
