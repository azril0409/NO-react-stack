import HorizontalAlignment from "./HorizontalAlignment";
import VerticalAlignment from "./VerticalAlignment";

export const isChildrenHaveSpacer = (children) => {
    if (Array.isArray(children)) {
        console.log(`children is Array `)
        return children.map((view, index) => {
            console.log(`name: ${view?.type?.name}`)
            return view?.type?.name === 'Spacer' ? 1 : undefined
        }).find((checked) => checked)
    } else {
        console.log(`children is not Array `)
        return children?.type?.name === 'Spacer' ? 1 : undefined
    }
}

export const getHorizontalAlignmentStyle = (alignment) =>{
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

export const getVerticalAlignmentStyle = (alignment) =>{
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
