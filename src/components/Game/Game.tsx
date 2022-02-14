import { BsFillPlusSquareFill } from 'react-icons/bs';
import { GuessBoard } from 'components/GuessBoard';
import { IconButton } from 'components/IconButton';
import { Keyboard } from 'components/Keyboard';
import { PegRow } from 'components/PegRow';
import { Guess, KeyboardActions, PegColor, PegColorsArray } from 'models';
import styles from './Game.module.css';
import { Link, Location } from 'react-router-dom';

interface GameProps {
  code: PegColor[];
  gameComplete: boolean;
  numberOfPegs: number;
  totalNumberOfGuesses: number;
  numberOfColors: number;
  currentGuess: PegColor[];
  guesses: Guess[];
  showIcons: boolean;
  location: Location;
  newGameCallback: () => void;
  keyboardCallback: (
    action: KeyboardActions,
    color?: PegColor | undefined,
  ) => void;
}

export const Game = ({
  code,
  gameComplete,
  numberOfPegs,
  totalNumberOfGuesses,
  numberOfColors,
  currentGuess,
  guesses,
  showIcons,
  location,
  newGameCallback,
  keyboardCallback,
}: GameProps) => {
  return (
    <div className={styles.game}>
      <div className={styles.codeRow}>
        <PegRow
          code={code}
          hideCode={!gameComplete}
          numberOfPegs={numberOfPegs}
          showIcons={showIcons}
        />
        <IconButton
          Icon={BsFillPlusSquareFill}
          onClick={() => newGameCallback()}
        />
        <Link to={`/settings`} state={{ backgroundLocation: location }}>
          Settings
        </Link>
        <Link to={`/how-to-play`} state={{ backgroundLocation: location }}>
          Help
        </Link>
        <Link to={`/new`} state={{ backgroundLocation: location }}>
          New
        </Link>
      </div>
      <div className={styles.guessBoard}>
        <GuessBoard
          currentGuess={currentGuess}
          guesses={guesses}
          numberOfPegs={numberOfPegs}
          totalNumberOfGuesses={totalNumberOfGuesses}
          gameComplete={gameComplete}
          showIcons={showIcons}
        />
      </div>
      <div className={styles.keyboard}>
        <Keyboard
          colors={PegColorsArray.slice(0, numberOfColors)}
          numberOfPegs={numberOfPegs}
          callback={keyboardCallback}
          showIcons={showIcons}
        />
      </div>
    </div>
  );
};
