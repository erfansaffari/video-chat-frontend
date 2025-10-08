export type ConnectionStatus = 'idle' | 'requesting-permissions' | 'waiting' | 'connecting' | 'connected' | 'error';

export interface MatchedEvent {
  partnerId: string;
  initiator: boolean;
  roomId: string;
}

export interface SignalEvent {
  from: string;
  signal: any;
}

export interface MediaError {
  type: 'permissions' | 'connection' | 'network';
  message: string;
}

