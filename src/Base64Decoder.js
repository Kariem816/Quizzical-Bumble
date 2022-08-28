const base64Chars = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z", "a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z", "0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "+", "/"]

function getUnicode(char) {
    let charCode = char.charCodeAt(0).toString(2)
    console.log(charCode, charCode.length)
    if (charCode.length <= 7) {
        while (charCode.length < 7) {
            charCode = '0' + charCode
        }
        charCode = '0' + charCode
    } else if (charCode.length <= 11) {
        while (charCode.length < 11) {
            charCode = '0' + charCode
        }
        charCode = '110' + charCode.slice(0, 5) + '10' + charCode.slice(5)
    } else if (charCode.length <= 16) {
        while (charCode.length < 16) {
            charCode = '0' + charCode
        }
        charCode = '1110' + charCode.slice(0, 4) + '10' + charCode.slice(4, 10) + '10' + charCode.slice(10)
    } else {
        while (charCode.length < 21) {
            charCode = '0' + charCode
            console.log("added 0", 21)
        }
        charCode = '11110' + charCode.slice(0, 3) + '10' + charCode.slice(3, 9) + '10' + charCode.slice(9, 15) + '10' + charCode.slice(15)
    }
    return charCode
}

function convertUnicode(charCode) {
    let text = ''
    while (charCode.length) {
        if (charCode.slice(0, 5) === "11110") {
            let code4byte = charCode.slice(0, 32)
            charCode = charCode.slice(32)
            code4byte = code4byte.slice(5, 8) + code4byte.slice(10, 16) + code4byte.slice(18, 24) + code4byte.slice(26)
            text += String.fromCharCode(parseInt(code4byte, 2))
        } else if (charCode.slice(0, 4) === "1110") {
            let code3byte = charCode.slice(0, 24)
            charCode = charCode.slice(24)
            code3byte = code3byte.slice(4, 8) + code3byte.slice(10, 16) + code3byte.slice(18)
            text += String.fromCharCode(parseInt(code3byte, 2))
        } else if (charCode.slice(0, 3) === "110") {
            let code2byte = charCode.slice(0, 16)
            charCode = charCode.slice(16)
            code2byte = code2byte.slice(3, 8) + code2byte.slice(10)
            text += String.fromCharCode(parseInt(code2byte, 2))
        } else {
            let code1byte = charCode.slice(0, 8)
            charCode = charCode.slice(8)
            code1byte = code1byte.slice(1)
            text += String.fromCharCode(parseInt(code1byte, 2))
        }
    }
    return text
}


function encode(text) {
    let code = ''
    let binaryText = ''

    for (let i = 0; i < text.length; i++) {
        binaryText += getUnicode(text[i])
    }
    while (binaryText.length % 6) {
        binaryText += '0'
    }
    for (let i = 0; i < binaryText.length; i += 6) {
        const slice = binaryText.substring(i, i + 6)
        code += base64Chars[parseInt(slice, 2)]
    }
    while (code.length % 4) {
        code += '='
    }

    return code
}

function decode(code) {
    let binaryText = ''

    while (code[code.length - 1] === '=') {
        code = code.substring(0, code.length - 1)
    }
    for (let i = 0; i < code.length; i++) {
        let charCode = base64Chars.indexOf(code[i]).toString(2)
        while (charCode.length < 6) {
            charCode = '0' + charCode
        }
        binaryText += charCode
    }
    while (binaryText.length % 8) {
        binaryText = binaryText.substring(0, binaryText.length - 1)
    }

    return convertUnicode(binaryText) 
}

export default decode