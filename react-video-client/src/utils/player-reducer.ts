import { types, PlayerUiState } from "@livelyvideo/video-client-web";

// Manages the list of the active players array
export const playerReducer = (
  players: any[],
  action: { type: any; ev: { peer: { peerId: any; }; player: types.PlayerAPI<types.VideoElement>; }; }
): Array<{ id: string; uiState: PlayerUiState }> => {
  switch (action.type) {
    case "addPlayer":
      return [
        ...players,
        {
          id: action.ev.peer.peerId,
          uiState: new PlayerUiState(action.ev.player),
        },
      ];
    case "removePlayer":
      return players.reduce((acc: any[], player: { uiState: { player: any; dispose: () => void; }; }) => {
        if (player.uiState.player === action.ev.player) {
          player.uiState.dispose();
          return acc;
        }
        acc.push(player);
        return acc;
      }, []);
    case "unmount":
      return players.reduce((acc: any, player: { playerUi: { dispose: () => void; }; }) => {
        player.playerUi.dispose();
        return acc;
      }, []);
    default:
      throw new Error();
  }
};