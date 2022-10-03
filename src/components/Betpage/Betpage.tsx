
const Betpage = () => {
    return (
        <>
            <div className='h-full flex justify-center bg-[#19043D]'>
                <div className='w-[375px] px-[20px] mt-[30px]'>
                    <div className='flex justify-between items-center text-[14px]'>
                        <p className='text-white text-opacity-[60%]'>ยอดเงินทั้งหมด</p>
                        <span className='text-[#61CDA8]'>60.00</span>
                    </div>

                    <div className='flex justify-center gap-2 my-[20px]'>
                        <label className='text-yellow-500 border border-purple-500 rounded-lg flex items-center justify-center w-[40px] h-[40px]'> - </label>
                        <label className='text-yellow-500 border border-purple-500 rounded-lg flex items-center justify-center w-[40px] h-[40px]'> - </label>
                    </div>

                    <div className='grid grid-cols-3 gap-2'>
                        <button type='button' className='outline-none w-[107px] h-[35px] text-[18px] bg-[#31165F] bg-opacity-[90%] rounded-[5px] text-white'>1</button>
                        <button type='button' className='outline-none w-[107px] h-[35px] text-[18px] bg-[#31165F] bg-opacity-[90%] rounded-[5px] text-white'>2</button>
                        <button type='button' className='outline-none w-[107px] h-[35px] text-[18px] bg-[#31165F] bg-opacity-[90%] rounded-[5px] text-white'>3</button>
                        <button type='button' className='outline-none w-[107px] h-[35px] text-[18px] bg-[#31165F] bg-opacity-[90%] rounded-[5px] text-white'>4</button>
                        <button type='button' className='outline-none w-[107px] h-[35px] text-[18px] bg-[#31165F] bg-opacity-[90%] rounded-[5px] text-white'>5</button>
                        <button type='button' className='outline-none w-[107px] h-[35px] text-[18px] bg-[#31165F] bg-opacity-[90%] rounded-[5px] text-white'>6</button>
                        <button type='button' className='outline-none w-[107px] h-[35px] text-[18px] bg-[#31165F] bg-opacity-[90%] rounded-[5px] text-white'>7</button>
                        <button type='button' className='outline-none w-[107px] h-[35px] text-[18px] bg-[#31165F] bg-opacity-[90%] rounded-[5px] text-white'>8</button>
                        <button type='button' className='outline-none w-[107px] h-[35px] text-[18px] bg-[#31165F] bg-opacity-[90%] rounded-[5px] text-white'>9</button>

                        <button type='button' className='outline-none w-[107px] h-[35px] text-[18px] bg-[#31165F] bg-opacity-[90%] rounded-[5px] text-white'>
                            <div className='flex justify-center items-center text-center'>
                                <img className='w-[15px]' src='img/png/icon-trash.png' />
                            </div>
                        </button>

                        <button type='button' className='outline-none w-[107px] h-[35px] text-[18px] bg-[#31165F] bg-opacity-[90%] rounded-[5px] text-white'>0</button>
                        <button type='button' className='outline-none w-[107px] h-[35px] text-[18px] bg-[#31165F] bg-opacity-[90%] rounded-[5px] text-white'>
                            <div className='flex justify-center items-center text-center'>
                                <img className='w-[15px]' src='img/png/icon-delete.png' />
                            </div>
                        </button>
                    </div>

                    <div className='flex justify-center items-center text-center text-[14px] text-white w-full h-[40px] bg-[#31165F] bg-opacity-[90%] rounded-[5px] mt-[20px] mb-[10px]'>
                        <img className='w-[15px]' src='img/svg/favorite-with-circle.svg' alt="" />
                        <p>โหลดโพย</p>
                    </div>

                    <div className='text-[12px] bg-white rounded-[5px] p-[10px] mb-[10px]'>
                        <div>
                            <p>รายการแทงเลข <span className='text-purple-500'>0</span> รายการ</p>
                        </div>
                        <div>
                            <p>- ยังไม่มีรายการ -</p>
                        </div>
                    </div>

                    <button type='button' className='w-full h-[40px] bg-[#F5C042] rounded-[5px] flex justify-center items-center text-[16px]'><img className='pr-1 pt-[3px]' src='img/svg/casino-chip.svg' alt="" />ตรวจสอบรายการ / ตั้งราคาซื้อ</button>

                    <div className='mt-[50px]'>
                        <h3 className='text-yellow-500 text-[16px] pb-[10px]'>ตามใจเบ็ต</h3>
                        <p className='text-white text-[12px]'>หวยออนไลน์ คาสิโนสด เกมส์ ครบจบที่เดียว คืนยอดเสีย 10% และ มีโบนัสแจกกว่า 100,000 บาททุกวัน ฝาก-ถอน ออโต้ 30 วินาที</p>
                    </div>

                    <div className='my-[10px]'>
                        <h3 className='text-yellow-500 text-[16px] pb-[10px]'>หวยออนไลน์</h3>
                        <div className='text-[12px] text-white grid grid-cols-2 grid-rows-3 h-[111px]'>
                            <a href="">หวยรัฐบาล</a>
                            <a href="">หวยหุ้นไทย/ต่างประเทศ</a>
                            <a href="">หวยลาว</a>
                            <a href="">หวยยี่กี/หวยยี่กี123</a>
                            <a href="">หวยเวียดนาม (ฮานอย)</a>
                            <a href="">หวยมาเลย์</a>
                        </div>
                    </div>

                    <div className='my-[10px]'>
                        <h3 className='text-yellow-500 text-[16px] pb-[10px]'>คาสิโนออนไลน์</h3>
                        <div className='text-[12px] text-white grid grid-cols-2 grid-rows-3 h-[111px]'>
                            <a href="">CT855 Casino</a>
                            <a href="">SA Gaming</a>
                            <a href="">WM Casino</a>
                            <a href="">Pragmatic Play</a>
                            <a href="">Sexy Gaming</a>
                        </div>
                    </div>

                    <div className='my-[10px]'>
                        <h3 className='text-yellow-500 text-[16px] pb-[10px]'>สล็อต/เกม</h3>
                        <div className='text-[12px] text-white grid grid-cols-2 grid-rows-2 h-[111px]'>
                            <a href="">PG Soft</a>
                            <a href="">Pragmatic Play</a>
                            <a href="">Joker Gaming</a>
                            <a href="">HOH Play</a>
                        </div>
                    </div>

                    <div className='my-[10px]'>
                        <h3 className='text-yellow-500 text-[16px] pb-[10px]'>กีฬา</h3>
                        <div className='text-[12px] text-white grid grid-cols-2 grid-rows-2 h-[111px]'>
                            <a href="">Obet SportBook</a>
                        </div>
                    </div>

                    

                </div>
            </div>
        </>
    )
}

export default Betpage;