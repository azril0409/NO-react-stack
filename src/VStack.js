import React from 'react';
import {isChildrenHaveSpacer, getHorizontalAlignmentStyle} from "./units";

export default React.forwardRef(({className, alignment, style, children, ...rest}, ref) => {
    const height = isChildrenHaveSpacer(children) ? '100%' : undefined
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
            height: height,
            ...style
        }}
    >{
        React.Children.map(children, (child, i) => {
            if (!child?.type) return child
            const ref = child.ref
            const element = React.cloneElement(child, {
                key: i,
                style: {
                    ...child.props.style
                },
                ref: ref
            });
            return element
        })
    }</div>)
})

