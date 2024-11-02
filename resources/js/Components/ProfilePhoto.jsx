export default function ProfilePhoto({user, style}) {
    return (
        <img className={`w-10 h-10 rounded-full ${style}`} src={(user?.profile_photo  ?? '/images/profilePhoto.png')} />
    );
}
