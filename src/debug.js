export class Debug {
  constructor(logMessages, logErrors) {
    this.logMessages = logMessages;
    this.logErrors = logErrors;
  }
  // if this.logMessages = true; log timeStamp & message
  log(message){
    if (this.logMessages ) {
      console.log(new Date().toString(), message);
    }
  }
  // if  this.logErrors = true; log timeStamp & message
  error(message){
    if (this.logErrors) {
      console.log(new Date().toString(), message);
    }
  }
}
