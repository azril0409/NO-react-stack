import React from 'react';
import {getVerticalAlignmentStyle, isChildrenHaveSpacer} from "./units";

export default React.forwardRef(({className, alignment, style, children, ...rest}, ref) => {
    const width = isChildrenHaveSpacer(children) ? '100%' : undefined
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
