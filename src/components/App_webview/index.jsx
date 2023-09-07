import { useEffect, useState } from "react";

export default function Webview() {
  const [data, setData] = useState("initial");
  const [isMobile, setIsMobile] = useState();
  useEffect(() => {
    const handleMessageFromNativeApp = (event) => {
      const messageData = event?.data;
      console.log("Hello tash:", event);
      setData(messageData | "dfdsfsd");
    };
    window.addEventListener("message", handleMessageFromNativeApp);
  }, []);

  useEffect(() => {
    window.addEventListener("message", handleReceivedData);
    return () => {
      window.removeEventListener("message", handleReceivedData);
    };
  }, []);

  const handleReceivedData = (event) => {
    const receivedData = event.data;
    if (receivedData) setData(receivedData);
  };

  useEffect(() => {
    const button = document.getElementById("webButton");
    const handleClick = () => {
      window?.webkit?.messageHandlers?.buttonPressed.postMessage(
        "Button on the web page is pressed!"
      );
    };
    button.addEventListener("click", handleClick);
    return () => {
      button.removeEventListener("click", handleClick);
    };
  }, []);

  const sendDataToiOSApp = () => {
    setIsMobile("iOS");
    const data = "Hello Mirabbosbek";
    window?.webkit?.messageHandlers?.dataHandler?.postMessage(data);
  };
  useEffect(() => {
    sendDataToiOSApp();
  }, []);

  const sendDataToAndroidApp = () => {
    setIsMobile("Android");

    const data = "Hello";
    window.postMessage(data);
  };

  return (
    <>
      <div className="h-56 sm:h-64 xl:h-80 2xl:h-96 p-5"></div>
      <div className="flex min-h-full  flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <h1 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
          {`Received message from ${isMobile} app: ${data}`}
        </h1>
        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <div>
            <button
              onClick={() => {
                sendDataToAndroidApp();
              }}
              className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              For Android
            </button>
          </div>
          <div>
            <button
              onClick={() => {
                sendDataToiOSApp();
              }}
              id="webButton"
              className=" mt-2 flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              For IOS
            </button>
          </div>
          <div>
            <button
              onClick={() => {
                window.close();
              }}
              id="webButton"
              className=" mt-2 flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Close
            </button>
          </div>

          <p className="mt-10 text-center text-sm text-gray-500">
            Not a member?{" "}
            <a
              href="#"
              className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500"
            >
              Start a 14 day free trial
            </a>
          </p>
        </div>
      </div>
    </>
  );
}
