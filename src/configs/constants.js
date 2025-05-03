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
    return results`,
    
    DESEncrypt: `IP_TABLE = [
    57, 49, 41, 33, 25, 17, 9, 1,
    59, 51, 43, 35, 27, 19, 11, 3,
    61, 53, 45, 37, 29, 21, 13, 5,
    63, 55, 47, 39, 31, 23, 15, 7,
    56, 48, 40, 32, 24, 16, 8, 0,
    58, 50, 42, 34, 26, 18, 10, 2,
    60, 52, 44, 36, 28, 20, 12, 4,
    62, 54, 46, 38, 30, 22, 14, 6
]

ROTATIONS = [
    1, 1, 2, 2, 2, 2, 2, 2, 1, 2, 2, 2, 2, 2, 2, 1
]

S_BOXES = [
    # S1
    [
        [14, 4, 13, 1, 2, 15, 11, 8, 3, 10, 6, 12, 5, 9, 0, 7],
        [0, 15, 7, 4, 14, 2, 13, 1, 10, 6, 12, 11, 9, 5, 3, 8],
        [4, 1, 14, 8, 13, 6, 2, 11, 15, 12, 9, 7, 3, 10, 5, 0],
        [15, 12, 8, 2, 4, 9, 1, 7, 5, 11, 3, 14, 10, 0, 6, 13]
    ],
    # S2
    [
        [15, 1, 8, 14, 6, 11, 3, 4, 9, 7, 2, 13, 12, 0, 5, 10],
        [3, 13, 4, 7, 15, 2, 8, 14, 12, 0, 1, 10, 6, 9, 11, 5],
        [0, 14, 7, 11, 10, 4, 13, 1, 5, 8, 12, 6, 9, 3, 2, 15],
        [13, 8, 10, 1, 3, 15, 4, 2, 11, 6, 7, 12, 0, 5, 14, 9]
    ],
    # S3
    [
        [10, 0, 9, 14, 6, 3, 15, 5, 1, 13, 12, 7, 11, 4, 2, 8],
        [13, 7, 0, 9, 3, 4, 6, 10, 2, 8, 5, 14, 12, 11, 15, 1],
        [13, 6, 4, 9, 8, 15, 3, 0, 11, 1, 2, 12, 5, 10, 14, 7],
        [1, 10, 13, 0, 6, 9, 8, 7, 4, 15, 14, 3, 11, 5, 2, 12]
    ],
    # S4
    [
        [7, 13, 14, 3, 0, 6, 9, 10, 1, 2, 8, 5, 11, 12, 4, 15],
        [13, 8, 11, 5, 6, 15, 0, 3, 4, 7, 2, 12, 1, 10, 14, 9],
        [10, 6, 9, 0, 12, 11, 7, 13, 15, 1, 3, 14, 5, 2, 8, 4],
        [3, 15, 0, 6, 10, 1, 13, 8, 9, 4, 5, 11, 12, 7, 2, 14]
    ],
    # S5
    [
        [2, 12, 4, 1, 7, 10, 11, 6, 8, 5, 3, 15, 13, 0, 14, 9],
        [14, 11, 2, 12, 4, 7, 13, 1, 5, 0, 15, 10, 3, 9, 8, 6],
        [4, 2, 1, 11, 10, 13, 7, 8, 15, 9, 12, 5, 6, 3, 0, 14],
        [11, 8, 12, 7, 1, 14, 2, 13, 6, 15, 0, 9, 10, 4, 5, 3]
    ],
    # S6
    [
        [12, 1, 10, 15, 9, 2, 6, 8, 0, 13, 3, 4, 14, 7, 5, 11],
        [10, 15, 4, 2, 7, 12, 9, 5, 6, 1, 13, 14, 0, 11, 3, 8],
        [9, 14, 15, 5, 2, 8, 12, 3, 7, 0, 4, 10, 1, 13, 11, 6],
        [4, 3, 2, 12, 9, 5, 15, 10, 11, 14, 1, 7, 6, 0, 8, 13]
    ],
    # S7
    [
        [4, 11, 2, 14, 15, 0, 8, 13, 3, 12, 9, 7, 5, 10, 6, 1],
        [13, 0, 11, 7, 4, 9, 1, 10, 14, 3, 5, 12, 2, 15, 8, 6],
        [1, 4, 11, 13, 12, 3, 7, 14, 10, 15, 6, 8, 0, 5, 9, 2],
        [6, 11, 13, 8, 1, 4, 10, 7, 9, 5, 0, 15, 14, 2, 3, 12]
    ],
    # S8
    [
        [13, 2, 8, 4, 6, 15, 11, 1, 10, 9, 3, 14, 5, 0, 12, 7],
        [1, 15, 13, 8, 10, 3, 7, 4, 12, 5, 6, 11, 0, 14, 9, 2],
        [7, 11, 4, 1, 9, 12, 14, 2, 0, 6, 10, 13, 15, 3, 5, 8],
        [2, 1, 14, 7, 4, 10, 8, 13, 15, 12, 9, 0, 3, 5, 6, 11]
    ]
]

EXPANSION_TABLE = [
    31, 0, 1, 2, 3, 4,
    3, 4, 5, 6, 7, 8,
    7, 8, 9, 10, 11, 12,
    11, 12, 13, 14, 15, 16,
    15, 16, 17, 18, 19, 20,
    19, 20, 21, 22, 23, 24,
    23, 24, 25, 26, 27, 28,
    27, 28, 29, 30, 31, 0
]

P_BOX = [
    15, 6, 19, 20, 28, 11, 27, 16,
    0, 14, 22, 25, 4, 17, 30, 9,
    1, 7, 23, 13, 31, 26, 2, 8,
    18, 12, 29, 5, 21, 10, 3, 24
]

FP_TABLE = [
    39, 7, 47, 15, 55, 23, 63, 31,
    38, 6, 46, 14, 54, 22, 62, 30,
    37, 5, 45, 13, 53, 21, 61, 29,
    36, 4, 44, 12, 52, 20, 60, 28,
    35, 3, 43, 11, 51, 19, 59, 27,
    34, 2, 42, 10, 50, 18, 58, 26,
    33, 1, 41, 9, 49, 17, 57, 25,
    32, 0, 40, 8, 48, 16, 56, 24
]


def generate_des_keys(master_key):
    remove_parity_bits = [master_key[i] for i in range(64) if
                          i != 8 and i != 16 and i != 24 and i != 32 and i != 40 and i != 48 and i != 56 and i != 64]

    c_half = remove_parity_bits[:28]
    d_half = remove_parity_bits[28:]

    sub_keys = []

    for round_num in range(16):
        rotations = ROTATIONS[round_num]
        c_half = c_half[rotations:] + c_half[:rotations]
        d_half = d_half[rotations:] + d_half[:rotations]

        combined = c_half + d_half

        subkey = [combined[i] for i in range(56) if
                  i != 9 and i != 18 and i != 22 and i != 25 and i != 35 and i != 38 and i != 43 and i != 54]
        sub_keys.append(subkey)

    return master_key, sub_keys


def PBox(substituted):
    return [substituted[pos] for pos in P_BOX]


def initial_permutation(block):
    return [block[position] for position in IP_TABLE]


def final_permutation(block):
    return [block[position] for position in FP_TABLE]


def des_encrypt_round(l_block, r_block, subkey):
    new_l_block = r_block.copy()

    expanded = [r_block[pos] for pos in EXPANSION_TABLE]

    mixed = [e ^ k for e, k in zip(expanded, subkey)]

    sub_blocks = [mixed[i:i + 6] for i in range(0, 48, 6)]
    substituted = []

    for i, sub_block in enumerate(sub_blocks):
        row = (sub_block[0] << 1) + sub_block[5]
        col = (sub_block[1] << 3) + (sub_block[2] << 2) + (sub_block[3] << 1) + sub_block[4]
        val = S_BOXES[i][row][col]
        substituted.extend([int(b) for b in format(val, '04b')])

    permuted = PBox(substituted)
    new_r_block = [l ^ p for l, p in zip(l_block, permuted)]

    return new_l_block, new_r_block


@router.post("/DESEncrypt")
def des_encrypt(request: DESEncrypt):
    master_key_generated = [random.randint(0, 1) for _ in range(64)]
    plaintext_bytes = request.plaintext.encode('utf-8')
    binary_data = []
    for byte in plaintext_bytes:
        binary_data.extend([int(bit) for bit in format(byte, '08b')])
    if len(binary_data) < 64:
        binary_data.extend([0] * (64 - len(binary_data)))
    master_key, sub_keys = generate_des_keys(master_key_generated)

    result = []
    for i in range(0, len(binary_data), 64):
        block = binary_data[i:i + 64]
        if len(block) < 64:
            block.extend([0] * (64 - len(block)))
        block = initial_permutation(block)
        l_block = block[:32]
        r_block = block[32:]
        for i in range(16):
            l_block, r_block = des_encrypt_round(l_block, r_block, sub_keys[i])
        l_block, r_block = r_block, l_block
        combined = l_block + r_block
        print(f"Combined Encrypt: {combined}")
        encrypted_block = final_permutation(combined)
        result.extend(encrypted_block)
    bytes_data = bytearray()
    for i in range(0, len(result), 8):
        byte_bits = result[i:i + 8]
        if len(byte_bits) == 8:
            byte_value = int(''.join(map(str, byte_bits)), 2)
            bytes_data.append(byte_value)

    encoded = base64.b64encode(bytes_data).decode('utf-8')

    return {"ciphertext": encoded, "key": ''.join(map(str, master_key))}
`,
    DESDecrypt: `IP_TABLE = [
    57, 49, 41, 33, 25, 17, 9, 1,
    59, 51, 43, 35, 27, 19, 11, 3,
    61, 53, 45, 37, 29, 21, 13, 5,
    63, 55, 47, 39, 31, 23, 15, 7,
    56, 48, 40, 32, 24, 16, 8, 0,
    58, 50, 42, 34, 26, 18, 10, 2,
    60, 52, 44, 36, 28, 20, 12, 4,
    62, 54, 46, 38, 30, 22, 14, 6
]

ROTATIONS = [
    1, 1, 2, 2, 2, 2, 2, 2, 1, 2, 2, 2, 2, 2, 2, 1
]

S_BOXES = [
    # S1
    [
        [14, 4, 13, 1, 2, 15, 11, 8, 3, 10, 6, 12, 5, 9, 0, 7],
        [0, 15, 7, 4, 14, 2, 13, 1, 10, 6, 12, 11, 9, 5, 3, 8],
        [4, 1, 14, 8, 13, 6, 2, 11, 15, 12, 9, 7, 3, 10, 5, 0],
        [15, 12, 8, 2, 4, 9, 1, 7, 5, 11, 3, 14, 10, 0, 6, 13]
    ],
    # S2
    [
        [15, 1, 8, 14, 6, 11, 3, 4, 9, 7, 2, 13, 12, 0, 5, 10],
        [3, 13, 4, 7, 15, 2, 8, 14, 12, 0, 1, 10, 6, 9, 11, 5],
        [0, 14, 7, 11, 10, 4, 13, 1, 5, 8, 12, 6, 9, 3, 2, 15],
        [13, 8, 10, 1, 3, 15, 4, 2, 11, 6, 7, 12, 0, 5, 14, 9]
    ],
    # S3
    [
        [10, 0, 9, 14, 6, 3, 15, 5, 1, 13, 12, 7, 11, 4, 2, 8],
        [13, 7, 0, 9, 3, 4, 6, 10, 2, 8, 5, 14, 12, 11, 15, 1],
        [13, 6, 4, 9, 8, 15, 3, 0, 11, 1, 2, 12, 5, 10, 14, 7],
        [1, 10, 13, 0, 6, 9, 8, 7, 4, 15, 14, 3, 11, 5, 2, 12]
    ],
    # S4
    [
        [7, 13, 14, 3, 0, 6, 9, 10, 1, 2, 8, 5, 11, 12, 4, 15],
        [13, 8, 11, 5, 6, 15, 0, 3, 4, 7, 2, 12, 1, 10, 14, 9],
        [10, 6, 9, 0, 12, 11, 7, 13, 15, 1, 3, 14, 5, 2, 8, 4],
        [3, 15, 0, 6, 10, 1, 13, 8, 9, 4, 5, 11, 12, 7, 2, 14]
    ],
    # S5
    [
        [2, 12, 4, 1, 7, 10, 11, 6, 8, 5, 3, 15, 13, 0, 14, 9],
        [14, 11, 2, 12, 4, 7, 13, 1, 5, 0, 15, 10, 3, 9, 8, 6],
        [4, 2, 1, 11, 10, 13, 7, 8, 15, 9, 12, 5, 6, 3, 0, 14],
        [11, 8, 12, 7, 1, 14, 2, 13, 6, 15, 0, 9, 10, 4, 5, 3]
    ],
    # S6
    [
        [12, 1, 10, 15, 9, 2, 6, 8, 0, 13, 3, 4, 14, 7, 5, 11],
        [10, 15, 4, 2, 7, 12, 9, 5, 6, 1, 13, 14, 0, 11, 3, 8],
        [9, 14, 15, 5, 2, 8, 12, 3, 7, 0, 4, 10, 1, 13, 11, 6],
        [4, 3, 2, 12, 9, 5, 15, 10, 11, 14, 1, 7, 6, 0, 8, 13]
    ],
    # S7
    [
        [4, 11, 2, 14, 15, 0, 8, 13, 3, 12, 9, 7, 5, 10, 6, 1],
        [13, 0, 11, 7, 4, 9, 1, 10, 14, 3, 5, 12, 2, 15, 8, 6],
        [1, 4, 11, 13, 12, 3, 7, 14, 10, 15, 6, 8, 0, 5, 9, 2],
        [6, 11, 13, 8, 1, 4, 10, 7, 9, 5, 0, 15, 14, 2, 3, 12]
    ],
    # S8
    [
        [13, 2, 8, 4, 6, 15, 11, 1, 10, 9, 3, 14, 5, 0, 12, 7],
        [1, 15, 13, 8, 10, 3, 7, 4, 12, 5, 6, 11, 0, 14, 9, 2],
        [7, 11, 4, 1, 9, 12, 14, 2, 0, 6, 10, 13, 15, 3, 5, 8],
        [2, 1, 14, 7, 4, 10, 8, 13, 15, 12, 9, 0, 3, 5, 6, 11]
    ]
]

EXPANSION_TABLE = [
    31, 0, 1, 2, 3, 4,
    3, 4, 5, 6, 7, 8,
    7, 8, 9, 10, 11, 12,
    11, 12, 13, 14, 15, 16,
    15, 16, 17, 18, 19, 20,
    19, 20, 21, 22, 23, 24,
    23, 24, 25, 26, 27, 28,
    27, 28, 29, 30, 31, 0
]

P_BOX = [
    15, 6, 19, 20, 28, 11, 27, 16,
    0, 14, 22, 25, 4, 17, 30, 9,
    1, 7, 23, 13, 31, 26, 2, 8,
    18, 12, 29, 5, 21, 10, 3, 24
]

FP_TABLE = [
    39, 7, 47, 15, 55, 23, 63, 31,
    38, 6, 46, 14, 54, 22, 62, 30,
    37, 5, 45, 13, 53, 21, 61, 29,
    36, 4, 44, 12, 52, 20, 60, 28,
    35, 3, 43, 11, 51, 19, 59, 27,
    34, 2, 42, 10, 50, 18, 58, 26,
    33, 1, 41, 9, 49, 17, 57, 25,
    32, 0, 40, 8, 48, 16, 56, 24
]


def generate_des_keys(master_key):
    remove_parity_bits = [master_key[i] for i in range(64) if
                          i != 8 and i != 16 and i != 24 and i != 32 and i != 40 and i != 48 and i != 56 and i != 64]

    c_half = remove_parity_bits[:28]
    d_half = remove_parity_bits[28:]

    sub_keys = []

    for round_num in range(16):
        rotations = ROTATIONS[round_num]
        c_half = c_half[rotations:] + c_half[:rotations]
        d_half = d_half[rotations:] + d_half[:rotations]

        combined = c_half + d_half

        subkey = [combined[i] for i in range(56) if
                  i != 9 and i != 18 and i != 22 and i != 25 and i != 35 and i != 38 and i != 43 and i != 54]
        sub_keys.append(subkey)

    return master_key, sub_keys


def PBox(substituted):
    return [substituted[pos] for pos in P_BOX]


def initial_permutation(block):
    return [block[position] for position in IP_TABLE]


def final_permutation(block):
    return [block[position] for position in FP_TABLE]


def des_decrypt_round(l_block, r_block, subkey):
    new_r_block = l_block.copy()

    expanded = [l_block[pos] for pos in EXPANSION_TABLE]

    mixed = [e ^ k for e, k in zip(expanded, subkey)]

    sub_blocks = [mixed[i:i + 6] for i in range(0, 48, 6)]
    substituted = []

    for i, sub_block in enumerate(sub_blocks):
        row = (sub_block[0] << 1) + sub_block[5]
        col = (sub_block[1] << 3) + (sub_block[2] << 2) + (sub_block[3] << 1) + sub_block[4]
        val = S_BOXES[i][row][col]
        substituted.extend([int(b) for b in format(val, '04b')])

    permuted = PBox(substituted)
    new_l_block = [r ^ p for r, p in zip(r_block, permuted)]

    return new_l_block, new_r_block


@router.post("/DESDecrypt")
def des_decrypt(request: DESDecrypt):
    try:
        ciphertext_bytes = base64.b64decode(request.ciphertext)
        binary_data = []
        for byte in ciphertext_bytes:
            binary_data.extend([int(bit) for bit in format(byte, '08b')])

        key = [int(bit) for bit in request.key]
        if len(key) != 64:
            raise HTTPException(status_code=400, detail="Key must be 64 bits")

        _, sub_keys = generate_des_keys(key)
        sub_keys = sub_keys[::-1]

        result = []
        for i in range(0, len(binary_data), 64):
            block = binary_data[i:i + 64]
            if len(block) < 64:
                block.extend([0] * (64 - len(block)))
            block = initial_permutation(block)
            l_block = block[:32]
            r_block = block[32:]
            for i in range(16):
                r_block, l_block = des_decrypt_round(r_block, l_block, sub_keys[i])
            l_block, r_block = r_block, l_block
            combined = l_block + r_block
            decrypted_block = final_permutation(combined)
            result.extend(decrypted_block)

        bytes_data = bytearray()
        for i in range(0, len(result), 8):
            byte_bits = result[i:i + 8]
            if len(byte_bits) == 8:
                byte_value = int(''.join(map(str, byte_bits)), 2)
                if byte_value != 0:
                    bytes_data.append(byte_value)

        plaintext = bytes_data.decode('utf-8', errors='ignore')

        return {"plaintext": plaintext}

    except Exception as e:
        raise HTTPException(status_code=400, detail=f"Decryption error: {str(e)}")
`
}

