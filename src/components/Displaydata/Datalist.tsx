import ScrollContainer from "react-indiana-drag-scroll";
const mockup = [
    { name: 'ยี่กี 123'},
    { name: 'ยี่กี 88'}
]

const Datalist = () => {
    return (
        <ScrollContainer>
            <div className="flex justify-center items-center text-center w-[400px] gap-[.7rem] cursor-pointer">
                {
                    mockup?.map((o, index) => (
                        <div className="w-[100px] h-[40px] rounded-[100px] border-[1px] border-opacity-[60%] border-white p-[6px] hover:bg-[#F2B551] hover:border-[#F2B551]" key={index}>
                            <p className="text-white text-opacity-[60%] hover:text-white text-[14px]">{o.name}</p>
                        </div>
                    ))
                }
            </div>
        </ScrollContainer>
    )
}

export default Datalist;