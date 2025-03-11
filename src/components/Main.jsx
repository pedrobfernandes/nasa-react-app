export default function Main(props)
{
    const {data} = props;
    return(
        <div className="imageContainer">
            <img src={data.hdurl} alt={`Astronomical image of ${data.title.substring(data.title.indexOf(":") + 2)} provided by the NASA APOD PROJECT` || 'background-image'} className="bgImage"/>
        </div>
    );
}
