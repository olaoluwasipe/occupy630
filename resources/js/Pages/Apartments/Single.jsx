import React, {useState} from 'react'
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout'
import { Head, useForm, usePage } from '@inertiajs/react'
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import ProfilePhoto from '@/Components/ProfilePhoto'
import Accordion from '@/Components/Accordion'
import Tabs from '@/Components/Tabs'
import CourseModules from '@/Content/CourseModules'
import Assignments from '@/Content/Assignments'
import Activities from '@/Content/Activities'
import Meetings from '@/Content/Meetings'
import Forum from '@/Content/Forum'
import Files from '@/Content/Files'
import Modal from '@/Components/Modal'
import DangerButton from '@/Components/DangerButton'
import AssignmentAddForm from '@/Forms/AssignmentAddForm'
import ScheduleAddForm from '@/Forms/ScheduleAddForm'
import FileAddForm from '@/Forms/FileAddForm'
import parse from 'html-react-parser'
import { FaAnchorCircleXmark, FaCircleXmark, FaLocationDot } from 'react-icons/fa6';
import PrimaryButton from '@/Components/PrimaryButton';
import SecondaryButton from '@/Components/SecondaryButton';
import { FaCheckCircle, FaCross, FaSave } from 'react-icons/fa';
import ContactOwnerForm from '@/Forms/ContactOwnerForm';
import AssignStaffToRentForm from '@/Forms/AssignStaffToRentForm';
import RentForm from '@/Forms/RentForm';
import formatPrice from '@/functions';
import { toast } from 'react-toastify';
import Table from '@/Components/Table';
import { MapContainer, Marker, Popup, TileLayer, useMap } from 'react-leaflet'
import ApprovalForm from '@/Forms/ApprovalForm';

function NextArrow(props) {
    const { className, style, onClick } = props;
    return (
      <div
        className={className}
        style={{ ...style, display: "block", right: 50, zIndex: 100, transform: 'scale(2)' }}
        onClick={onClick}
      />
    );
  }

  function PrevArrow(props) {
    const { className, style, onClick } = props;
    return (
      <div
        className={className}
        style={{ ...style, display: "block", left: 50, zIndex: 100, width: 40, transform: 'scale(2)' }}
        onClick={onClick}
      />
    );
  }

const Single = ({auth, apartment, success, error}) => {
    const { flash } = usePage().props;
    const position = [51.505, -0.09]
    var settings = {
      dots: true,
      infinite: true,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1,
      nextArrow: <NextArrow style={{left: 20}} />,
      prevArrow: <PrevArrow />
    };

    var prices = {
        monthly: apartment.monthly_price,
        yearly: apartment.cg_price,
        security: apartment?.approval?.payment?.meta?.prices?.security_deposit ?? apartment.six_months_rent * 0.3,
        agreement: apartment.cg_price * 0.1,
        agency: apartment?.approval?.payment?.meta?.prices?.agreement ?? apartment.cg_price * 0.1,
        total:  parseFloat(apartment.six_months_rent * 0.3) + parseFloat( (apartment.cg_price * 0.1) * 2 ) ,
        initial: apartment?.approval?.payment?.amount ?? (parseFloat(apartment.monthly_price) + parseFloat(apartment.six_months_rent * 0.3) + parseFloat( (apartment.cg_price * 0.1) * 2 )) ,
    }

    const { data, setData, post, processing, errors, reset } = useForm({
        apartment_id: apartment?.id,
        // cohort_id: cohort
    });

    const [openFile, setOpenFile] = useState(false)
    const [openApproval, setOpenApproval] = useState(false)

    const modalFile = () => {
        setOpenFile(!openFile);
    }

    const modalApproval = () => {
        setOpenApproval(!openApproval);
    }

    const tabsData = [
        {
          label: 'Overview',
          content: <div className="max-w-7xl mx-auto flex flex-row gap-5">
                        <div className="flex-1">
                            <div className="mt-3">
                                <h3 className="font-bold text-xl my-3">Property Description</h3>
                                <p className="text-gray-500">
                                    {parse(apartment.description)}
                                </p>

                                {/* <div className="mt-3 rounded-md shadow-lg bg-white px-4 py-6">
                                    <h2 className="text-xl font-bold mb-5">Amenities</h2>

                                    <div className="flex items-center gap-3 items-center">
                                        {apartment.amenities.map((amenity, index) => (
                                            <div key={index} className="flex items-center w-1/4 justify-center gap-3">
                                                <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center">
                                                    <img src={`/storage/${amenity.icon}`} alt="" className="w-6 h-6" />
                                                </div>
                                                <span className="text-gray-500">{amenity}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div> */}

                                <div className="mt-3 rounded-md shadow-lg bg-white px-4 py-6">
                                    <h2 className="text-xl font-bold mb-5">Features</h2>

                                    <div className="flex items-center gap-3 items-center">
                                        {apartment.amenities.map((amenity, index) => (
                                            <div key={index} className="flex items-center w-1/4 justify-center gap-3">
                                                <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center">
                                                    <FaCheckCircle />
                                                </div>
                                                <span className="text-gray-500">{amenity}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                {/* <div className="mt-3 rounded-md shadow-lg bg-white px-4 py-6">
                                    <h2 className="text-xl font-bold mb-5">Map</h2>

                                    <div className="flex items-center gap-3 items-center">
                                        {apartment.amenities.map((amenity, index) => (
                                            <div key={index} className="flex items-center w-1/4 justify-center gap-3">
                                                <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center">
                                                    <img src={`/storage/${amenity.icon}`} alt="" className="w-6 h-6" />
                                                </div>
                                                <span className="text-gray-500">{amenity}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div> */}
                            </div>
                        </div>
                        {auth?.user?.type == 'employer' && (
                        <div className="w-2/6">
                            <div className=" sticky top-20">
                                <div className="rounded-lg shadow-lg bg-white p-4">
                                    <div className="flex gap-3 items-center justify-between items-center mb-4">
                                        <SecondaryButton onClick={modalApproval} className='w-1/2 flex items-center justify-center'><FaCheckCircle/> Approve</SecondaryButton>
                                        <DangerButton onClick={modalApproval} className='w-1/2 flex items-center justify-center'><FaCircleXmark/>Decline</DangerButton>
                                    </div>
                                    <div className="mt-3 p-2 rounded-lg shadow-lg bg-blue-100">
                                        <h3 className="text-md font-bold">Initial Payments:</h3>
                                        <hr className="mt-3 mb-5 bg-indigo-400 w-full h-[2px]" />
                                        <div className="flex gap-2 justify-between items-center">
                                            <p className="text-sm font-light uppercase mb-3">REFUNDABLE SECURITY DEPOSIT(30%)</p>
                                            <p className="text-sm font-light mb-3">{formatPrice(prices.security)}</p>
                                        </div>
                                        <div className="flex gap-2 justify-between items-center">
                                            <p className="text-sm font-light uppercase mb-3">AGREEMENT FEE(10%)</p>
                                            <p className="text-sm font-light mb-3">{formatPrice(prices.agreement)}</p>
                                        </div>
                                        <div className="flex gap-2 justify-between items-center">
                                            <p className="text-sm font-light uppercase mb-3">AGENCY FEE(10%)</p>
                                            <p className="text-sm font-light mb-3">{formatPrice(prices.agency)}</p>
                                        </div>
                                        <div className="flex gap-2 justify-between items-center">
                                            <p className="text-sm font-light uppercase mb-3">MONTHLY RENT</p>
                                            <p className="text-sm font-light mb-3">{formatPrice(prices.monthly)}</p>
                                        </div>
                                        <div className="flex gap-2 bg-indigo-500 rounded-md p-2 text-white justify-between items-center">
                                            <p className="text-sm font-light uppercase">TOTAL</p>
                                            <p className="text-sm font-light">{formatPrice(prices.initial)}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        )}
                    </div>
        },
        {
            label: 'Tenant',
            content: <div>
                {apartment?.tenant ? (
                    <div className=" gap-5">
                        <div className="flex items-center justify-between gap-3 mb-10">
                            <div className="">
                                <p className='text-sm uppercase text-gray-400'>current tenant</p>
                                <div className="flex items-center gap-3">
                                    <p className='text-sm uppercase text-gray-500'>Name:</p>
                                    <h3 className='text-2xl'>{apartment.tenant.fullname}</h3>
                                </div>
                                <div className="flex items-center gap-3">
                                    <p className='text-sm uppercase text-gray-500'>Company:</p>
                                    <h3 className='text-2xl'>{apartment.tenant.employed_company?.name}</h3>
                                </div>
                                <div className="flex items-center gap-3">
                                    <p className='text-sm uppercase text-gray-500'>Employer:</p>
                                    <h3 className='text-2xl'>{apartment.tenant.employed_company?.owner.fullname}</h3>
                                </div>
                            </div>

                            <ProfilePhoto style={`w-24 h-24 border-green-500 border border-4`} user={auth?.user} />
                        </div>
                        <Files openFile={() => setOpenFile(!openFile)} files={apartment.files} />
                    </div>
                ) : <div className='text-center'>No tenant yet</div>}
            </div>
        },
        {
            label: 'Payments',
            content: (
                <Table
                    type="apartment"
                    data={apartment.transactions}
                    actions={{
                        buttons: [
                            {
                                label: 'Pay',
                                type: 'secondary',
                                onClick: (row) => modalRent(row),
                            },
                            // {
                            //     label: 'Decline',
                            //     type: 'danger',
                            //     onClick: (row) => alert(`Declining ${row.id}`),
                            // },
                        ],
                        // defaultActions: ['view'], // Specify default actions
                        onDelete: (row) => alert(`Deleting ${row.id}`), // Optional override for delete
                    }}
                    searchable
                    clickable={(row)=>alert(row.id)}
                    columnsToShow={[
                        { key: 'reference', label: 'Reference' },
                        { key: 'apartment.title', label: 'Apartment' },
                        { key: 'note', label: 'Description' },
                        { key: 'user.lname', label: 'For' },
                        { key: 'due_date', label: 'Due Date', formatter: 'date' },
                        { key: 'type', label: 'Type' },
                        { key: 'mode', label: 'Mode' },
                        { key: 'status', label: 'Status', formatter: 'tag' },
                        { key: 'created_at', label: 'Date', formatter: 'datetime' },
                    ]}
                />
            ),
        },
      ];


    const [openContact, setOpenContact] = useState(false);

    const [openRent, setOpenRent] = useState(false)

    // const [openFile, setOpenFile] = useState(false)

    const modalOpen = () => {
        setOpenContact(!openContact);
    }

    const modalRent = () => {
        setOpenRent(!openRent);
    }

    const handleSubmit = () => {
        const status = apartment?.approval?.status;
        if(!status) {
            post(route('apartment.request-approval', apartment.id))
        }

    }

    success && toast.success(success ?? "Approval request sent")
    error && toast.error(error ?? "Something went wrong")



    // const modalFile = () => {
    //     setOpenFile(!openFile);
    // }

    console.log(apartment)
  return (
    <AuthenticatedLayout
    user={auth?.user ?? []}>

        <Head title={apartment.title} />
        <Slider {...settings}>
            {apartment.images.map((image, index) => (
                <div key={index}>
                    <img src={`${image.url}`} alt="" className="w-full h-[60vh] object-cover" />
                </div>
            ))}
        </Slider>
        <div className="py-12 mb-10">
            {auth?.user?.type === 'landlord' || auth?.user?.type === 'employer' ? (
                <div className="max-w-7xl mx-auto sm:px-6 gap-5 lg:px-8">
                    <div className="flex justify-between w-full items-center">
                        <div>
                            <h1 className='text-5xl font-bold'>{apartment.title}</h1>
                            <p className="flex items-center mt-3 gap-3">
                                <FaLocationDot className='text-blue-500' />
                                <span className='text-gray-500'>{apartment.address}, {apartment.city}, {apartment.state}, {apartment.country}</span>
                            </p>
                        </div>
                        <div>
                            <div className="flex gap-2 items-center">
                                <h3 className="text-5xl">{formatPrice(auth?.user?.type === 'landlord' ? apartment.price : apartment.six_months_rent)} </h3>
                                <p className="text-sm font-light">{auth?.user?.type === 'landlord' ?  "PER YEAR" : "PER SIX MONTHS"}</p>
                            </div>
                            <hr className='my-3' />
                            <div className="flex gap-2 items-center  ">
                                {/* <div className="bg-blue-200 w-full h-10"></div> */}
                                <h3 className="text-2xl">{formatPrice(auth?.user?.type === 'landlord' ? apartment.monthly_rent : apartment.monthly_price)} </h3>
                                <p className="text-sm font-light">PER MONTH</p>
                            </div>
                        </div>
                    </div>

                    <div className="container mx-auto mt-12">
                        <Tabs container={false} tabs={tabsData} />
                    </div>
                </div>
            ) : (
                <div className="max-w-7xl mx-auto sm:px-6 flex flex-row gap-5 lg:px-8">
                    <div className="w-4/6">
                        <h1 className='text-5xl font-bold'>{apartment.title}</h1>
                        <p className="flex items-center mt-3 gap-3">
                            <FaLocationDot className='text-blue-500' />
                            <span className='text-gray-500'>{apartment.address}, {apartment.lga}, {apartment.state}, {apartment.country}</span>
                        </p>
                        <div className="mt-3">
                            <h3 className="font-bold text-xl my-3">Property Description</h3>
                            <p className="text-gray-500">
                                {parse(apartment.description)}
                            </p>

                            {/* <div className="mt-3 rounded-md shadow-lg bg-white px-4 py-6">
                                <h2 className="text-xl font-bold mb-5">Amenities</h2>

                                <div className="flex items-center gap-3 items-center">
                                    {apartment.amenities.map((amenity, index) => (
                                        <div key={index} className="flex items-center w-1/4 justify-center gap-3">
                                            <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center">
                                                <img src={`/storage/${amenity.icon}`} alt="" className="w-6 h-6" />
                                            </div>
                                            <span className="text-gray-500">{amenity}</span>
                                        </div>
                                    ))}
                                </div>
                            </div> */}

                            <div className="mt-3 rounded-md shadow-lg bg-white px-4 py-6">
                                <h2 className="text-xl font-bold mb-5">Features</h2>

                                <div className="flex items-center gap-3 items-center">
                                    {apartment.amenities.map((amenity, index) => (
                                        <div key={index} className="flex items-center w-1/4 justify-center gap-3">
                                            <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center">
                                                <FaCheckCircle />
                                            </div>
                                            <span className="text-gray-500">{amenity}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* <div className="mt-3 rounded-md shadow-lg bg-white overflow-hidden px-4 py-6">
                                <h2 className="text-xl font-bold mb-5">Map</h2>

                                <MapContainer center={position} zoom={13} scrollWheelZoom={false}>
                                    <TileLayer
                                        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                                    />
                                    <Marker position={position}>
                                        <Popup>
                                            A pretty CSS3 popup. <br /> Easily customizable.
                                        </Popup>
                                    </Marker>
                                </MapContainer>
                            </div> */}
                        </div>
                    </div>
                    <div className="w-2/6">
                        <div className=" sticky top-20">
                            <div className="flex gap-2 items-center">
                                <h3 className="text-5xl">{formatPrice(apartment.six_months_rent)} </h3>
                                <p className="text-sm font-light">PER SIX MONTHS</p>
                            </div>
                            <hr className='my-3' />
                            <div className="flex gap-2 items-center  ">
                                {/* <div className="bg-blue-200 w-full h-10"></div> */}
                                <h3 className="text-2xl">{formatPrice(apartment.monthly_price)} </h3>
                                <p className="text-sm font-light">PER MONTH</p>
                            </div>
                            <div className="rounded-lg shadow-lg bg-white p-4">
                                {auth?.user ? (
                                    <>
                                        <div className="flex gap-3 items-center justify-between items-center mb-4">
                                            <SecondaryButton className='w-1/2 flex items-center justify-center'><FaSave/> Save</SecondaryButton>
                                            <SecondaryButton onClick={modalOpen} className='w-1/2 flex items-center justify-center'>Contact Owner</SecondaryButton>
                                        </div>
                                        {apartment.approval ? (
                                            apartment.approval.status === "approved" ? (
                                                <PrimaryButton onClick={modalRent} className='w-full flex items-center justify-center'>Rent Property</PrimaryButton>
                                            ) : apartment.approval.status === "pending" ? (
                                                <SecondaryButton onClick={modalRent} disabled className='w-full flex items-center justify-center'>Approval Pending</SecondaryButton>
                                            ) : apartment.approval.status === "declined" ? (
                                                <div>
                                                    <DangerButton disabled className='w-full flex items-center justify-center'>You can't get this property</DangerButton>
                                                    <p>{apartment.approval.comment}</p>
                                                </div>
                                            ) : null
                                        ) : (
                                            <PrimaryButton onClick={handleSubmit} className='w-full flex items-center justify-center'>Request Approval</PrimaryButton>
                                        )}
                                    </>
                                ) : (
                                    <PrimaryButton onClick={() => window.location.href = route('login')} className='w-full flex items-center justify-center'>Login to Rent</PrimaryButton>
                                )}
                                <div className="mt-3 p-2 rounded-lg shadow-lg bg-blue-100">
                                    <h3 className="text-md font-bold">Initial Payments:</h3>
                                    <hr className="mt-3 mb-5 bg-indigo-400 w-full h-[2px]" />
                                    <div className="flex gap-2 justify-between items-center">
                                        <p className="text-sm font-light uppercase mb-3">REFUNDABLE SECURITY DEPOSIT(30%)</p>
                                        <p className="text-sm font-light mb-3">{formatPrice(prices.security)}</p>
                                    </div>
                                    <div className="flex gap-2 justify-between items-center">
                                        <p className="text-sm font-light uppercase mb-3">AGREEMENT FEE(10%)</p>
                                        <p className="text-sm font-light mb-3">{formatPrice(prices.agreement)}</p>
                                    </div>
                                    <div className="flex gap-2 justify-between items-center">
                                        <p className="text-sm font-light uppercase mb-3">AGENCY FEE(10%)</p>
                                        <p className="text-sm font-light mb-3">{formatPrice(prices.agency)}</p>
                                    </div>
                                    <div className="flex gap-2 justify-between items-center">
                                        <p className="text-sm font-light uppercase mb-3">MONTHLY RENT</p>
                                        <p className="text-sm font-light mb-3">{formatPrice(prices.monthly)}</p>
                                    </div>
                                    <div className="flex gap-2 bg-indigo-500 rounded-md p-2 text-white justify-between items-center">
                                        <p className="text-sm font-light uppercase">TOTAL</p>
                                        <p className="text-sm font-light">{formatPrice(prices.initial)}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
            </div>

            {auth?.user && (
                <>

                    <Modal show={openContact}  >
                        <div className='p-10'>
                            <div className='flex flex-row mb-10 flex-nowrap justify-between items-center'>
                                <p className='text-xl text-blue-800 font-semibold'>Contact Owner</p>
                                <DangerButton onClick={modalOpen}>Close</DangerButton>
                            </div>

                            <ContactOwnerForm apartment={apartment} />
                        </div>
                    </Modal>

                    <Modal show={openApproval}  >
                        <div className='p-10'>
                            <div className='flex flex-row mb-10 flex-nowrap justify-between items-center'>
                                <p className='text-xl text-blue-800 font-semibold'>Give Approval to {apartment?.user?.fname} {apartment?.user?.lname}</p>
                                <DangerButton onClick={modalApproval}>Close</DangerButton>
                            </div>


                            <ApprovalForm apartment={apartment} openModal={modalApproval} approval={apartment.approval} prices={prices} />
                        </div>
                    </Modal>

                    <Modal show={openRent}  >
                        <div className='p-10'>
                            <div className='flex flex-row mb-10 flex-nowrap justify-between items-center'>
                                <p className='text-xl text-blue-800 font-semibold'>Rent {apartment.title}</p>
                                <DangerButton onClick={modalRent}>Close</DangerButton>
                            </div>

                            {auth?.user?.type === 'employer' && <AssignStaffToRentForm apartment={apartment} user={auth?.user} />}
                            {auth?.user?.type === 'employee' && <RentForm apartment={apartment} prices={prices} openModal={modalRent} user={auth?.user} />}
                            {/* <AssignStaffToRentForm apartment={apartment} user={auth?.user} /> */}
                        </div>
                    </Modal>

                    <Modal show={openFile}  >
                        <div className='p-10'>
                            <div className='flex flex-row mb-10 flex-nowrap justify-between items-center'>
                                <p className='text-xl text-blue-800 font-semibold'>Upload File</p>
                                <DangerButton onClick={modalFile}>Close</DangerButton>
                            </div>

                            <FileAddForm apartment={apartment} />
                        </div>
                    </Modal>
                </>
            )}
    </AuthenticatedLayout>
  )
}

export default Single
