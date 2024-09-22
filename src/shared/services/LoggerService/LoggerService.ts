const LoggerService = () => {
  return {
    info: (value) => console.info('%cINFO', "color:green;", value),
    error: (value) => console.error('%cERROR', "color:red;", value),
  }
}

export const logger = LoggerService();
