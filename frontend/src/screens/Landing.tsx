export const Landing = () => {
    return <div className="flex justify-center">
        <div className="pt-8 max-w-screen-lg">
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <div className="flex justify-center">
                    <img src={"/chessboard1.jpg"} className="max-w-96"/>
                </div>
        <div className="pt-16">
            <div className="flex justify-center">
                <h1 className="text-4xl font-bold text-white">
                    Play Chess online on the #2 site
                </h1>
            </div>
            <div className="mt-4 flex justify-center">
                <button className="px-8 py-0 text-2xl bg-green-500 hover:bg-green-700 text-white font-bold rounded">
                    Play Online
                </button>
            </div>
        </div>
        
    </div>
        </div>
    </div>
}