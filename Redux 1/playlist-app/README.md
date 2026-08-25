# Redux Playlist App

A small React + Redux app that manages a playlist (add/remove songs), built to
walk through core Redux concepts.

## What's inside

| Part | Where |
|------|-------|
| 1. `addSong` action creator | `src/actions/songActions.js` |
| 2. `playlistReducer` + test | `src/reducers/playlistReducer.js`, `test/testReducer.js` |
| 3. Store setup + dispatch demo | `src/store/store.js`, `src/index.js` |
| 4. React + `Provider` + `useSelector` | `src/index.js`, `src/components/Playlist.jsx` |
| 5. `removeSong` action + Remove button | `src/actions/songActions.js`, `src/reducers/playlistReducer.js`, `src/components/Playlist.jsx` |

## Run the full app

```bash
npm install
npm start
```

Opens at `http://localhost:3000`. On load, the app dispatches two `addSong`
actions ('Kesariya' and 'Shape of You') and logs the resulting state to the
browser console — you'll also see them appear in the UI. Type a song name and
click **Add** to add more, or click **Remove** next to any song to delete it.

## Run just the reducer test (no install needed)

```bash
node test/testReducer.js
```

This runs a standalone, dependency-free copy of the reducer through a handful
of assertions (add to empty list, add to existing list, remove by name,
unknown action is a no-op).

## How it works

- **Actions** (`songActions.js`) are plain objects with a `type` and a
  `payload` — `addSong('X')` → `{ type: 'ADD_SONG', payload: 'X' }`.
- **Reducer** (`playlistReducer.js`) is a pure function: given the current
  playlist array and an action, it returns a *new* array (using spread for
  add, `.filter()` for remove) rather than mutating the original.
- **Store** (`store.js`) is created with `createStore(playlistReducer)`.
- **React integration**: `<Provider store={store}>` in `index.js` makes the
  store available everywhere; `Playlist.jsx` reads it with `useSelector` and
  dispatches actions with `useDispatch`, so the UI re-renders automatically
  whenever the state changes.
