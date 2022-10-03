import takeRight from 'lodash/takeRight';
import {GetServerSideProps} from 'next';
import {useRouter} from 'next/router'
import {useEffect, useState} from 'react';
import {GetPrediction, usePrediction} from 'src/hooks/usePrediction';
import withAuthentication from '../constant/withAuthentication';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleLeft } from '@fortawesome/free-solid-svg-icons';

const mockLastRow = [
  5,
  10,
  20,
  30
];
const Prediction = () => {

    const router = useRouter()
    const {id, name, percentWin, image, nameadmin} = router.query;
    const [result, setResult] = useState<GetPrediction[]>();
    const [predict, setPredict] = useState<GetPrediction>();
    const [isData, setIsData] = useState<GetPrediction[]>();
    const [rowActive, setRowActive] = useState<number>(0);
    const {data, isLoading, isError} = usePrediction(id ? `${id}` : '1');

    const lastData = (data?: GetPrediction[], n?: number) => {
        return takeRight(data, n);
    }
    useEffect(() => {
        const isCorrect = data?.filter((o) => o.isCorrect !== null);
        const prediction = data?.filter((o) => o.isCorrect === null);
        const lastDataNew = lastData(isCorrect, 5);
        setIsData(isCorrect);
        setResult(lastDataNew);
        setPredict(prediction?.shift());
        setRowActive(5);
    },[data]);
    const handleClickSort = (data?: GetPrediction[], n?: number) => {
        const dataNew = lastData(data, n);
        setRowActive(n || 5);
        setResult(dataNew);
    }
    
    if(isLoading || isError) return <div>Loading...</div>

    return (
        <>
            <div className='h-full min-h-[812px] flex justify-center mt-[30px]'>
                <div className='md:w-[475px] w-[375px] px-[23.5px]'>
                    
                    {/************************** Header Start **************************/}
                    <div className='grid grid-cols2-detail mb-[30px]'>
                        <div className='text-white'>
                        <FontAwesomeIcon icon={faAngleLeft} fontSize={30} className='cursor-pointer' onClick={() => router.back()} />
                            <div>
                                <p className='text-[24px] pt-[20px]'>{nameadmin}</p>
                            </div>
                            
                            <div className='flex my-[10px]'>
                                <p className='text-[20px] mr-[5px]'>
                                    {name}- สูตร 1</p>
                                <div className='mt-[2px]'>
                                    <span className='w-[70px] h-[25px] bg-[#191626] rounded-[12px] text-white text-[12px] flex justify-center items-center'>
                                        {parseFloat(`${percentWin}`).toFixed(2)} %
                                    </span>
                                </div>
                            </div>

                            <div className='flex'>
                                <img className='p-[5px]' src="/img/png/icon-i.png" alt="" /><p className='text-[16px]'>วิธีเล่น : กดสองตัวบน + รูดหน้า</p>
                            </div>

                        </div>

                        <div className='flex justify-end'>
                            <img className='md:w-[70px] md:h-[70px] w-[60px] h-[60px]' src={`/img/png/${image}.png`} alt="" />
                        </div>
                    </div>
                    {/************************** Header End **************************/}

                    {/************************** Btn number Start **************************/}
                    <div className='md:w-[425px] w-[327px] h-[80px] bg-[#940CFF] bg-opacity-[53%] rounded-[12px] flex items-center'>  
                        <div className='w-[96px] h-[80px] bg-[#F2B551] rounded-[12px] text-white flex items-center text-center justify-center'>
                            <div className='mt-[-10px]'>
                                <p className='text-[14px]'>แนวทางรอบ </p>
                                <p className='text-[30px] font-semibold mt-[5px]'>
                                   {predict?.round}
                                </p>
                            </div>
                        </div>
                        <div className='md:w-[329px] w-[231px] h-[80px] flex justify-center items-center text-white text-[40px] font-semibold'>
                            {predict?.prediction}
                        </div>
                    </div>
                    {/************************** Btn number Start **************************/}

                    <button className='md:w-[425px] w-[327px] h-[43px] bg-[#940CFF] text-white text-[16px] rounded-[12px] mt-[20px]'>
                        แทงทันที
                    </button>

                    {/************************** Pradict table Start **************************/}
                    <div>

                        <p className='text-white text-[16px] py-[20px]'>ตรวจสอบผลย้อนหลัง</p>

                        <div className='flex flex-row justify-center gap-[1rem] pb-[20px]'>
                            {mockLastRow.map((o) => (
                              <div onClick={() => handleClickSort(isData, o)} className={`md:w-[90px] w-[70px] h-[40px] rounded-[100px] border-[1px] border-opacity-[60%] flex justify-center items-center cursor-pointer text-white ${rowActive === o ? 'bg-[#F2B551] text-white border-[#F2B551]': 'hover:bg-[#F2B551] text-opacity-[60%]'} hover:border-[#F2B551] hover:text-white`}>
                                  <p>
                                      {o} รอบ</p>
                              </div>
                            ))}
                        </div>

                        <div className='md:w-[425px] w-[327px] h-[45px] grid grid-cols-5 text-[16px] text-white bg-[#191626] rounded-[12px] mb-[10px]'>
                            <div className='flex justify-center items-center'>
                                รอบ
                            </div>
                            <div className='flex justify-center items-center'>
                                ผลบน
                            </div>
                            <div className='flex justify-center items-center'>
                                ผลล่าง
                            </div>
                            <div className='flex justify-center items-center'>
                                แนวทาง
                            </div>
                            <div className='flex justify-center items-center'>
                                ผล
                            </div>
                        </div>

                            {
                                result?.map((o, index) => (
                                    <div className='md:w-[425px] w-[327px] h-[32px] grid grid-cols-5 text-[16px] text-white bg-[#191626]' key={index}>
                                        <div className='flex justify-center items-center'>
                                            {o.round}
                                        </div>
                                        <div className='flex justify-center items-center'>
                                            {o.threeDigital}
                                        </div>
                                        <div className='flex justify-center items-center'>
                                            {o.twoDigital}
                                        </div>
                                        <div className='flex justify-center items-center'>
                                            {o.prediction}
                                        </div>
                                        <div className='flex justify-center items-center'>
                                            {o.isCorrect ? <img src="/img/svg/icon-correct.svg"/> : <img src="/img/svg/icon-close.svg"/>}
                                        </div>
                                    </div>
                                ))

                            }
                        
                    </div>
                    {/************************** Pradict table End **************************/}
                    
                </div>
            </div>
        </>
    )
}
export const getServerSideProps: GetServerSideProps = async ctx => {
    await withAuthentication(ctx, {});
    return {
        props: {},
    };
};
export default Prediction;
