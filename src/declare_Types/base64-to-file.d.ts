declare module 'base64-to-file' {

    interface response {
        type: any,
        data: Buffer
    }

    function convert(base64String: string, uploadLocation: string, acceptFileTypes: string[], callback);
    function decodeBase64Image(dataString: string): response;
    function isMatchToBase64(dataString: any): any;
}

