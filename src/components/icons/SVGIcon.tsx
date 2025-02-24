import SVG from 'react-inlinesvg'

interface SVGIconProps {
    src: string
    size?: number
}

export default function SVGIcon({ src, size = 80 }: SVGIconProps) {
    return (
        <SVG
            src={src}
            width={size}
            height="100%"
            title="SVGIcon"
        />
    )
}
