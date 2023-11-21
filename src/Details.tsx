interface DetailsProps {
    planet: number;
    data: [] | null;
    bodyHide: boolean;
}

const Details: React.FC<DetailsProps> = ({planet, data, bodyHide}) => {
    return (
        <footer style={bodyHide ? {display: 'none'} : {}}>
            <SingleDetail
                text='rotation time'
                path={data ? data[planet]['rotation'] : ''}
            />
            <SingleDetail
                text='revolution time'
                path={data ? data[planet]['revolution'] : ''}
            />
            <SingleDetail
                text='radius'
                path={data ? data[planet]['radius'] : ''}
            />
            <SingleDetail
                text='avarage temp'
                path={data ? data[planet]['temperature'] : ''}
            />
        </footer>
    )
}

interface SingleDetailProps {
    text: string;
    path: any;
}

const SingleDetail: React.FC<SingleDetailProps> = ({text, path}) => {
    return (
        <div className="details_div">
            <p className="details_p">
                {text}
            </p>
            <h3>
                {path}
            </h3>
        </div>
    )
}


export default Details;