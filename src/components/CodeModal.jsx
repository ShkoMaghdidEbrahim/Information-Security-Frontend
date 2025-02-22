import {Modal} from "antd";
import {codes} from '../configs/constants.js'
import {a11yDark, CopyBlock,} from "react-code-blocks";

function CodeModal({
    isModalVisible,
    setIsModalVisible,
    codeType = 'monoAlphabeticDecrypt',
}) {
    return (
        <Modal
            title = {<p
                style = {{
                    textTransform: 'capitalize',
                }}
            >
                {codeType.split(/(?=[A-Z])/).join(' ')}
            </p>}
            open = {isModalVisible}
            footer = {null}
            width = {'80%'}
            onCancel = {() => setIsModalVisible(false)}
        >
            <CopyBlock
                text = {codes[codeType]}
                language = {'python'}
                showLineNumbers = {true}
                wrapLines
                customStyle = {{
                    fontSize: 16,
                    letterSpacing: 0.5,
                }}
                theme = {a11yDark}
            />
        </Modal>
    );
}

export default CodeModal;
