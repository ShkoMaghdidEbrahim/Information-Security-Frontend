import {useAxiosPost} from "../../configs/axios.jsx";
import {Button, Card, Col, Form, Input, InputNumber, Row} from "antd";
import {useState} from "react";
import CodeModal from "../../components/CodeModal.jsx";

const SHA512 = () => {
    
    const [codeModalType, setCodeModalType] = useState('');
    
    const {
        request: hashRequest,
        data: hashData,
        loading: hashLoading,
    } = useAxiosPost('/finalWeek/sha512', {});
    
    const [form] = Form.useForm();
    
    const onFinishHash = (values) => {
        hashRequest({
            message: values.sha512
        })
        
    }
    
    return (
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
                                Hashing
                            </Col>
                            <Col span = {4}>
                                <Button
                                    block = {true}
                                    onClick = {() => setCodeModalType('sha512')}
                                    size = {"small"}
                                    type = {'primary'}
                                >
                                    View Code
                                </Button>
                            </Col>
                        </Row>}
                        style = {{
                            width: '100%',
                            minHeight: '86vh',
                        }}
                    >
                        <Form
                            form = {form}
                            onFinish = {onFinishHash}
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
                                                message: 'Please enter the text to hash',
                                            },
                                        ]}
                                        name = 'sha512'
                                    >
                                        <Input.TextArea
                                            rows = {12}
                                            size = {'large'}
                                            placeholder = {'Enter the text to hash'}
                                            style = {{
                                                width: '100%',
                                            }}
                                        />
                                    </Form.Item>
                                </Col>
                                <Col span = {24}>
                                    <Button
                                        loading = {hashLoading}
                                        size = {"large"}
                                        type = {'primary'}
                                        htmlType = {'submit'}
                                        block = {true}
                                    >
                                        Hash
                                    </Button>
                                </Col>
                                {hashData?.sha512 && (
                                    <Col span = {18}>
                                        <Input.TextArea
                                            showCount = {true}
                                            value = {hashData.sha512}
                                            rows = {12}
                                            size = {'large'}
                                            placeholder = {'Hash Digest'}
                                            autoSize = {true}
                                            style = {{
                                                width: '100%',
                                            }}
                                        />
                                    </Col>
                                )}
                                {hashData?.sha512 && (
                                    <Col span = {6}>
                                        <Button
                                            size = {"large"}
                                            type = {'primary'}
                                            block = {true}
                                            onClick = {() => {
                                                navigator.clipboard.writeText(hashData.sha512)
                                            }}
                                        >
                                            Copy
                                        </Button>
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
    )
}

export default SHA512;
