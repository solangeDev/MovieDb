const {
  PHASE_DEVELOPMENT_SERVER,
  PHASE_PRODUCTION_BUILD,
  PHASE_PRODUCTION_SERVER,
} = require("next/constants");

module.exports = (phase, { defaultConfig }) => {
  if (phase === PHASE_DEVELOPMENT_SERVER) {
    return {
      env: {
        API_HOST: "https://api.themoviedb.org",
        API_KEY: "7d102a49e272bde5b3c9d479fa83b2cd",
        ACCESS_TOKEN:
          "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI3ZDEwMmE0OWUyNzJiZGU1YjNjOWQ0NzlmYTgzYjJjZCIsInN1YiI6IjYwMTcyNTQ2YmIxMDU3MDAzZjk0NmJmYSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.OpCX4pHBvaAFEebIcz4bURW_oTZ0J2Oisx6Hv_pDUjY",
      },
    };
  } else if (phase === PHASE_PRODUCTION_SERVER) {
    return {
      env: {
        customKey: "estoy en produccion server",
      },
    };
  } else if (phase === PHASE_PRODUCTION_BUILD) {
    return {
      env: {
        API_HOST: "https://api.themoviedb.org",
        API_KEY: "7d102a49e272bde5b3c9d479fa83b2cd",
        ACCESS_TOKEN:
          "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI3ZDEwMmE0OWUyNzJiZGU1YjNjOWQ0NzlmYTgzYjJjZCIsInN1YiI6IjYwMTcyNTQ2YmIxMDU3MDAzZjk0NmJmYSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.OpCX4pHBvaAFEebIcz4bURW_oTZ0J2Oisx6Hv_pDUjY",
      },
    };
  }

  return {
    /* config options for all phases except development here */
  };
};
