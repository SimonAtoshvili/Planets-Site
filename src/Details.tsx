function Details(props: any) {
    return (
        <footer style={props.bodyHide ? {display: 'none'} : {}}>
            <SingleDetail
                text='rotation time'
                path={props.data ? props.data[props.planet].rotation : ''}
            />
            <SingleDetail
                text='revolution time'
                path={props.data ? props.data[props.planet].revolution : ''}
            />
            <SingleDetail
                text='radius'
                path={props.data ? props.data[props.planet].radius : ''}
            />
            <SingleDetail
                text='avarage temp'
                path={props.data ? props.data[props.planet].temperature : ''}
            />
        </footer>
    )
}

function SingleDetail(props: any) {
    return (
        <div className="details_div">
            <p className="details_p">
                {props.text}
            </p>
            <h3>
                {props.path}
            </h3>
        </div>
    )
}


export default Details;