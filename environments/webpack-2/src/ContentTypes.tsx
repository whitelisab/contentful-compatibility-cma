import React, { useEffect, useState } from 'react';
import { createClient } from 'contentful-management';
import type { ContentTypeProps } from 'contentful-management';

const ContentTypes: React.FC = () => {
  const [contentTypes, setContentTypes] = useState<ContentTypeProps[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchContentTypes = async () => {
      try {
        const client = createClient({
          accessToken: process.env.CMA_ACCESS_TOKEN ?? '',
        });

        const spaces = await client.getSpaces()
        const space = await client.getSpace(spaces.items[0].sys.id);
        const environment = await space.getEnvironment('master');
        const response = await environment.getContentTypes();
        
        setContentTypes(response.items);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
      }
    };

    fetchContentTypes();
  }, []);

  if (error) {
    return <div style={{ color: 'red' }}>Error: {error}</div>;
  }

  return (
    <div style={{ padding: '20px' }}>
      <h2>Content Types</h2>
      {contentTypes.length === 0 ? (
        <p>Loading content types...</p>
      ) : (
        <ul style={{ listStyle: 'none', padding: 0 }}>
          {contentTypes.map((contentType) => (
            <li 
              key={contentType.sys.id}
              style={{
                padding: '10px',
                margin: '5px 0',
                backgroundColor: '#f5f5f5',
                borderRadius: '4px'
              }}
            >
              {contentType.displayField}: {contentType.name}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ContentTypes; 