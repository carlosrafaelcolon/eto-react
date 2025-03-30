import Logo from "../assets/images/eto-logo-bright-blue.svg";


interface BrandProps {
    className?: string;
    height?: number;
    width?: number;
}
const Brand = (props:BrandProps) => {
    const {className, height, width} = props;
    const styles = {
        height: width ? undefined : `${height}px`,
        width: width ? `${width}px` : height ? undefined : "120px"
    };
    return (
        <img src={Logo} alt="ETO Logo" style={styles} className={className} />
    );
};

export default Brand;