import React from 'react'
import { Gauge } from '@ant-design/plots';

const Medidor = (props) => {
    const config = {
        width: 400,
        height: 400,
        data:{
          target: props.target,
          total: props.total,
        },
        style: {
          textContent: (target, total) => `${parseFloat((target / total) * 100).toFixed(2)}%`,
        },
      };

  return (<Gauge {...config} />)
}

export default Medidor