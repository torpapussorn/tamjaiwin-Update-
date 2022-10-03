import {useState, useEffect} from 'react';
import DefaultLayout from 'src/components/Layout/DefaultLayout';
import { Page } from 'src/types/page';
import withAuthentication from 'src/pages/constant/withAuthentication';
import { GetServerSideProps } from 'next';

import axios from 'axios';
import {LIVE_TOKEN, REMEMBER_ME, TJW_TOKEN} from '../../pages/constant/cookie';
import {setCookie, parseCookies} from 'nookies';
import dayjs from 'dayjs';
import Swal from 'sweetalert2'

interface LoginResponse {
    accessToken: 'string';
    livebetToken: 'string';
}

const IndexPage: Page = () => {

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    
    const [remember, setRemember] = useState(false);
    const year = dayjs().add(1, 'year').toDate();

    const submit = async () => {
        if(!username || !password) return;
        await axios
            .post<LoginResponse>('/api/auth/login', {
                username: username,
                password: password,
            })
            .then(async res => {
                setCookie(null, LIVE_TOKEN, res.data.livebetToken, {
                    path: '/',
                    expires: remember ? year : null,
                });
                setCookie(null, TJW_TOKEN, res.data.accessToken, {
                    path: '/',
                    expires: remember ? year : null,
                });
                window.location.reload();
            })
            .catch(() => Swal.fire({
                icon: 'error',
                title: 'ชื่อผู้ใช้งาน หรือ รหัสผ่าน',
                text: 'ไม่ถูกต้อง !',
              })
            );
    };

    const clickRemember = () => {
        setCookie(null, REMEMBER_ME, JSON.stringify(!remember), {path: '/', expires: year});
        setRemember(!remember);
    };

    useEffect(() => {
        setRemember(JSON.parse(parseCookies()[REMEMBER_ME] || 'false'));
    }, [])
    
    return (
        <>
            <div className='h-screen min-h-[600px] flex items-center justify-center'>
                <div className='bg-[#fff] w-[335px] h-[564px] rounded-[50px] flex justify-center items-center flex-col'>
                <img src="/img/png/login-logo.png" alt="" />
                <div className='mt-2.5 mb-10'>
                    <h1 className='text-[16px]'>T A M J A I W I N</h1>
                </div>

                <div className='flex flex-col'>
                    <div className='flex bg-[#F8F7FB] w-[305px] h-[48px] rounded-[40px] mb-[12px]'>
                    <div className='p-[16px]'>
                        <img src="/img/png/icon-user.png" className='w-[16px]' alt="" />
                    </div>
                        <input className='bg-[#F8F7FB] w-full h-[48px] rounded-r-[40px] outline-none' 
                        type="text" placeholder='ชื่อผู้ใช้งาน' 
                        onChange={(e) => setUsername(e.target.value)} />
                    </div>

                    <div className='flex bg-[#F8F7FB] w-[305px] h-[48px] rounded-[40px]'>
                    <div className='p-[16px]'>
                        <img src="/img/png/icon-lock.png" className='w-[16px]' alt="" />
                    </div>
                        <input className='bg-[#F8F7FB] w-full h-[48px] rounded-r-[40px] outline-none' 
                        type="password" placeholder='รหัสผ่าน' 
                        onChange={(e) => setPassword(e.target.value)}/>
                    </div>                
                </div>

                <div className='flex items-center justify-between py-[20px] w-[305px]'>
                    <label className='block_checkbox text-[16px]'>
                    จำรหัสผ่าน
                    <input type="checkbox" onClick={clickRemember} />
                    <span className='check_mark'></span>
                    </label>
                    <div className='text-[16px] text-[#979a9c] pr-[4px] cursor-pointer'>
                        <p>ลืมรหัสผ่าน?</p>
                    </div>
                </div>

                <button className='text-[15px] font-medium w-[245px] h-[50px] rounded-[25px] bg-[#8130C1] text-[#FFF]'
                            onClick={submit}>เข้าสู่ระบบ
                </button>
                </div>
            </div>
        </>
    )
}

IndexPage.Layout = DefaultLayout;

export const getServerSideProps: GetServerSideProps = async ctx => {
    await withAuthentication(ctx, { guestOnly: true });
    return {
      props: {},
    };
};
  
  
export default IndexPage;
