import Carousel from 'react-bootstrap/Carousel';

function Images({images}) {
  return (
    <Carousel>
        {images.map((image) => (
            <Carousel.Item interval={1000}>
                <img
                className="d-block w-100"
                src={image.imageUrl}
                alt="mySlide"
                />
            </Carousel.Item>
        ))}
    </Carousel>
  );
}

function Slider(){
    const imagesList = [
        {id:1,imageUrl:'./Billetterie.jpg'},
        {id:2,imageUrl:'./vte1.jpg'},
        {id:3,imageUrl:'./esc1.jpg'},
        {id:4,imageUrl:'./crc1.jpg'},
        // Add more image URLs as needed
      ];
      return(
        <Images images={imagesList}/>
      );
}

export default Slider;