import React from 'react';

export default function TagLabel({ tags }) {
  if (!tags) return null;
  return (
    tags.map((data) => {
      return (
        <div className="tag" key={data.id}>
          {data}
        </div>
      );
    })
  );
}
