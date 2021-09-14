import React, {useRef} from 'react';
import {isChildrenHaveSpacer, getHorizontalAlignmentStyle, useResize} from "./units";

export default React.forwardRef(({className, alignment, style, children, ...rest}, ref) => {
    const height = isChildrenHaveSpacer(children) ? '100%' : undefined
    const resize = useResize()
    const CreateRef = () => {
        return useRef();
    }
    return (<div
        {...rest}
        ref={ref}
        className={className}
        style={{
            display: 'flex',
            boxSizing: 'border-box',
            flexDirection: 'column',
            alignContent: 'stretch',
            alignItems: getHorizontalAlignmentStyle(alignment),
            width: resize.size.which,
            height: height,
            ...style
        }}
    >{
        React.Children.map(children, (child, i) => {
            const ref = CreateRef()
            resize.observe(ref)
            return React.cloneElement(child, {
                key: i,
                style: {
                    alignSelf: getHorizontalAlignmentStyle(child.props.alignment),
                    ...child.props.style
                },
                ref: ref
            });
        })
    }</div>)
})
