import React, { useState, useEffect } from 'react';


export interface streamType {
    pubKey: string,
    manifest: string,
    startTime: string,
    endTime: string | null,
    duration: string | null,
    broadcasterId: string,
    userId: string,
    broadcastId: string,
}

interface props {
    selectStream: (stream: streamType) => void;
}



export const StreamsGrid: React.FC<props> = ({ selectStream } ) => {
  const [streams, setStreams] = useState<streamType[]>([]);

  const handleButtonClick = async () => {
    try {
        // ** REQUIRED **
        // You must add your service endpoint here in order to use this demo.
        // ** REQUIRED **
        const response = await fetch('http://localhost:3005/live-streams');
        const data = await response.json();

        // Store the results for the streams.
        setStreams(data.results)

        console.log("Data", data.results)
      } catch (error) {
        console.error('Fetch error:', error);
      }
  };

  return (
    <div>
        <button onClick={handleButtonClick}>Fetch Streams</button>
        <table>
            <tbody>
            {streams.map((stream, index) => (
              <tr style={{cursor: "pointer"}} key={index} onClick={() => selectStream(stream)}>
                <td>Stream userId: {stream?.userId}</td> 
              </tr>
            ))}
            </tbody>
        </table>
    </div>
  );
};

export default StreamsGrid;
