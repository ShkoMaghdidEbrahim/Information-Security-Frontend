import {Button, Col, Drawer, Row, Radio} from "antd";
import useLocalStorage from "../../configs/useLocalStorage.js";

const SettingsDrawer = ({
    open,
    onClose,
    isDarkMode,
    setDarkMode,
    setColor
}) => {
    const [colorLocalStorage, setColorLocalStorage] = useLocalStorage('darkMode', null);
    
    const colors = [
        '#E4343E',
        '#CB8B1E',
        '#52C41A',
        '#B37FEB',
        '#1890FF',
        '#E434B2',
        '#28A745',
        '#FFC107',
        '#17A2B8',
        '#6610F2',
        '#FFFFFF',
        '#000000',
    ];
    return (
        <>
            <Drawer title = "Settings" onClose = {onClose} open = {open}>
                <Row gutter = {[
                    10,
                    10
                ]}>
                    <Col span = {24}>
                        Dark Mode
                    </Col>
                    <Col span = {24}>
                        <Radio.Group
                            onChange = {(e) => {
                                setDarkMode(e.target.value);
                                setColorLocalStorage({
                                    color: colorLocalStorage.color,
                                    darkMode: e.target.value
                                });
                            }}
                            block
                            options = {[
                                {
                                    label: 'Light Mode',
                                    value: false
                                },
                                {
                                    label: 'Dark Mode',
                                    value: true
                                }
                            ]}
                            defaultValue = {isDarkMode}
                            optionType = "button"
                            buttonStyle = "solid"
                        />
                    </Col>
                    <Col span = {24}>
                        Theme Accent Color
                    </Col>
                    <Col span = {24}>
                        <Row
                            gutter = {[
                                1,
                                1
                            ]}
                        >
                            {colors.map((col, index) => (<Col
                                key = {index}
                                span = {8}>
                                <Button
                                    block = {true}
                                    style = {{
                                        height: 55,
                                        background: col,
                                    }}
                                    onClick = {() => {
                                        setColor(col);
                                        setColorLocalStorage({
                                            color: col,
                                            darkMode: isDarkMode
                                        });
                                    }}/>
                            </Col>))}
                        </Row>
                    </Col>
                </Row>
            </Drawer>
        </>
    );
};

export default SettingsDrawer;
