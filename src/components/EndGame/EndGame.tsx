import { useContext } from 'react';
import { ShowIconsState } from 'reducers/settingsReducer';
import { GlobalReducerContext } from 'providers/GlobalReducerContextProvider';
import { Button } from 'components/Button';
import { KeyRow } from 'components/KeyRow';
import { PegRow } from 'components/PegRow';
import { createBrokenEncodedGameSettings, encodeGameSettings } from 'logic';
import { Game, GameState, Key } from 'models';
import styles from './EndGame.module.css';

const KEY_EMOJIS = ['🔴', '⚪', '⚫'];

export const convertKeysToEmojis = (keys: Key[][], numberOfPegs: number) => {
  return keys
    .map((row) => {
      let emojis = row.map((key) => KEY_EMOJIS[key]);

      const blankKeys = numberOfPegs - row.length;
      for (let index = 0; index < blankKeys; index++) {
        emojis.push(KEY_EMOJIS[2]);
      }

      return emojis.join('');
    })
    .join('\n');
};

export const copyToClipboard = (game: Game) => {
  navigator.clipboard.writeText(
    `Codebreaker ${
      game.gameState === GameState.Loss ? 'X' : game.guesses.length
    }/${game.settings.totalNumberOfGuesses}

${convertKeysToEmojis(
  game.guesses.map((g) => g.keys),
  game.settings.numberOfPegs,
)}

https://codebreaker.eoin.co/?code=${createBrokenEncodedGameSettings(
      encodeGameSettings(game.code, game.settings),
    )}`,
  );
};

export const EndGame = () => {
  let { state } = useContext(GlobalReducerContext);

  return (
    <div className={styles.endGame}>
      {state.games.currentGame.gameState === GameState.Win ? (
        <h1>Great job! You cracked the code!</h1>
      ) : state.games.currentGame.gameState === GameState.Loss ? (
        <h1>You ran out of time.</h1>
      ) : (
        <h1>Quick, go back to crack this code.</h1>
      )}
      {state.games.currentGame.gameState !== GameState.Ongoing && (
        <>
          <div className={styles.codeRow}>
            <PegRow
              code={state.games.currentGame.code}
              numberOfPegs={state.games.currentGame.settings.numberOfPegs}
              showIcons={state.settings.showIcons === ShowIconsState.Show}
            />
          </div>
          <hr />
          <div>
            {state.games.currentGame.guesses
              .map((g) => g.keys)
              .map((k, index) => (
                <KeyRow
                  key={index}
                  keys={k}
                  numberOfPegs={state.games.currentGame.settings.numberOfPegs}
                />
              ))}
          </div>
          <div className={styles.buttonDiv}>
            <Button
              onClick={() => copyToClipboard(state.games.currentGame)}
              className={styles.button}
            >
              Share Result
            </Button>
          </div>
        </>
      )}
    </div>
  );
};
