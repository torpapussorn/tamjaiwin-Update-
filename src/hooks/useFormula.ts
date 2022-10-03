import useSwr from 'swr'
import {API_Fetcher} from './fetcher'

interface GetFormula {
    createdAt: Date;
    updateAt: Date;
    percentWin: number;
    name: string;
    _id: string;
    image: string;
    code: string;
    lottoType: string;
}

export const useFormula = (code: string | undefined | string[], type: string | undefined | string[]) => { 
    
    const {data, error} = useSwr<GetFormula[]>(`/api/formula/code/${code}/${type}`, API_Fetcher);

    return {
        data,
        isLoading: !error && !data,
        isError: error
    }
}