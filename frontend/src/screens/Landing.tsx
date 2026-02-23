import { useNavigate } from "react-router-dom";
import { ChevronRight, Trophy, Users } from "lucide-react";

export const Landing = () => {
  const navigate = useNavigate();

  return (
    <div className="h-screen bg-amber-100 flex items-center overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="flex flex-col-reverse lg:flex-row items-center gap-8 lg:gap-16">
          <div className="w-full lg:w-1/2 space-y-8 text-center lg:text-left">
            <div className="space-y-4">
              <div className="inline-flex items-center rounded-full border border-yellow-500/50 bg-yellow-100 px-3 py-1 text-sm text-yellow-700">
                <Trophy className="mr-1 h-3.5 w-3.5 text-yellow-600" />
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-gray-800 leading-tight">
                Play chess online on the{" "}
                <span className="text-yellow-500">#2 Site!</span>
              </h1>
              <p className="text-lg text-gray-600 max-w-xl mx-auto lg:mx-0">
                Challenge players around the world, improve your skills, and
                join our growing community of chess enthusiasts.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <button
                className="bg-lime-500 hover:bg-lime-700 text-white font-medium px-8 py-3 rounded-lg text-lg group flex items-center justify-center shadow-lg hover:shadow-xl transition-all"
                onClick={() => {
                  navigate("/game");
                }}
              >
                Play Online
                <ChevronRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
              </button>

              <button
                onClick={() =>
                  (window.location.href = "https://lichess.org/learn")
                }
                className="border-2 border-yellow-400 text-yellow-600 hover:bg-yellow-50 px-8 py-3 rounded-lg text-lg transition-colors"
              >
                Learn Chess
              </button>
            </div>

            <div className="flex items-center justify-center lg:justify-start gap-8 pt-4">
              <div className="flex flex-col items-center lg:items-start">
                <span className="text-3xl font-bold text-yellow-500">4</span>
                <span className="text-sm text-gray-500">Daily Games</span>
              </div>
              <div className="w-px h-12 bg-yellow-200"></div>
              <div className="flex flex-col items-center lg:items-start">
                <span className="text-3xl font-bold text-yellow-500">10</span>
                <span className="text-sm text-gray-500">Active Players</span>
              </div>
            </div>
          </div>

          {/* Right image section */}
          <div className="w-full lg:w-1/2 flex justify-center">
            <div className="relative">
              <div className="absolute -inset-1 rounded-xl bg-gradient-to-r from-yellow-400 to-yellow-300 opacity-50 blur-lg"></div>
              <div className="relative overflow-hidden rounded-xl border border-yellow-200 shadow-xl">
                <img
                  src="/chessboard.jpeg"
                  alt="Chess board"
                  className="w-full max-w-lg max-h-[70vh] object-cover transform transition-transform hover:scale-105 duration-700"
                />
                <div className="absolute bottom-4 left-4 flex items-center gap-2 rounded-full bg-white/90 px-3 py-1 shadow-md backdrop-blur-sm">
                  <Users className="h-4 w-4 text-yellow-500" />
                  <span className="text-xs font-medium text-gray-800">
                    2 playing now
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
