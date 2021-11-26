import React, { useRef } from "react";

export default function ContentEditable(props) {
  const { onChange } = props;
  const element = useRef();
  let elements = React.Children.toArray(props.children);

  const keyUpHandler = () => {
    if (!element.current) return;

    //calls onChange in the props
    onChange(element.current.innerText);
  };

  elements = React.cloneElement(elements[0], {
    contentEditable: true,
    suppressContentEditableWarning: true,
    ref: element,
    onKeyUp: keyUpHandler,
  });

  return elements;
}
