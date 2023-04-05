function trackSnowplowEmail(email) {
  if (window.snowplow) {
    window.snowplow('setUserId', email);
    window.snowplow('trackStructEvent', 'tracking', 'identify', email);
  }
}

export default trackSnowplowEmail;
