import React, { useState, useEffect } from 'react';
import Alert from '@material-ui/lab/Alert';
import { Animated } from 'react-animated-css';

export default function AlertComponent(props) {
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
      isVisible={props.data.show}
    >
      {props.data.show && (
        <Alert
          onClose={() => {
            props.onClose();
          }}
          severity={props.data.type}
        >
          {props.data.message}
        </Alert>
      )}
    </Animated>
  );

  return <div>{loadAlert ? alert : ''}</div>;
}
