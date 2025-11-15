import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';

const properties = [
  {
    id: 1,
    image: '/property1.jpg',
    title: 'Modern Villa',
    price: '$850,000',
    location: 'Beverly Hills, CA',
    beds: 4,
    baths: 3,
    area: '2,500 sq ft'
  },
  {
    id: 2,
    image: '/property2.jpg',
    title: 'Downtown Apartment',
    price: '$450,000',
    location: 'Manhattan, NY',
    beds: 2,
    baths: 2,
    area: '1,200 sq ft'
  },
  {
    id: 3,
    image: '/property3.jpg',
    title: 'Beach House',
    price: '$1,200,000',
    location: 'Malibu, CA',
    beds: 5,
    baths: 4,
    area: '3,200 sq ft'
  }
];

export default function FeaturedPropertySection() {
  return (
    <section className="py-16 px-4">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-12">Featured Properties</h2>
        
        <Swiper
          modules={[Pagination]}
          spaceBetween={30}
          slidesPerView={1}
          pagination={{
            clickable: true,
            el: '.custom-pagination'
          }}
          breakpoints={{
            768: {
              slidesPerView: 2,
            },
            1024: {
              slidesPerView: 3,
            },
          }}
          className="featured-swiper"
        >
          {properties.map((property) => (
            <SwiperSlide key={property.id}>
              <div className="bg-white rounded-lg shadow-lg overflow-hidden">
                <div className="relative">
                  <div className="w-full h-64 bg-gray-200 flex items-center justify-center">
                    <span className="text-gray-500">Property Image</span>
                  </div>
                  {/* Pagination for desktop - positioned over image */}
                  <div className="custom-pagination desktop-pagination absolute bottom-4 left-1/2 transform -translate-x-1/2 hidden md:block"></div>
                </div>
                
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-2">{property.title}</h3>
                  <p className="text-2xl font-bold text-[#d41a22] mb-2">{property.price}</p>
                  <p className="text-gray-600 mb-4">{property.location}</p>
                  
                  <div className="flex justify-between text-sm text-gray-500">
                    <span>{property.beds} beds</span>
                    <span>{property.baths} baths</span>
                    <span>{property.area}</span>
                  </div>
                  
                  {/* Pagination for mobile - positioned below content */}
                  <div className="custom-pagination mobile-pagination mt-4 block md:hidden"></div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
}