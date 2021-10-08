function BufferToBase64(buffer){
    // console.log(buffer)
    let bytes = new Uint8Array(buffer);
    // console.log(bytes)
    let data = "";
    let len = bytes.byteLength;
    // console.log(len)
    for (let i = 0; i < len; i++) {
    　　data += String.fromCharCode(bytes[i]);
    }
    return "data:image/png;base64," + window.btoa(data);
}

export {
    BufferToBase64
}