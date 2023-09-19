import { useNavigate } from "react-router-dom";

export default function Error() {
    const navigate = useNavigate();

    return (
        <div className={`wh-full flex-c-c bg-base`}>
            <main className="flex-col items-center">
                <h2 className="mt-0 mb-0 lxgwr text-base">页面未找到</h2>
                <p className="mb6 text-16px lxgwr text-base">这里没有你想要的资源，请去其它地方寻找</p>
                <button className="justify-self-end w-100px py-1.5 lxgwr cursor-pointer" onClick={() => {navigate('/')}}>回到主页</button>
            </main>
        </div>
    );
}