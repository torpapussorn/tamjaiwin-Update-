import {GetServerSideProps} from 'next';
import {useEffect, useState} from 'react'
import { useFormula } from 'src/hooks/useFormula'
import { useRouter } from 'next/router'
import Swal from 'sweetalert2'
import withAuthentication from '../constant/withAuthentication';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleLeft } from '@fortawesome/free-solid-svg-icons';

const Formula = () => {
    
    const router = useRouter();
    const {name, image, code, type} = router.query;
    const [codeFormula, setCodeFormula] = useState('namwan');
    const [typeFormula, setTypeFormula] = useState('yeekee-123');
    const {data, isLoading, isError} = useFormula(codeFormula, typeFormula);

    const img = image;
    const nameadmin = name;

    const [searchFormula, setSearchFormula] = useState('');
    const handleYeekee = (data: string) => {
        setTypeFormula(data);
    }
    useEffect(() => {
        setCodeFormula(`${code}`);
        setTypeFormula(`${type}`);
    }, [code, type])

    if (isLoading || isError) return <div className='text-white'>Loading...</div>
    return (
        <>
            <div className='h-full min-h-[812px] flex justify-center'>
                <div className='md:w-[475px] w-[375px] px-[23.5px] mt-[30px]'>

                    {/************************** Header Start **************************/}
                    <div className='grid grid-cols-2'>
                        <div className='text-white'>
                            <FontAwesomeIcon icon={faAngleLeft} fontSize={30} className='cursor-pointer' onClick={() => router.back()} />
                            <p className='text-[24px] pt-[20px]'>
                                {name}
                            </p>
                        </div>

                        <div className='flex justify-end cursor-pointer'>
                            <img className='md:w-[70px] md:h-[70px] w-[60px] h-[60px]' src={`/img/png/${image}.png`} alt="" onClick={() => (
                                Swal.fire({
                                    title: 'ต้องการออกจากระบบ ?',
                                    text: "ใช่หรือไม่ !",
                                    icon: 'warning',
                                    showCancelButton: true,
                                    confirmButtonColor: '#3085d6',
                                    cancelButtonColor: '#d33',
                                    confirmButtonText: '<a href="/logout">ออกจากระบบ</a>',
                                    cancelButtonText: 'ยกเลิก'
                                  })
                            )}/>
                        </div>
                        
                        
                    </div>
                    {/************************** Header End **************************/}
                    
                    {/************************** Input Search Start **************************/}
                    <div className='md:w-[425px] w-[327px] h-[48px] bg-[#191626] rounded-[10px] flex my-[20px]'>
                        <div className='p-[15px]'>
                            <img className='w-[24px]' src="/img/png/icon-search.png" alt="" />
                        </div>
                        <input className=' w-full bg-[#191626] rounded-r-[10px] text-[#FFF] outline-none' type="text" placeholder='ค้นหาสูตร'
                                onChange={(e) => setSearchFormula(e.target.value)}/>
                    </div>
                    {/************************** Input Search End **************************/}

                    {/************************** List Data Start **************************/}

                    <div className="flex justify-center items-center text-center w-full gap-[1rem] cursor-pointer">
                        <div onClick={() => handleYeekee('yeekee-123')} className={`flex justify-center items-center w-[100px] h-[40px] rounded-[100px] border-[1px] border-opacity-[60%] border-white p-[6px] ${typeFormula === 'yeekee-123' ? 'bg-[#F2B551] border-[#F2B551] text-opacity-[100%] border-opacity-[100%]' : 'text-opacity-[60%] border-opacity-[60%]' } hover:bg-[#F2B551] hover:border-[#F2B551]`}>
                            <p className="text-white hover:text-white text-[14px]"
                                >ยี่กี 123</p>
                        </div>
                        <div onClick={() => handleYeekee('yeekee')} className={`flex justify-center items-center w-[100px] h-[40px] rounded-[100px] border-[1px] border-white p-[6px] ${typeFormula === 'yeekee' ? 'bg-[#F2B551] text-opacity-[100%] border-opacity-[100%] border-[#F2B551]' : 'text-opacity-[60%] border-opacity-[60%]' } hover:bg-[#F2B551] hover:border-[#F2B551] active`}>
                            <p className="text-white hover:text-white text-[14px]">ยี่กี 88</p>
                        </div>
                    </div>
                    
                    {/************************** List Data End **************************/}

                    <div className='text-white text-[16px] flex my-[20px]'>
                        <span className='mr-[10px]'>สูตรหวยยี่กี</span> : <span className='ml-[10px]'>{name}</span>
                    </div>

                    {/************************** Data Formula Start **************************/}
                    {
                        data?.filter((formula) => formula.name.toLocaleLowerCase().includes(searchFormula)).map((o, index) => (
                        <div className='grid grid-cols2 grid-flow-row mb-[20px] md:w-[425px] w-[327px] h-[80px] bg-[#191626] rounded-[10px]' key={index}>

                            <div className='text-[#FFF] ml-[15px] flex flex-col justify-center'>
                                <div className='flex'>
                                    <img className='p-[5px] cursor-pointer' src="/img/png/icon-favorite-none.png" alt="" />
                                    <p>{o.name}</p>
                                </div>
                                <div className='p-[5px]'>
                                    {o.percentWin?.toFixed(2)} %
                                </div>
                            </div>
                            
                            <div className='flex items-center cursor-pointer' onClick={() => {
                                router.push({
                                    pathname: '/prediction',
                                    query: {
                                        id: o._id,
                                        name: o.name,
                                        percentWin: o.percentWin,
                                        image: img,
                                        nameadmin: nameadmin
                                    }
                                })
                            }}>
                                <img src="/img/png/icon-next.png" alt="" />
                            </div>

                        </div>
                        ))
                    }
                    {/************************** Data Formula End **************************/}
                    
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
export default Formula;
