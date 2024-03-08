let serverAddress;

// get server ip
if (typeof window !== 'undefined') {
  // get server ip
  serverAddress = window.location.host;
  console.log(serverAddress);

  // if the server ip has a port number, remove it
  if (serverAddress.includes(":")) {
      serverAddress = serverAddress.split(":")[0];
      serverAddress += ":5000";

      // add http to the server ip
      serverAddress = "http://" + serverAddress;
  }
}

export const AppConfig = {
    baseUrl: serverAddress
}