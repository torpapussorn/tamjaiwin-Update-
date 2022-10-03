import {GetServerSideProps} from 'next';
import { useState } from 'react';
import { useAdmin } from 'src/hooks/useAdmin'
import { useRouter } from 'next/router'
import withAuthentication from './constant/withAuthentication';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLock } from '@fortawesome/free-solid-svg-icons';
import Swal from 'sweetalert2'

const Usersadmin = () => {
  const router = useRouter();
  const {data, isLoading, isError} = useAdmin();

  const [searchAdmin, setSearchAdmin] = useState('');
  if (isLoading || isError) return <div className='text-white'>Loading...</div>

  return (
    <>
      <div className='h-full min-h-[812px] flex justify-center'>
        <div className='md:w-[475px] w-[375px] px-[23.5px] mt-[30px]'>

          {/************************** Header Start **************************/}
          <div className='flex justify-between mt-[30px]'>
            <div className='flex items-center'>
              <img className='pr-[15px] pt-[2px]' src="/img/png/icon-menu.png" alt="" />
              <h1 className='text-[#FFF] text-[24px]'>peterpeter</h1>
            </div>
            <div className='flex items-center'>
              <FontAwesomeIcon icon={faLock} className='text-white cursor-pointer' fontSize={25} 
              onClick={() =>
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
              }/>
            </div>
          </div>
          {/************************** Header End **************************/}

          {/************************** Input Search Start **************************/}
          <div className='flex justify-center items-center'>
            <div className='md:w-[425px] w-[325px] h-[48px] bg-[#191626] rounded-[10px] flex my-[20px]'>
              <div className='p-[15px]'>
                <img className='w-[24px]' src="/img/png/icon-search.png" alt="" />
              </div>
              <input className=' w-full bg-[#191626] rounded-r-[10px] text-[#FFF] outline-none' type="text" placeholder='ค้นหาชื่อแอดมิน'
                    onChange={(e) => setSearchAdmin(e.target.value)}/>
            </div>
          </div>
          {/************************** Input Search End **************************/}

          <div className='text-[#FFF] text-[16px] mb-[20px]'>
            สูตรหวยยี่กี
          </div>

          {/************************** Users Admin Start **************************/}
          <div>
            {
              data?.filter((user) => user.name.toLocaleLowerCase().includes(searchAdmin)).map((o, index) => (
                <div className='grid-cols3 grid-flow-row mb-[20px] w-[327px] md:w-[425px] h-[80px] bg-[#191626] rounded-[10px]' key={index}>

                  <div className='flex md:justify-start md:ml-[20px] justify-center items-center'>
                    <img className='w-[64px] h-[64px] rounded-[14px]' src={`img/png/${o.image}.png`} alt="" />
                  </div>

                  <div className='text-[#FFF] ml-[5px] flex flex-col justify-center'>
                    <div className='flex text-[16px]'>
                      <img className='p-[5px]' src="/img/png/icon-favorite.png" alt="" />
                      <p>{o.name}</p>
                    </div>
                    <div className='p-[5px] text-[16px]'>
                      {o.percentWin}%
                    </div>
                  </div>

                  <div className='flex justify-end items-center mr-[20px] cursor-pointer'
                       onClick={() => {
                         router.push({
                           pathname: '/formula',
                           query: {
                             code: o.code,
                             name: o.name,
                             image: o.image,
                             type: 'yeekee-123'
                           }
                         })
                       }}>
                    <img src="/img/png/icon-next.png" alt="" />
                  </div>


                </div>
              ))
            }
          </div>
          {/************************** Users Admin End **************************/}

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
export default Usersadmin;
