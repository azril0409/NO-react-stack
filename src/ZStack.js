import React, {useEffect, useState} from 'react';
import HorizontalAlignment from "./HorizontalAlignment";
import VerticalAlignment from "./VerticalAlignment";
import {ResizeObserver} from "@juggle/resize-observer";

const observerOptions = {
    box: 'border-box'
};

export default React.forwardRef(({className, alignment, style, children, ...rest}, ref) => {
    const horizontal = alignment?.horizontal ? alignment?.horizontal : 'center'
    const vertical = alignment?.vertical ? alignment?.vertical : 'center'
    const onChildSizeChanged = (entries, observer) => {
        let maxWidth = Math.max(...entries.map(entry => entry.borderBoxSize[0].inlineSize))
        let maxHeight = Math.max(...entries.map(entry => entry.borderBoxSize[0].blockSize))
        entries.forEach(entry => {
            observer.unobserve(entry.target)
        })
        if (size.width !== maxWidth || size.height !== maxHeight) {
            setSize({width: maxHeight, height: maxHeight})
        }
    }
    const [refs, setRefs] = useState(React.Children.map(children, child => child?.ref ? child?.ref : React.createRef()))
    const [resizeObserver, _] = useState(new ResizeObserver(onChildSizeChanged))
    const [size, setSize] = useState({width: undefined, height: undefined});
    useEffect(() => {
        const length = React.Children.count(children)
        if (length !== refs.length && (length - refs.length) > 0) {
            const newRefs = Array(length - refs.length).fill(React.createRef())
            setRefs(oldArray => [...oldArray, ...newRefs])
        } else if (length !== refs.length && (length - refs.length) < 0) {
            setRefs(oldArray => [...oldArray.slice(length)])
        } else {
            setRefs(oldArray => [...oldArray])
        }
    }, [children])
    useEffect(() => {
        refs.forEach(ref => {
            const target = ref && 'current' in ref ? ref.current : ref
            if (target && target instanceof Element) {
                resizeObserver.observe(target, observerOptions)
            }
        })
    }, [refs])
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
            if (!child?.type) return child
            const ref = refs[i]
            let top = undefined
            let left = undefined
            let childHorizontal = child.props?.alignment?.horizontal ? child.props?.alignment?.horizontal : horizontal
            let childVertical = child.props?.alignment?.vertical ? child.props?.alignment?.vertical : vertical
            if (size.width !== undefined && size.height !== undefined && ref?.current) {
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
            const element = React.cloneElement(child, {
                key: i,
                style: {
                    position: 'absolute',
                    zIndex: i + 1,
                    ...child.props.style,
                    top: top,
                    left: left,
                },
                ref: ref
            })
            return element
        })
    }</div>)
})
