function Image({ src, alt, className }) {
    return (
        <div className={`w-full h-48 overflow-hidden rounded-md ${className}`}>
            <img src={src} alt={alt} className="object-cover w-full h-full" />
        </div>
    );
}

export default Image;
