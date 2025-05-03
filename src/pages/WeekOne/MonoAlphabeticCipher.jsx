import {
    Button,
    Card, Col, Form, Input, Row,
} from 'antd';
import {useAxiosPost} from "../../configs/axios.jsx";
import {useState} from "react";
import CodeModal from "../../components/CodeModal.jsx";

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
        const formattedPayload = {
            plaintext: values.plaintext,
        };
        encryptRequest(formattedPayload).then(data => {
            console.log(data);
        });
    }
    
    const onFinishDecrypt = (values) => {
        const formattedPayload = {
            ciphertext: values.ciphertext,
            key: values.key,
        };
        
        decryptRequest(formattedPayload).then(data => {
            console.log(data);
        });
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
                                <Col span = {24}>
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
                                {encryptData?.key && (
                                    <>
                                        <Col span = {20}>
                                            <Input
                                                value = {encryptData.key}
                                                rows = {6}
                                                size = {'large'}
                                                placeholder = {'Encrypted Text'}
                                                autoSize = {true}
                                                style = {{
                                                    width: '100%',
                                                }}
                                            />
                                        </Col>
                                        <Col span = {4}>
                                            <Button
                                                block
                                                size = {"large"}
                                                type = {'primary'}
                                                onClick = {() => {
                                                    navigator.clipboard.writeText(encryptData.key).toString('utf-8');
                                                }}
                                            >
                                                Copy Key
                                            </Button>
                                        </Col>
                                    </>
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
                                        ]}
                                        name = 'key'
                                    >
                                        <Input
                                            onChange = {(e) => {
                                                decryptForm.setFieldsValue({key: e.target.value});
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
