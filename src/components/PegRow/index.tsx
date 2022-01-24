import { createArrayOfObject } from '../../logic/codes';
import { getPegStyling } from '../../logic/pegs';
import { PegColor } from '../../models';
import { EmptyPeg } from '../EmptyPeg';
import { HiddenPeg } from '../HiddenPeg';
import { Peg } from '../Peg';
import { PegIconChooser } from '../PegIconChooser';

interface PegRowProps {
  code: PegColor[];
  numberOfPegs: number;
  hideCode?: boolean;
  showIcons?: boolean;
}

export const PegRow = ({
  code,
  numberOfPegs,
  hideCode = false,
  showIcons = false,
}: PegRowProps) => {
  let pegsIndex: number[] = createArrayOfObject(0, numberOfPegs);

  return (
    <>
      {pegsIndex.map((_, index) => {
        if (code.length > index && code[index] !== PegColor.Blank) {
          if (hideCode || code[index] === PegColor.Hidden) {
            return <HiddenPeg key={index} />;
          }

          const pegStyling = getPegStyling.get(code[index]);
          const iconString: string =
            pegStyling?.icon ?? 'BsFillPatchQuestionFill';
          const IconComponent = showIcons ? (
            <PegIconChooser iconName={iconString} size="2rem" />
          ) : (
            <div />
          );

          return (
            <Peg
              key={index}
              color={pegStyling?.color ?? '#000'}
              ariaLabel={PegColor[code[index]]}
            >
              {IconComponent}
            </Peg>
          );
        } else {
          return <EmptyPeg key={index} />;
        }
      })}
    </>
  );
};
