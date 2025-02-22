export const API_URL = `http://127.0.0.1:5050`;

export const codes = {
    monoAlphabeticDecrypt: `@week_one_bp.route('/monoAlphabeticDecrypt', methods=['POST', 'GET'])
def mono_alphabetic_decrypt():
    data = request.get_json()
    ciphertext = data.get('ciphertext', '')
    shift = data.get('shift', {})
    print(shift)
    print(ciphertext)
    plaintext = ""
    for char in ciphertext:
        if char.lower() in shift:
            plaintext_char = shift[char.lower()]
            if char.isupper():
                plaintext += plaintext_char.upper()
            else:
                plaintext += plaintext_char
        else:
            plaintext += char
    return jsonify({'decrypted_text': plaintext})`,
    monoAlphabeticEncrypt: `@week_one_bp.route('/monoAlphabeticEncrypt', methods=['POST', 'GET'])
def mono_alphabetic_encrypt():
    data = request.get_json()
    plaintext = data.get('plaintext', '')
    shift = data.get('shift', {})
    ciphertext = ""
    for char in plaintext:
        if char.lower() in shift:
            cipher_char = shift[char.lower()]
            if char.isupper():
                ciphertext += cipher_char.upper()
            else:
                ciphertext += cipher_char
        else:
            ciphertext += char
    return jsonify({'encrypted_text': ciphertext})`,
    caesarDecrypt: `@week_one_bp.route('/caesarDecrypt', methods=['POST', 'GET'])
def caesar_decrypt():
    data = request.get_json()
    ciphertext = data.get('ciphertext', '')
    shift = data.get('shift', 0)
    plaintext = ""
    for char in ciphertext:
        shift_amount = shift % 256
        new_char = chr(((ord(char) - shift_amount) % 256))
        plaintext += new_char
    return jsonify({'decrypted_text': plaintext})`,
    caesarEncrypt: `@week_one_bp.route('/caesarEncrypt', methods=['POST', 'GET'])
def caesar_encrypt():
    data = request.get_json()
    plaintext = data.get('plaintext', '')
    shift = data.get('shift', 0)
    encrypted_text = ""
    for char in plaintext:
        encrypted_text += chr((ord(char) + shift) % 256)
    return jsonify({'encrypted_text': encrypted_text})`,
    caesarAttack: `@week_one_bp.route('/caesarAttack', methods=['POST', 'GET'])
def caesar_attack():
    data = request.get_json()
    ciphertext = data.get('ciphertext', '')
    results = []
    print(ciphertext)
    for shift in range(256):
        decrypted = ''
        for char in ciphertext:
            decrypted += chr((ord(char) - shift) % 256)
        results.append({
            'shift': shift,
            'decrypted_text': decrypted
        })
    return jsonify(results)`
}

