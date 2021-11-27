import React, { useRef } from "react";

export default function ContentEditable(props: any) {
  const { onChange } = props;
  const element = useRef<HTMLElement>();
  let elements: any[] = React.Children.toArray(props.children);

  const keyUpHandler = () => {
    if (!element.current) return;

    //calls onChange in the props
    onChange(element.current.innerText);
  };

  let ret = React.cloneElement(elements[0], {
    contentEditable: true,
    suppressContentEditableWarning: true,
    ref: element,
    onKeyUp: keyUpHandler,
  });

  return ret;
}
