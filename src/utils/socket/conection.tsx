import { io, Socket } from 'socket.io-client';

class SocketService {
    private static instance: SocketService;
    private socket: Socket | null = null;
    private readonly SOCKET_URL = 'https://erpconnectivity.qasar.app'; // Ajusta esta URL según tu backend

    private constructor() {
        this.initializeSocket();
    }

    private initializeSocket() {
        this.socket = io(this.SOCKET_URL, {
            transports: ['websocket'],
            autoConnect: true,
            reconnection: true,
            reconnectionAttempts: 5,
            reconnectionDelay: 1000,
        });

        this.socket.on('connect', () => {
            console.log('Socket conectado:', this.socket?.id);
        });

        this.socket.on('disconnect', (reason) => {
            console.log('Socket desconectado:', reason);
        });

        this.socket.on('connect_error', (error) => {
            console.error('Error de conexión:', error);
        });
    }

    public static getInstance(): SocketService {
        if (!SocketService.instance) {
            SocketService.instance = new SocketService();
        }
        return SocketService.instance;
    }

    public getSocket(): Socket | null {
        return this.socket;
    }

    public emit(event: string, data: any) {
        if (this.socket) {
            this.socket.emit(event, data);
        }
    }

    public on(event: string, callback: (data: any) => void) {
        if (this.socket) {
            this.socket.on(event, callback);
        }
    }

    public off(event: string) {
        if (this.socket) {
            this.socket.off(event);
        }
    }

    public disconnect() {
        if (this.socket) {
            this.socket.disconnect();
        }
    }
}

export const socketService = SocketService.getInstance();
