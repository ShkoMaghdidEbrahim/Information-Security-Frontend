import {
    Card, Col, Row,
} from 'antd';

function CaesarCipher() {
    
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
                    
                    </Card>
                </Col>
                
                <Col
                    style = {{}}
                    span = {24}>
                    <Card
                        title = {'Decryption'}
                        style = {{
                            width: '100%',
                            minHeight: '44.5vh',
                        }}
                    >
                    
                    </Card>
                </Col>
            
            </Row>
        
        </Card>
    </>);
}

export default CaesarCipher;
