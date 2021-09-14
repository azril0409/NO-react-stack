import React, {useRef} from 'react';
import {getVerticalAlignmentStyle, isChildrenHaveSpacer, useResize} from "./units";

export default React.forwardRef(({className, alignment, style, children, ...rest}, ref) => {
    const width = isChildrenHaveSpacer(children) ? '100%' : undefined
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
            flexDirection: 'row',
            alignContent: 'stretch',
            alignItems: getVerticalAlignmentStyle(alignment),
            width: width,
            height: resize.size.height,
            ...style
        }}
    >{
        React.Children.map(children, (child, i) => {
            const ref = CreateRef()
            resize.observe(ref)
            return React.cloneElement(child, {
                key: i,
                style: {
                    alignSelf: getVerticalAlignmentStyle(child.props.alignment),
                    ...child.props.style
                },
                ref: ref,
            });
        })
    }</div>)
})
