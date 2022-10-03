import { API_Fetcher } from "./fetcher";
import useSwr from 'swr'

export interface GetPrediction {
    round: number;
    threeDigital: number;
    twoDigital: number;
    prediction: string;
    isCorrect: boolean;
    type: string;
    numberPrediction: [];
    lottoType: string;
    forulaId: string;
    createdAt: Date;
    updatedAt: Date;
}

export const usePrediction = (id: string) => {
    const {data, error} = useSwr<GetPrediction[]>(`/api/formula/result/${id}`,API_Fetcher);
    
    return {
        data,
        isLoading: !error && !data,
        isError: error
    }
}
