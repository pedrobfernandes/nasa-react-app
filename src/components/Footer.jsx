export default function Footer(props)
{
    const {handleToggleModal, data} = props;
    return(
        <footer>
            <div className="bgGradient"></div>
            <div>
                <h1>APOD PROJECT</h1>
                <h2>{data?.title}</h2>
            </div>
            <button onClick={handleToggleModal} aria-label={`Click to get information on ${data.title.substring(data.title.indexOf(":") + 2)}`}>
                <i className="fa-solid fa-circle-info"></i>
            </button>
        </footer>
    );
}
