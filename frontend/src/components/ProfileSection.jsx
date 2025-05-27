const ProfileSection = ({ userEmail }) => (
    <div className="bg-gray-800 p-6 rounded-xl shadow-lg max-w-md mx-auto text-center">
      <img
        src="https://via.placeholder.com/100"
        alt="Profile"
        className="w-24 h-24 rounded-full mx-auto mb-4 border-2 border-blue-500"
      />
      <h2 className="text-xl font-semibold text-gray-100 mb-1">HR User</h2>
      <p className="text-sm text-gray-400 mb-1">Email: {userEmail}</p>
      <p className="text-sm text-gray-400">Role: HR</p>
    </div>
  );
  
  export default ProfileSection;