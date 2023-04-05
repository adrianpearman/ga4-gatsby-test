import { useState, useEffect } from 'react';

function useSnowplowDomainUserId() {
  const [domainUserId, setDomainUserId] = useState('');

  useEffect(() => {
    if (window.snowplow) {
      // eslint-disable-next-line func-names
      window.snowplow(function () {
        setDomainUserId(this.cf.getDomainUserId());
      });
    }
  }, []);

  return domainUserId;
}

export default useSnowplowDomainUserId;
