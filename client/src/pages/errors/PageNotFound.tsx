import notFoundGif from '../../assets/not-found.gif'; // Update the path to your GIF

const PageNotFound = (props: { customText?: string, customCode?: string }) => {
    return (
        <div className="flex flex-col items-center justify-center w-full h-full">
            <img src={notFoundGif} alt="Page Not Found GIF" className="max-w-sm md:max-w-lg mt-6" />
            <div className="text-center">
                <h1 className="text-6xl text-blue-500">{props.customCode ? props.customCode : "404"}</h1>
                <p className="text-xl text-blue-500">{props.customText ? props.customText : "Page Not Found"}</p>
            </div>
        </div>
    );
};

export default PageNotFound;
