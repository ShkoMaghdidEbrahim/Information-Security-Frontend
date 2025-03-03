import {
    Button,
    Card, Col, Form, Input, InputNumber, Row,
} from 'antd';
import {useAxiosPost} from "../configs/axios.jsx";
import {useState} from "react";
import CodeModal from "../components/CodeModal.jsx";

function MonoAlphabeticCipher() {
    
    const [codeModalType, setCodeModalType] = useState('');
    
    const {
        request: encryptRequest,
        data: encryptData,
        loading: encryptLoading,
    } = useAxiosPost('/weekOne/monoAlphabeticEncrypt', {});
    
    const {
        request: decryptRequest,
        data: decryptData,
        loading: decryptLoading,
    } = useAxiosPost('/weekOne/monoAlphabeticDecrypt', {});
    
    const onFinishEncrypt = (values) => {
        const alphabet = 'abcdefghijklmnopqrstuvwxyz';
        const key = values.key.toLowerCase().split('');
        const shift = {};
        
        key.forEach((char, index) => {
            shift[alphabet[index]] = char;
        });
        
        const formattedPayload = {
            plaintext: values.plaintext,
            shift: shift
        };
        encryptRequest(formattedPayload).then(data => {
            console.log(data);
        });
    }
    const onFinishDecrypt = (values) => {
        const alphabet = 'abcdefghijklmnopqrstuvwxyz';
        const key = values.key.toLowerCase().split('');
        const shift = {};
        
        key.forEach((char, index) => {
            shift[char] = alphabet[index];
        });
        
        const formattedPayload = {
            ciphertext: values.ciphertext,
            shift: shift
        };
        decryptRequest(formattedPayload).then(data => {
            console.log(data);
        });
    };
    
    const validateKey = (_, value) => {
        const alphabet = 'abcdefghijklmnopqrstuvwxyz';
        const keySet = new Set(value.toLowerCase().split(''));
        
        if (value.length !== 26 || keySet.size !== 26 || !alphabet.split('').every(char => keySet.has(char))) {
            return Promise.reject(new Error('The key must contain each letter exactly once without duplications.'));
        }
        
        return Promise.resolve();
    };
    
    const generateRandomKey = () => {
        const alphabet = 'abcdefghijklmnopqrstuvwxyz';
        const shuffled = alphabet.split('').sort(() => 0.5 - Math.random()).join('');
        encryptForm.setFieldsValue({key: shuffled.toUpperCase()});
    };
    
    const [decryptForm] = Form.useForm();
    const [encryptForm] = Form.useForm();
    
    return (<>
        <Card
            style = {{
                width: '100%',
                minHeight: '100%',
                overflow: "hidden"
            }}
        >
            <Row
                gutter = {[
                    10,
                    10
                ]}
                style = {{
                    width: '100%',
                    height: '100%',
                }}
                span = {24}
            >
                <Col span = {24}>
                    <Card
                        title = {<Row>
                            <Col span = {20}>
                                Encryption
                            </Col>
                            <Col span = {4}>
                                <Button
                                    block = {true}
                                    onClick = {() => setCodeModalType('monoAlphabeticEncrypt')}
                                    size = {'small'}
                                    type = {'primary'}
                                >
                                    View Code
                                </Button>
                            </Col>
                        </Row>}
                        style = {{
                            width: '100%',
                            minHeight: '44.5vh',
                        }}
                    >
                        <Form
                            form = {encryptForm}
                            onFinish = {onFinishEncrypt}
                            layout = {'horizontal'}
                            style = {{
                                width: '100%',
                                height: '100%',
                            }}
                        >
                            <Row
                                gutter = {[
                                    15,
                                    15
                                ]}>
                                <Col span = {24}>
                                    <Form.Item
                                        style = {{
                                            margin: 0
                                        }}
                                        rules = {[
                                            {
                                                required: true,
                                                message: 'Please enter the text to encrypt',
                                            },
                                        ]}
                                        name = 'plaintext'
                                    >
                                        <Input.TextArea
                                            rows = {6}
                                            size = {'large'}
                                            placeholder = {'Enter the text to encrypt'}
                                            style = {{
                                                width: '100%',
                                            }}
                                        />
                                    </Form.Item>
                                </Col>
                                <Col span = {16}>
                                    <Form.Item
                                        style = {{
                                            margin: 0
                                        }}
                                        rules = {[
                                            {
                                                required: true,
                                                message: 'Please enter the key value',
                                            },
                                            {
                                                validator: validateKey,
                                            }
                                        ]}
                                        name = 'key'
                                    >
                                        <Input
                                            onChange = {(e) => {
                                                const value = e.target.value.toUpperCase();
                                                encryptForm.setFieldsValue({key: value});
                                            }}
                                            size = {'large'}
                                            placeholder = {'Enter the key value'}
                                            style = {{
                                                width: '100%',
                                            }}
                                        />
                                    </Form.Item>
                                </Col>
                                <Col span = {4}>
                                    <Button
                                        onClick = {generateRandomKey}
                                        loading = {decryptLoading}
                                        size = {"large"}
                                        type = {'primary'}
                                        block = {true}
                                    >
                                        Random Key
                                    </Button>
                                </Col>
                                <Col span = {4}>
                                    <Button
                                        loading = {encryptLoading}
                                        size = {"large"}
                                        type = {'primary'}
                                        htmlType = {'submit'}
                                        block = {true}
                                    >
                                        Encrypt
                                    </Button>
                                </Col>
                                {encryptData?.encrypted_text && (
                                    <Col span = {24}>
                                        <Input.TextArea
                                            value = {encryptData.encrypted_text}
                                            rows = {6}
                                            size = {'large'}
                                            placeholder = {'Encrypted Text'}
                                            autoSize = {true}
                                            style = {{
                                                width: '100%',
                                            }}
                                        />
                                    </Col>
                                )}
                            </Row>
                        </Form>
                    </Card>
                </Col>
                
                <Col
                    span = {24}>
                    <Card
                        title = {<Row>
                            <Col span = {20}>
                                Decryption
                            </Col>
                            <Col span = {4}>
                                <Button
                                    block = {true}
                                    onClick = {() => setCodeModalType('monoAlphabeticDecrypt')}
                                    size = {'small'}
                                    type = {'primary'}
                                >
                                    View Code
                                </Button>
                            </Col>
                        </Row>}
                        style = {{
                            width: '100%',
                            minHeight: '44.5vh',
                        }}
                    >
                        <Form
                            form = {decryptForm}
                            onFinish = {onFinishDecrypt}
                            layout = {'horizontal'}
                            style = {{
                                width: '100%',
                                height: '100%',
                            }}
                        >
                            <Row
                                gutter = {[
                                    15,
                                    15
                                ]}>
                                <Col span = {24}>
                                    <Form.Item
                                        style = {{
                                            margin: 0
                                        }}
                                        rules = {[
                                            {
                                                required: true,
                                                message: 'Please enter the text to decrypt',
                                            },
                                        ]}
                                        name = 'ciphertext'
                                    >
                                        <Input.TextArea
                                            rows = {6}
                                            size = {'large'}
                                            placeholder = {'Enter the text to decrypt'}
                                            style = {{
                                                width: '100%',
                                            }}
                                        />
                                    </Form.Item>
                                </Col>
                                <Col span = {18}>
                                    <Form.Item
                                        style = {{
                                            margin: 0
                                        }}
                                        rules = {[
                                            {
                                                required: true,
                                                message: 'Please enter the key value',
                                            },
                                            {
                                                validator: validateKey,
                                            },
                                        ]}
                                        name = 'key'
                                    >
                                        <Input
                                            onChange = {(e) => {
                                                const value = e.target.value.toUpperCase();
                                                decryptForm.setFieldsValue({key: value});
                                            }}
                                            size = {'large'}
                                            placeholder = {'Enter the key value'}
                                            style = {{
                                                width: '100%',
                                            }}
                                        />
                                    </Form.Item>
                                </Col>
                                
                                <Col span = {6}>
                                    <Button
                                        loading = {decryptLoading}
                                        size = {"large"}
                                        type = {'primary'}
                                        htmlType = {'submit'}
                                        block = {true}
                                    >
                                        Decrypt
                                    </Button>
                                </Col>
                                {decryptData?.decrypted_text && (
                                    <Col span = {24}>
                                        <Input.TextArea
                                            value = {decryptData.decrypted_text}
                                            rows = {6}
                                            size = {'large'}
                                            placeholder = {'Encrypted Text'}
                                            autoSize = {true}
                                            style = {{
                                                width: '100%',
                                            }}
                                        />
                                    </Col>
                                )}
                            </Row>
                        </Form>
                    </Card>
                </Col>
            </Row>
            {codeModalType !== '' && (
                <CodeModal
                    isModalVisible = {codeModalType !== ''}
                    setIsModalVisible = {() => setCodeModalType('')}
                    codeType = {codeModalType}
                />
            )}
        </Card>
    </>);
}

export default MonoAlphabeticCipher;
