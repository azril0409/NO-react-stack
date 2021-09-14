import React, {useRef} from 'react';
import HorizontalAlignment from "./HorizontalAlignment";
import VerticalAlignment from "./VerticalAlignment";
import {useResize} from "./units";

export default React.forwardRef(({className, alignment, style, children, ...rest}, ref) => {
    const horizontal = alignment?.horizontal ? alignment?.horizontal : 'center'
    const vertical = alignment?.vertical ? alignment?.vertical : 'center'
    const resize = useResize()
    const CreateRef = () => {
        return useRef()
    }
    const size = resize.size
    return (<div
        {...rest}
        ref={ref}
        className={className}
        style={{
            display: 'flex',
            boxSizing: 'border-box',
            position: 'relative',
            alignContent: 'stretch',
            width: size.width,
            height: size.height,
            ...style
        }}
    >{
        React.Children.map(children, (child, i) => {
            const ref = CreateRef()
            let childHorizontal = child.props.alignment?.horizontal ? child.props.alignment?.horizontal : horizontal
            let childVertical = child.props.alignment?.vertical ? child.props.alignment?.vertical : vertical
            let top = undefined
            let left = undefined
            if (size.width !== undefined && size.height !== undefined && ref.current) {
                if (childHorizontal === HorizontalAlignment.LEFT) {
                    left = 0;
                } else if (childHorizontal === HorizontalAlignment.RIGHT) {
                    left = size.width - ref.current.offsetWidth
                } else {
                    left = (size.width - ref.current.offsetWidth) / 2
                }

                if (childVertical === VerticalAlignment.TOP) {
                    top = 0
                } else if (childVertical === VerticalAlignment.BOTTOM) {
                    top = size.height - ref.current.offsetHeight
                } else {
                    top = (size.height - ref.current.offsetHeight) / 2
                }
            }
            resize.observe(ref)
            return  React.cloneElement(child, {
                key: i,
                style: {
                    position: 'absolute',
                    zIndex: i + 1,
                    ...child.props.style,
                    top: top,
                    left: left,
                },
                ref: ref,
            });
        })
    }</div>)
})
