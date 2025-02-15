import {
    Card,
} from 'antd';

function Dashboard() {
    
    return (<>
        <Card
            style = {{
                width: '100%',
                height: '100%',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
            }}
            key = {'App'}
        >
            Hello, this is the dashboard
        </Card>
    </>);
}

export default Dashboard;
