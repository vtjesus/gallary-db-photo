interface PhotoGridProps {
  photos: string[];
}

const PhotoGrid: React.FC<PhotoGridProps> = ({ photos }) => {
  return (
    <div className="grid grid-cols-3 gap-8 ">
      {photos.map((photo, index) => (
        <img
          key={index}
          src={photo}
          alt={`photo-${index}`}
          className="w-[250px] h-[250px] rounded-xl shadow-xl "
        />
      ))}
    </div>
  );
};

export default PhotoGrid;
