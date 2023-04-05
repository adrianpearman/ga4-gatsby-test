import React from 'react';
import useSnowplowDomainUserId from '../../hooks/useSnowplowDomainUserId';
import useSnowplowUserFingerprint from '../../hooks/useSnowplowUserFingerprint';

const SnowplowHiddenFormInputs = () => {
  const userFingerprint = useSnowplowUserFingerprint();
  const domainUserId = useSnowplowDomainUserId();
  return (
    <>
      <input
        type="hidden"
        id="SnowplowUserFingerprint"
        name="SnowplowUserFingerprint"
        value={userFingerprint}
      />
      <input
        type="hidden"
        id="SnowplowDomainUserId"
        name="SnowplowDomainUserId"
        value={domainUserId}
      />
    </>
  );
};

export default SnowplowHiddenFormInputs;
