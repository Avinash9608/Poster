import PosterCard from './PosterCard';

const PosterGrid = ({ 
  posters, 
  onEdit, 
  onDelete, 
  isAdmin = false, 
  currentUserId = null 
}) => {
  if (!posters || posters.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-gray-500">No posters found.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {posters.map((poster) => (
        <PosterCard 
          key={poster._id} 
          poster={poster} 
          onEdit={onEdit} 
          onDelete={onDelete}
          isAdmin={isAdmin}
          isOwner={currentUserId && poster.creator && poster.creator._id === currentUserId}
        />
      ))}
    </div>
  );
};

export default PosterGrid;
