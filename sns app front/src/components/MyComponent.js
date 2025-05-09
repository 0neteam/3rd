// frontend/src/components/MyComponent.js
import React from 'react';
import useFetch from '../hooks/useFetch';

function MyComponent() {
  const { data, loading, error } = useFetch('/api/data');

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error!</div>;

  return (
    <div>
      {data && data.map(item => (
        <div key={item.id}>{item.name}</div>
      ))}
    </div>
  );
}

export default MyComponent;
