import { WebSocket } from "ws";
export declare class Gamemanager {
    private games;
    private pendingUser;
    private users;
    constructor();
    addUser(socket: WebSocket): void;
    removeUser(socket: WebSocket): void;
    private addHandler;
}
//# sourceMappingURL=Gamemanager.d.ts.map