export const API_URL = `http://127.0.0.1:8000`;

export const codes = {
    monoAlphabeticDecrypt: `@router.post("/monoAlphabeticDecrypt")
def mono_alphabetic_decrypt(request: MonoAlphabeticDecryptRequest):
    ascii_chars = [chr(i) for i in range(256)]
    decoded_key_str = base64.b64decode(request.key).decode()
    shift_map = {}
    for index, char in enumerate(decoded_key_str):
        shift_map[char] = ascii_chars[index]

    plaintext = ""
    for char in request.ciphertext:
        if char in shift_map:
            plaintext += shift_map[char]
        else:
            plaintext += char

    return {"decrypted_text": plaintext}`,
    monoAlphabeticEncrypt: `@router.post("/monoAlphabeticEncrypt")
def mono_alphabetic_encrypt(request: MonoAlphabeticEncryptRequest):
    ascii_chars = [chr(i) for i in range(256)]
    shuffled_chars = ascii_chars[:]
    random.shuffle(shuffled_chars)
    key_str = ''.join(shuffled_chars)

    encoded_key_str = base64.b64encode(key_str.encode()).decode()

    key = dict(zip(ascii_chars, shuffled_chars))
    ciphertext = ''.join(key.get(char, char) for char in request.plaintext)

    return {"encrypted_text": ciphertext, "key": encoded_key_str}`,
    caesarDecrypt: `@router.post("/caesarDecrypt")
def caesar_decrypt(request: CaesarDecryptRequest):
    plaintext = ""
    shift_amount = request.shift % 256
    for char in request.ciphertext:
        new_char = chr(((ord(char) - shift_amount) % 256))
        plaintext += new_char
    return {"decrypted_text": plaintext}`,
    caesarEncrypt: `@router.post("/caesarEncrypt")
def caesar_encrypt(request: CaesarEncryptRequest):
    encrypted_text = ""
    for char in request.plaintext:
        encrypted_text += chr((ord(char) + request.shift) % 256)
    return {"encrypted_text": encrypted_text}`,
    caesarAttack: `@router.post("/caesarAttack")
def caesar_attack(request: CaesarAttackRequest):
    results = []
    for shift in range(256):
        decrypted = ""
        for char in request.ciphertext:
            decrypted += chr((ord(char) - shift) % 256)
        results.append({"shift": shift, "decrypted_text": decrypted})
    return results`
}

