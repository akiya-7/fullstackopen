import {forwardRef, useImperativeHandle, useState} from 'react';

const Toggleable = forwardRef((props, refs) => {
  const [visible, setVisible] = useState(false);

  const {buttonLabel} = props;

  const expanded = {display: visible ? 'block' : 'none', marginBottom: 16};
  const hidden = {display: visible ? 'none' : 'block', marginBottom: 16};

  const toggle = () => {
    setVisible(!visible);
  }

  useImperativeHandle(refs, () => {
    return {
      toggle
    }
  })

  return (
      <>
        <div style={hidden}>
          <button onClick={toggle}>{buttonLabel}</button>
        </div>

        <div style={expanded}>
          {props.children}
          <button onClick={toggle}>Cancel</button>
        </div>
      </>
  )
})

export default Toggleable;