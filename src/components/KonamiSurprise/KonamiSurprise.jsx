/* eslint-disable jsx-a11y/media-has-caption */
import React, { useCallback, useEffect, useState } from 'react';

import ConfettiAnimation from '../ConfettiAnimation/ConfettiAnimation';
import PopupImage from '../../assets/images/juno-pride-popup.png';
import AlertSound from '../../assets/sounds/error.wav';

import * as KonamiSurpriseStyles from './KonamiSurprise.module.scss';

const KonamiSurprise = ({ password, alternatePassword, hintMessage }) => {
  const [userRecord, setUserRecord] = useState([]);
  const [codeMatch, setCodeMatch] = useState(false);
  const [hintShown, setHintShown] = useState(false);

  // wrap callback in useCallback to memo-ize the definition and prevent re-renders, function only changes when one of it's dependencies changes
  const addKeyToRecord = useCallback(
    (key) => {
      const newRecord = [...userRecord.slice(-password.length + 1), key];
      setUserRecord(newRecord);

      if (newRecord.join('') === password || newRecord.join('') === alternatePassword) {
        setCodeMatch(true);
      }
    },
    [userRecord, password, alternatePassword]
  );

  const [newKey, setNewKey] = useState('');
  // Register a callback which will execute whenever there's a new 'newKey' state value
  useEffect(() => {
    if (newKey) {
      addKeyToRecord(newKey);
      setNewKey('');
    }
  }, [newKey, addKeyToRecord]);

  useEffect(() => {
    // declare handler inside the useEffect so it's not a dependency (updates handler each time the useEffect runs)
    const handleKeyUp = ({ target, key }) => {
      if (target.closest('input,select,button,textarea')) {
        return;
      }
      // reset popup if it is up, and won't affect key sequence
      if (key === 'Escape') {
        setCodeMatch(false);
        return;
      }
      setNewKey(key);
    };

    window.addEventListener('keyup', handleKeyUp);
    return () => {
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, []); // only register/remove listener on mount/unmount

  const resetLog = () => {
    setCodeMatch(false);
    setUserRecord([]);
  };
  // render the hint message once on Component load;
  useEffect(() => {
    if (hintMessage && !hintShown) {
      // eslint-disable-next-line no-console
      console.log(hintMessage);
      setHintShown(true);
    }
  }, [hintMessage, hintShown]);

  return (
    <>
      {codeMatch && (
        <div className={KonamiSurpriseStyles.popup}>
          <ConfettiAnimation loopDuration={7000} />
          <audio src={AlertSound} autoPlay aria-hidden="true" />
          <div className={KonamiSurpriseStyles.contentWrapper}>
            <img
              src={PopupImage}
              alt="A pixel art graphic design of a pop up message that says 'Happy Pride from the Juno Team'."
            />
            <button
              type="button"
              aria-label="Close pop up"
              onClick={resetLog}
              className={KonamiSurpriseStyles.resetButton}
            />
          </div>
        </div>
      )}
    </>
  );
};

export default KonamiSurprise;
