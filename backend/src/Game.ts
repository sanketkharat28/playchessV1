import { Chess } from "chess.js";
import { WebSocket } from "ws";
import { GAME_OVER, INIT_GAME, MOVE } from "./messages.js";

export class Game {
  public player1: WebSocket;
  public player2: WebSocket;
  private board: Chess;
  private startTime: Date;
  private moveCount = 0;

  constructor(player1: WebSocket, player2: WebSocket) {
    this.player1 = player1;
    this.player2 = player2;
    this.board = new Chess();
    this.startTime = new Date();
    //.send() works BOTH ways - it's bidirectional:
    //sending message from server to client(player1)- this.player1.send(JSON.stringify({ type: "MOVE", payload: move }))
    //sending message from client to server - websocket.send(JSON.stringify({ type: "MAKE_MOVE", move: "e2e4" }))
    //Send a message to player 1 telling them the game is starting and they're playing as white
    this.player1.send(JSON.stringify({
            type : INIT_GAME,
            color : "white"
        }))
        //Send a message to player 2 telling them the game is starting and they're playing as black
     this.player2.send(JSON.stringify({
            type : INIT_GAME,
            color : "black"
        }))
  }

  makeMove(socket:WebSocket, move: {
    from: string;
    to: string
  }) {

    if(this.moveCount % 2 === 0 && socket !== this.player1) {
        return;
    }

    if(this.moveCount % 2 === 1 && socket !== this.player2) {
        return;
    }

    try {
        this.board.move(move);
    } catch(e) {
        console.log(e);
        return;
    }

    if(this.board.isGameOver()) {
        //send game over message to player 1 (from server to client)
        this.player1.send(JSON.stringify({
            type : GAME_OVER,
            payload : {
                winner : this.board.turn() === "w" ? "black" : "white"
            }
        }))
        //send game over message to player 2 (from server to client)
        this.player2.send(JSON.stringify({
            type : GAME_OVER,
            payload : {
                winner : this.board.turn() === "w" ? "black" : "white"
            }
        }))
        return;
    }

    //notifying the opponent about the move that was just made.
    if(this.moveCount % 2 === 0) {
        //.emit is wrong it only works on Socket.IO not on native websockets like ws, for that use .send
        //This means player 1 just made a move, so player 2 needs to know
        //remember we havent done moveCount++ yet so player1 has made the move
        this.player2.send(JSON.stringify({
            type : MOVE,
            payload : move
        }))
    } else {
        //This means player 1 just made a move, so player 2 needs to know
        //remember we havent done moveCount++ yet so player2 has made the move
        this.player1.send(JSON.stringify({
            type : MOVE,
            payload : move
        }))
    }
    this.moveCount++
    
    
  }
}
