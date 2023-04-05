import { useEffect, useState } from 'react';

function useSnowplowUserFingerprint() {
  const [userFingerprint, setUserFingerprint] = useState('');

  useEffect(() => {
    if (window.snowplow) {
      // eslint-disable-next-line func-names
      window.snowplow(function () {
        setUserFingerprint(this.cf.getUserFingerprint());
      });
    }
  }, [userFingerprint]);

  return userFingerprint;
}

export default useSnowplowUserFingerprint;
