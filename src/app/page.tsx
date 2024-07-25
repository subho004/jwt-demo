import React from "react";

export default async function HomePage() {
  const response = await fetch("/api/protected", {
    headers: {
      Authorization: "Bearer YOUR_VALID_JWT_HERE",
    },
  });

  const data = await response.json();

  return (
    <div>
      <h1>Home Page</h1>
      <p>{data.message}</p>
    </div>
  );
}
