import React from "react";
import ContentLoader from "react-content-loader";

export const Skeleton = () => (
  <ContentLoader
    speed={2}
    width={221}
    height={424}
    viewBox="0 0 221 424"
    backgroundColor="#f3f3f3"
    foregroundColor="#ecebeb"
  >
    <circle cx="110" cy="110" r="110" />
    <rect x="0" y="227" rx="10" ry="10" width="221" height="18" />
    <rect x="0" y="254" rx="10" ry="10" width="221" height="114" />
    <rect x="0" y="384" rx="10" ry="10" width="86" height="20" />
    <rect x="102" y="376" rx="10" ry="10" width="120" height="40" />
  </ContentLoader>
);
