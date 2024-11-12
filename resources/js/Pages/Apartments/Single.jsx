import React, {useState} from 'react'
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout'
import { Head } from '@inertiajs/react'
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
import { FaLocationDot } from 'react-icons/fa6';
import PrimaryButton from '@/Components/PrimaryButton';
import SecondaryButton from '@/Components/SecondaryButton';
import { FaCheckCircle, FaSave } from 'react-icons/fa';
import ContactOwnerForm from '@/Forms/ContactOwnerForm';
import AssignStaffToRentForm from '@/Forms/AssignStaffToRentForm';
import RentForm from '@/Forms/RentForm';
import formatPrice from '@/functions';

function NextArrow(props) {
    const { className, style, onClick } = props;
    return (
      <div
        className={className}
        style={{ ...style, display: "block", right: 20, zIndex: 100 }}
        onClick={onClick}
      />
    );
  }

  function PrevArrow(props) {
    const { className, style, onClick } = props;
    return (
      <div
        className={className}
        style={{ ...style, display: "block", left: 20, zIndex: 100, width: 40 }}
        onClick={onClick}
      />
    );
  }

const Single = ({auth, apartment}) => {
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
        security: apartment.cg_price * 0.3,
        agreement: apartment.cg_price * 0.05,
        agency: apartment.cg_price * 0.05,
        total:  parseFloat(apartment.cg_price * 0.3) + parseFloat( (apartment.cg_price * 0.05) * 2 ) ,
        initial: parseFloat(apartment.monthly_price) + parseFloat(apartment.cg_price * 0.3) + parseFloat( (apartment.cg_price * 0.05) * 2 ) ,
    }


    const [openContact, setOpenContact] = useState(false);

    const [openRent, setOpenRent] = useState(false)

    // const [openFile, setOpenFile] = useState(false)

    const modalOpen = () => {
        setOpenContact(!openContact);
    }

    const modalRent = () => {
        setOpenRent(!openRent);
    }

    // const modalFile = () => {
    //     setOpenFile(!openFile);
    // }

    console.log(apartment)
  return (
    <AuthenticatedLayout
    user={auth.user}>

        <Head title={apartment.title} />
        <Slider {...settings}>
            {apartment.images.map((image, index) => (
                <div key={index}>
                    <img src={`${image.url}`} alt="" className="w-full h-[60vh] object-cover" />
                </div>
            ))}
        </Slider>
        <div className="py-12 mb-10">
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

                        <div className="mt-3 rounded-md shadow-lg bg-white px-4 py-6">
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
                        </div>

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

                        <div className="mt-3 rounded-md shadow-lg bg-white px-4 py-6">
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
                        </div>
                    </div>
                </div>
                <div className="w-2/6">
                    <div className=" sticky top-20">
                        <div className="flex gap-2 items-center">
                            <h3 className="text-5xl">{formatPrice(apartment.cg_price)} </h3>
                            <p className="text-sm font-light">PER YEAR</p>
                        </div>
                        <hr className='my-3' />
                        <div className="flex gap-2 items-center  ">
                            {/* <div className="bg-blue-200 w-full h-10"></div> */}
                            <h3 className="text-2xl">{formatPrice(apartment.monthly_price)} </h3>
                            <p className="text-sm font-light">PER MONTH</p>
                        </div>
                        <div className="rounded-lg shadow-lg bg-white p-4">
                            <div className="flex gap-3 items-center justify-between items-center mb-4">
                                <SecondaryButton className='w-1/2 flex items-center justify-center'><FaSave/> Save</SecondaryButton>
                                <SecondaryButton onClick={modalOpen} className='w-1/2 flex items-center justify-center'>Contact Owner</SecondaryButton>
                            </div>
                            <PrimaryButton onClick={modalRent} className='w-full flex items-center justify-center'>Rent Property</PrimaryButton>
                            <div className="mt-3 p-2 rounded-lg shadow-lg bg-blue-100">
                                <h3 className="text-md font-bold">Initial Payments:</h3>
                                <hr className="mt-3 mb-5 bg-indigo-400 w-full h-[2px]" />
                                <div className="flex gap-2 justify-between items-center">
                                    <p className="text-sm font-light uppercase mb-3">SECURITY DEPOSIT(30%)</p>
                                    <p className="text-sm font-light mb-3">{formatPrice(apartment.cg_price * 0.3)}</p>
                                </div>
                                <div className="flex gap-2 justify-between items-center">
                                    <p className="text-sm font-light uppercase mb-3">AGREEMENT FEE(5%)</p>
                                    <p className="text-sm font-light mb-3">{formatPrice(apartment.cg_price * 0.05)}</p>
                                </div>
                                <div className="flex gap-2 justify-between items-center">
                                    <p className="text-sm font-light uppercase mb-3">AGENCY FEE(5%)</p>
                                    <p className="text-sm font-light mb-3">{formatPrice(apartment.cg_price * 0.05)}</p>
                                </div>
                                <div className="flex gap-2 justify-between items-center">
                                    <p className="text-sm font-light uppercase mb-3">MONTHLY RENT</p>
                                    <p className="text-sm font-light mb-3">{formatPrice(apartment.monthly_price)}</p>
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
            </div>

            <Modal show={openContact}  >
                <div className='p-10'>
                    <div className='flex flex-row mb-10 flex-nowrap justify-between items-center'>
                        <p className='text-xl text-blue-800 font-semibold'>Contact Owner</p>
                        <DangerButton onClick={modalOpen}>Close</DangerButton>
                    </div>

                    <ContactOwnerForm apartment={apartment} />
                </div>
            </Modal>

            <Modal show={openRent}  >
                <div className='p-10'>
                    <div className='flex flex-row mb-10 flex-nowrap justify-between items-center'>
                        <p className='text-xl text-blue-800 font-semibold'>Rent {apartment.title}</p>
                        <DangerButton onClick={modalRent}>Close</DangerButton>
                    </div>

                    {auth.user.type === 'employer' && <AssignStaffToRentForm apartment={apartment} user={auth.user} />}
                    {auth.user.type === 'employee' && <RentForm apartment={apartment} prices={prices} user={auth.user} />}
                    {/* <AssignStaffToRentForm apartment={apartment} user={auth.user} /> */}
                </div>
            </Modal>

            {/* <Modal show={openFile}  >
                <div className='p-10'>
                    <div className='flex flex-row mb-10 flex-nowrap justify-between items-center'>
                        <p className='text-xl text-blue-800 font-semibold'>Upload File</p>
                        <DangerButton onClick={modalFile}>Close</DangerButton>
                    </div>

                    <FileAddForm cohort={course.cohorts[0].id} />
                </div>
            </Modal> */}
    </AuthenticatedLayout>
  )
}

export default Single
