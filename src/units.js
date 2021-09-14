import {useEffect, useState} from "react";
import {ResizeObserver} from "@juggle/resize-observer";

export const isChildrenHaveSpacer = (children) => {
    if (Array.isArray(children)) {
        return children.map((view, index) => {
            return view?.type?.name === 'Spacer' ? 1 : undefined
        }).find((checked) => checked)
    } else {
        return children?.type?.name === 'Spacer' ? 1 : undefined
    }
}

export const getHorizontalAlignmentStyle = (alignment) => {
    switch (alignment) {
        case 'left':
        case 'flex-start':
            return 'flex-start';
        case 'right':
        case 'flex-end':
            return 'flex-end';
        case 'center':
            return 'center';
        case null:
        case undefined:
        default:
            return undefined;
    }
}

export const getVerticalAlignmentStyle = (alignment) => {
    switch (alignment) {
        case 'top':
        case 'flex-start':
            return 'flex-start';
        case 'bottom':
        case 'flex-end':
            return 'flex-end';
        case 'center':
            return 'center';
        case null:
        case undefined:
        default:
            return undefined;
    }
}

export const useResize = () => {
    const [size, setSize] = useState({width: undefined, height: undefined});
    useEffect(() => {
        setSize({width: undefined, height: undefined})
    }, [])
    const observerOptions = {
        box: 'border-box'
    };
    const observer = new ResizeObserver((entries, observer) => {
        let width = Math.max(...entries.map(entry => entry.borderBoxSize[0].inlineSize))
        let height = Math.max(...entries.map(entry => entry.borderBoxSize[0].blockSize))
        if (size.width !== width || size.height !== height) {
            setSize({width: width, height: height})
        }
    });

    return {
        size: size,
        observe: (target) => {
            const targetEl = target && 'current' in target ? target.current : target
            if (targetEl) {
                observer.observe(targetEl, observerOptions)
            }
        }
    }
}
