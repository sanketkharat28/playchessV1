import { Chess } from "chess.js";
import { WebSocket } from "ws";

export class Game {
  private player1: WebSocket;
  private player2: WebSocket;
  private board: Chess;
  private startTime: Date;

  constructor(player1: WebSocket, player2: WebSocket) {
    this.player1 = player1;
    this.player2 = player2;
    this.board = new Chess();
    this.startTime = new Date();
  }

  makeMove(socket:WebSocket, move: {
    from: string;
    to: string
  }) {

    if(this.board.moves.length % 2 === 0 && socket !== this.player1) {
        return;
    }

    if(this.board.moves.length % 2 === 1 && socket !== this.player2) {
        return;
    }

    try {
        this.board.move(move);
    } catch(e) {
        return;
    }
    
  }
}
