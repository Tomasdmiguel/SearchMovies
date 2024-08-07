const Nav = () => {
  const text = 'Whats Movies';

  return (
    <nav className="bg-gray-800 p-4">
      <div className="container mx-auto">
        {text.split('').map((char, index) => (
          <span
            key={index}
            className={`inline-block text-4xl font-bold ${
              index % 2 === 0 ? 'text-blue-500' : 'text-red-500'
            } animate-bounce`}
            style={{ animationDelay: `${index * 0.1}s` }}
          >
            {char}
          </span>
        ))}
      </div>
    </nav>
  );
};

export default Nav;
