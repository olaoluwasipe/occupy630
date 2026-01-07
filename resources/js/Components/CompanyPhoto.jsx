export default function CompanyPhoto({company, style}) {
    return (
        <img className={`w-10 h-10 rounded-full ${style}`} src={(company?.logo  ?? '/images/profilePhoto.png')} />
    );
}
