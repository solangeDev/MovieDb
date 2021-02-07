import React, { useState, useEffect } from 'react';
import Alert from '@material-ui/lab/Alert';
import { Animated } from 'react-animated-css';

type AlertComponentProps = {
    data: {
        show: boolean;
        message: string;
        type: string;
    };
    onClose: () => void;
};

const AlertComponent: React.FC<AlertComponentProps> = ({ data, onClose }: AlertComponentProps) => {
    const [loadAlert, setLoadAlert] = useState(false);

    useEffect(() => {
        setLoadAlert(true);
    }, []);

    const alert = (
        <Animated
            animationIn="fadeInUp"
            animationOut="fadeOutDown"
            animationInDuration={1000}
            animationOutDuration={1000}
            isVisible={data.show}
        >
            {data.show && (
                <Alert
                    onClose={() => {
                        onClose();
                    }}
                    severity={data.type}
                >
                    {data.message}
                </Alert>
            )}
        </Animated>
    );

    return <div>{loadAlert ? alert : ''}</div>;
};

export default AlertComponent;
