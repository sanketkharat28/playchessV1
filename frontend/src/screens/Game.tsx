import { useEffect, useState } from "react";
import { Button } from "../components/Button"
import { ChessBoard } from "../components/ChessBoard"
import { useSocket } from "../hooks/useSocket"
import { Chess } from 'chess.js'

export const INIT_GAME = "init_game";
export const MOVE = "move";
export const GAME_OVER = "game_over"

export const Game = () => {
    const socket = useSocket();
    const [chess] = useState(new Chess());
    const [board, setBoard] = useState(chess.board());
    const [started, setStarted] = useState(false);


    useEffect(()=> {
        if(!socket){
            return;
        }

        socket.onmessage = (event)=> {
            const message = JSON.parse(event.data)
            switch(message.type) {
                case INIT_GAME:
                    setBoard(chess.board());
                    setStarted(true);
                    break;
                case MOVE:
                    const move = message.payload;
                    chess.move(move);
                    setBoard(chess.board());
                    break;
                case GAME_OVER:
                    console.log("Game Over");
                    break;
            }
        }
    },[socket, chess])

    if(!socket) return <div>Connecting...</div>
    return <div className="justify-center flex">
        <div className="pt-8 max-w-screen-lg w-full">
               <div className="grid grid-cols-6 gap-4 w-full">
                <div className="col-span-4 w-full flex justify-center">
                    <ChessBoard chess={chess} socket={socket} setBoard={setBoard} board={board}/>
                </div>
                <div className="col-span-2 bg-slate-900 w-full flex justify-center">
                    <div className="pt-8">
                    {!started && <Button onClick={()=> {
                        socket.send(JSON.stringify({
                            type: INIT_GAME
                        }))
                            }}>Play
                    </Button>}
                    {/* How to play section */}
              <div className="text-white pt-10">
                <h2 className="text-xl font-bold mb-2 text-center">
                  How to Start the Game
                </h2>
                <ul className="text-sm text-slate-300 space-y-2 list-disc list-inside">
                  <li>
                    first copy the url of this page and send it to your friend
                    and tell him to open that link on his pc/mobile
                  </li>
                  <li>
                    Now you click on the <strong>Play</strong> Button
                  </li>
                  <li>
                    Now tell your friend to click on the <strong>Play</strong>{" "}
                    button from his pc/mobile
                  </li>
                  <li>
                    You will see the <strong>Play</strong> button vanished from
                    both sides, so now the game has started
                  </li>
                  <li>
                    if you shared the link then you are white and your friend is
                    black
                  </li>
                </ul>
              </div>
              <div className="text-white pt-10">
                <h2 className="text-xl font-bold mb-2 text-center">
                  How to move the pieces
                </h2>
                <ul className="text-sm text-slate-300 space-y-2 list-disc list-inside">
                  <li>
                    Click on the piece you want to move and then click on the
                    square where you want it move
                  </li>
                  <li>
                    So first click is piece selection and second click is
                    selecting the square where you want to move the piece
                  </li>
                  <li>
                    on second click if you chose the square where the piece is
                    unable to go (invalid move) the piece wont move
                  </li>
                </ul>
              </div>
                    </div>
                </div>
               </div>
        </div>
    </div>
}