const MyProfile = (props) => {
    return (
        <>
        <h1>My Profile</h1>
        <p>My name {props.data.name}</p>
        </>
    )
}

export default MyProfile;