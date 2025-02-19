import {
    Button,
    Card, Col, Form, Input, InputNumber, Row,
} from 'antd';
import {useAxiosPost} from "../configs/axios.jsx";

function MonoAlphabeticCipher() {
    
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
        encryptRequest(values).then(data => {
            console.log(data);
        });
    }
    const onFinishDecrypt = (values) => {
        decryptRequest(values).then(data => {
            console.log(data);
        });
    }
    
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
                        title = {'Encryption'}
                        style = {{
                            width: '100%',
                            minHeight: '44.5vh',
                        }}
                    >
                        <Form
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
                                <Col span = {12}>
                                    <Form.Item
                                        style = {{
                                            margin: 0
                                        }}
                                        rules = {[
                                            {
                                                required: true,
                                                message: 'Please enter the shift value',
                                            },
                                        ]}
                                        name = 'shift'
                                    >
                                        <InputNumber
                                            min = {1}
                                            max = {25}
                                            changeOnWheel = {true}
                                            size = {'large'}
                                            placeholder = {'Enter the shift value'}
                                            style = {{
                                                width: '100%',
                                            }}
                                        />
                                    </Form.Item>
                                </Col>
                                <Col span = {12}>
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
                        title = {'Decryption'}
                        style = {{
                            width: '100%',
                            minHeight: '44.5vh',
                        }}
                    >
                        <Form
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
                                <Col span = {12}>
                                    <Form.Item
                                        style = {{
                                            margin: 0
                                        }}
                                        rules = {[
                                            {
                                                required: true,
                                                message: 'Please enter the shift value',
                                            },
                                        ]}
                                        name = 'shift'
                                    >
                                        <InputNumber
                                            min = {1}
                                            max = {25}
                                            changeOnWheel = {true}
                                            size = {'large'}
                                            placeholder = {'Enter the shift value'}
                                            style = {{
                                                width: '100%',
                                            }}
                                        />
                                    </Form.Item>
                                </Col>
                                <Col span = {12}>
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
        </Card>
    </>);
}

export default MonoAlphabeticCipher;
