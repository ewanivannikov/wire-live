const LoggerService = () => {
  return {
    debug: (...args) => console.debug('%cDEBUG', "color:blue;", args.join(' ')),
    info: (...args) => console.info('%cINFO', "color:green;", args.join(' ')),
    error: (...args) => console.error('%cERROR', "color:red;", args.join(' ')),
  }
}

export const logger = LoggerService();
