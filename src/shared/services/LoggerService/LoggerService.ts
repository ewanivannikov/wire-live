const LoggerService = () => {
  return {
    debug: (value) => console.debug('%cDEBUG', "color:blue;", value),
    info: (value) => console.info('%cINFO', "color:green;", value),
    error: (value) => console.error('%cERROR', "color:red;", value),
  }
}

export const logger = LoggerService();
